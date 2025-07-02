
import React, { useState } from 'react';
import AnalysisResults from '@/components/AnalysisResults';
import MedicalChat from '@/components/MedicalChat';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, FileText, Download, MessageCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsTabProps {
  analysisData: any;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div className="px-4 py-6">
        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              لا توجد نتائج متاحة
            </h3>
            <p className="text-gray-600 text-base mb-6">
              قم بإجراء تحليل جديد لعرض النتائج والرسوم البيانية هنا
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm">
                💡 نصيحة: انتقل إلى تبويب "التحليل" لرفع فيديو عينة جديدة
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const exportToPDF = () => {
    // هنا يمكن إضافة وظيفة تصدير PDF في المستقبل
    console.log('تصدير التقرير إلى PDF');
  };

  return (
    <div className="px-4 py-6">
      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="report" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            التقرير الطبي
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            المساعد الذكي
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report">
          {/* شريط الأدوات */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">تقرير التحليل</h2>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToPDF}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              تصدير PDF
            </Button>
          </div>
          
          {/* عرض النتائج */}
          <AnalysisResults data={analysisData} />
          
          {/* ملاحظة طبية */}
          <Card className="mt-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-orange-800 mb-2">⚕️ ملاحظة طبية مهمة</h4>
              <p className="text-orange-700 text-sm">
                هذا التحليل للأغراض التعليمية والإرشادية فقط. يُرجى استشارة طبيب مختص في المسالك البولية أو طب الإنجاب للحصول على تفسير دقيق للنتائج واتخاذ القرارات العلاجية المناسبة.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <div className="space-y-4">
            {/* رأس تبويب المحادثة */}
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">المساعد الطبي الذكي</h2>
            </div>
            
            {/* مكون المحادثة */}
            <MedicalChat analysisId={analysisData.id} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsTab;
