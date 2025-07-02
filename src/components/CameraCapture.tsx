
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Video, Square, Circle, RotateCcw, Flashlight, FlashlightOff, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CameraCaptureProps {
  onMediaCaptured: (file: File, type: 'photo' | 'video') => void;
  onClose: () => void;
  darkMode: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onMediaCaptured, onClose, darkMode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [captureMode, setCaptureMode] = useState<'photo' | 'video'>('photo');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: captureMode === 'video'
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true);
        };
      }
    } catch (error) {
      console.error('خطأ في تشغيل الكاميرا:', error);
      toast({
        title: "خطأ في الكاميرا",
        description: "تعذر الوصول إلى الكاميرا. يرجى التأكد من الصلاحيات.",
        variant: "destructive"
      });
    }
  }, [facingMode, captureMode, toast]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
  }, []);

  const toggleFlash = useCallback(() => {
    // Flash functionality is not supported in web browsers
    // This is just a UI toggle for now
    setFlashEnabled(!flashEnabled);
    toast({
      title: "معلومة",
      description: "وظيفة الفلاش غير متاحة في المتصفحات الحالية",
      variant: "default"
    });
  }, [flashEnabled, toast]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !cameraReady) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    if (context) {
      context.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `sperm-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
          onMediaCaptured(file, 'photo');
          toast({
            title: "تم التقاط الصورة بنجاح! 📸",
            description: "جاهزة للتحليل بالذكاء الاصطناعي"
          });
        }
      }, 'image/jpeg', 0.95);
    }
  }, [cameraReady, onMediaCaptured, toast]);

  const startRecording = useCallback(() => {
    if (!streamRef.current || !cameraReady) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const file = new File([blob], `sperm-video-${Date.now()}.webm`, { type: 'video/webm' });
      onMediaCaptured(file, 'video');
      toast({
        title: "تم تسجيل الفيديو بنجاح! 🎥",
        description: "جاهز للتحليل بالذكاء الاصطناعي المتقدم"
      });
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(100);
    setIsRecording(true);
    setRecordingTime(0);
  }, [cameraReady, onMediaCaptured, toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const containerClass = darkMode 
    ? "bg-gray-900 text-white border-gray-700" 
    : "bg-white text-gray-900 border-gray-200";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
      <Card className={`w-full max-w-2xl ${containerClass}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-blue-600" />
              تسجيل مباشر من الكاميرا
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Camera Preview */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                <Circle className="w-3 h-3 fill-current animate-pulse" />
                <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
              </div>
            )}

            {/* Camera Status */}
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="text-center text-white">
                  <Camera className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                  <p>جاري تشغيل الكاميرا...</p>
                </div>
              </div>
            )}
          </div>

          {/* Mode Selector */}
          <div className="flex justify-center gap-2">
            <Button
              variant={captureMode === 'photo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCaptureMode('photo')}
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              صورة
            </Button>
            <Button
              variant={captureMode === 'video' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCaptureMode('video')}
              className="flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              فيديو
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {/* Flash Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFlash}
              disabled={!cameraReady}
            >
              {flashEnabled ? <Flashlight className="w-4 h-4" /> : <FlashlightOff className="w-4 h-4" />}
            </Button>

            {/* Main Capture Button */}
            <div className="relative">
              {captureMode === 'photo' ? (
                <Button
                  size="lg"
                  onClick={capturePhoto}
                  disabled={!cameraReady}
                  className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Circle className="w-8 h-8" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={!cameraReady}
                  className={`w-16 h-16 rounded-full ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isRecording ? <Square className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                </Button>
              )}
            </div>

            {/* Camera Switch */}
            <Button
              variant="outline"
              size="sm"
              onClick={switchCamera}
              disabled={!cameraReady}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Status Information */}
          <div className="flex justify-center gap-2">
            <Badge variant={cameraReady ? "default" : "secondary"}>
              {cameraReady ? "كاميرا جاهزة" : "جاري التحضير"}
            </Badge>
            <Badge variant="outline">
              {facingMode === 'environment' ? "كاميرا خلفية" : "كاميرا أمامية"}
            </Badge>
          </div>

          {/* Instructions */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              💡 <strong>نصائح للحصول على أفضل النتائج:</strong><br/>
              • استخدم إضاءة جيدة ومستقرة<br/>
              • اقترب من العينة للحصول على تفاصيل واضحة<br/>
              • تأكد من ثبات الجهاز أثناء التسجيل<br/>
              • للفيديو: سجل لمدة 10-30 ثانية للحصول على تحليل دقيق
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraCapture;
