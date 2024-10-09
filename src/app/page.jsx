import { getHomePageCollection, getHomeLandingPageCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import Home from './home/home'

//THIS IS THE HOME PAGE
export default async function Main() {
  const { isEnabled } = draftMode();
  const homePageData = await getHomePageCollection(isEnabled);
  const homeLandingPage = await getHomeLandingPageCollection(isEnabled);


  return (
    <main className="">
      <Home homeLandingPage={homeLandingPage} homePageData={homePageData} />
    </main>
  );
};
