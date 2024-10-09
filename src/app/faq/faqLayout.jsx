'use client';
import React, { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export default function FaqLayout({ data }) {
  console.log('what is data...: ', data)
  const [openItems, setOpenItems] = useState({});

  const toggleDrawer = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const Text = ({ children }) => (
    <div className="mb-[10px] text-[16px] leading-[normal] text-midnight-blue">
      {children}
    </div>
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
    <div className="rounded-[10px] border border-[#DFE8F8] my-[15px]">
      <p className="text-[24px] text-midnight-blue text-center font-semibold bg-morning-sky-blue py-[10px] rounded-t-lg">
        {data.title}
      </p>
      {data.questionsCollection.items.map((item, index) => (
        <div key={index} className=" border border-[#DFE8F8] px-[10px] pt-[13px] leading-[normal]">
          <div className="text-[20px] text-muted-medium-blue font-bold mb-[20px] flex">
            <p className={`${data.order === '1' ? 'pr-[10px]' : 'pr-[0px]' }`}>{item.question}</p>
            <div onClick={() => toggleDrawer(index)}>
              {openItems[index] ? (
                <svg
                  className="h-8 w-8 text-muted-medium-blue"
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
              ) : (
                <svg
                  className="h-8 w-8 text-muted-medium-blue"
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
              )}
            </div>
          </div>
          <div className={`overflow-hidden transition-[max-height, padding] duration-[500ms] ease-in-out ${
            openItems[index] ? 'max-h-[1000px] pb-[20px]' : 'max-h-0 p-0'
          }`}>
            {documentToReactComponents(item.answer.json, renderOptions(item))}
            {item.buttonText && (
              <div className="rounded-[50px] bg-midnight-blue text-[#FFFFFF] text-center px-[15px] py-[13px] w-[70%] text-[14px]">
                <a href={item.buttonUrl}>{item.buttonText}</a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
