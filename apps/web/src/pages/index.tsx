import { NextPage } from "next";
import { HomeLayout } from "@/layouts/HomeLayout";
import { HomeHero, ProjectAbout, ProjectFeatures } from "@acme/ui";
import { TitleAndMetaTags } from "@/components/seo";

const Home: NextPage = () => {
  return (
    <>
      <TitleAndMetaTags />
      <HomeLayout>
        <HomeHero />
        <ProjectAbout />
        <ProjectFeatures />
      </HomeLayout>
    </>
  );
};

export default Home;
