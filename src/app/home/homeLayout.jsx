'use client';
import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export default function HomeLayout({data}) {
  console.log('THIS IS THE CTA BUTTONS: ', data.attachmentsCollection.items)

  const Text = ({children}) => <p className='my-[15px] mx-[10px] text-midnight-blue'>{children}</p>

  const option = {
    // Add more custom renderers if needed
      renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node) => {
          // console.log('this is node in home page: ', node) 
          const { id } = node.data.target.sys;
          const entry = data.text.links.entries.inline.some(entry => entry.sys.id === id);
          const phoneNumber = entry ? data.text.links.entries.inline.find(entry => entry.sys.id === id).phoneNumber : 'Phone number not found';
          return <span> {phoneNumber}</span>;
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
          // console.log('what is children: ', children)
          return <Text>{children} </Text>},
      },
     
  };


  return (
    <div className='border-2 border-black text-center text-[10px] '>
      {documentToReactComponents(data.text.json, option)}
      <div className='flex flex-row flex-wrap justify-center w-[100%] m-[auto] gap-[10px]'>
        {data.attachmentsCollection.items.map((item, index) => {
          return (
            <div key={index} className='flex flex-col flex-wrap justify-center items-center basis-[8.5rem] rounded-[10px] bg-[#DFE8F8] p-[11px] mx-[5px] my-[5px] text-midnight-blue'>
              <div className='w-[30%] m-[5px]'>
              <img src={item.image.url} />
              </div>
              <p>{item.title}</p>
              {item.phoneNumber && <div>{item.phoneNumber.phoneNumber}</div>}
              <div className='rounded-[50px] bg-[#FFFFFF] px-[15px] py-[5px]  mt-[10px] font-bold text-[12px]'>
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
