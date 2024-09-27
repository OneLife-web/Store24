"use client";

import { signOut } from "next-auth/react";

const ProfileContainer = () => {
  return (
    <div>
      <button onClick={() => signOut({callbackUrl: "/"})}>
        Logout
      </button>
    </div>
  );
};

export default ProfileContainer;
