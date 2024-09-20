'use client';
import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { useAppContext } from './context';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from './footer/layout'


export default function Footer() {
  const data = useAppContext();
  // console.log('in the footer did this data get passed down: ', data)

  const option = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { id } = node.data.target.sys;
        // console.log('what is data: ', data)
        // data.find((item) => {
        //   console.log('this is the item in the data:', item.text)
        // })
        const entry = data.find(item => 
          item.text.links.entries.inline.some(entry => entry.sys.id === id)
        );
        const phoneNumber = entry ? entry.text.links.entries.inline.find(entry => entry.sys.id === id).phoneNumber : 'Phone number not found';
        return <span>{phoneNumber}</span>;
      },
      // Add more custom renderers if needed
    },
  };


  
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={index}> 
            {/* <Layout data={item} /> */}
            {documentToReactComponents(item.text.json, option)}
          </div>
        ) 
      })}

    </div>
  )
}
