
import React from 'react';
import EnhancedVideoUpload from '@/components/EnhancedVideoUpload';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Cpu, Brain, Zap, Microscope, Camera, Smartphone } from 'lucide-react';

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
              يرجى تسجيل الدخول للوصول إلى ميزة التحليل الحقيقي بالذكاء الاصطناعي مع Koyeb
            </p>
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-orange-800 text-sm">
                🔬 التحليل يتطلب حساب مستخدم لحفظ النتائج والوصول إلى المساعد الطبي الذكي
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 bg-gray-900 min-h-screen">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          🚀 تحليل الحيوانات المنوية بالذكاء الاصطناعي + Koyeb
        </h2>
        <p className="text-gray-300 text-lg">
          تحليل حقيقي ودقيق مع تسجيل مباشر من الكاميرا ونشر سحابي متقدم عبر Koyeb
        </p>
      </div>

      {/* Camera Features Showcase */}
      <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-600">
        <CardContent className="p-6">
          <h4 className="font-bold text-green-400 mb-4 text-center text-xl">📱 ميزات التسجيل المباشر الجديدة</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Camera className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h5 className="font-semibold text-green-400">كاميرا مباشرة</h5>
              <p className="text-xs text-green-300">تسجيل فوري</p>
            </div>
            <div className="text-center">
              <Smartphone className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-400">كاميرا خلفية</h5>
              <p className="text-xs text-blue-300">جودة عالية</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <h5 className="font-semibold text-yellow-400">فلاش ذكي</h5>
              <p className="text-xs text-yellow-300">إضاءة محسنة</p>
            </div>
            <div className="text-center">
              <Microscope className="w-12 h-12 text-purple-500 mx-auto mb-2" />
              <h5 className="font-semibold text-purple-400">تحليل فوري</h5>
              <p className="text-xs text-purple-300">ذكاء اصطناعي</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Technology Showcase */}
      <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-600">
        <CardContent className="p-6">
          <h4 className="font-bold text-blue-400 mb-4 text-center text-xl">🤖 تقنيات الذكاء الاصطناعي + Koyeb</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-400">YOLOv8</h5>
              <p className="text-xs text-blue-300">كشف وتعرف متقدم</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-400">DeepSort</h5>
              <p className="text-xs text-blue-300">تتبع الحركة الذكي</p>
            </div>
            <div className="text-center">
              <Cpu className="w-12 h-12 text-purple-500 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-400">OpenCV</h5>
              <p className="text-xs text-blue-300">معالجة الوسائط</p>
            </div>
            <div className="text-center">
              <Microscope className="w-12 h-12 text-red-500 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-400">Koyeb Cloud</h5>
              <p className="text-xs text-blue-300">نشر سحابي GPU</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <EnhancedVideoUpload onAnalysisComplete={onAnalysisComplete} />
      
      {/* Technical Implementation Details */}
      <Card className="mt-6 border-indigo-200 bg-gradient-to-r from-indigo-900/20 to-blue-900/20 border-indigo-600">
        <CardContent className="p-6">
          <h4 className="font-bold text-indigo-400 mb-4">🛠️ تفاصيل التنفيذ التقني مع Koyeb</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-indigo-300 mb-2">📹 معالجة الوسائط:</h5>
              <ul className="space-y-1 text-indigo-400">
                <li>• OpenCV لاستخراج الإطارات</li>
                <li>• MoviePy لمعالجة الفيديو</li>
                <li>• MediaRecorder API للتسجيل</li>
                <li>• WebRTC للكاميرا المباشرة</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-indigo-300 mb-2">🤖 الذكاء الاصطناعي:</h5>
              <ul className="space-y-1 text-indigo-400">
                <li>• YOLOv8 (Ultralytics) للكشف</li>
                <li>• DeepSort للتتبع</li>
                <li>• PyTorch للاستنتاج</li>
                <li>• ONNX Runtime للتحسين</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-indigo-300 mb-2">🔬 التحليل الطبي:</h5>
              <ul className="space-y-1 text-indigo-400">
                <li>• OpenCASA للتحليل المعياري</li>
                <li>• خوارزميات WHO 2010</li>
                <li>• SciPy للتحليل الإحصائي</li>
                <li>• معالجة الصور الطبية المتقدمة</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-indigo-300 mb-2">☁️ النشر السحابي Koyeb:</h5>
              <ul className="space-y-1 text-indigo-400">
                <li>• Koyeb للحاويات المتقدمة</li>
                <li>• GPU مخصص للتحليل السريع</li>
                <li>• التوسع التلقائي</li>
                <li>• API sbp_9dd38c9f90c6dda0e8c1fa14998427aeef15b71a</li>
              </ul>
            </div>
          </div>
          <p className="text-indigo-400 text-xs mt-4 text-center font-medium">
            🌟 جميع التحليلات تتم وفقاً لمعايير WHO 2010 مع ضمان الدقة الطبية والنشر عبر Koyeb
          </p>
        </CardContent>
      </Card>

      {/* Real Implementation Notice */}
      <Card className="mt-6 border-green-200 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-600">
        <CardContent className="p-6">
          <h4 className="font-bold text-green-400 mb-3">✅ نظام حقيقي متكامل مع Koyeb</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-green-300">تحليل حقيقي 100%</span>
                <p className="text-green-400">مع تسجيل مباشر</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-green-300">نشر Koyeb</span>
                <p className="text-green-400">خوادم GPU متقدمة</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-green-300">كاميرا مباشرة</span>
                <p className="text-green-400">تسجيل فوري HD</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyzeTab;
