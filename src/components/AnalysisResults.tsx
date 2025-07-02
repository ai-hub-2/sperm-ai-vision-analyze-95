
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Droplets, Microscope, Clock, Eye, TrendingUp, Target } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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

  // بيانات مخطط الحركة
  const motilityData = [
    { name: 'حركة تقدمية', value: data.motility.progressive, color: '#10B981' },
    { name: 'حركة غير تقدمية', value: data.motility.non_progressive, color: '#F59E0B' },
    { name: 'غير متحرك', value: data.motility.immotile, color: '#EF4444' }
  ];

  // بيانات مخطط التشكل
  const morphologyData = [
    { name: 'طبيعي', value: data.morphology.normal, color: '#10B981' },
    { name: 'غير طبيعي', value: data.morphology.abnormal, color: '#EF4444' }
  ];

  // بيانات المؤشرات الرئيسية
  const keyMetricsData = [
    { 
      name: 'العدد', 
      value: Math.round(data.sperm_count / 1000000), 
      unit: 'مليون',
      normal: '≥15 مليون'
    },
    { 
      name: 'التركيز', 
      value: data.concentration, 
      unit: 'مليون/مل',
      normal: '≥15 مليون/مل'
    },
    { 
      name: 'الحيوية', 
      value: data.vitality, 
      unit: '%',
      normal: '≥58%'
    },
    { 
      name: 'الحجم', 
      value: data.volume, 
      unit: 'مل',
      normal: '≥1.5 مل'
    }
  ];

  return (
    <div className="space-y-4 p-4">
      {/* عنوان التقرير */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
            <Microscope className="w-6 h-6" />
            تقرير تحليل السائل المنوي
          </CardTitle>
          <CardDescription className="text-blue-600">
            تحليل شامل باستخدام الذكاء الاصطناعي
          </CardDescription>
        </CardHeader>
      </Card>

      {/* المؤشرات الرئيسية */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-gray-600">عدد الحيوانات المنوية</p>
                <p className="text-2xl font-bold text-green-700">
                  {(data.sperm_count / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500">المعدل الطبيعي: ≥15M</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            {getQualityBadge(data.sperm_count, { good: 39000000, fair: 15000000 })}
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-gray-600">التركيز</p>
                <p className="text-2xl font-bold text-blue-700">
                  {data.concentration.toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">مليون/مل</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
            {getQualityBadge(data.concentration, { good: 15, fair: 10 })}
          </CardContent>
        </Card>
      </div>

      {/* مخطط الحركة الدائري */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            تحليل الحركة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={motilityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {motilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* تفاصيل الحركة */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">حركة تقدمية</span>
                <span className="text-sm text-green-600 font-semibold">{data.motility.progressive}%</span>
              </div>
              <Progress value={data.motility.progressive} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">المعدل الطبيعي: ≥32%</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">حركة غير تقدمية</span>
                <span className="text-sm text-yellow-600 font-semibold">{data.motility.non_progressive}%</span>
              </div>
              <Progress value={data.motility.non_progressive} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">غير متحرك</span>
                <span className="text-sm text-red-600 font-semibold">{data.motility.immotile}%</span>
              </div>
              <Progress value={data.motility.immotile} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* مخطط التشكل */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            تحليل التشكل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={morphologyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {morphologyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{data.morphology.normal}%</p>
              <p className="text-sm text-gray-600">شكل طبيعي</p>
              <p className="text-xs text-gray-500">المطلوب: ≥4%</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-700">{data.morphology.abnormal}%</p>
              <p className="text-sm text-gray-600">شكل غير طبيعي</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* المؤشرات الإضافية */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-600" />
            المؤشرات الإضافية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">الحيوية</span>
                <div className="text-right">
                  <span className="font-bold text-lg">{data.vitality}%</span>
                  <p className="text-xs text-gray-500">المطلوب: ≥58%</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">الحجم</span>
                <div className="text-right">
                  <span className="font-bold text-lg">{data.volume} مل</span>
                  <p className="text-xs text-gray-500">المطلوب: ≥1.5 مل</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">الأس الهيدروجيني</span>
                <div className="text-right">
                  <span className="font-bold text-lg">{data.ph}</span>
                  <p className="text-xs text-gray-500">الطبيعي: 7.2-8.0</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">إجمالي الحركة</span>
                <div className="text-right">
                  <span className="font-bold text-lg">{data.motility.progressive + data.motility.non_progressive}%</span>
                  <p className="text-xs text-gray-500">المطلوب: ≥40%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ملخص التقييم الطبي */}
      <Card className="border-2 border-emerald-200 bg-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-emerald-800">التقييم الطبي الشامل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* تقييم العدد */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">تقييم العدد:</span>
              <div className="flex items-center gap-2">
                {data.sperm_count >= 39000000 ? 
                  <Badge className="bg-green-100 text-green-800">طبيعي - ممتاز</Badge> :
                  data.sperm_count >= 15000000 ?
                  <Badge className="bg-yellow-100 text-yellow-800">طبيعي - مقبول</Badge> :
                  <Badge className="bg-red-100 text-red-800">أقل من الطبيعي</Badge>
                }
              </div>
            </div>

            {/* تقييم الحركة */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">تقييم الحركة:</span>
              <div className="flex items-center gap-2">
                {data.motility.progressive >= 32 ? 
                  <Badge className="bg-green-100 text-green-800">حركة ممتازة</Badge> :
                  data.motility.progressive >= 25 ?
                  <Badge className="bg-yellow-100 text-yellow-800">حركة مقبولة</Badge> :
                  <Badge className="bg-red-100 text-red-800">حركة ضعيفة</Badge>
                }
              </div>
            </div>

            {/* تقييم التشكل */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">تقييم التشكل:</span>
              <div className="flex items-center gap-2">
                {data.morphology.normal >= 4 ? 
                  <Badge className="bg-green-100 text-green-800">تشكل طبيعي</Badge> :
                  <Badge className="bg-red-100 text-red-800">تشكل أقل من الطبيعي</Badge>
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* معلومات المعالجة */}
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
              <span className="font-medium">{data.frames_analyzed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">معدل المعالجة:</span>
              <span className="font-medium">{(data.frames_analyzed / data.processing_time).toFixed(0)} إطار/ثانية</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
