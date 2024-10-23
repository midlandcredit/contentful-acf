import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export default function FaqCard({data}) {
    // console.log('what is data.............: ', data)

  const Text = ({children}) => <p className={`${data.number === 1 ? 'text-clamp-faq-footer mt-[20px] mb-[20px] mx-[15px]' : 'text-clamp-footer my-[20px] mx-[10px]'} text-center leading-[normal]`}>{children}</p>

  const option = {
    // Add more custom renderers if needed
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => {
          return <Text>{children} </Text>},
      },
     
  };

  return (
    <div className={`bg-morning-sky-blue my-[20px] px-[10px] rounded-[10px] leading-[normal] flex flex-col justify-center laptop:h-[535px] tablet:max-w-banner-max tablet:px-[50px] tablet:rounded-[50px] ${data.number === 1 ? 'py-[20px]' : 'py-[35px] mb-[10px]'} ${data.number === 1 ? 'text-left' : 'text-center'}`}>
        <div className='px-[20px] mb-[15px]'>
          <h1 className={`leading-[normal] text-midnight-blue font-semibold ${data.number === 1 ? 'text-clamp-faq-title' : 'text-clamp-faq-card-title'}`}>{data.title}</h1>
          {data.subheader && <p className='text-clamp-faq-subheader mt-[15px]'>{data.subheader}</p>}
        </div>
          <div className={`flex flex-col ${data.number === 1 ? 'flex-col' : 'tablet:flex-col-reverse'}`}>
            <div className={`rounded-[50px] bg-midnight-blue text-[#FFFFFF] text-center px-[15px] py-[13px] w-[65%] tablet:w-[40%] laptop:w-[345px] ${data.number === 1 ? 'm-[0] mx-[20px] ' : 'm-[auto]'} my-[20px] font-medium text-clamp-faq-button`}>
                <a href={data.buttonUrl}>
                    {data.buttonText}
                </a>
            </div>
            {data.footer && <Text>{data.footer}</Text>}
            <div>
            {data.content && documentToReactComponents(data.content.json, option)}
            </div>
          </div>
    </div>
  )
}
