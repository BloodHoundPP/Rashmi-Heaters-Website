import { TbMessageChatbot } from "react-icons/tb";

export function WhatsAppButton() {
  const handleClick = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi, I'd like to know more about your heating solutions",
      "_blank",
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-[#C41E3A] hover:bg-[#C41E3A] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <TbMessageChatbot size={28} />
      <span className="absolute right-full mr-4 bg-card px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Talk to Expert
      </span>
    </button>
  );
}