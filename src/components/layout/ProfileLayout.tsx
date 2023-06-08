import type { PropsWithChildren } from "react";

const ProfilePageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex justify-center">
      <div className="h-screen w-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};

export default ProfilePageLayout;
