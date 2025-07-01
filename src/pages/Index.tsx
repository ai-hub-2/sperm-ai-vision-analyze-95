
import React, { useState } from 'react';
import { Microscope, Upload, BarChart3, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthDialog from '@/components/AuthDialog';
import VideoUpload from '@/components/VideoUpload';
import AnalysisResults from '@/components/AnalysisResults';
import Header from '@/components/Header';

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const features = [
    {
      icon: Microscope,
      title: "تحليل دقيق بالذكاء الاصطناعي",
      description: "تقنية YOLOv8 المتطورة لكشف وتتبع الحيوانات المنوية بدقة عالية"
    },
    {
      icon: BarChart3,
      title: "تقارير شاملة",
      description: "تحليل شامل للعدد والحركة والسرعة مع رسوم بيانية تفاعلية"
    },
    {
      icon: Shield,
      title: "أمان طبي متقدم",
      description: "حماية البيانات وفقاً لمعايير HIPAA مع تشفير شامل"
    },
    {
      icon: Zap,
      title: "معالجة سريعة",
      description: "تحليل فوري باستخدام معالجات GPU المتطورة على Koyeb"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header onAuthClick={() => setIsAuthOpen(true)} currentUser={currentUser} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8 shadow-lg">
            <Microscope className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            تحليل الحيوانات المنوية
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              بالذكاء الاصطناعي
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            نظام متطور لتحليل عينات السائل المنوي باستخدام تقنيات الذكاء الاصطناعي المتقدمة
            مع تقارير دقيقة وشاملة للأطباء والمختبرات الطبية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsAuthOpen(true)}
            >
              <Upload className="w-5 h-5 mr-2" />
              ابدأ التحليل الآن
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-medium transition-all duration-300"
            >
              <Users className="w-5 h-5 mr-2" />
              عرض النتائج السابقة
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              مميزات النظام المتطورة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              تقنيات حديثة ومتطورة لضمان أعلى مستويات الدقة والأمان في التحليل الطبي
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      {currentUser && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <VideoUpload onAnalysisComplete={setAnalysisData} />
              {analysisData && <AnalysisResults data={analysisData} />}
            </div>
          </div>
        </section>
      )}

      {/* Technical Specs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            مدعوم بتقنيات متطورة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">خوادم GPU متطورة</h3>
              <p className="text-gray-300">معالجة فائقة السرعة على منصة Koyeb مع دعم NVIDIA T4</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">قاعدة بيانات آمنة</h3>
              <p className="text-gray-300">تخزين البيانات على Supabase مع حماية متقدمة وتشفير شامل</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">واجهة متجاوبة</h3>
              <p className="text-gray-300">تطبيق يعمل على جميع الأجهزة مع دعم PWA للجوال</p>
            </div>
          </div>
        </div>
      </section>

      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={setCurrentUser}
      />
    </div>
  );
};

export default Index;
