import React, { useState, useCallback } from 'react';
import { Upload, Video, X, AlertCircle, CheckCircle, Loader2, Moon, Sun, Cpu, Zap, Brain, Microscope } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface RealVideoUploadProps {
  onAnalysisComplete: (data: any) => void;
}

const RealVideoUpload: React.FC<RealVideoUploadProps> = ({ onAnalysisComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [darkMode, setDarkMode] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [koyebJobId, setKoyebJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const processingStages = [
    '🎥 معالجة الفيديو بـ OpenCV',
    '🤖 كشف الحيوانات المنوية بـ YOLOv8',
    '🔍 تتبع الحركة بـ DeepSort',
    '🔬 تحليل CASA المتقدم',
    '🧬 تصنيف التشكل بالتعلم العميق',
    '📊 تحليل الحركة والسرعة',
    '📋 إنتاج التقرير الطبي'
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "نوع ملف غير مدعوم",
        description: "يرجى اختيار ملف فيديو صالح (.mp4, .mov, .avi)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 1GB for real analysis)
    if (file.size > 1024 * 1024 * 1024) {
      toast({
        title: "حجم الملف كبير جداً",
        description: "يرجى اختيار ملف أصغر من 1 جيجابايت",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
  };

  const uploadToSupabase = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    const fileName = `${user.id}/${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('sperm-videos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('sperm-videos')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const startRealAnalysis = async () => {
    if (!selectedFile || !user) return;

    setAnalysisStatus('uploading');
    setUploadProgress(0);

    try {
      // Upload to Supabase Storage
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(uploadInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const videoUrl = await uploadToSupabase(selectedFile);
      setUploadProgress(100);
      clearInterval(uploadInterval);

      // Start real AI analysis with processing stages
      setAnalysisStatus('processing');
      
      // Simulate processing stages
      let stageIndex = 0;
      const stageInterval = setInterval(() => {
        if (stageIndex < processingStages.length) {
          setProcessingStage(processingStages[stageIndex]);
          stageIndex++;
        } else {
          clearInterval(stageInterval);
        }
      }, 2000);

      // Call edge function for real analysis
      const { data: analysisData, error } = await supabase.functions.invoke('sperm-analysis', {
        body: {
          videoUrl,
          fileName: selectedFile.name,
          originalFilename: selectedFile.name,
          userId: user.id
        }
      });

      clearInterval(stageInterval);

      if (error) throw error;

      setKoyebJobId(analysisData.koyeb_job_id);
      setAnalysisStatus('completed');
      onAnalysisComplete(analysisData);
      
      toast({
        title: "تم التحليل الحقيقي بنجاح! 🔬",
        description: `تم إنتاج التقرير الطبي باستخدام الذكاء الاصطناعي المتقدم`,
      });

    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisStatus('error');
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل الفيديو. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setAnalysisStatus('idle');
    setUploadProgress(0);
    setProcessingStage('');
    setKoyebJobId(null);
  };

  const containerClass = darkMode 
    ? "bg-gray-900 text-white" 
    : "bg-white text-gray-900";

  return (
    <div className={`w-full max-w-3xl mx-auto transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Card className={`${containerClass} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Microscope className="w-6 h-6 text-blue-600" />
              تحليل الحيوانات المنوية بالذكاء الاصطناعي الحقيقي
            </CardTitle>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-gray-600"
              />
              <Moon className="w-4 h-4" />
            </div>
          </div>
          <CardDescription className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            نظام متقدم يستخدم YOLOv8، DeepSort، OpenCV، والتعلم العميق للتحليل الطبي الدقيق
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* AI Technology Showcase */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
            <div className="flex flex-col items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="text-xs font-medium">YOLOv8</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="w-8 h-8 text-green-600" />
              <span className="text-xs font-medium">DeepSort</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Cpu className="w-8 h-8 text-purple-600" />
              <span className="text-xs font-medium">OpenCV</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Microscope className="w-8 h-8 text-red-600" />
              <span className="text-xs font-medium">CASA</span>
            </div>
          </div>

          {analysisStatus === 'idle' && !selectedFile && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : `${darkMode ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-800' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <h3 className="text-lg font-semibold mb-2">
                اسحب وأفلت الفيديو المجهري هنا
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                أو اختر ملف من جهازك للتحليل بالذكاء الاصطناعي
              </p>
              <input
                type="file"
                id="video-upload"
                accept="video/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button asChild variant="outline" className={darkMode ? 'border-gray-600 hover:bg-gray-800' : ''}>
                <label htmlFor="video-upload" className="cursor-pointer">
                  اختر ملف الفيديو المجهري
                </label>
              </Button>
              <div className="mt-4 space-y-2">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  الحد الأقصى: 1 جيجابايت • الصيغ المدعومة: MP4, MOV, AVI
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'} leading-relaxed`}>
                    🚀 <strong>تحليل حقيقي متقدم:</strong><br/>
                    • Computer Vision مع OpenCV لمعالجة الفيديو<br/>
                    • YOLOv8 للكشف والتعرف على الحيوانات المنوية<br/>
                    • DeepSort لتتبع الحركة عبر الإطارات<br/>
                    • CASA للتحليل الطبي المعتمد<br/>
                    • Deep Learning لتصنيف التشكل والجودة<br/>
                    • Koyeb للنشر السحابي المتقدم
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedFile && analysisStatus === 'idle' && (
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <Video className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} ميجابايت • جاهز للتحليل الحقيقي
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetUpload}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                onClick={startRealAnalysis}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                size="lg"
              >
                🚀 بدء التحليل الحقيقي بالذكاء الاصطناعي المتقدم
              </Button>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <p className={`text-xs ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                  ⚡ سيتم استخدام خوارزميات متقدمة: YOLOv8 + DeepSort + CASA + Deep Learning
                </p>
              </div>
            </div>
          )}

          {analysisStatus === 'uploading' && (
            <div className="space-y-4">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="font-medium">جاري رفع الفيديو إلى السحابة المتقدمة...</p>
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {uploadProgress}% مكتمل • التحضير للتحليل بالذكاء الاصطناعي
              </p>
            </div>
          )}

          {analysisStatus === 'processing' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 animate-pulse text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  🤖 تحليل حقيقي بالذكاء الاصطناعي المتقدم
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  يتم الآن تحليل الفيديو باستخدام أحدث تقنيات Computer Vision والتعلم العميق
                </p>
                
                {/* Real-time Processing Stage */}
                {processingStage && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-gradient-to-r from-purple-50 to-blue-50'} mb-4`}>
                    <p className={`font-medium ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                      {processingStage}
                    </p>
                  </div>
                )}

                {/* Koyeb Job ID */}
                {koyebJobId && (
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-4`}>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      معرف المهمة: {koyebJobId}
                    </p>
                  </div>
                )}

                {/* AI Processing Pipeline */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">معالجة الفيديو بـ OpenCV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-600" />
                    <span className="text-sm">كشف الحيوانات المنوية بـ YOLOv8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">تتبع الحركة بـ DeepSort</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-red-600" />
                    <span className="text-sm">تحليل CASA المتقدم</span>
                  </div>
                </div>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>التحليل الحقيقي جاري الآن!</strong> يستخدم النظام خوارزميات متقدمة للحصول على نتائج دقيقة طبياً. 
                  قد يستغرق 10-20 دقيقة حسب طول الفيديو ودقته.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {analysisStatus === 'completed' && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">
                ✅ تم التحليل الحقيقي بنجاح!
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                تم إنتاج التقرير الطبي الشامل باستخدام أحدث تقنيات الذكاء الاصطناعي والتعلم العميق
              </p>
              
              {koyebJobId && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                    🚀 <strong>معرف التحليل:</strong> {koyebJobId}<br/>
                    📊 <strong>تم إنتاج:</strong> تحليل دقيق • تقييم الحركة • قياس التشكل • تقرير طبي متكامل
                  </p>
                </div>
              )}
              
              <Button onClick={resetUpload} variant="outline" className="mt-4">
                🔄 تحليل عينة جديدة
              </Button>
            </div>
          )}

          {analysisStatus === 'error' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-800">
                ❌ حدث خطأ في التحليل الحقيقي
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                نعتذر، حدث خطأ أثناء تحليل الفيديو بالذكاء الاصطناعي. يرجى التأكد من جودة الفيديو والمحاولة مرة أخرى.
              </p>
              <Button onClick={resetUpload} variant="outline">
                🔄 محاولة أخرى
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealVideoUpload;
