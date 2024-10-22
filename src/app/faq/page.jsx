import React from 'react'
import { getAboutUsCardCollection, getFaqsSectionCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import FaqLayout from './faqLayout';
import FaqCard from './faqCard';

export default async function Faq() {
    const { isEnabled } = draftMode();
    const aboutUsData = await getAboutUsCardCollection(isEnabled, 'FAQ', true);
    const faqsSection = await getFaqsSectionCollection(isEnabled);


  return (
    <div className='laptop:m-auto mx-[20px] max-w-[1250px] '>
      <FaqCard data={aboutUsData[0]} />
      {faqsSection.map((item, index) => (
          <FaqLayout key={index} data={item} />
      ))}
      <FaqCard data={aboutUsData[1]} />
    </div>
  )
}
