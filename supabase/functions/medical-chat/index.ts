
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, analysisId, userId } = await req.json()

    console.log('Medical chat request:', { message, analysisId, userId })

    // In a real implementation, this would connect to:
    // 1. OpenAI GPT-4 or similar medical AI
    // 2. Medical knowledge base
    // 3. Specialized fertility/urology training data

    const medicalResponse = await generateMedicalResponse(message, analysisId)

    return new Response(
      JSON.stringify({ response: medicalResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Medical chat error:', error)
    return new Response(
      JSON.stringify({ 
        response: 'عذراً، حدث خطأ تقني. يرجى المحاولة مرة أخرى أو استشارة طبيبك المختص مباشرة.' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

async function generateMedicalResponse(userMessage: string, analysisId: string): Promise<string> {
  // This would be replaced with actual AI integration
  // For now, providing medically informed responses based on common queries
  
  const lowerMessage = userMessage.toLowerCase()
  
  // Medical knowledge base responses
  if (lowerMessage.includes('طبيعية') || lowerMessage.includes('النتائج')) {
    return `بناءً على نتائج التحليل المعروضة:

📊 **تقييم النتائج:**
- يتم تقييم النتائج وفقاً لمعايير منظمة الصحة العالمية (WHO 2010)
- المعايير الطبيعية تشمل: التركيز > 15 مليون/مل، الحركة التقدمية > 32%، التشكل الطبيعي > 4%

⚕️ **التفسير الطبي:**
النتائج تحتاج لتفسير طبي متخصص يأخذ في الاعتبار:
- التاريخ المرضي والعوامل البيئية
- الفحوصات المكملة الأخرى
- الأعراض السريرية إن وجدت

🔍 **التوصية:**
أنصح بمراجعة طبيب مختص في المسالك البولية أو طب الإنجاب لتفسير النتائج بشكل دقيق وتحديد الخطوات التالية إن لزم الأمر.`
  }
  
  if (lowerMessage.includes('حركة') || lowerMessage.includes('تقدمية')) {
    return `🏃‍♂️ **الحركة التقدمية (Progressive Motility):**

**التعريف الطبي:**
- الحركة التقدمية تعني قدرة الحيوانات المنوية على الحركة في خط مستقيم للأمام
- تصنف إلى: سريعة تقدمية (Grade A) وبطيئة تقدمية (Grade B)

**الأهمية الطبية:**
- ضرورية لوصول الحيوان المنوي للبويضة
- المعدل الطبيعي: أكثر من 32% حركة تقدمية

**العوامل المؤثرة:**
- جودة الميتوكوندريا (مصدر الطاقة)
- سلامة الذيل (Flagellum)
- مستوى الطاقة الخلوية

**كيفية التحسين:**
- نظام غذائي غني بمضادات الأكسدة
- ممارسة الرياضة بانتظام
- تجنب التدخين والكحول
- إدارة التوتر والضغط النفسي

يُنصح بمراجعة طبيب الذكورة لتقييم شامل ووضع خطة علاجية مناسبة.`
  }
  
  if (lowerMessage.includes('تحسين') || lowerMessage.includes('علاج')) {
    return `🌟 **طرق تحسين جودة الحيوانات المنوية:**

**1. النظام الغذائي 🥗**
- فيتامين C, E (مضادات أكسدة)
- الزنك (مهم لإنتاج الحيوانات المنوية)
- حمض الفوليك وفيتامين B12
- أوميجا 3 (في الأسماك والمكسرات)

**2. نمط الحياة 🏃‍♂️**
- الرياضة المنتظمة (تجنب الإفراط)
- النوم الكافي (7-8 ساعات)
- إدارة التوتر والضغط النفسي
- الحفاظ على وزن صحي

**3. تجنب العوامل الضارة ⚠️**
- التدخين والكحول
- الحرارة العالية (الحمامات الساخنة)
- المواد الكيميائية والسموم
- الإشعاع والأدوية بدون استشارة

**4. المكملات الغذائية 💊**
- CoQ10
- L-Carnitine  
- مضادات الأكسدة
- (بعد استشارة طبية)

**⚕️ استشارة طبية مهمة:**
يُنصح بمراجعة طبيب مختص لتحديد السبب الجذري ووضع خطة علاجية مخصصة لحالتك.`
  }
  
  if (lowerMessage.includes('طبيب') || lowerMessage.includes('مراجعة')) {
    return `🏥 **متى تحتاج لمراجعة الطبيب:**

**الحالات الطارئة:**
- تأخر الحمل أكثر من عام مع محاولة منتظمة
- وجود ألم أو تورم في الخصيتين
- تغييرات في حجم أو شكل الخصيتين

**التخصصات المناسبة:**
- **طبيب المسالك البولية:** للمشاكل التشريحية والالتهابات
- **أخصائي الغدد الصماء:** لمشاكل الهرمونات
- **طبيب الإنجاب:** للاستشارة الشاملة

**ما يجب إحضاره للموعد:**
- نتائج التحليل الحالية
- التاريخ المرضي
- قائمة بالأدوية الحالية
- تفاصيل نمط الحياة

**الفحوصات المتوقعة:**
- فحص سريري شامل
- تحاليل هرمونية
- فحوصات إضافية حسب الحالة
- استشارة التصوير إن لزم

**💡 نصيحة مهمة:**
لا تتأخر في طلب المساعدة الطبية. التشخيص المبكر يساعد في العلاج الفعال.`
  }
  
  // Default response for general medical queries
  return `شكراً لسؤالك. كطبيب مساعد متخصص، أود أن أؤكد على أهمية:

🔍 **فهم النتائج:**
كل حالة فردية وتحتاج تقييم شخصي من طبيب مختص.

📋 **المعايير الطبية:**
نتائج التحليل تُقارن بمعايير منظمة الصحة العالمية WHO 2010.

⚕️ **الاستشارة الطبية:**
أنصح بشدة بمراجعة طبيب مختص في المسالك البولية أو طب الإنجاب للحصول على:
- تفسير دقيق للنتائج
- خطة علاجية مناسبة
- متابعة طبية مستمرة

هل لديك سؤال محدد حول جانب معين من النتائج؟`
}
