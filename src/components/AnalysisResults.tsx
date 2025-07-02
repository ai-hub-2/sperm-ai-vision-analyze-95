
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Droplets, Microscope, Clock, Eye } from 'lucide-react';

interface AnalysisData {
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
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data }) => {
  const getQualityBadge = (value: number, thresholds: { good: number; fair: number }) => {
    if (value >= thresholds.good) return <Badge className="bg-green-100 text-green-800 text-xs">ممتاز</Badge>;
    if (value >= thresholds.fair) return <Badge className="bg-yellow-100 text-yellow-800 text-xs">جيد</Badge>;
    return <Badge className="bg-red-100 text-red-800 text-xs">ضعيف</Badge>;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Microscope className="w-5 h-5 text-green-600" />
            نتائج التحليل
          </CardTitle>
          <CardDescription className="text-sm">
            تقرير شامل لتحليل عينة السائل المنوي
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Basic Analysis - Mobile Optimized */}
      <div className="grid grid-cols-1 gap-3">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-gray-600">عدد الحيوانات المنوية</p>
                <p className="text-xl font-bold text-blue-700">
                  {(data.sperm_count / 1000000).toFixed(1)}M
                </p>
              </div>
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            {getQualityBadge(data.sperm_count, { good: 39000000, fair: 15000000 })}
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-gray-600">التركيز (مليون/مل)</p>
                <p className="text-xl font-bold text-purple-700">
                  {data.concentration.toFixed(1)}
                </p>
              </div>
              <Droplets className="w-6 h-6 text-purple-600" />
            </div>
            {getQualityBadge(data.concentration, { good: 15, fair: 10 })}
          </CardContent>
        </Card>
      </div>

      {/* Motility Analysis */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">تحليل الحركة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">حركة تقدمية</span>
              <span className="text-sm text-green-600 font-semibold">{data.motility.progressive}%</span>
            </div>
            <Progress value={data.motility.progressive} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">حركة غير تقدمية</span>
              <span className="text-sm text-yellow-600 font-semibold">{data.motility.non_progressive}%</span>
            </div>
            <Progress value={data.motility.non_progressive} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">غير متحرك</span>
              <span className="text-sm text-red-600 font-semibold">{data.motility.immotile}%</span>
            </div>
            <Progress value={data.motility.immotile} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Morphology and Additional Metrics */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="w-4 h-4" />
              التشكل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">طبيعي</span>
                <span className="font-semibold text-green-600">{data.morphology.normal}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">غير طبيعي</span>
                <span className="font-semibold text-red-600">{data.morphology.abnormal}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">مؤشرات إضافية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">الحيوية</span>
                <span className="font-semibold">{data.vitality}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">الحجم</span>
                <span className="font-semibold">{data.volume} مل</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">الأس الهيدروجيني</span>
                <span className="font-semibold">{data.ph}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Info */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-800 text-sm">معلومات المعالجة</span>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">وقت المعالجة:</span>
              <span className="font-medium">{data.processing_time.toFixed(1)} ثانية</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">مدة الفيديو:</span>
              <span className="font-medium">{data.video_duration} ثانية</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الإطارات المحللة:</span>
              <span className="font-medium">{data.frames_analyzed}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
