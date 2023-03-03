import { NextPage } from "next";
import { HomeLayout } from "@/layouts/home-layout";
import { TitleAndMetaTags } from "@/components/seo";

const Home: NextPage = () => {
  return (
    <>
      <TitleAndMetaTags />
      <HomeLayout>
        <div>Nothing to see for now</div>
      </HomeLayout>
    </>
  );
};

export default Home;
