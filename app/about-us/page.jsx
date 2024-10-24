import React from 'react';
import AboutUsLayout from './aboutUsLayout';
import { getAboutUsCardCollection } from "@/lib/api"
import { draftMode } from "next/headers";

export default async function aboutUs() {
  const { isEnabled } = await draftMode();
  const aboutUsData = await getAboutUsCardCollection(isEnabled, 'About Us');
//   console.log('does this give me the about us data: ', aboutUsData)
  return (
    <AboutUsLayout data={aboutUsData[0]} />
  )
}
