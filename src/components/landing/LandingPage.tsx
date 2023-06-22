import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <main className="container mx-auto py-8 text-slate-100">
      <section className="flex justify-between">
        <section>
          <section className="py-8">
            <h2 className="text-2xl font-bold">Explore Your Destination</h2>
            <p className="mt-4">
              Discover the best places to stay at the most competitive prices
              using CityHopper.
            </p>
          </section>
          <section className="py-8">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <ul className="mt-4 list-inside list-disc">
              <li>Enter your destination city in the search bar</li>
              <li>
                CityHopper will fetch the latest listings from Airbnb's API
              </li>
              <li>
                Browse through the options and filter by price, location, and
                amenities
              </li>
              <li>
                Select your desired accommodation and book directly through
                Airbnb
              </li>
            </ul>
          </section>
          <section className="py-8">
            <h2 className="text-2xl font-bold">Why Use CityHopper</h2>
            <ul className="mt-4 list-inside list-disc">
              <li>
                Get access to a wide range of affordable accommodation options
              </li>
              <li>Save time by comparing prices and amenities in one place</li>
              <li>
                Secure and reliable bookings through Airbnb's trusted platform
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
        <h2 className="text-2xl font-bold mb-5">Start Exploring Now</h2>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-4 items-center">
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
              <span className="text-blue-600 cursor-pointer hover:text-blue-800">Sign in</span>
            </SignInButton>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
