
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface MedicalChatProps {
  analysisId: string;
}

const MedicalChat: React.FC<MedicalChatProps> = ({ analysisId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "ما معنى هذه النتائج؟",
    "هل النتائج طبيعية؟",
    "ما هي الحركة التقدمية؟",
    "كيف يمكن تحسين جودة الحيوانات المنوية؟",
    "ما هي العوامل التي تؤثر على الخصوبة؟",
    "متى يجب مراجعة الطبيب؟"
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
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'عذرًا، حدث خطأ في الاتصال. الرجاء المحاولة مرة أخرى.',
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-right">
          <Sparkles className="w-5 h-5 text-purple-600" />
          اسأل الذكاء الاصطناعي عن نتائجك
        </CardTitle>
        <p className="text-sm text-muted-foreground text-right">
          احصل على تفسير مبسط لنتائج تحليلك من المساعد الطبي الذكي
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* نافذة المحادثة */}
        <Card className="h-96">
          <ScrollArea className="h-full p-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <Bot className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">مرحباً! كيف يمكنني مساعدتك؟</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    يمكنني مساعدتك في فهم نتائج تحليل الحيوانات المنوية الخاص بك
                  </p>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-sm">أسئلة مقترحة:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {suggestedQuestions.map((question, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 px-3"
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
                        : 'bg-green-600 text-white'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`flex flex-col max-w-[80%] ${
                      message.sender === 'user' ? 'items-end' : 'items-start'
                    }`}>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 px-1">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
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

        {/* حقل الإدخال */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب سؤالك هنا..."
            disabled={isLoading}
            className="text-right"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* تنبيه طبي */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs text-orange-800 text-center">
            ⚕️ هذا المساعد يقدم معلومات عامة فقط وليس تشخيصًا طبيًا. 
            استشر طبيبك المختص للحصول على تشخيص دقيق وخطة علاج مناسبة.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalChat;
