import { Outlet } from "react-router";
import { TopBar } from "./TopBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ExpoPopup } from "./ExpoPopup";

export function Layout() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <ExpoPopup />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
