// import { Metadata } from "next";
import { Mulish } from "next/font/google";
import { Suspense } from "react";
import Loading from './loading';
import "./globals.css";
import { getNavCollection, getHomePageCollection, getHomeLandingPageCollection, getFooterCollection } from "../lib/api";
import { draftMode } from "next/headers";
import NavigationBar from "./components/navigationBar";
import FooterLayout from "./components/footer/footerLayout";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Atlantic Credit & Finance",
  description: "Atlantic Credit & Finance is a wholly owned subsidiary of Encore Capital Group and works with consumers to resolve past due debts.",
};


export default async function RootLayout({children}) {
  // console.log('im i able to see children', children) 
  let navData = [];
  let footerData = [];
  try {
    const { isEnabled } = await draftMode();
     navData = await getNavCollection(isEnabled);
     footerData = await getFooterCollection(isEnabled);

  } catch(err) {
    console.error('Error when feteching data: ', err)
  }
  
  return (
    <html lang="en">
    <head>
    <link rel="icon" href="/acfLogo.png" sizes="any" />
    </head>
      <body  className={`${mulish.className} m-[auto] bg-alice-blue`}>
       <div className="max-w-max-width m-[auto]">
        <NavigationBar navData={navData[0]} />
        <main><Suspense fallback={<Loading />}>{children}</Suspense></main>
       </div>
        {footerData.map((item, index) => {
        return (
          <div key={index}> 
            <FooterLayout data={item} />
          </div>
        ) 
      })}
        </body>
    </html>
  );
};


// export default async function RootLayout({
//   children,
// }: 
// Readonly<{
//   children: React.ReactNode;
// }>) 
// {
//   const { isEnabled } = draftMode();
//   const navData = await getNavCollection(isEnabled);
//   const homePageData = await getHomePageCollection(isEnabled);
//   const homeLandingPage = await getHomeLandingPageCollection(isEnabled);
  
//   return (
//     <html lang="en">
//       <body  className={`${mulish.className} max-w-max-width m-[auto] bg-alice-blue`}>
//         <NavigationBar navData={navData[0]} />
//           {/* <Home homeLandingPage={homeLandingPage} homePageData={homePageData} /> */}
//           {children}
//         <Footer />
//         </body>
//     </html>
//   );
// };

