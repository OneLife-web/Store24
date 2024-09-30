"use client";

import { signOut } from "next-auth/react";

const ProfileContainer = () => {
  return (
    <section>
      <button onClick={() => signOut({callbackUrl: "/"})}>
        Logout
      </button>
    </section>
  );
};

export default ProfileContainer;
