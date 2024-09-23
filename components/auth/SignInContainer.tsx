'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const SignInContainer = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/"); // Redirect to home page after successful login
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in with Credentials</button>
      </form>

      <hr />

      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  )
}

export default SignInContainer
