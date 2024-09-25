import SignUpContainer from "@/components/auth/SignUpContainer";
import { Suspense } from "react";

export default function SignUp() {
  return (
    <main className="lg: py-10">
      <Suspense>
        <SignUpContainer />
      </Suspense>
    </main>
  );
}
