import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function Ai() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Learn Ai tutor." },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "auto" });
  }, [messages]);

  // Replace the content of the last (assistant) message
  const setLastMessage = (updater) => {
    setMessages((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];
      copy[copy.length - 1] = { ...last, content: updater(last.content) };
      return copy;
    });
  };

  const handleSend = async () => {
    const text = input.trim();

    if (!text || isStreaming) return;

    // Add the user's message + an empty assistant bubble (shows the typing dots)
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ]);

    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ask-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: text,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get AI response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;

      while (!finished) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop(); // keep any incomplete piece for the next read

        for (const event of events) {
          if (!event.startsWith("data: ")) continue;
          const data = event.slice(6);

          if (data === "[DONE]") {
            finished = true;
            break;
          }

          const parsed = JSON.parse(data);
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.text) setLastMessage((prev) => prev + parsed.text);
        }
      }
    } catch (error) {
      console.error("AI request failed:", error);
      setLastMessage(() => "Sorry, something went wrong. Please try again.");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Intro write-up */}
      <div className="px-6 md:px-16 lg:px-24 pt-8 pb-4">
        <h1 className="text-black font-bold text-2xl mb-2">
          Hello, Ai smart assistant.
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Chat with an AI tutor for explanations and quick help.
        </p>
      </div>

      {/* Chat box */}
      <div className="px-6 md:px-16 lg:px-24 pb-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[560px]">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              AI
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Learn AI tutor</p>
              <p className="text-xs text-gray-400">{isStreaming ? "Typing…" : "Online"}</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                    m.role === "user"
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {m.content ? (
                    m.role === "assistant" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      m.content
                    )
                  ) : (
                    <span className="inline-flex gap-1 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input row */}
          <div className="flex items-end gap-2 border-t border-gray-100 px-4 py-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask your AI tutor a question..."
              className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-28"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}