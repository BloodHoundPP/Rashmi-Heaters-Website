import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { signOut } from "../../lib/auth";
import { Button } from "../../components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Categories", to: "/admin/categories" },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await signOut();
    navigate("/admin/login");
  }

  const NavLinks = () => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const active = location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to));
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between border-b bg-background p-4">
        <h2 className="font-semibold text-lg">Rashmi Admin</h2>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-xl mb-6">Rashmi Admin</h2>
              <NavLinks />
            </div>
            <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </Button>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r bg-muted/20 p-4 flex-col justify-between shrink-0">
        <div>
          <h2 className="font-semibold text-xl mb-6 px-2">Rashmi Admin</h2>
          <NavLinks />
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" /> Log Out
        </Button>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}