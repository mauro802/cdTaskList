"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from "@/lib/api/auth/login";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast.info("Signing in...");
      const response = await loginUser({ email, password });
      //alert("Login successful! Redirecting to your dashboard...");
      toast.success("Login successful!");
      // Store the token in localStorage or a cookie
      localStorage.setItem("token", response.access_token);

      router.push("/tasks");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      //alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Log in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={email === "" ? "Email is required" : ""}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error=""
          />
          <div className=" flex justify-center mt-6">
            <Button
              type="blueButton"
              htmlType="submit"
              label={loading ? "Signing in..." : "Sign in"}
            />
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
