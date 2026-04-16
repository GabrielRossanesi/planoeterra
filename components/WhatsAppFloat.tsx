import { primaryWhatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={primaryWhatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f8f5f] text-white shadow-[0_18px_45px_rgba(12,74,46,.36)] transition duration-200 hover:-translate-y-1 hover:bg-[#18794f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300 md:bottom-7 md:right-7"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7">
        <path
          fill="currentColor"
          d="M16 3C8.83 3 3 8.64 3 15.59c0 2.44.73 4.8 2.12 6.83L3.7 29l6.78-1.77A13.12 13.12 0 0 0 16 28.18c7.17 0 13-5.64 13-12.59S23.17 3 16 3Zm0 22.94a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-4.02 1.05 1.08-3.9-.26-.4a10.25 10.25 0 0 1-1.6-5.34C5.24 9.89 10.05 5.24 16 5.24s10.76 4.65 10.76 10.35S21.95 25.94 16 25.94Zm5.9-7.73c-.32-.15-1.9-.91-2.2-1.02-.3-.11-.51-.15-.73.15s-.84 1.01-1.03 1.21c-.19.21-.38.23-.7.08-.32-.15-1.35-.49-2.58-1.56-.96-.83-1.6-1.86-1.79-2.17-.19-.31-.02-.47.14-.62.15-.15.32-.39.48-.58.16-.19.22-.32.33-.53.11-.21.06-.4-.02-.55-.08-.15-.73-1.72-1-2.36-.26-.62-.53-.54-.73-.55h-.62c-.21 0-.55.08-.84.38-.29.3-1.1 1.05-1.1 2.56s1.12 2.97 1.28 3.17c.16.21 2.2 3.43 5.33 4.8.75.32 1.34.52 1.8.66.76.23 1.45.2 2 .12.61-.09 1.9-.77 2.17-1.51.27-.74.27-1.38.19-1.51-.08-.12-.29-.2-.61-.36Z"
        />
      </svg>
    </a>
  );
}

