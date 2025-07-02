
import React from 'react';
import { Home, Upload, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'analyze', label: 'التحليل', icon: Upload },
    { id: 'results', label: 'النتائج', icon: BarChart3 },
    { id: 'profile', label: 'الملف الشخصي', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg transition-colors duration-200",
              activeTab === tab.id
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            )}
          >
            <tab.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
