import { SignOutButton, useUser } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) {
    return <div />;
  }

  return (
    <main className="">
      <header className="justify-between bg-green-950 py-16 text-slate-100">
        <div className="flex justify-between container mx-auto px-40">
          <div>
            <h1 className="text-3xl">
              {/* LOGO will go beside app name */}
              CityHopper
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            {isSignedIn && <SignOutButton />}
            <span>Menu</span>
          </div>
        </div>
      </header>
      <div>{props.children}</div>
    </main>
  );
};

export default Layout;
