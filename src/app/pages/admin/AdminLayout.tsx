import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { signOut } from "../../lib/auth";
import { Button } from "../../components/ui/button";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Categories", to: "/admin/categories" },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 border-r bg-muted/30 p-4 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-6 px-2">Rashmi Admin</h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>Log Out</Button>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}