"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { registerUser } from "@/lib/api/auth/register";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // Hooks
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password validation rules
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    match: password !== "" && password === confirmPassword,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const valid =
      validations.length &&
      validations.uppercase &&
      validations.lowercase &&
      validations.number &&
      validations.symbol &&
      validations.match;

    if (!valid) {
      alert("Please fix the password requirements.");
      return;
    }
    try {
      const response = await registerUser({ email, password });

      router.push("/login");
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className=" flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Create an Account
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error=""
          />

          <div className="text-sm text-gray-700 mb-2">
            Password must contain at least:
          </div>
          <ul className="mb-4 space-y-1">
            <li
              className={`flex items-center text-sm ${
                validations.length ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">{validations.length ? "✔️" : "❌"}</span>8
              characters
            </li>
            <li
              className={`flex items-center text-sm ${
                validations.uppercase ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">
                {validations.uppercase ? "✔️" : "❌"}
              </span>
              One uppercase letter
            </li>
            <li
              className={`flex items-center text-sm ${
                validations.lowercase ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">
                {validations.lowercase ? "✔️" : "❌"}
              </span>
              One lowercase letter
            </li>
            <li
              className={`flex items-center text-sm ${
                validations.number ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">{validations.number ? "✔️" : "❌"}</span>
              One number
            </li>
            <li
              className={`flex items-center text-sm ${
                validations.symbol ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="mr-2">{validations.symbol ? "✔️" : "❌"}</span>
              One symbol
            </li>
          </ul>

          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={
              !validations.match && confirmPassword !== ""
                ? "Password must match"
                : ""
            }
          />

          <div className="flex justify-center mt-6 ">
            <Button
              type="blueButton"
              htmlType="submit"
              label="Create an Account"
            />
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
