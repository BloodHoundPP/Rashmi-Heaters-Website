import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { supabase } from "../../lib/supabaseClient";

export function ProtectedRoute() {
  const [status, setStatus] = useState<"loading" | "authed" | "guest">("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "authed" : "guest");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authed" : "guest");
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (status === "loading") return null; // or a spinner
  if (status === "guest") return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}