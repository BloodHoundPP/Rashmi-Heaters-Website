import { Outlet } from "react-router";
import { TopBar } from "./TopBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ExpoPopup } from "./ExpoPopup";
import { Chatbot } from "./Chatbot";

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
      <Chatbot />
    </div>
  );
}
