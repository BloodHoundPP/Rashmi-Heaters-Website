import { Outlet } from "react-router";
import { TopBar } from "./TopBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";

export function Layout() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
