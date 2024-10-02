import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export default function FaqCard({data}) {
    console.log('what is data.............: ', data)

  const Text = ({children}) => <p className={` ${data.number === 1 ? 'text-[14px] mt-[35px] mb-[20px] mx-[15px]' : 'text-[12px] my-[20px] mx-[10px]'} text-center leading-[normal]`}>{children}</p>

  const option = {
    // Add more custom renderers if needed
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => {
          return <Text>{children} </Text>},
      },
     
  };

  return (
    <div className={`bg-morning-sky-blue mx-[20px] px-[10px] py-[35px] rounded-[10px] leading-[normal] ${data.number === 1 ? 'text-left' : 'text-center'}`}>
        <div className='px-[20px] mb-[15px]'>
          <h1 className={`leading-[normal] text-midnight-blue font-semibold ${data.number === 1 ? 'text-[24px]' : 'text-[20px]'}`}>{data.title}</h1>
          {data.subheader && <p className='text-[20px] mt-[15px]'>{data.subheader}</p>}
        
          <div className={`rounded-[50px] bg-midnight-blue text-[#FFFFFF] text-center px-[15px] py-[13px] w-[70%] ${data.number === 1 ? 'm-[0]' : 'm-[auto]'} my-[20px] font-medium text-[14px]`}>
              <a href={data.buttonUrl}>
                  {data.buttonText}
              </a>
          </div>
        </div>
        {data.footer && <Text>{data.footer}</Text>}
        {data.content && documentToReactComponents(data.content.json, option)}
    </div>
  )
}
