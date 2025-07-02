
import React from 'react';
import { Microscope, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface MobileHeaderProps {
  onAuthClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onAuthClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-gray-900 border-b border-gray-700 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Microscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SpermAI</h1>
            <p className="text-xs text-blue-400">تحليل ذكي متقدم</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="p-2 text-gray-300 hover:text-white hover:bg-gray-800">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-gray-300 hover:text-white hover:bg-gray-800">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.email?.[0]?.toUpperCase()}</span>
              </div>
            </>
          ) : (
            <Button 
              onClick={onAuthClick}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-lg"
            >
              دخول
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
