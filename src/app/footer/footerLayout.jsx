'use client';
import React from 'react'
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';


export default function FooterLayout({data}) {
  // console.log('DATA FOR FOOTER: ', data)

    const Text = ({ children }) => (
      <p className={`leading-[normal] m-[10px] text-standard ${data.number === 3 ? 'text-[#FFFFFF]' : null} whitespace-pre-line`}>
        {children}
      </p>);
    

  const option = {
    // Add more custom renderers if needed
      renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node) => {
          const { id } = node.data.target.sys;
          const entry = data.text.links.entries.inline.some(entry => entry.sys.id === id);
          const phoneNumber = entry ? data.text.links.entries.inline.find(entry => entry.sys.id === id).phoneNumber : 'Phone number not found';
          return <span>{phoneNumber}</span>;
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
          // console.log('what is children.........: ', children)
          //if rmai, create 
          if (data.number === 1) {
            return <div className='leading-[normal] mx-[10px] px-[10px] text-standard text-midnight-blue'>{children}</div>
          } else if (data.number === 2) {
            // console.log('what is paragraph children in footer: ', children)
            if (children[0].includes('Call MCM')) {
              return (
                <div className='flex justify-between'>
                <Text>
                  {children}
                </Text>
                  <div className={`w-[70px] my-[15px] relative bottom-[30px] right-[30px]`}><img src={data.image.url} /></div>
                </div>
              )
            } else if (children[0].includes('Midland Credit Management adheres')) {
                return <p className={`leading-[normal] m-[10px] text-standard whitespace-pre-line w-[80%]`}>{children}</p>
            } else {
              return <Text>{children}</Text>
            }
          } else if (data.number === 3) {
            return <Text>{children}</Text>
          }
        },
      },
     
  };

  return (
    <div className={`font-semibold p-[23px] flex flex-col ${data.number === 3 ? 'bg-[#143B62]' : null } ${data.number === 2 ? 'text-left bg-[#DFE8F8] pb-[10px]' : 'text-center items-center bg-alice-blue'}`}>
    {data.number === 1 && <h3 className='mt-[15px] mb-[10px] text-midnight-blue font-semibold'>{data.title}</h3>}
       {documentToReactComponents(data.text.json, option)}
       {data.number === 1 && 
       <div className={`w-[20%] my-[15px]`}>
        {data.image && <img src={data.image.url} />} 
       </div>}
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
