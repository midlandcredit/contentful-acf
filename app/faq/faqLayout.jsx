'use client';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
// import UseIsLargeScreen from '../hooks/useIsLargeScreen'


export default function FaqLayout({ data, key }) {
  // console.log('what is data...: ', data)
  const [openItems, setOpenItems] = useState({});
  // console.log('what is table size: ', tabletSize)
  const [tabletSize, setTabletSize] = useState(false);
  // const tabletSize = window.matchMedia("(min-width: 615px)").matches;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 615px)");
    setTabletSize(mediaQuery.matches);

    const handler = (event) => setTabletSize(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  //if we are 615px min width, open answers but make sure that it still toggles 
  //make sure it is a - to start 
  
  const toggleDrawer = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const Text = ({ children }) => (
    <div className="mb-[10px] text-clamp-faq-answer leading-[normal] text-midnight-blue tablet:mb-[30px] tablet:w-[80%]">
      {children}
    </div>
  );

  const OpenDrawer = () => (
    <svg
      className="h-8 w-8 text-muted-medium-blue tablet:relative tablet:left-[5px] tablet:top-[4px]"
      width="24"
      height="24"
      viewBox="0 0 35 35"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const CloseDrawer = () => (
    <svg
      className="h-8 w-8 text-muted-medium-blue tablet:relative tablet:left-[5px] tablet:top-[4px]"
      width="24"
      height="24"
      viewBox="0 0 35 35"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const renderOptions = (faqData) => {
    // console.log('what is FAQ Data: ', faqData);

    return {
      renderNode: {
        [INLINES.EMBEDDED_ENTRY]: (node, children) => {
          const { id } = node.data.target.sys;
          const entry = faqData.answer.links.entries.inline.some(
            (entry) => entry.sys.id === id
          );
          const phoneNumber = entry
            ? faqData.answer.links.entries.inline.find(
                (entry) => entry.sys.id === id
              ).phoneNumber
            : 'Phone number not found';
          return <span className="underline">{phoneNumber}</span>;
        },
        [INLINES.HYPERLINK]: (node, children) => {
          return (
            <a
              href={node.data.uri}
              className="underline"
            >
              {children}
            </a>
          );
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
          return <Text>{children}</Text>;
        },
      },
    };
  };

  return (
    <div className="rounded-[10px] border border-morning-sky-blue] my-[15px] tablet:max-w-[1132px] tablet:m-auto tablet:my-[50px] tablet:border-0">
      <p className="text-clamp-faq-title text-midnight-blue text-center tablet:text-left tablet:px-[30px] tablet:border-b tablet:border-black font-semibold bg-morning-sky-blue py-[10px] rounded-t-lg">
        {data.title}
      </p>
      {data.questionsCollection.items.map((item, index) => {
        const lastIndex = data.questionsCollection.items.length - 1;
        return (
        <div key={index} className={`border border-morning-sky-blue px-[10px] pt-[13px] leading-[normal] tablet:pt-[30px] tablet:pb-[15px] tablet:px-[50px] ${index === lastIndex ? 'tablet:border-0' : 'tablet:border-b'}  tablet:border-black  tablet:border-0 tablet:border-x-alice-blue`}>
          <div className="text-[20px] text-muted-medium-blue font-bold mb-[20px] flex tablet:justify-between">
            <p className={`text-clamp-faq-question ${data.order === '1' ? 'pr-[10px]' : 'pr-[0px]' }`}>{item.question}</p>
            <div className='tablet:relative tablet:h-[24px] tablet:h-[34px] tablet:w-[34px] tablet:rounded-[50%] tablet:border tablet:border-muted-medium-blue tablet:border-solid' onClick={() => toggleDrawer(index)}>
              {
                tabletSize ?  
                openItems[index] ? (<CloseDrawer/>) : (<OpenDrawer/>) :
                openItems[index] ? (<OpenDrawer/>) : (<CloseDrawer/>) 
              }
            </div>
          </div>
          <div className={`overflow-hidden transition-[max-height, padding] duration-[500ms] ease-in-out tablet:pl-[30px] 
          ${
              tabletSize ? 
              openItems[index] ? 'max-h-0 p-0' : 'max-h-[1000px] pb-[30px]' :
              openItems[index] ? 'max-h-[1000px] pb-[20px]' : 'max-h-0 p-0' 
          }`}>
            {documentToReactComponents(item.answer.json, renderOptions(item))}
            {item.buttonText && (
              <div className="rounded-[50px] bg-midnight-blue text-[#FFFFFF] text-center px-[15px] py-[13px] w-clamp-faq-answer-button text-clamp-faq-footer">
                <a href={item.buttonUrl}>{item.buttonText}</a>
              </div>
            )}
          </div>
        </div>
      )})}
    </div>
  );
}
