
import React from 'react';
import RealVideoUpload from '@/components/RealVideoUpload';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Lock } from 'lucide-react';

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
              يرجى تسجيل الدخول للوصول إلى ميزة التحليل الحقيقي بالذكاء الاصطناعي
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
    <div className="px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🔬 تحليل الحيوانات المنوية بالذكاء الاصطناعي
        </h2>
        <p className="text-gray-600">
          تحليل حقيقي ودقيق باستخدام أحدث تقنيات Computer Vision والتعلم العميق
        </p>
      </div>
      <RealVideoUpload onAnalysisComplete={onAnalysisComplete} />
      
      {/* Technical Details Card */}
      <Card className="mt-6 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-800 mb-3">🤖 التقنيات المستخدمة في التحليل</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-blue-700">YOLOv8 للكشف والتتبع</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="text-blue-700">OpenCV لمعالجة الفيديو</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span className="text-blue-700">Deep Learning للتصنيف</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span className="text-blue-700">CASA التحليل المساعد</span>
            </div>
          </div>
          <p className="text-blue-600 text-xs mt-3">
            جميع التحليلات تتم وفقاً لمعايير منظمة الصحة العالمية WHO 2010
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyzeTab;
