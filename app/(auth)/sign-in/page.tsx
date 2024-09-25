import SignInContainer from "@/components/auth/SignInContainer";
import { Suspense } from "react";

export default function SignIn() {
  return (
    <main>
      <Suspense>
        <SignInContainer />
      </Suspense>
    </main>
  );
}
