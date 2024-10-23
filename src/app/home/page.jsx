"use client";
import { useState, useEffect, useLayoutEffect } from 'react';
import HomePageBody from './homePageBody';
import HomeLandingPage from './homeLandingPage';
//THIS IS THE HOME PAGE

export default function Home({homeLandingPage, homePageData}) {
  // const width = window.innerWidth;
  // console.log('what is inner width: ', width)
  const [bgImage, setBgImage] = useState();
  const [bgClassname, setBgClassname] = useState();
  const [isMobile, setIsMobile] = useState();

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 615) {
        setBgImage(homeLandingPage[0].heroImageDesktop.url);
        setBgClassname('bg-no-repeat mx-[40px] max-w-banner-max h-[750px] bg-morning-sky-blue rounded-[50px] bg-55% items-center laptop:bg-right-middle tablet:bg-mobile-right-middle')
        setIsMobile(false)
      } else {
        setBgImage(homeLandingPage[0].heroImageMobile.url);
        setBgClassname('bg-no-repeat bg-cover z-10 w-full h-[110px] max-w-5xl items-center justify-between  text-sm lg:flex bg-top')
        setIsMobile(true)
      }
    }
    window.addEventListener('resize', handleResize);
    
    handleResize(); // Call handler once to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [homeLandingPage]);

  return(
    <div className='laptop:flex laptop:flex-col laptop:items-center bg-alice-blue'>
      {isMobile ? (
      <>
          <HomeLandingPage data={homeLandingPage[0]} />
        <div
        style={{
        'backgroundImage': `url(${bgImage})`}} 
        className={bgClassname}>
        </div>
      </>
      ) : (
      <>
        <div
        style={{
        'backgroundImage': `url(${bgImage})`}} 
        className={bgClassname}>
        <HomeLandingPage data={homeLandingPage[0]} />
        </div>
      </>
      ) }
     
      
      <HomePageBody data={homePageData[0]} />
    </div>
  ) 
}
