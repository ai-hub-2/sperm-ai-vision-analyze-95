
import React from 'react';
import AnalysisResults from '@/components/AnalysisResults';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface ResultsTabProps {
  analysisData: any;
}

const ResultsTab: React.FC<ResultsTabProps> = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div className="px-4 py-6">
        <Card className="text-center py-8">
          <CardContent>
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              لا توجد نتائج متاحة
            </h3>
            <p className="text-gray-600 text-sm">
              قم بإجراء تحليل جديد لعرض النتائج هنا
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <AnalysisResults data={analysisData} />
    </div>
  );
};

export default ResultsTab;
