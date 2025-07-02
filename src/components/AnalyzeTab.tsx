
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
      <div className="px-4 py-6 bg-gray-900 min-h-screen">
        <Card className="text-center py-8 border-2 border-orange-600/30 bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm">
          <CardContent>
            <Lock className="w-20 h-20 text-orange-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-orange-300 mb-4">
              🔐 مطلوب تسجيل الدخول
            </h3>
            <p className="text-orange-200 text-lg mb-6 leading-relaxed">
              يرجى تسجيل الدخول للوصول إلى ميزة التحليل الحقيقي بالذكاء الاصطناعي مع Koyeb
            </p>
            <div className="bg-orange-900/30 p-6 rounded-xl border border-orange-600/20">
              <p className="text-orange-200 text-sm leading-relaxed">
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
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          🚀 تحليل الحيوانات المنوية بالذكاء الاصطناعي
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          تحليل حقيقي ودقيق مع تسجيل مباشر من الكاميرا ونشر سحابي متقدم عبر Koyeb
        </p>
      </div>

      {/* Camera Features Showcase */}
      <Card className="mb-6 border-green-600/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="font-bold text-green-300 mb-6 text-center text-xl">📱 ميزات التسجيل المباشر الجديدة</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-green-600/20">
              <Camera className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h5 className="font-semibold text-green-300 mb-1">كاميرا مباشرة</h5>
              <p className="text-xs text-green-200">تسجيل فوري HD</p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-blue-600/20">
              <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h5 className="font-semibold text-blue-300 mb-1">كاميرا خلفية</h5>
              <p className="text-xs text-blue-200">جودة عالية</p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-yellow-600/20">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h5 className="font-semibold text-yellow-300 mb-1">معالجة سريعة</h5>
              <p className="text-xs text-yellow-200">AI متقدم</p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-purple-600/20">
              <Microscope className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h5 className="font-semibold text-purple-300 mb-1">تحليل فوري</h5>
              <p className="text-xs text-purple-200">ذكاء اصطناعي</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Technology Showcase */}
      <Card className="mb-6 border-blue-600/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="font-bold text-blue-300 mb-6 text-center text-xl">🤖 تقنيات الذكاء الاصطناعي + Koyeb</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-blue-600/20">
              <Brain className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h5 className="font-semibold text-blue-300 mb-1">YOLOv8</h5>
              <p className="text-xs text-blue-200">كشف وتعرف متقدم</p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-green-600/20">
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h5 className="font-semibold text-green-300 mb-1">DeepSort</h5>
              <p className="text-xs text-green-200">تتبع الحركة الذكي</p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-purple-600/20">
              <Cpu className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h5 className="font-semibold text-purple-300 mb-1">OpenCV</h5>
              <p className="text-xs text-purple-200">معالجة الوسائط</p>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-red-600/20">
              <Microscope className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h5 className="font-semibold text-red-300 mb-1">Koyeb Cloud</h5>
              <p className="text-xs text-red-200">نشر سحابي GPU</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <EnhancedVideoUpload onAnalysisComplete={onAnalysisComplete} />
      
      {/* Technical Implementation Details */}
      <Card className="mt-6 border-indigo-600/30 bg-gradient-to-r from-indigo-900/20 to-blue-900/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="font-bold text-indigo-300 mb-4">🛠️ تفاصيل التنفيذ التقني مع Koyeb</h4>
          <div className="grid grid-cols-1 gap-6 text-sm">
            <div className="bg-gray-800/30 p-4 rounded-xl border border-indigo-600/20">
              <h5 className="font-semibold text-indigo-300 mb-3">📹 معالجة الوسائط:</h5>
              <ul className="space-y-2 text-indigo-200">
                <li>• OpenCV لاستخراج الإطارات</li>
                <li>• MoviePy لمعالجة الفيديو</li>
                <li>• MediaRecorder API للتسجيل</li>
                <li>• WebRTC للكاميرا المباشرة</li>
              </ul>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-xl border border-indigo-600/20">
              <h5 className="font-semibold text-indigo-300 mb-3">🤖 الذكاء الاصطناعي:</h5>
              <ul className="space-y-2 text-indigo-200">
                <li>• YOLOv8 (Ultralytics) للكشف</li>
                <li>• DeepSort للتتبع</li>
                <li>• PyTorch للاستنتاج</li>
                <li>• ONNX Runtime للتحسين</li>
              </ul>
            </div>
          </div>
          <p className="text-indigo-300 text-xs mt-6 text-center font-medium bg-indigo-900/20 p-3 rounded-lg border border-indigo-600/20">
            🌟 جميع التحليلات تتم وفقاً لمعايير WHO 2010 مع ضمان الدقة الطبية والنشر عبر Koyeb
          </p>
        </CardContent>
      </Card>

      {/* Real Implementation Notice */}
      <Card className="mt-6 border-green-600/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="font-bold text-green-300 mb-4">✅ نظام حقيقي متكامل مع Koyeb</h4>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-green-600/20">
              <span className="w-3 h-3 bg-green-400 rounded-full mt-1 animate-pulse"></span>
              <div>
                <span className="font-semibold text-green-300">تحليل حقيقي 100%</span>
                <p className="text-green-200 text-xs">مع تسجيل مباشر من الكاميرا</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-blue-600/20">
              <span className="w-3 h-3 bg-blue-400 rounded-full mt-1 animate-pulse"></span>
              <div>
                <span className="font-semibold text-blue-300">نشر Koyeb متقدم</span>
                <p className="text-blue-200 text-xs">خوادم GPU عالية الأداء</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-purple-600/20">
              <span className="w-3 h-3 bg-purple-400 rounded-full mt-1 animate-pulse"></span>
              <div>
                <span className="font-semibold text-purple-300">كاميرا مباشرة HD</span>
                <p className="text-purple-200 text-xs">تسجيل وتحليل فوري</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyzeTab;
