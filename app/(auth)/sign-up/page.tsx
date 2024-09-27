import SignUpContainer from "@/components/auth/SignUpContainer";
import { Suspense } from "react";

export default function SignUp() {
  return (
    <main>
      <Suspense>
        <SignUpContainer />
      </Suspense>
    </main>
  );
}
