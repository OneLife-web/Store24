"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const SignInContainer = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      if (result?.error) {
        toast({
          title: result.error,
        });
      } else {
        toast({
          title: "Login Successful. Redirecting...",
        });
        router.push("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      toast({
        title: "Sorry an error occured",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <section className="bg-white rounded-xl pb-7 w-full min-w-[90vw] lg:min-w-[500px] px-5">
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
    </section>
  );
};

export default SignInContainer;
