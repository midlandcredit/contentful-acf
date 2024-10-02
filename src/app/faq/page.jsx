import React from 'react'
import { getAboutUsCardCollection, getFaqsSectionCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import FaqLayout from './faqLayout';
import FaqCard from './faqCard';

export default async function Faq() {
    const { isEnabled } = draftMode();
    let aboutUsData = await getAboutUsCardCollection(isEnabled, 'FAQ', true);
    // console.log('are we getting this.......: ', aboutUsData[0])
    
    const faqsSection = await getFaqsSectionCollection(isEnabled);
    // console.log('are we getting this: ', aboutUsData)


  return (
    <div>
      <FaqCard data={aboutUsData[0]} />
      {faqsSection.map((item, index) => (
          <FaqLayout key={index} data={item} />
      ))}
      <FaqCard data={aboutUsData[1]} />
    </div>
  )
}
