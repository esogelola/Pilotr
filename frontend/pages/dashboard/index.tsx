import Home from "../../components/Dashboard/Home";

import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "../../components/Dashboard/Layout";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Home />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
