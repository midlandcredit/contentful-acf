'use client';
import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function AboutUsLayout({data}) {

    const Text = ({children}) => <p className={`m-[10px] mb-[20px] text-clamp-body leading-[normal]`}>{children}</p>

  const options = {
    renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node, children) => {
            const { id } = node.data.target.sys;
            const entry = data.content.links.entries.inline.some(entry => entry.sys.id === id);
            const phoneNumber = entry ? data.content.links.entries.inline.find(entry => entry.sys.id === id).phoneNumber : 'Phone number not found';
            return <span className='underline'>{phoneNumber}</span>;
          },
        [INLINES.HYPERLINK]: (node, children) => {
            return <span>{children}</span>
        },  

        [BLOCKS.PARAGRAPH]: (node, children) => {
            return <Text >{children}</Text>
        }
    }
  }

  return (
    <div className='bg-morning-sky-blue rounded-[10px] mx-[30px] tablet:max-w-banner-max laptop:mx-auto p-[18px] tablet:h-[100%] laptop:h-[662px] tablet:flex tablet:flex-col tablet:justify-center tablet:rounded-[50px] tablet:px-0'>
        <h1 className='text-center tablet:text-left text-clamp-title font-semibold my-[15px] tablet:mb-[20px] tablet:ml-[10px] tablet:px-[80px] laptop:px-[141px]'>{data.title}</h1>
        <div className='tablet:px-[80px] laptop:px-[141px]'>
          {documentToReactComponents(data.content.json, options)}
        </div>
    </div>
  )
}

