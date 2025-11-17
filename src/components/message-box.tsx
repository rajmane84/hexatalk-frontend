import { useEffect, useRef } from "react";

interface IMessage {
  id: number;
  from: "me" | "other";
  text: string;
}

const MessageBox = ({ messages }: { messages: IMessage[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll to top (since flex-col-reverse places last messages at the bottom visually)
    el.scrollTo({ top: 0, behavior: "smooth" });
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide flex h-[calc(100vh-64px-56px)] w-full flex-col-reverse gap-3 overflow-auto p-4"
    >
      {messages
        .slice() // copy array
        .reverse() // reverse message order for correct visual stacking
        .map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                msg.from === "me"
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-neutral-800 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageBox;
