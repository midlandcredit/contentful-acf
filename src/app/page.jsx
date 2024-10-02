import { getHomePageCollection, getHomeLandingPageCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import HomePageBody from './home/homePageBody';
import HomeLandingPage from './home/homeLandingPage'

//THIS IS THE HOME PAGE
export default async function Home() {
  const { isEnabled } = draftMode();
  const homePageData = await getHomePageCollection(isEnabled);
  const homeLandingPage = await getHomeLandingPageCollection(isEnabled);

  return (
    <main className="">
      <div
      style={{
      'backgroundImage': `url(${homeLandingPage[0].heroImageMobile.url})`}} 
       className="z-10 w-full h-1/4 max-w-5xl items-center justify-between  text-sm lg:flex bg-bottom">
        <HomeLandingPage data={homeLandingPage[0]} />
      </div>
      <HomePageBody data={homePageData[0]} />
    </main>
  );
}
