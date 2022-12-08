import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";

const Menu = () => {
  //   const { data: session } = useSession();
  return (
    <div className="flex justify-between py-3 container mx-auto">
      <Link href="/" legacyBehavior>
        <a className="font-bold text-xl">Jujurly</a>
      </Link>

      <Button onClick={signIn} text="Login" />
    </div>
  );
};

export default Menu;
