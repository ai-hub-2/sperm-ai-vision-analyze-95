
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthDialog from '@/components/AuthDialog';
import MobileHeader from '@/components/MobileHeader';
import MobileNavigation from '@/components/MobileNavigation';
import HomeTab from '@/components/HomeTab';
import AnalyzeTab from '@/components/AnalyzeTab';
import ResultsTab from '@/components/ResultsTab';
import ProfileTab from '@/components/ProfileTab';

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const { loading } = useAuth();

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
    // التبديل تلقائياً إلى تبويب النتائج عند اكتمال التحليل
    setActiveTab('results');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 animate-pulse shadow-2xl">
            <div className="w-8 h-8 bg-white rounded-full animate-bounce"></div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">SpermAI</h2>
          <p className="text-gray-400">جاري تحميل التطبيق...</p>
          <div className="mt-4 w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'analyze':
        return <AnalyzeTab onAnalysisComplete={handleAnalysisComplete} />;
      case 'results':
        return <ResultsTab analysisData={analysisData} />;
      case 'profile':
        return <ProfileTab onAuthClick={() => setIsAuthOpen(true)} />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <MobileHeader onAuthClick={() => setIsAuthOpen(true)} />
      
      <main className="flex-1 overflow-y-auto pb-24 bg-gray-900">
        <div className="min-h-full">
          {renderActiveTab()}
        </div>
      </main>

      <MobileNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        hasResults={!!analysisData}
      />

      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export default Index;
