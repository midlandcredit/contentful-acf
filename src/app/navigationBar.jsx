import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';




export default function NavigationBar({navData}) {

  const options = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entryId = node.data.target.sys.id;
        const entry = navData.servicedBy.links.entries.inline.find((entry) => entry.sys.id === entryId);

        if (entry && entry.phoneNumber) {
          return <span >{entry.phoneNumber}</span>;
        }

        return null;
      },
    },
  };

  
  return (
    <div>
      <div className="flex flex-row justify-between items-center px-[1rem] py-10 ">
      <div className='invert min-w-24  max-w-32 md:max-w-40 h-auto'>
      <img className='max-w-[94%]' src={navData.logo.url} alt={navData.title}  />
      </div>
        <button href={navData.buttonUrl} className='text-[13px] border rounded-45px border-black px-[12px] py-[3px] h-fit' >{navData.buttonTitle}</button>
        <div className='flex flex-col justify-center ml-[10px]'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='h-0.5 bg-black w-[22px] my-1'></div>
        ))}
        </div>
        </div>
       <div className="hidden lg:block">{documentToReactComponents(navData.servicedBy.json, options)}</div> 
    </div>
  )
}
