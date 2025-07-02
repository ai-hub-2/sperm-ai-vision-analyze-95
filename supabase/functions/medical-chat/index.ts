
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, analysisId, userId } = await req.json();
    
    if (!message || !analysisId || !userId) {
      return new Response(
        JSON.stringify({ error: 'الرجاء إدخال جميع البيانات المطلوبة' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // إنشاء عميل Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // جلب نتائج التحليل
    const { data: analysis, error: analysisError } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('id', analysisId)
      .eq('user_id', userId)
      .single();

    if (analysisError || !analysis) {
      return new Response(
        JSON.stringify({ error: 'لم يتم العثور على نتائج التحليل' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // بناء السياق الطبي
    const medicalContext = `
نتائج تحليل الحيوانات المنوية للمريض:
- عدد الحيوانات المنوية: ${analysis.sperm_count} مليون/مل
- التركيز: ${analysis.concentration} مليون/مل
- الحجم: ${analysis.volume} مل
- درجة الحموضة: ${analysis.ph}
- متوسط السرعة: ${analysis.speed_avg} ميكرون/ثانية
- الحيوية: ${analysis.vitality}%
- الحركة: ${JSON.stringify(analysis.motility)}
- الشكل: ${JSON.stringify(analysis.morphology)}
- مدة الفيديو المحلل: ${analysis.video_duration} ثانية
- عدد الإطارات المحللة: ${analysis.frames_analyzed}

سؤال المريض: ${message}
`;

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'مفتاح OpenAI غير مكون' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // استدعاء OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `أنت مساعد طبي متخصص في تحاليل الحيوانات المنوية والخصوبة. 
            
قواعد مهمة:
1. قدم معلومات دقيقة وواضحة باللغة العربية
2. استخدم لغة بسيطة تناسب المرضى
3. لا تقم بتشخيص الحالة أو وصف علاجات محددة
4. اشرح النتائج بناءً على البيانات المقدمة فقط
5. انصح دائماً بمراجعة الطبيب للتشخيص النهائي
6. إذا كان السؤال خارج السياق الطبي، أعد توجيه المريض لطرح أسئلة متعلقة بالتحليل
7. قدم نصائح عامة لتحسين الصحة الإنجابية عند السؤال

القيم الطبيعية للمرجع:
- التركيز: أكثر من 15 مليون/مل
- الحجم: 1.5-5 مل  
- درجة الحموضة: 7.2-8.0
- الحيوية: أكثر من 58%
- الحركة التقدمية: أكثر من 32%`
          },
          {
            role: 'user',
            content: medicalContext
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // حفظ المحادثة في قاعدة البيانات (اختياري)
    await supabase
      .from('chat_history')
      .insert({
        user_id: userId,
        analysis_id: analysisId,
        user_message: message,
        ai_response: aiResponse,
        created_at: new Date().toISOString()
      });

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in medical-chat function:', error);
    return new Response(
      JSON.stringify({ error: 'حدث خطأ في المحادثة. الرجاء المحاولة مرة أخرى.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
