import { getHomePageCollection, getHomeLandingPageCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import Home from './home/page'

//THIS IS THE HOME PAGE
export default async function Main() {
  const { isEnabled } = draftMode();
  const homePageData = await getHomePageCollection(isEnabled);
  const homeLandingPage = await getHomeLandingPageCollection(isEnabled);
  // console.log('THIS IS IN THE HOME PAGE: ', homePageData)


  return (
    // <main className="">
      <Home homeLandingPage={homeLandingPage} homePageData={homePageData} />
    // </main>
  );
};

