import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";
  console.log("is landing page: ", isLandingPage);
  return (
    <>
      <Head>
        <title>CityHopper</title>
        <meta name="description" content="🐢" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ClerkProvider {...pageProps}>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </ClerkProvider> */}
      {!isLandingPage ? (
        <ClerkProvider {...pageProps}>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </ClerkProvider>
      ) : (
        <>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
};

export default api.withTRPC(MyApp);
