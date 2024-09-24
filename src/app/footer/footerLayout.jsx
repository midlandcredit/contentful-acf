'use client';
import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';


export default function FooterLayout({data}) {

  const option = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { id } = node.data.target.sys;
        const entry = data.text.links.entries.inline.some(entry => entry.sys.id === id);
        const phoneNumber = entry ? data.text.links.entries.inline.find(entry => entry.sys.id === id).phoneNumber : 'Phone number not found';
        return <span>{phoneNumber}</span>;
      },
      // Add more custom renderers if needed
    },
  };

  return (
    <div>
       {documentToReactComponents(data.text.json, option)}
    </div>
  )
}
