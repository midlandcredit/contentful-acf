import { getHomePageCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import HomePageBody from './home/homePageBody'

//THIS IS THE HOME PAGE
export default async function Home() {
  
  const { isEnabled } = draftMode();
  const homePageData = await getHomePageCollection(isEnabled);
  // console.log('what is homePageData: ', homePageData[0])


  return (
    <main className="">
      <div className="z-10 w-full h-1/4 max-w-5xl items-center justify-between  text-sm lg:flex bg-morning-sky-blue">

      </div>
      <HomePageBody data={homePageData[0]} />
    </main>
  );
}
