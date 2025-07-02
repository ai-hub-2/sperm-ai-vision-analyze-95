
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 animate-pulse">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">جاري تحميل التطبيق...</p>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'analyze':
        return <AnalyzeTab onAnalysisComplete={setAnalysisData} />;
      case 'results':
        return <ResultsTab analysisData={analysisData} />;
      case 'profile':
        return <ProfileTab onAuthClick={() => setIsAuthOpen(true)} />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader onAuthClick={() => setIsAuthOpen(true)} />
      
      <main className="flex-1 overflow-y-auto pb-20">
        {renderActiveTab()}
      </main>

      <MobileNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export default Index;
