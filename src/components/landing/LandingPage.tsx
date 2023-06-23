import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  const { user, isLoaded: userIsLoaded, isSignedIn } = useUser();

  return (
    <main className="flex min-h-screen">
      {/* {format === "search" && (
    <SideBar><PreviousSearchSideBar handleShowPreviousSearch={handleShowPreviousSearch} previousSearches={data} /></SideBar>
  )} */}
      <div className="mx-auto flex w-full flex-col">
        <header className="justify-between bg-gray-900 py-16 text-slate-100">
          <div className="container mx-auto flex justify-between px-40">
            <div>
              <h1 className="text-3xl">CityHopper</h1>
            </div>
            <div className="flex items-center gap-4">
              {isSignedIn && <SignOutButton />}
              {/* <span>Menu</span> */}
            </div>
          </div>
        </header>
        <div className="flex-grow">
          <main className="container mx-auto py-8 text-slate-100">
            <section className="flex justify-between">
              <section>
                <section className="py-8">
                  <h2 className="text-2xl font-bold">
                    Explore Your Destination
                  </h2>
                  <p className="mt-4">
                    Discover the best places to stay at the most competitive
                    prices using CityHopper.
                  </p>
                </section>
                <section className="py-8">
                  <h2 className="text-2xl font-bold">How It Works</h2>
                  <ul className="mt-4 list-inside list-disc">
                    <li>Enter your destination city in the search bar</li>
                    <li>
                      CityHopper will fetch the latest listings from Airbnb's
                      API
                    </li>
                    <li>
                      Browse through the options and filter by price, location,
                      and amenities
                    </li>
                    <li>
                      Select your desired accommodation and book directly
                      through Airbnb
                    </li>
                  </ul>
                </section>
                <section className="py-8">
                  <h2 className="text-2xl font-bold">Why Use CityHopper</h2>
                  <ul className="mt-4 list-inside list-disc">
                    <li>
                      Get access to a wide range of affordable accommodation
                      options
                    </li>
                    <li>
                      Save time by comparing prices and amenities in one place
                    </li>
                    <li>
                      Secure and reliable bookings through Airbnb's trusted
                      platform
                    </li>
                    <li>User-friendly interface for a seamless experience</li>
                  </ul>
                </section>
              </section>
              <section>
                <Image
                  className="shadow-2xl shadow-slate-500"
                  src="/images/landingphoto.png"
                  width={800}
                  height={300}
                  alt="landing page image"
                />
              </section>
            </section>
            <section className="py-8">
              <h2 className="mb-5 text-2xl font-bold">Start Exploring Now</h2>
              {!user && (
                <div className="flex flex-col gap-4 ">
                  <div className="flex items-center gap-4">
                    <span>Never used this before?</span>
                    <SignUpButton>
                      <span className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 hover:bg-blue-800">
                        Sign up
                      </span>
                    </SignUpButton>
                  </div>
                  <div className="flex gap-4">
                    <span>Already have an account?</span>
                    <SignInButton>
                      <span className="cursor-pointer text-blue-600 hover:text-blue-800">
                        Sign in
                      </span>
                    </SignInButton>
                  </div>
                </div>
              )}
              {user && isSignedIn && (
                <Link href="/search">
                  <span>Start searching</span>
                </Link>
              )}
            </section>
          </main>
        </div>
        <footer className="justify-self-end bg-white shadow dark:bg-gray-900">
          <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <a
                href="https://flowbite.com/"
                className="mb-4 flex items-center sm:mb-0"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-8"
                  alt="Flowbite Logo"
                />
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
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                CityHopper™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default LandingPage;
