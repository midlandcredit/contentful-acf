import { getHomePageCollection, getHomeLandingPageCollection } from "../lib/api"
import { draftMode } from "next/headers";
import Home from './components/pageLayout/home'

//THIS IS THE HOME PAGE
export default async function Router() {
  const { isEnabled } = await draftMode();
  const homePageData = await getHomePageCollection(isEnabled);
  const homeLandingPage = await getHomeLandingPageCollection(isEnabled);
  // console.log('THIS IS IN THE HOME PAGE: ', homePageData)


  return (
    // <main className="">
      <Home homeLandingPage={homeLandingPage} homePageData={homePageData} />
    // </main>
  );
};