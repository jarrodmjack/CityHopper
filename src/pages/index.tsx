import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
// import { api } from "~/utils/api";

// import Image from "next/image";
// import LoadingPage from "~/components/loading/LoadingPage";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import LoadingSpinner from "~/components/loading/LoadingSpinner";
// import PostView from "~/components/posts/PostView";
import Layout from "~/components/layout/Layout";
import PropertySearchForm from "~/components/forms/PropertySearchForm";
import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import { fetchMatchingProperties } from "~/utils/properties/fetchMatchingProperties";
import { useState } from "react";
import PropertiesGrid from "~/components/layout/PropertiesGrid";
import LoadingSpinner from "~/components/loading/LoadingSpinner";

// const CreatePostWizard = () => {
//   const { user } = useUser();
//   const [input, setInput] = useState("");

//   if (!user) return null;

//   const ctx = api.useContext();

//   const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
//     onSuccess: () => {
//       setInput("");
//       void ctx.posts.getAll.invalidate();
//     },
//     onError: (e) => {
//       const errorMessage = e.data?.zodError?.fieldErrors.content;
//       const tooManyReqsMessage = e.message || null;

//       if (errorMessage && errorMessage[0]) {
//         toast.error(errorMessage[0]);
//       } else if (tooManyReqsMessage) {
//         toast.error(tooManyReqsMessage);
//       } else {
//         toast.error("Error posting. Please try again");
//       }
//     },
//   });

//   return (
//     <div className="flex w-full gap-4">
//       <Image
//         width={56}
//         height={56}
//         alt="Profile Image"
//         className="rounded-full"
//         src={user.profileImageUrl}
//       />
//       <input
//         placeholder="Type some emojis"
//         className="grow bg-transparent outline-none"
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         disabled={isPosting}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             e.preventDefault();
//             if (input !== "") {
//               mutate({ content: input });
//             }
//           }
//         }}
//       />
//       {input !== "" && !isPosting && (
//         <button onClick={() => mutate({ content: input })}>Post</button>
//       )}
//       {isPosting && (
//         <div className="flex items-center justify-center">
//           <LoadingSpinner size={20} />
//         </div>
//       )}
//     </div>
//   );
// };

// const Feed = () => {
//   const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

//   if (postsLoading) return <LoadingPage />;

//   if (!data) return <div>Something went wrong</div>;

//   return (
//     <div className="flex flex-col">
//       {data.map((fullPost) => (
//         <PostView key={fullPost.post.id} {...fullPost} />
//       ))}
//     </div>
//   );
// };

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
    console.log("foundProperties: ", matchingProperties);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSpinner size={96} />
        </div>
      </Layout>
    );
  }
  console.log('matching properties: ', currentMatchingProperties)

  return (
    <Layout>
      <div className="flex justify-center bg-gray-900 pb-10 text-slate-100">
        <PropertySearchForm
          handleFindMatchingProperties={handleFindMatchingProperties}
        />
      </div>
      {currentMatchingProperties.length > 0 && (
        <div className="flex flex-col gap-10 border-4 border-red-700 py-10">
          <h2 className="text-xl font-bold lg:ml-40">
            {currentMatchingProperties.length} listings in{" "}
            <span className="capitalize">{currentLocation}</span>
          </h2>
          <PropertiesGrid properties={currentMatchingProperties} />
        </div>
      )}
      {!currentMatchingProperties && (
        <div className="flex justify-center items-center">
          <h3 className="font-bold text-2xl mt-10">No matching properties found</h3>
        </div>
      )}
        
    </Layout>
  );
};

export default Home;
