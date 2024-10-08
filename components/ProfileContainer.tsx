"use client";
import { signOut, useSession } from "next-auth/react";

const ProfileContainer = () => {
  const { data: session } = useSession();
  return (
    <section className="max-sm:px-[3%] py-10">
      <h1 className="heading1">Hi, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <button
        className="border mt-20 px-5 py-2 rounded-full font-medium border-secondaryBg"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
      </button>
    </section>
  );
};

export default ProfileContainer;
