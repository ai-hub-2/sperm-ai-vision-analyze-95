
import React from 'react';
import { BarChart3, Clock, Activity, Zap, Download, Share2, Eye, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AnalysisResultsProps {
  data: {
    sperm_count: number;
    concentration: number;
    motility: {
      progressive: number;
      non_progressive: number;
      immotile: number;
    };
    morphology: {
      normal: number;
      abnormal: number;
    };
    vitality: number;
    volume: number;
    ph: number;
    processing_time: number;
    video_duration: number;
    frames_analyzed: number;
  };
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data }) => {
  const getMotilityStatus = (progressive: number) => {
    if (progressive >= 32) return { status: 'ممتاز', color: 'bg-green-500' };
    if (progressive >= 25) return { status: 'جيد', color: 'bg-yellow-500' };
    return { status: 'ضعيف', color: 'bg-red-500' };
  };

  const getConcentrationStatus = (concentration: number) => {
    if (concentration >= 15) return { status: 'طبيعي', color: 'text-green-600' };
    if (concentration >= 10) return { status: 'منخفض', color: 'text-yellow-600' };
    return { status: 'منخفض جداً', color: 'text-red-600' };
  };

  const motilityStatus = getMotilityStatus(data.motility.progressive);
  const concentrationStatus = getConcentrationStatus(data.concentration);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-900">تقرير التحليل الشامل</CardTitle>
                <CardDescription className="text-gray-600">
                  نتائج تحليل عينة السائل المنوي بالذكاء الاصطناعي
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-green-700 bg-green-100">
              مكتمل
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sperm Count */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              عدد الحيوانات المنوية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">
                {(data.sperm_count / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">
                التركيز: <span className={`font-semibold ${concentrationStatus.color}`}>
                  {data.concentration} مليون/مل ({concentrationStatus.status})
                </span>
              </div>
              <div className="text-sm text-gray-600">
                الحجم الكلي: {data.volume} مل
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motility */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              تحليل الحركة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">حركة تقدمية</span>
                <span className={`text-sm font-semibold ${motilityStatus.color.replace('bg-', 'text-')}`}>
                  {data.motility.progressive}%
                </span>
              </div>
              <Progress value={data.motility.progressive} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">غير تقدمية:</span>
                  <span className="font-semibold ml-1">{data.motility.non_progressive}%</span>
                </div>
                <div>
                  <span className="text-gray-600">غير متحركة:</span>
                  <span className="font-semibold ml-1">{data.motility.immotile}%</span>
                </div>
              </div>
              
              <Badge className={motilityStatus.color}>
                {motilityStatus.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            التحليل التفصيلي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Morphology */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
                التشكل المورفولوجي
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">طبيعي</span>
                  <span className="font-semibold text-green-600">{data.morphology.normal}%</span>
                </div>
                <Progress value={data.morphology.normal} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">غير طبيعي</span>
                  <span className="font-semibold text-red-600">{data.morphology.abnormal}%</span>
                </div>
              </div>
            </div>

            {/* Vitality */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
                الحيوية
              </h4>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {data.vitality}%
                </div>
                <Progress value={data.vitality} className="h-3" />
                <div className="text-sm text-gray-600 mt-2">
                  حيوانات منوية حية
                </div>
              </div>
            </div>

            {/* pH Level */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
                الأس الهيدروجيني
              </h4>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {data.ph}
                </div>
                <div className="text-sm text-gray-600">
                  المعدل الطبيعي: 7.2-8.0
                </div>
                <Badge variant={data.ph >= 7.2 && data.ph <= 8.0 ? "default" : "destructive"} className="mt-2">
                  {data.ph >= 7.2 && data.ph <= 8.0 ? "طبيعي" : "غير طبيعي"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Info */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-900">{data.processing_time}s</div>
              <div className="text-sm text-gray-600">وقت المعالجة</div>
            </div>
            <div>
              <Eye className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-900">{data.video_duration}s</div>
              <div className="text-sm text-gray-600">مدة الفيديو</div>
            </div>
            <div>
              <BarChart3 className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-900">{data.frames_analyzed}</div>
              <div className="text-sm text-gray-600">إطار محلل</div>
            </div>
            <div>
              <Activity className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-900">AI</div>
              <div className="text-sm text-gray-600">تحليل ذكي</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Download className="w-4 h-4 mr-2" />
          تحميل التقرير PDF
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          مشاركة النتائج
        </Button>
        <Button variant="outline" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          عرض التفاصيل
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;
