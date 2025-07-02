
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, BarChart3, Shield, Zap } from 'lucide-react';

const HomeTab: React.FC = () => {
  const features = [
    {
      icon: Microscope,
      title: "تحليل دقيق",
      description: "تقنية YOLOv8 المتطورة"
    },
    {
      icon: BarChart3,
      title: "تقارير شاملة",
      description: "تحليل العدد والحركة والسرعة"
    },
    {
      icon: Shield,
      title: "أمان طبي",
      description: "حماية البيانات وفقاً لمعايير HIPAA"
    },
    {
      icon: Zap,
      title: "معالجة سريعة",
      description: "تحليل فوري باستخدام GPU"
    }
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
          <Microscope className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          تحليل الحيوانات المنوية
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          نظام متطور لتحليل عينات السائل المنوي باستخدام تقنيات الذكاء الاصطناعي
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-100 shadow-sm">
            <CardHeader className="text-center pb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-2 mx-auto">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-sm font-semibold text-gray-900">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-xs text-gray-600">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-blue-900 mb-1">حالة النظام</h3>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-blue-700">النظام يعمل بشكل طبيعي</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeTab;
