
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg transition-all duration-200 relative",
              activeTab === tab.id
                ? "text-blue-600 bg-blue-50 scale-105"
                : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
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
              "text-xs font-medium",
              tab.hasNotification && "text-blue-600 font-semibold"
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
