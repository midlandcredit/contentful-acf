import React from 'react';
import { useAppContext } from './context';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import FooterLayout from './footer/footerLayout';
import { getFooterCollection } from "@/lib/api"
import { draftMode } from "next/headers";

// export async function getStaticProps() {
//   const isDraftMode = false; // Set this based on your environment or logic
//   const footerCollection = await getFooterCollection(isDraftMode);
//   console.log('in the footer did this data get passed down: ', footerCollection)
//   return {
//     props: {
//       footerCollection,
//     },
//     revalidate: 60, // Revalidate every 60 seconds
//   };
// }


export default async function Footer() {
  const { isEnabled } = draftMode();
  const footerData = await getFooterCollection(isEnabled);
  // console.log('in the footer did this data get passed down: ', footerData)

  
  return (
    <div>
      {footerData.map((item, index) => {
        return (
          <div key={index}> 
            <FooterLayout data={item} />
          </div>
        ) 
      })}
    </div>
  )
}
