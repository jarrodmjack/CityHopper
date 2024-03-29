import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import ProfilePageLayout from "~/components/layout/ProfileLayout";
import Image from "next/image";
import LoadingPage from "~/components/loading/LoadingPage";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.propertySearch.getPropertySearchesByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;
  if (!data || data.length === 0) return <div>User has no properties searched</div>;

  return (
    <div className="flex flex-col">
      {data?.map((property, i) => (
        <span key={i}>test</span>
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUserName.useQuery({
    username,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <ProfilePageLayout>
        <div className="relative h-36 bg-slate-600">
          <Image
            alt={`${data.username}'s profile picture`}
            src={data.profilePicture}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? ""
        }`}</div>
        <div className="w-full border-b border-slate-400"></div>
        <ProfileFeed userId={data.id} />
      </ProfilePageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUserName.prefetch({ username: username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export default ProfilePage;
