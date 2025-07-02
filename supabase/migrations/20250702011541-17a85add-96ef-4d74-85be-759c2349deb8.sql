
-- إنشاء جدول لحفظ تاريخ المحادثات مع الذكاء الاصطناعي
CREATE TABLE public.chat_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  analysis_id UUID REFERENCES public.analysis_results(id) ON DELETE CASCADE NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات الأمان
CREATE POLICY "المستخدمون يمكنهم مشاهدة محادثاتهم فقط" 
  ON public.chat_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "المستخدمون يمكنهم إنشاء محادثات جديدة" 
  ON public.chat_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "المستخدمون يمكنهم تحديث محادثاتهم" 
  ON public.chat_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "المستخدمون يمكنهم حذف محادثاتهم" 
  ON public.chat_history 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- إنشاء trigger لتحديث updated_at تلقائياً
CREATE TRIGGER update_chat_history_updated_at 
  BEFORE UPDATE ON public.chat_history 
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- إضافة فهارس لتحسين الأداء
CREATE INDEX idx_chat_history_user_id ON public.chat_history(user_id);
CREATE INDEX idx_chat_history_analysis_id ON public.chat_history(analysis_id);
CREATE INDEX idx_chat_history_created_at ON public.chat_history(created_at DESC);
