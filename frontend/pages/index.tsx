import HomeHero from "../components/Home/HomeHero";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "../components/Home/Layout";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <HomeHero />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
