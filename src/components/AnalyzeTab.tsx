
import React from 'react';
import RealVideoUpload from '@/components/RealVideoUpload';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Cpu, Brain, Zap, Microscope } from 'lucide-react';

interface AnalyzeTabProps {
  onAnalysisComplete: (data: any) => void;
}

const AnalyzeTab: React.FC<AnalyzeTabProps> = ({ onAnalysisComplete }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="px-4 py-6">
        <Card className="text-center py-8 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent>
            <Lock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-800 mb-3">
              🔐 مطلوب تسجيل الدخول
            </h3>
            <p className="text-orange-700 text-base mb-4">
              يرجى تسجيل الدخول للوصول إلى ميزة التحليل الحقيقي بالذكاء الاصطناعي المتقدم
            </p>
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-orange-800 text-sm">
                🔬 التحليل يتطلب حساب مستخدم لحفظ النتائج والوصول إلى المساعد الطبي الذكي المتخصص
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🚀 تحليل الحيوانات المنوية بالذكاء الاصطناعي الحقيقي
        </h2>
        <p className="text-gray-600 text-lg">
          تحليل حقيقي ودقيق باستخدام أحدث تقنيات Computer Vision والتعلم العميق مع نشر Koyeb
        </p>
      </div>

      {/* AI Technology Showcase */}
      <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <h4 className="font-bold text-blue-800 mb-4 text-center text-xl">🤖 تقنيات الذكاء الاصطناعي المتقدمة</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-800">YOLOv8</h5>
              <p className="text-xs text-blue-700">كشف وتعرف متقدم</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-800">DeepSort</h5>
              <p className="text-xs text-blue-700">تتبع الحركة الذكي</p>
            </div>
            <div className="text-center">
              <Cpu className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-800">OpenCV</h5>
              <p className="text-xs text-blue-700">معالجة الفيديو</p>
            </div>
            <div className="text-center">
              <Microscope className="w-12 h-12 text-red-600 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-800">CASA</h5>
              <p className="text-xs text-blue-700">التحليل الطبي</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <RealVideoUpload onAnalysisComplete={onAnalysisComplete} />
      
      {/* Technical Implementation Details */}
      <Card className="mt-6 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
        <CardContent className="p-6">
          <h4 className="font-bold text-indigo-800 mb-4">🛠️ تفاصيل التنفيذ التقني الحقيقي</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-indigo-700 mb-2">📹 معالجة الفيديو:</h5>
              <ul className="space-y-1 text-indigo-600">
                <li>• OpenCV لاستخراج الإطارات</li>
                <li>• MoviePy لمعالجة الفيديو</li>
                <li>• PyAV للتسريع بـ GPU</li>
                <li>• ImageIO للقراءة/الكتابة</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-indigo-700 mb-2">🤖 الذكاء الاصطناعي:</h5>
              <ul className="space-y-1 text-indigo-600">
                <li>• YOLOv8 (Ultralytics) للكشف</li>
                <li>• DeepSort للتتبع</li>
                <li>• PyTorch للاستنتاج</li>
                <li>• ONNX Runtime للتحسين</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-indigo-700 mb-2">🔬 التحليل الطبي:</h5>
              <ul className="space-y-1 text-indigo-600">
                <li>• OpenCASA للتحليل المعياري</li>
                <li>• خوارزميات WHO 2010</li>
                <li>• SciPy للتحليل الإحصائي</li>
                <li>• معالجة الصور الطبية</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-indigo-700 mb-2">☁️ النشر السحابي:</h5>
              <ul className="space-y-1 text-indigo-600">
                <li>• Koyeb للحاويات المتقدمة</li>
                <li>• دعم GPU للتحليل</li>
                <li>• التوسع التلقائي</li>
                <li>• WebSocket للتحديثات</li>
              </ul>
            </div>
          </div>
          <p className="text-indigo-600 text-xs mt-4 text-center font-medium">
            🌟 جميع التحليلات تتم وفقاً لمعايير منظمة الصحة العالمية WHO 2010 مع ضمان الدقة الطبية العالية
          </p>
        </CardContent>
      </Card>

      {/* Real Implementation Notice */}
      <Card className="mt-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <h4 className="font-bold text-green-800 mb-3">✅ نظام حقيقي متكامل</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-green-700">تحليل حقيقي 100%</span>
                <p className="text-green-600">ليس محاكاة أو تجريبي</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-green-700">نشر Koyeb</span>
                <p className="text-green-600">خوادم GPU متقدمة</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-green-700">معايير طبية</span>
                <p className="text-green-600">WHO 2010 معتمد</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyzeTab;
