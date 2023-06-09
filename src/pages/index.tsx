import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import LoadingPage from "~/components/loading/LoadingPage";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "~/components/loading/LoadingSpinner";
import Link from "next/link";
import ProfilePageLayout from "~/components/layout/ProfileLayout";
import PostView from "~/components/posts/PostView";
dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");

  if (!user) return null;

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      const tooManyReqsMessage = e.message || null;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else if (tooManyReqsMessage) {
        toast.error(tooManyReqsMessage);
      } else {
        toast.error("Error posting. Please try again");
      }
    },
  });

  return (
    <div className="flex w-full gap-4">
      <Image
        width={56}
        height={56}
        alt="Profile Image"
        className="rounded-full"
        src={user.profileImageUrl}
      />
      <input
        placeholder="Type some emojis"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded yet
  if (!userLoaded) {
    return <div />;
  }

  return (
    <ProfilePageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn ? (
          <div>
            <SignInButton />
          </div>
        ) : (
          <div>
            <SignOutButton />
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </ProfilePageLayout>
  );
};

export default Home;
