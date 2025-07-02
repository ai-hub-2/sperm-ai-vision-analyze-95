import React, { useState, useCallback } from 'react';
import { Upload, Video, X, AlertCircle, CheckCircle, Loader2, Moon, Sun, Cpu, Zap, Brain, Microscope, Camera, Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import CameraCapture from './CameraCapture';

interface EnhancedVideoUploadProps {
  onAnalysisComplete: (data: any) => void;
}

const EnhancedVideoUpload: React.FC<EnhancedVideoUploadProps> = ({ onAnalysisComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [darkMode, setDarkMode] = useState(true); // الوضع الليلي افتراضي
  const [processingStage, setProcessingStage] = useState('');
  const [koyebJobId, setKoyebJobId] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [mediaType, setMediaType] = useState<'photo' | 'video' | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const processingStages = [
    '🎥 معالجة الوسائط بـ OpenCV',
    '🤖 كشف الحيوانات المنوية بـ YOLOv8',
    '🔍 تتبع الحركة بـ DeepSort',
    '🔬 تحليل CASA المتقدم',
    '🧬 تصنيف التشكل بالتعلم العميق',
    '📊 تحليل الحركة والسرعة',
    '☁️ نشر النتائج عبر Koyeb',
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
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (!isVideo && !isImage) {
      toast({
        title: "نوع ملف غير مدعوم",
        description: "يرجى اختيار ملف فيديو أو صورة صالح",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 1GB for video, 50MB for image)
    const maxSize = isVideo ? 1024 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "حجم الملف كبير جداً",
        description: `يرجى اختيار ملف أصغر من ${isVideo ? '1 جيجابايت' : '50 ميجابايت'}`,
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    setMediaType(isVideo ? 'video' : 'photo');
  };

  const handleCameraCapture = (file: File, type: 'photo' | 'video') => {
    setSelectedFile(file);
    setMediaType(type);
    setShowCamera(false);
    toast({
      title: `تم ${type === 'photo' ? 'التقاط الصورة' : 'تسجيل الفيديو'} بنجاح!`,
      description: "جاهز للتحليل بالذكاء الاصطناعي"
    });
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

      const mediaUrl = await uploadToSupabase(selectedFile);
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

      // Call edge function for real analysis with Koyeb API
      const { data: analysisData, error } = await supabase.functions.invoke('sperm-analysis', {
        body: {
          mediaUrl,
          fileName: selectedFile.name,
          originalFilename: selectedFile.name,
          userId: user.id,
          mediaType: mediaType,
          koyebApiKey: 'sbp_9dd38c9f90c6dda0e8c1fa14998427aeef15b71a' // API المطلوب
        }
      });

      clearInterval(stageInterval);

      if (error) throw error;

      setKoyebJobId(analysisData.koyeb_job_id);
      setAnalysisStatus('completed');
      onAnalysisComplete(analysisData);
      
      toast({
        title: "تم التحليل الحقيقي بنجاح! 🔬",
        description: `تم إنتاج التقرير الطبي للـ${mediaType === 'photo' ? 'صورة' : 'فيديو'} باستخدام Koyeb والذكاء الاصطناعي`,
      });

    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisStatus('error');
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل الملف. يرجى المحاولة مرة أخرى.",
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
    setMediaType(null);
  };

  const containerClass = darkMode 
    ? "bg-gray-900 text-white border-gray-700" 
    : "bg-white text-gray-900 border-gray-200";

  return (
    <>
      <div className={`w-full max-w-3xl mx-auto transition-colors duration-300`}>
        <Card className={`${containerClass} border-2`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Microscope className="w-6 h-6 text-blue-600" />
                تحليل متقدم بالذكاء الاصطناعي + Koyeb
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
              نظام متطور يستخدم YOLOv8، DeepSort، OpenCV، والنشر السحابي عبر Koyeb
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
                <span className="text-xs font-medium">Koyeb</span>
              </div>
            </div>

            {analysisStatus === 'idle' && !selectedFile && (
              <>
                {/* Camera Capture Options */}
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    onClick={() => setShowCamera(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                  >
                    <Camera className="w-5 h-5" />
                    تسجيل مباشر من الكاميرا
                  </Button>
                </div>

                <div className="text-center mb-4">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>أو</span>
                </div>

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
                    اسحب وأفلت الفيديو أو الصورة المجهرية هنا
                  </h3>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    أو اختر ملف من جهازك للتحليل بالذكاء الاصطناعي عبر Koyeb
                  </p>
                  <input
                    type="file"
                    id="media-upload"
                    accept="video/*,image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <Button asChild variant="outline" className={darkMode ? 'border-gray-600 hover:bg-gray-800' : ''}>
                    <label htmlFor="media-upload" className="cursor-pointer flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <Image className="w-4 h-4" />
                      اختر فيديو أو صورة
                    </label>
                  </Button>
                  
                  <div className="mt-4 space-y-2">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      فيديو: حتى 1 جيجابايت • صورة: حتى 50 ميجابايت
                    </p>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
                      <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'} leading-relaxed`}>
                        🚀 <strong>تحليل حقيقي متقدم مع Koyeb:</strong><br/>
                        • Computer Vision مع OpenCV لمعالجة الوسائط<br/>
                        • YOLOv8 للكشف والتعرف على الحيوانات المنوية<br/>
                        • DeepSort لتتبع الحركة عبر الإطارات<br/>
                        • CASA للتحليل الطبي المعتمد<br/>
                        • Deep Learning لتصنيف التشكل والجودة<br/>
                        • Koyeb للنشر السحابي المتقدم مع GPU
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            
            {selectedFile && analysisStatus === 'idle' && (
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    {mediaType === 'video' ? (
                      <Video className="w-8 h-8 text-blue-600" />
                    ) : (
                      <Image className="w-8 h-8 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} ميجابايت • {mediaType === 'video' ? 'فيديو' : 'صورة'} • جاهز للتحليل
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
                  🚀 بدء التحليل الحقيقي بـ Koyeb والذكاء الاصطناعي
                </Button>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                    ⚡ سيتم استخدام: YOLOv8 + DeepSort + CASA + Deep Learning + Koyeb Cloud
                  </p>
                </div>
              </div>
            )}

            {analysisStatus === 'uploading' && (
              <div className="space-y-4">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="font-medium">جاري رفع الملف إلى السحابة المتقدمة...</p>
                </div>
                <Progress value={uploadProgress} className="w-full" />
                <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {uploadProgress}% مكتمل • التحضير للتحليل بـ Koyeb
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
                    🤖 تحليل حقيقي بـ Koyeb والذكاء الاصطناعي
                  </h3>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    يتم الآن معالجة {mediaType === 'video' ? 'الفيديو' : 'الصورة'} باستخدام أحدث تقنيات Computer Vision
                  </p>
                  
                  {processingStage && (
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-gradient-to-r from-purple-50 to-blue-50'} mb-4`}>
                      <p className={`font-medium ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                        {processingStage}
                      </p>
                    </div>
                  )}

                  {koyebJobId && (
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-4`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        معرف مهمة Koyeb: {koyebJobId}
                      </p>
                    </div>
                  )}
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>التحليل الحقيقي جاري عبر Koyeb!</strong> يستخدم النظام خوارزميات متقدمة مع GPU للحصول على نتائج دقيقة طبياً.
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
                  ✅ تم التحليل بنجاح عبر Koyeb!
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  تم إنتاج التقرير الطبي الشامل للـ{mediaType === 'video' ? 'فيديو' : 'صورة'} باستخدام Koyeb والذكاء الاصطناعي
                </p>
                
                {koyebJobId && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                      🚀 <strong>معرف التحليل Koyeb:</strong> {koyebJobId}<br/>
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
                  ❌ حدث خطأ في التحليل
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  نعتذر، حدث خطأ أثناء تحليل الملف بـ Koyeb. يرجى المحاولة مرة أخرى.
                </p>
                <Button onClick={resetUpload} variant="outline">
                  🔄 محاولة أخرى
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onMediaCaptured={handleCameraCapture}
          onClose={() => setShowCamera(false)}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default EnhancedVideoUpload;
