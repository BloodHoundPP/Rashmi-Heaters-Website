import { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../lib/auth";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-6 border rounded-lg">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" className="w-full">Log In</Button>
      </form>
    </div>
  );
}