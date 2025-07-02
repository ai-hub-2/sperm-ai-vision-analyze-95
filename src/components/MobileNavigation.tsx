
import React from 'react';
import { Home, Upload, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasResults?: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  hasResults = false 
}) => {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'analyze', label: 'التحليل', icon: Upload },
    { 
      id: 'results', 
      label: 'النتائج', 
      icon: BarChart3,
      hasNotification: hasResults && activeTab !== 'results'
    },
    { id: 'profile', label: 'الملف الشخصي', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-2 py-2 z-50 shadow-2xl mobile-safe-area">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center p-3 rounded-xl transition-all duration-300 relative min-w-[70px]",
              activeTab === tab.id
                ? "text-blue-400 bg-blue-900/30 scale-110 shadow-lg border border-blue-600/30"
                : "text-gray-400 hover:text-blue-400 hover:bg-gray-800/50"
            )}
          >
            <div className="relative">
              <tab.icon className="w-6 h-6 mb-1" />
              {tab.hasNotification && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
            <span className={cn(
              "text-xs font-medium text-center",
              tab.hasNotification && "text-blue-400 font-semibold",
              activeTab === tab.id && "text-blue-300"
            )}>
              {tab.label}
              {tab.hasNotification && " 🎉"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
