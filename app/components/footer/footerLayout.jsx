'use client';
import React from 'react'
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';


export default function FooterLayout({data}) {
  // console.log('DATA FOR FOOTER: ', data)

    const Text = ({ children }) => (
      <p className={`leading-[normal] m-[10px] text-clamp-footer whitespace-pre-line`}>
        {children}
      </p>);
    

  const option = {
    // Add more custom renderers if needed
      renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node) => {
          const { id } = node.data.target.sys;
          const entry = data.text.links.entries.inline.some(entry => entry.sys.id === id);
          const phoneNumber = entry ? data.text.links.entries.inline.find(entry => entry.sys.id === id).phoneNumber : 'Phone number not found';
          return <span className='text-clamp-footer'>{phoneNumber}</span>;
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
          // console.log('what is NODE.........: ', node)
          //if rmai, create 
          if (data.number === 1) {
            return <div className='leading-[normal] mx-[10px] px-[10px] text-clamp-footer text-midnight-blue'>{children}</div>
          } else if (data.number === 2) {
            // console.log('what is paragraph children in footer: ', children)
            if (children[0].includes('Call MCM')) {
              return (
                <div className='flex justify-between tablet:flex-row-reverse tablet:h-[65px] tablet:relative tablet:bottom-[140px] laptop:bottom-[175px]'>
                <p className={`leading-[normal] m-[10px] text-clamp-footer whitespace-pre-line tablet:relative tablet:bottom-[2px] tablet:left-[6%] tablet:bottom-[10%]`}>{children}</p>
                  <div className={`w-[70px] my-[15px] relative bottom-[30px] right-[10%]  tablet:bottom-[0px] tablet:m-0 tablet:w-[19%] tablet:right-[31%] laptop:right-[25%] laptop:w-[15%]`}><img src={data.image.url} /></div>
                </div>
              )
            } else if (children[0].includes('Midland Credit Management adheres')) {
                return <p className={`leading-[normal] m-[10px] text-clamp-footer whitespace-pre-line w-[80%] tablet:w-[42%] laptop:w-[55%] `}>{children}</p>
            } else {
              return <Text>{children}</Text>
            }
          } else if (data.number === 3) {
            return <p className={`text-center leading-[normal] m-[10px] text-[#FFFFFF] ${children[0].includes('Please understand') ? 'text-clamp-footer-header' : 'text-clamp-footer-subheader'} whitespace-pre-line`}>{children}</p>
          }
        },
      },
     
  };

  return (
    <div className={`m-[auto] font-semibold p-[23px] flex flex-col ${data.number === 3 ? 'bg-[#143B62]' : null } ${data.number === 2 ? 'large-laptop:px-[200px] text-left bg-[#DFE8F8] pb-[10px]' : data.number === 1 ?  'text-center items-center bg-alice-blue' : null}`}>
      <div className={`tablet:w-[70%] tablet:m-auto tablet:pt-[35px] tablet:relative ${data.number === 2 ? 'tablet:left-[65px]' : null}`}>
        {data.number === 1 && <h3 className='mt-[15px] mb-[10px] text-midnight-blue font-semibold text-clamp-footer-title'>{data.title}</h3>}
          {documentToReactComponents(data.text.json, option)}
          {data.number === 1 && 
          <div className={`w-[20%] m-auto mt-[20px] flex justify-center my-[15px]`}>
            {data.image && <img src={data.image.url} />} 
        </div>}
      </div>
    </div>
  )
}

/**
 random notes how to figure this out

 - for each footer, I have to use the renderNOde in options and break down each items in the rich text
 such as the header, short text, paragraph, phone number, image remember that each layout will recieve diff items
 - note that for rich text you what is already recieved is the url
 - determine which footer you recieved
    - if you recieved the COB, need to get image 
      - 3 children in paragraph block 
        - each child has an array of text, depending if there is a link or other inline entries
    - if you get acrreditations, need to also get image
    - footer should be good
 */
