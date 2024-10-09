'use client';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

//use this for the the drawer for the nav bar className={`fixed top-0 left-0  h-[30%] bg-white shadow-lg transition-transform transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
export default function NavigationBar({navData}) {
  const pathname = usePathname();
  const [navBg, setNavBg] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState('home');
  const [isMobile, setIsMobile] = useState(null);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 614px)');

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    }


  }, []);
 
  useLayoutEffect(() => {
    if (isMobile) {
      if (pathname === '/') {
        setNavBg('bg-morning-sky-blue')
      } else {
        setNavBg('bg-alice-blue')
      }
    } else {
      setNavBg('bg-alice-blue')
    }
    

  }, [pathname, isMobile]);

  const toggleNavBar = (outside) => {
    setIsOpen(!isOpen)
  }

  const navBarTextColor = (page, logo) => {
    setPageName(page)
    setIsOpen(logo ? false : !isOpen)

  }

  const options = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entryId = node.data.target.sys.id;
        const entry = navData.servicedBy.links.entries.inline.find((entry) => entry.sys.id === entryId);

        if (entry && entry.phoneNumber) {
          return <a className='underline' href={entry.phoneNumber}>{entry.phoneNumber}</a>;
        }
        return null;
      },
    },
  };

  
  return (
    <div className={`${navBg} px-[3rem] py-10 m-autos`}>
      <div className="flex flex-row justify-between items-center">
        <div className='invert min-w-24 max-w-32 md:max-w-40 h-auto laptop:max-w-fit laptop:w-[190px]'>
        <Link href={'/'} onClick={() => navBarTextColor('home', true)}>
          <img className='max-w-[94%]' src={navData.logo.url} alt={navData.title} />
        </Link>
        </div>
        <div className='flex flex-row justify-between w-[100%] tablet:flex-row-reverse'>
        <div className='text-[13px] laptop:text-[24px] tablet:text-[18px] text-midnight-blue tablet:text-[#FFFFFF] border rounded-45px border-midnight-blue tablet:bg-midnight-blue  px-[15px] laptop:px-[40px] py-[5px] h-fit m-[auto] tablet:m-0'>
            <a href={navData.buttonUrl}>{navData.buttonTitle}</a>
          </div>
          {isMobile ?  (<div onClick={toggleNavBar} className='flex flex-col justify-center ml-[auto] '>
            {[...Array(3)].map((_, index) => (
              <div key={index} className='h-0.5 bg-midnight-blue w-[22px] my-1'></div>
            ))}
          </div>) :
          <div className='flex flex-row justify-center content-center flex-wrap text-center tablet:ml-[auto] tablet:mr-[30px] tablet:gap-[20px]'>                        
            <Link className={`mx-[20px] text-[18px] laptop:text-[24px] text-midnight-blue ${pageName === 'about-us' ? 'underline-offset-2' : 'text-[#FFFFFF]' }`} onClick={() => navBarTextColor('about-us')} href={'./about-us'}>About</Link>
            <Link className={`mx-[20px] text-[18px] laptop:text-[24px] text-midnight-blue ${pageName === 'faq' ? 'underline-offset-2' : 'text-[#FFFFFF]' }`} onClick={() => navBarTextColor('faq')} href={'./faq'}>FAQs</Link>
          </div>
          }
          </div>
        </div>
        {/* this is the  Serviced By MCM at (800) 296-2657 div*/}
       <div className="hidden tablet:flex tablet:flex-row-reverse text-[16px] text-midnight-blue mt-[10px] mr-[20px]">{documentToReactComponents(navData.servicedBy.json, options)}</div> 
       {/* dropdown menu START */}
      {isMobile && <div onClick={toggleNavBar} className={`fixed top-0 left-0 w-[100%] h-[100%] text-[#FFFFFF] text-[24px] opacity-95 shadow-lg transition-transform transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={`pt-[30px] h-[320px] bg-midnight-blue text-[#FFFFFF]`}>
          <div className='flex flex-row-reverse pr-[20px]' onClick={toggleNavBar}>
          <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 30 30" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
          </div>
          <div className='flex flex-col justify-center content-center flex-wrap text-center'>
            <Link className={`${pageName === 'home' ? 'text-steel-blue' : 'text-[#FFFFFF]' } pb-[15px]`} onClick={() => navBarTextColor('home')} href={'/'} >Home</Link>                        
            <Link className={`${pageName === 'about-us' ? 'text-steel-blue' : 'text-[#FFFFFF]' } pb-[15px]`} onClick={() => navBarTextColor('about-us')} href={'./about-us'}>About</Link>
            <Link className={`${pageName === 'faq' ? 'text-steel-blue' : 'text-[#FFFFFF]' } pb-[15px]`} onClick={() => navBarTextColor('faq')} href={'./faq'}>FAQs</Link>
            <hr />
            <p className='pt-[15px]'>
              <a href={navData.buttontUrl2}>
                {navData.buttonTitle2}
              </a>
            </p>
          </div>
        </div> 
       </div> }
       {/* dropdown menu END */}
    </div>
  )
}
