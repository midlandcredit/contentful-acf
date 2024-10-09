'use client';
import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function AboutUsLayout({data}) {

    const Text = ({children}) => <p className={`m-[10px] mb-[20px] text-standard`}>{children}</p>

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
    <div className='bg-[#DFE8F8] rounded-[10px] mx-[20px] p-[18px]'>
        <h1 className='text-center text-[20px] font-semibold my-[15px]'>{data.title}</h1>
        {documentToReactComponents(data.content.json, options)}
    </div>
  )
}

