
import React, { useState } from 'react';
import AnalysisResults from '@/components/AnalysisResults';
import EnhancedMedicalChat from '@/components/EnhancedMedicalChat';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, FileText, Download, MessageCircle, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsTabProps {
  analysisData: any;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div className="px-4 py-6">
        <Card className="text-center py-12 border-2 border-dashed border-gray-300">
          <CardContent>
            <BarChart3 className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              لا توجد نتائج متاحة حالياً
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              قم بإجراء تحليل جديد لعرض النتائج والرسوم البيانية والمساعد الطبي الذكي
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">✨ ما ستحصل عليه بعد التحليل:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span className="text-blue-800">تقرير طبي شامل ومفصل</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span className="text-blue-800">رسوم بيانية تفاعلية</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="text-blue-800">مساعد طبي ذكي متخصص</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span className="text-blue-800">توصيات وإرشادات طبية</span>
                </div>
              </div>
            </div>
            <p className="text-blue-600 text-sm mt-4">
              💡 <strong>نصيحة:</strong> انتقل إلى تبويب "التحليل" لرفع فيديو عينة جديدة والحصول على تحليل بالذكاء الاصطناعي
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const exportToPDF = () => {
    // PDF export functionality would be implemented here
    console.log('تصدير التقرير إلى PDF');
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📊 نتائج التحليل الطبي
        </h2>
        <p className="text-gray-600">
          تقرير شامل مع مساعد طبي ذكي متخصص في طب الذكورة والإنجاب
        </p>
      </div>

      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
          <TabsTrigger value="report" className="flex items-center gap-2 text-base">
            <FileText className="w-5 h-5" />
            التقرير الطبي الشامل
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2 text-base">
            <Sparkles className="w-5 h-5" />
            المساعد الطبي الذكي
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-blue-900">تقرير التحليل المتقدم</h2>
                <p className="text-sm text-blue-700">تحليل بالذكاء الاصطناعي وفقاً لمعايير WHO 2010</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={exportToPDF}
              className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Download className="w-4 h-4" />
              تصدير PDF
            </Button>
          </div>
          
          {/* Analysis Results */}
          <AnalysisResults data={analysisData} />
          
          {/* Medical Notice */}
          <Card className="mt-6 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-6">
              <h4 className="font-bold text-orange-800 mb-3 text-lg">⚕️ إخلاء مسؤولية طبية مهم</h4>
              <div className="space-y-2 text-orange-700">
                <p>
                  <strong>هذا التحليل للأغراض التعليمية والإرشادية فقط.</strong> النتائج المعروضة هي تحليل أولي بواسطة الذكاء الاصطناعي.
                </p>
                <p>
                  يُرجى <strong>استشارة طبيب مختص في المسالك البولية</strong> أو <strong>طب الإنجاب</strong> للحصول على:
                </p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>تفسير دقيق ومهني للنتائج</li>
                  <li>تشخيص طبي معتمد</li>
                  <li>خطة علاجية مناسبة لحالتك</li>
                  <li>متابعة طبية دورية</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <div className="space-y-4">
            {/* Enhanced Chat Header */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-lg font-bold text-purple-900">المساعد الطبي الذكي المتخصص</h2>
              </div>
              <p className="text-purple-700 text-sm">
                مساعد ذكي متخصص في طب الذكورة والإنجاب، مدرب على أحدث الدراسات الطبية والمراجع العلمية
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">تفسير النتائج</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">استشارة طبية</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">توصيات علاجية</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">نصائح وقائية</span>
              </div>
            </div>
            
            {/* Enhanced Medical Chat Component */}
            <EnhancedMedicalChat analysisId={analysisData.id} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsTab;
