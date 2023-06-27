import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";
import PreviousSearchSideBar from "../sidebar/PreviousSearchSideBar";
import SideBar from "../sidebar/SideBar";

type LayoutOwnProps = {
  data?: any;
  format: string;
  handleShowPreviousSearch?: any
};

const Layout: React.FC<PropsWithChildren & LayoutOwnProps> = ({
  children,
  data,
  format,
  handleShowPreviousSearch
}) => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) {
    return <div />;
  }

  return (
    <main className="flex min-h-screen">
      {format === "search" && data && (
        <SideBar><PreviousSearchSideBar handleShowPreviousSearch={handleShowPreviousSearch} previousSearches={data} /></SideBar>
      )}
      <div className="mx-auto flex flex-col w-full">
        <header className="justify-between bg-gray-900 py-16 text-slate-100 px-0">
          <div className="container mx-auto flex justify-between px-10 md:px-40">
            <div>
              <h1 className="text-3xl">CityHopper</h1>
            </div>
            <div className="flex items-center gap-4">
              {isSignedIn && <SignOutButton />}
              <span>Menu</span>
            </div>
          </div>
        </header>
        <div className="flex-grow">{children}</div>
        <footer className="justify-self-end bg-white shadow dark:bg-gray-900">
          <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <a
                className="mb-4 flex items-center sm:mb-0"
              >
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                  CityHopper
                </span>
              </a>
              <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 ">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 ">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              © 2023 CityHopper™. All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Layout;
