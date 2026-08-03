import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minus, Loader2 } from "lucide-react";
import { chatWithAI, Message } from "../lib/aiClient";

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1.5" />;

        // Check if bullet item (*, -, •, or 1., 2., etc.)
        const bulletMatch = trimmed.match(/^([*-•]|\d+\.)\s+(.*)/);

        const contentStr = bulletMatch ? bulletMatch[2] : trimmed;

        // Parse **bold** parts
        const parts = contentStr.split(/(\*\*[^*]+\*\*)/g);
        const renderedParts = parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-bold text-gray-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (bulletMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-1">
              <span className="text-primary text-xs shrink-0 mt-0.5 font-bold">✦</span>
              <span className="flex-1">{renderedParts}</span>
            </div>
          );
        }

        return <p key={idx}>{renderedParts}</p>;
      })}
    </div>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hi! I'm the Rashmi Heaters AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await chatWithAI(messages, userMessage.content);

      let cleanResponse = responseText;
      let leadData: any = null;

      // Robust JSON block extraction (matches ```json ... ```, ``` ... ``` or raw JSON)
      const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
      const match = responseText.match(jsonRegex);

      let jsonString = match ? match[1] : null;
      if (!jsonString) {
        const rawMatch = responseText.match(/\{[\s\S]*?"TYPE"\s*:\s*"NEW_LEAD"[\s\S]*?\}/);
        if (rawMatch) jsonString = rawMatch[0];
      }

      if (jsonString) {
        try {
          const parsed = JSON.parse(jsonString.trim());
          if (parsed.TYPE === "NEW_LEAD" || parsed.name || parsed.phone) {
            leadData = parsed;
            cleanResponse = match
              ? responseText.replace(jsonRegex, "").trim()
              : responseText.replace(jsonString, "").trim();
          }
        } catch (e) {
          console.error("Failed to parse lead JSON from AI response:", e);
        }
      }

      setMessages((prev) => [...prev, { role: "model", content: cleanResponse }]);

      if (leadData) {
        handleNewLead(leadData);
      }

    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewLead = async (leadData: any) => {
    console.log("🔔 New Lead Collected!", leadData);
    
    // 1. Save to Google Sheets (text/plain + redirect: 'follow' is essential for Google Apps Script 302 redirects)
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
    if (sheetUrl && !sheetUrl.includes("your_script_url")) {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(leadData)
        });
        console.log("✅ Lead successfully sent to Google Sheets!");
      } catch (e) {
        console.warn("Google Sheet save notice:", e);
      }
    }

    // 2. Optional Supabase Backup (only if table exists)
    try {
      const { supabase } = await import("../lib/supabaseClient");
      const { error } = await supabase.from("leads").insert([{
        name: leadData.name || "",
        email: leadData.email || "",
        phone: leadData.phone || "",
        company: leadData.company || "",
        requirement: leadData.requirement || ""
      }]);
      if (error) {
        console.log("Supabase notice (create 'leads' table in Supabase if you want db backup):", error.message);
      } else {
        console.log("✅ Lead backed up to Supabase.");
      }
    } catch (e) {
      // ignore
    }

    // 3. WhatsApp Notification (via CallMeBot API - if configured)
    const callMeBotPhone = import.meta.env.VITE_CALLMEBOT_PHONE;
    const callMeBotKey = import.meta.env.VITE_CALLMEBOT_API_KEY;
    if (callMeBotPhone && callMeBotKey && callMeBotKey !== "your_callmebot_key") {
      const msg = `🚨 *New Chatbot Lead* 🚨\nName: ${leadData.name}\nCompany: ${leadData.company}\nPhone: ${leadData.phone}\nRequirement: ${leadData.requirement}`;
      const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${callMeBotPhone}&text=${encodeURIComponent(msg)}&apikey=${callMeBotKey}`;
      try {
        await fetch(waUrl, { mode: "no-cors" });
      } catch (e) {
        console.warn("WhatsApp notification notice:", e);
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
          aria-label="Open Chat"
        >
          <MessageCircle size={28} />
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
            Chat with us
            {/* Triangle pointing right */}
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[5px] border-l-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Rashmi Heaters Support</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-white/80 font-medium">AI Assistant Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-md transition-colors text-white/90">
                <Minus size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                    }`}
                >
                  <FormattedMessage content={msg.content} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                  <Loader2 className="animate-spin text-primary/60" size={16} />
                  <span className="text-xs text-gray-500 font-medium">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="relative flex items-end gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about our heaters..."
                className="w-full max-h-32 min-h-[44px] bg-transparent text-sm resize-none outline-none py-3 px-3 text-gray-700 placeholder:text-gray-400"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-colors shrink-0 mb-0.5"
              >
                <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">Powered by AI • Answers may not be 100% accurate</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
