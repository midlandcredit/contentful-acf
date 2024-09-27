'use client';
import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';


export default function FooterLayout({data}) {

  const Text = ({children}) => <p>{children}</p>

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
          return <Text>{children} </Text>},
      },
     
  };

  return (
    <div className='m-[10px] p-[5px] border-2 border-red-500'>
       {documentToReactComponents(data.text.json, option)}
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
    - if you get acrreditations, need to also get image
    - footer should be good
 */
