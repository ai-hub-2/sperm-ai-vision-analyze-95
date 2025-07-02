
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User, Sparkles, History, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface EnhancedMedicalChatProps {
  analysisId: string;
}

const EnhancedMedicalChat: React.FC<EnhancedMedicalChatProps> = ({ analysisId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (analysisId && user) {
      loadChatHistory();
    }
  }, [analysisId, user]);

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('analysis_id', analysisId)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const loadedMessages: Message[] = [];
      data?.forEach((chat) => {
        loadedMessages.push({
          id: `user-${chat.id}`,
          text: chat.user_message,
          sender: 'user',
          timestamp: new Date(chat.created_at).toLocaleTimeString('ar-SA')
        });
        loadedMessages.push({
          id: `ai-${chat.id}`,
          text: chat.ai_response,
          sender: 'ai',
          timestamp: new Date(chat.created_at).toLocaleTimeString('ar-SA')
        });
      });

      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const clearChatHistory = async () => {
    try {
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('analysis_id', analysisId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setMessages([]);
      toast({
        title: "تم حذف المحادثة",
        description: "تم مسح سجل المحادثة بنجاح",
      });
    } catch (error) {
      console.error('Error clearing chat:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المحادثة",
        variant: "destructive"
      });
    }
  };

  const suggestedQuestions = [
    "ما معنى هذه النتائج الطبية؟",
    "هل النتائج طبيعية أم تحتاج تدخل؟",
    "ما هي الحركة التقدمية وأهميتها؟",
    "كيف يمكن تحسين جودة الحيوانات المنوية؟",
    "ما العوامل المؤثرة على الخصوبة؟",
    "متى يجب مراجعة طبيب الذكورة؟",
    "ما تأثير النظام الغذائي على الخصوبة؟",
    "هل التدخين يؤثر على النتائج؟"
  ];

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim() || isLoading || !user) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('ar-SA')
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Call medical chat edge function
      const { data, error } = await supabase.functions.invoke('medical-chat', {
        body: {
          message: textToSend,
          analysisId: analysisId,
          userId: user.id
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('ar-SA')
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Save to database
      await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          analysis_id: analysisId,
          user_message: textToSend,
          ai_response: data.response
        });

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'عذرًا، حدث خطأ في الاتصال. الرجاء المحاولة مرة أخرى لاحقاً.',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('ar-SA')
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loadingHistory) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <History className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-pulse" />
            <p className="text-gray-600">جاري تحميل سجل المحادثة...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-right">
            <Sparkles className="w-5 h-5 text-purple-600" />
            المساعد الطبي الذكي المتخصص
          </CardTitle>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChatHistory}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              مسح المحادثة
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground text-right">
          احصل على تفسير طبي مفصل لنتائج تحليلك من المساعد المتخصص في طب الذكورة والإنجاب
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Chat Window */}
        <Card className="h-96">
          <ScrollArea className="h-full p-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <Bot className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    مرحباً! أنا مساعدك الطبي المتخصص 👨‍⚕️
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    يمكنني مساعدتك في فهم وتفسير نتائج تحليل الحيوانات المنوية بشكل طبي دقيق
                  </p>
                  
                  <div className="space-y-3">
                    <p className="font-medium text-sm">أسئلة طبية مقترحة:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {suggestedQuestions.map((question, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 px-3 hover:bg-blue-50"
                          onClick={() => sendMessage(question)}
                          disabled={isLoading}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`flex flex-col max-w-[80%] ${
                      message.sender === 'user' ? 'items-end' : 'items-start'
                    }`}>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 border'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 px-1">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 border">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Input Field */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب سؤالك الطبي هنا..."
            disabled={isLoading}
            className="text-right"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs text-orange-800 text-center leading-relaxed">
            ⚕️ <strong>تنبيه طبي مهم:</strong> هذا المساعد يقدم معلومات طبية عامة وتفسيرات أولية فقط. 
            لا يُعتبر بديلاً عن الاستشارة الطبية المباشرة. يُرجى مراجعة طبيب مختص في المسالك البولية أو طب الإنجاب للحصول على تشخيص دقيق وخطة علاج مناسبة.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMedicalChat;
