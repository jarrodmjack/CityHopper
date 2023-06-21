import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import LandingPage from "~/components/landing/LandingPage";
import Layout from "~/components/layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import PropertySearchForm from "~/components/forms/PropertySearchForm";
import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";
import { fetchMatchingProperties } from "~/utils/properties/fetchMatchingProperties";
import { toast } from "react-hot-toast";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const [currentMatchingProperties, setCurrentMatchingProperties] = useState(
    []
  );
  const [searchedProperties, setSearchedProperties] = useState([]); // Using this, alongside location because I want to cache the data and do some sort of location filter in case they use the same location
  const [currentLocation, setCurrentLocation] = useState(""); // Using this location because I will be caching the previously searched items on the frontend
  const [isLoading, setIsLoading] = useState(false);

  // Start fetching asap
  // api.posts.getAll.useQuery();

  if (!userLoaded) {
    return <div />;
  }

  const handleFindMatchingProperties = async (
    options: PropertySearchFormOptions
  ) => {
    setIsLoading(true);
    const matchingProperties = await fetchMatchingProperties(options);
    setCurrentLocation(options.location);
    if (matchingProperties) {
      setCurrentMatchingProperties(matchingProperties);
    } else {
      toast.error("No matching properties were found");
    }
    setIsLoading(false);
  };

  return (
      <LandingPage />
  );
};

export default Home;
