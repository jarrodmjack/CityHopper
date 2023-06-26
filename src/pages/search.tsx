import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Layout from "~/components/layout/Layout";
import PropertySearchForm from "~/components/forms/PropertySearchForm";
import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import { fetchMatchingProperties } from "~/utils/properties/fetchMatchingProperties";
import { useState } from "react";
import PropertiesGrid from "~/components/layout/PropertiesGrid";
import LoadingSpinner from "~/components/loading/LoadingSpinner";

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const [currentMatchingProperties, setCurrentMatchingProperties] = useState(
    []
  );

  const [currentLocation, setCurrentLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: loadingProperties } =
    api.propertySearch.getPropertySearchesByUserId.useQuery({
      userId: user?.id || "",
    });

  const { mutate, isLoading: isCreating } =
    api.propertySearch.create.useMutation({
      onSuccess: () => {
        void ctx.posts.getAll.invalidate();
      },
    });

  const ctx = api.useContext();

  if (!user) return null;

  if (!userLoaded) {
    return <div />;
  }

  // Search for matching properties
  const handleFindMatchingProperties = async (
    options: PropertySearchFormOptions
  ) => {
    const todaysDate = new Date().toISOString().split("T")[0];

    if (options.checkIn < todaysDate!) {
      toast.error(
        "Check in date cannot be before todays date. Please try again"
      );
      return;
    }

    setIsLoading(true);
    const matchingProperties = await fetchMatchingProperties(options);
    setCurrentLocation(options.location);
    if (matchingProperties) {
      !isCreating &&
        mutate({
          userId: user.id,
          properties: matchingProperties,
        });

      setCurrentMatchingProperties(matchingProperties);
    } else {
      toast.error("No matching properties were found");
    }
    setIsLoading(false);
  };

  const handleShowPreviousSearch = (previousSearchProperties: any) => {
    setCurrentMatchingProperties(previousSearchProperties);
  };

  if (isLoading) {
    return (
      <Layout format="loading">
        <div className="flex h-screen w-full items-center justify-center">
          <LoadingSpinner size={96} />
        </div>
      </Layout>
    );
  }
  console.log("matching props: ", currentMatchingProperties);
  return (
    <Layout
      data={data}
      handleShowPreviousSearch={handleShowPreviousSearch}
      format="search"
    >
      <div className="flex justify-center bg-gray-900 pb-10 text-slate-100">
        <PropertySearchForm
          handleFindMatchingProperties={handleFindMatchingProperties}
        />
      </div>
      {currentMatchingProperties.length > 0 && (
        <div className="flex flex-col gap-10 py-10">
          <h2 className="ml-10 text-xl font-bold text-slate-100">
            {currentMatchingProperties.length} results
          </h2>
          <PropertiesGrid properties={currentMatchingProperties} />
        </div>
      )}
      {!currentMatchingProperties && (
        <div className="flex items-center justify-center">
          <h3 className="mt-10 text-2xl font-bold">
            No matching properties found
          </h3>
        </div>
      )}
    </Layout>
  );
};

export default Home;
