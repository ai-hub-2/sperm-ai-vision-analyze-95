
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
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <Microscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">SpermAI</h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Settings className="w-5 h-5 text-gray-600" />
              </Button>
            </>
          ) : (
            <Button 
              onClick={onAuthClick}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
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
