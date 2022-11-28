import { NextPage } from "next";
import { HomeLayout } from "@/layouts/HomeLayout";
import { HomeHero } from "@acme/ui";
import { ProjectAbout } from "@acme/ui";

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <HomeHero />
      <ProjectAbout />
    </HomeLayout>
  );
};

export default Home;
