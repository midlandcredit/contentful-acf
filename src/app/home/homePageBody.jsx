'use client';
import React from 'react'
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export default function HomePageBody({data}) {

  const Text = ({children}) => <p className='leading-[normal] my-[15px] mx-[18px] tablet:m-auto tablet:my-[30px] tablet:w-[75%] tablet:px-[40px] text-midnight-blue'>{children}</p>

  const option = {
    // Add more custom renderers if needed
      renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node) => {
          // console.log('this is node in home page: ', node) 
          const { id } = node.data.target.sys;
          const entry = data.text.links.entries.inline.some(entry => entry.sys.id === id);
          const phoneNumber = entry ? data.text.links.entries.inline.find(entry => entry.sys.id === id).phoneNumber : 'Phone number not found';
          return <span className='underline'> {phoneNumber}</span>;
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
          // console.log('what is children: ', children)
          return <Text>{children} </Text>},
      },
     
  };


  return (
    <div className='text-center text-clamp-home-body'>
      {documentToReactComponents(data.text.json, option)}
      <div className='flex flex-row flex-wrap justify-center w-[100%] m-[auto] py-[30px] gap-[10px]'>
        {data.attachmentsCollection.items.map((item, index) => {
          return (
            <div key={index} className='flex flex-col flex-wrap justify-center items-center basis-[8.5rem] tablet:basis-[12rem] laptop:basis-[18rem] laptop:h-[290px] rounded-[10px] bg-[#DFE8F8] p-[13px] py-[15px] px-[20px] mx-[5px] my-[5px] text-midnight-blue font-semibold'>
              <div className='w-[30%] m-[5px] laptop:mb-[30px]'>
              <img src={item.image.url} />
              </div>
              <p className='text-clamp-title-cta'>{item.title}</p>
              {item.phoneNumber && <div>{item.phoneNumber.phoneNumber}</div>}
              <div className={`${index === 0 ? 'tablet:relative tablet:top-[10px] laptop:top-[14px]' : null} rounded-[50px] bg-[#FFFFFF] px-[15px] tablet:w-[90%] py-[5px]  mt-[10px] font-bold text-clamp-footer`}>
                <a className='whitespace-nowrap' href={item.buttonUrl}>
                  {item.buttonText}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
