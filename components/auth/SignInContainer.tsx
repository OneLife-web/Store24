"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const SignInContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const callback = searchParams?.get("callbackUrl");
    if (callback) {
      setCallbackUrl(callback);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result) {
        setError("Something went wrong.");
      } else if (result.error) {
        setError(result.error);
      } else {
        toast.success("Login successful. Redirecting...");
        router.push(callbackUrl || "/");
      }
    } catch (error) {
      toast.error("Sorry, an error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: callbackUrl || "/", // Properly pass the callback URL for Google sign-in
    });
  };

  return (
    <section className="bg-white rounded-xl pb-7 lg:pb-5 w-full min-w-[90vw] lg:min-w-[550px] px-5">
      <div className="flex items-center justify-center">
        <Link href="/" className="w-fit">
          <Image src="/logo2.png" width={130} height={130} alt="logo" />
        </Link>
      </div>
      <h1 className="heading1">Welcome Back</h1>
      <p className="opacity-70 max-sm:text-sm font-medium">
        Sign in to your account
      </p>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        {error && (
          <p className="text-red-500 text-xs md:text-sm text-center py-2">
            {error}
          </p>
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 h-[60px]"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 h-[60px]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-secondaryBg flex items-center justify-center rounded-lg h-[60px] font-semibold"
        >
          {loading ? <Loader2 className="animate-spin" /> : " Sign in"}
        </button>
      </form>
      <div className="relative w-full h-[2px] my-7 bg-gray-100">
        <p className="absolute bg-white px-3 text-sm font-medium text-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Or Continue With
        </p>
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="flex gap-2 items-center font-medium justify-center w-full h-[60px] border rounded-lg"
      >
        <Image src="/google.svg" width={20} height={20} alt="logo" />
        Sign in with Google
      </button>
      <p className="text-sm text-center font-medium py-3">
        Don&apos;t have an account yet?{" "}
        <Link
          href={
            callbackUrl ? `/sign-up?callbackUrl=${callbackUrl}` : "/sign-up"
          }
          className="w-fit border-b border-black hover:text-secondaryBg"
        >
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default SignInContainer;
