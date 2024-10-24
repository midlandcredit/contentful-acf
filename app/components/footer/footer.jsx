import React from 'react';
import FooterLayout from './footerLayout';
import { getFooterCollection } from "../../../lib/api"
import { draftMode } from "next/headers";


export default async function Footer() {
  const { isEnabled } = await draftMode();
  const footerData =  getFooterCollection(isEnabled);
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
