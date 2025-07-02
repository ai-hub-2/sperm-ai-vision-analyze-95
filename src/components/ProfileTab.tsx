
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ProfileTabProps {
  onAuthClick: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onAuthClick }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return (
      <div className="px-4 py-6">
        <Card className="text-center py-8">
          <CardContent>
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              مرحباً بك
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              سجل دخولك للوصول إلى ملفك الشخصي
            </p>
            <Button onClick={onAuthClick} className="bg-blue-600 hover:bg-blue-700">
              تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-4">
      {/* User Info */}
      <Card>
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-lg">
            {user.user_metadata?.full_name || 'المستخدم'}
          </CardTitle>
          <p className="text-sm text-gray-600">{user.email}</p>
        </CardHeader>
      </Card>

      {/* Menu Options */}
      <div className="space-y-2">
        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
          <CardContent className="flex items-center p-4">
            <Settings className="w-5 h-5 text-gray-600 mr-3" />
            <span className="font-medium">الإعدادات</span>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
          <CardContent className="flex items-center p-4">
            <FileText className="w-5 h-5 text-gray-600 mr-3" />
            <span className="font-medium">التاريخ الطبي</span>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-red-50 transition-colors"
          onClick={handleSignOut}
        >
          <CardContent className="flex items-center p-4">
            <LogOut className="w-5 h-5 text-red-600 mr-3" />
            <span className="font-medium text-red-600">تسجيل الخروج</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
