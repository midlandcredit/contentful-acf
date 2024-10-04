'use client';
import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

//use this for the the drawer for the nav bar className={`fixed top-0 left-0  h-[30%] bg-white shadow-lg transition-transform transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
export default function NavigationBar({navData}) {
  const pathname = usePathname();
  const [navBg, setNavBg] = useState(pathname === '/' ? 'bg-morning-sky-blue' : 'bg-white')
  const [isOpen, setIsOpen] = useState(false)
  const [pageName, setPageName] = useState('home')

  useLayoutEffect(() => {
    if (pathname === '/') {
      setNavBg('bg-morning-sky-blue')
    } else {
      setNavBg('bg-white')
    }

  }, [pathname]);

  const toggleNavBar = (outside) => {
    setIsOpen(!isOpen)
  }

  const navBarColor = (page, logo) => {
    setPageName(page)
    setIsOpen(logo ? false : !isOpen)

  }

  const options = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entryId = node.data.target.sys.id;
        const entry = navData.servicedBy.links.entries.inline.find((entry) => entry.sys.id === entryId);

        if (entry && entry.phoneNumber) {
          return <a href={entry.phoneNumber}>{entry.phoneNumber}</a>;
        }
        return null;
      },
    },
  };

  
  return (
    <div className={`${navBg}`}>
      <div className="flex flex-row justify-between items-center px-[1rem] py-10 ">
        <div className='invert min-w-24  max-w-32 md:max-w-40 h-auto'>
        <Link href={'/'} onClick={() => navBarColor('home', true)}>
          <img className='max-w-[94%]' src={navData.logo.url} alt={navData.title} />
        </Link>
        </div>
          <div className='text-[13px] text-[#143B62] border rounded-45px border-[#143B62] px-[12px] py-[3px] h-fit' >
            <a href={navData.buttonUrl}>{navData.buttonTitle}</a>
          </div>
          <div onClick={toggleNavBar} className='flex flex-col justify-center ml-[10px]'>
            {[...Array(3)].map((_, index) => (
              <div key={index} className='h-0.5 bg-[#143B62] w-[22px] my-1'></div>
            ))}
          </div>
        </div>
        {/* this is the  Serviced By MCM at (800) 296-2657 div*/}
       <div className="hidden lg:block">{documentToReactComponents(navData.servicedBy.json, options)}</div> 
       <div onClick={toggleNavBar} className={`fixed top-0 left-0 w-[100%] h-[100%] text-[#FFFFFF] text-[24px] opacity-95 shadow-lg transition-transform transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={`pt-[30px] h-[30=20px] bg-midnight-blue text-[#FFFFFF]`}>
          <div className='flex flex-row-reverse pr-[20px]' onClick={toggleNavBar}>
          <svg class="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 30 30" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
          </div>
          <div className='flex flex-col justify-center content-center flex-wrap text-center'>
            <Link className={`${pageName === 'home' ? 'text-steel-blue' : 'text-[#FFFFFF]' } pb-[15px]`} onClick={() => navBarColor('home')} href={'/'} >Home</Link>                        
            <Link className={`${pageName === 'about-us' ? 'text-steel-blue' : 'text-[#FFFFFF]' } pb-[15px]`} onClick={() => navBarColor('about-us')} href={'./about-us'}>About</Link>
            <Link className={`${pageName === 'faq' ? 'text-steel-blue' : 'text-[#FFFFFF]' } pb-[15px]`} onClick={() => navBarColor('faq')} href={'./faq'}>FAQs</Link>
            <hr />
            <p className='pt-[15px]'>
              <a href={navData.buttontUrl2}>
                {navData.buttonTitle2}
              </a>
            </p>
          </div>
        </div> 
       </div> 
    </div>
  )
}
