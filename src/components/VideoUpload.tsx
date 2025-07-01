
import React, { useState, useCallback } from 'react';
import { Upload, Video, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface VideoUploadProps {
  onAnalysisComplete: (data: any) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onAnalysisComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const { toast } = useToast();

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

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "حجم الملف كبير جداً",
        description: "يرجى اختيار ملف أصغر من 100 ميجابايت",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
  };

  const startAnalysis = async () => {
    if (!selectedFile) return;

    setAnalysisStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setAnalysisStatus('processing');
          startProcessing();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startProcessing = () => {
    // Simulate AI processing
    setTimeout(() => {
      const mockResults = {
        sperm_count: 45000000,
        concentration: 15.2,
        motility: {
          progressive: 32,
          non_progressive: 18,
          immotile: 50
        },
        morphology: {
          normal: 4,
          abnormal: 96
        },
        vitality: 58,
        volume: 2.8,
        ph: 7.4,
        processing_time: 2.3,
        video_duration: 30,
        frames_analyzed: 900
      };

      setAnalysisStatus('completed');
      onAnalysisComplete(mockResults);
      
      toast({
        title: "تم التحليل بنجاح",
        description: "تم تحليل العينة وإنتاج التقرير الشامل",
      });
    }, 3000);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setAnalysisStatus('idle');
    setUploadProgress(0);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-6 h-6 text-blue-600" />
          رفع فيديو العينة
        </CardTitle>
        <CardDescription>
          قم برفع فيديو العينة المجهرية لتحليلها باستخدام الذكاء الاصطناعي
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysisStatus === 'idle' && !selectedFile && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              اسحب وأفلت الفيديو هنا
            </h3>
            <p className="text-gray-600 mb-4">
              أو اختر ملف من جهازك
            </p>
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button asChild variant="outline">
              <label htmlFor="video-upload" className="cursor-pointer">
                اختر ملف الفيديو
              </label>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              الحد الأقصى: 100 ميجابايت • الصيغ المدعومة: MP4, MOV, AVI
            </p>
          </div>
        )}

        {selectedFile && analysisStatus === 'idle' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Video className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} ميجابايت
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={resetUpload}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              onClick={startAnalysis}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="lg"
            >
              بدء التحليل
            </Button>
          </div>
        )}

        {analysisStatus === 'uploading' && (
          <div className="space-y-4">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="font-medium">جاري رفع الفيديو...</p>
            </div>
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-600 text-center">
              {uploadProgress}% مكتمل
            </p>
          </div>
        )}

        {analysisStatus === 'processing' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                جاري التحليل بالذكاء الاصطناعي
              </h3>
              <p className="text-gray-600">
                يتم تحليل الفيديو وحساب المعايير الطبية...
              </p>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                قد يستغرق التحليل من 2-5 دقائق حسب طول الفيديو وجودته
              </AlertDescription>
            </Alert>
          </div>
        )}

        {analysisStatus === 'completed' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800">
              تم التحليل بنجاح!
            </h3>
            <p className="text-gray-600">
              تم إنتاج التقرير الشامل لعينة السائل المنوي
            </p>
            <Button onClick={resetUpload} variant="outline">
              تحليل عينة جديدة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
