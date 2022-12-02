import { NextPage } from "next";
import { HomeLayout } from "@/layouts/HomeLayout";
import { HomeHero, ProjectAbout, ProjectFeatures } from "@acme/ui";

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <HomeHero />
      <ProjectAbout />
      <ProjectFeatures />
    </HomeLayout>
  );
};

export default Home;
