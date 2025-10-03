import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Trash2,
  Bot,
  User,
  Loader2,
  Sparkles
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  message: string;
  timestamp: string;
  suggestions?: string[];
  actionItems?: string[];
};

type ChatBotProps = {
  projectId: string;
};

// Markdown renderer component
function MarkdownText({ text }: { text: string }) {
  const renderLine = (line: string, index: number) => {
    // Handle bold text **text**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    
    return (
      <span key={index}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let subListItems: string[] = [];
  let inNumberedList = false;
  let inBulletList = false;

  const flushLists = () => {
    if (subListItems.length > 0) {
      elements.push(
        <ul key={`sublist-${elements.length}`} className="ml-6 mt-1 space-y-1">
          {subListItems.map((item, i) => (
            <li key={i} className="text-sm">{renderLine(item.trim(), i)}</li>
          ))}
        </ul>
      );
      subListItems = [];
    }
    if (listItems.length > 0) {
      if (inNumberedList) {
        elements.push(
          <ol key={`list-${elements.length}`} className="ml-6 mt-2 mb-2 space-y-2 list-decimal">
            {listItems.map((item, i) => (
              <li key={i} className="text-sm pl-1">{renderLine(item.trim(), i)}</li>
            ))}
          </ol>
        );
      } else if (inBulletList) {
        elements.push(
          <ul key={`list-${elements.length}`} className="ml-6 mt-2 mb-2 space-y-1 list-disc">
            {listItems.map((item, i) => (
              <li key={i} className="text-sm pl-1">{renderLine(item.trim(), i)}</li>
            ))}
          </ul>
        );
      }
      listItems = [];
      inNumberedList = false;
      inBulletList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Numbered list item (e.g., "1. **Direct Answer:**")
    if (/^\d+\.\s/.test(trimmed)) {
      if (inBulletList) flushLists();
      inNumberedList = true;
      listItems.push(trimmed.replace(/^\d+\.\s/, ''));
    }
    // Nested bullet point (e.g., "- **Switch to HTTPS:**")
    else if (trimmed.startsWith('- ')) {
      if (inNumberedList && listItems.length > 0) {
        subListItems.push(trimmed.slice(2));
      } else {
        if (inNumberedList) flushLists();
        inBulletList = true;
        listItems.push(trimmed.slice(2));
      }
    }
    // Regular text
    else if (trimmed) {
      flushLists();
      elements.push(
        <p key={`text-${index}`} className="text-sm leading-relaxed mb-2">
          {renderLine(trimmed, index)}
        </p>
      );
    }
    // Empty line
    else {
      flushLists();
    }
  });

  flushLists();

  return <div className="space-y-1">{elements}</div>;
}

export default function ChatBot({ projectId }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/chat`, {
        message,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        id: data.id,
        role: data.role,
        message: data.message,
        timestamp: data.timestamp,
      }]);
    },
  });

  // Clear chat mutation
  const clearChatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/chat/cleanup`, {});
      return response.json();
    },
    onSuccess: () => {
      setMessages([]);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || sendMessageMutation.isPending) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    await sendMessageMutation.mutateAsync(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl transition-all duration-300 z-50"
          data-testid="button-open-chat"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-2 border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <p className="text-white/80 text-xs">Always here to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => clearChatMutation.mutate()}
                disabled={clearChatMutation.isPending || messages.length === 0}
                className="text-white hover:bg-white/20"
                data-testid="button-clear-chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
                data-testid="button-close-chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Bot className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Start a conversation
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ask me about deployments, environment setup, CI/CD pipelines, or any infrastructure questions!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    data-testid={`message-${msg.role}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`flex flex-col max-w-[75%] ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
                {sendMessageMutation.isPending && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={sendMessageMutation.isPending}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || sendMessageMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                data-testid="button-send-message"
              >
                {sendMessageMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
