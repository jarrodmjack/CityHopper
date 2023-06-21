import { type NextPage } from "next";
import LandingPage from "~/components/landing/LandingPage";
import Layout from "~/components/layout/Layout";


const Home: NextPage = () => {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
};

export default Home;
