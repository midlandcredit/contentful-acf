// import React, {useState, useEffect} from "react";
import { getNavCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import NavigationBar from "./navigationBar";
import Footer from './footer';

export default async function Home() {
  // const [navigationData, setNavigationData] = useState()
  const { isEnabled } = draftMode();
  const data = await getNavCollection(isEnabled);
  console.log('what is the data: ', data)


  return (
    <main className="">
      <div className="z-10 w-full h-1/4 max-w-5xl items-center justify-between  text-sm lg:flex bg-morning-sky-blue">
        <NavigationBar navData={data[0]} />
       Hero Banner will go here!
      </div>
      Other content will go here 
       <Footer />
    </main>
  );
}
