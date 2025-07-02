
import React from 'react';
import VideoUpload from '@/components/VideoUpload';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface AnalyzeTabProps {
  onAnalysisComplete: (data: any) => void;
}

const AnalyzeTab: React.FC<AnalyzeTabProps> = ({ onAnalysisComplete }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="px-4 py-6">
        <Card className="text-center py-8">
          <CardContent>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              يتطلب تسجيل الدخول
            </h3>
            <p className="text-gray-600 text-sm">
              يرجى تسجيل الدخول للوصول إلى ميزة التحليل
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <VideoUpload onAnalysisComplete={onAnalysisComplete} />
    </div>
  );
};

export default AnalyzeTab;
