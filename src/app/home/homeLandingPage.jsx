import React from 'react'

export default function HomeLandingPage({data}) {
  // console.log('making sure that we get the url: ', data.heroImageMobile.url)
  
  return (
    <div className={`pt-[25px] pb-[20px] bg-morning-sky-blue px-[30px] tablet:bg-transparent laptop:px-[60px] tablet:px-[25px] tablet:mx-[20px]  tablet:pb-[35px] tablet:flex tablet:flex-col tablet:m-auto tablet:relative tablet:h-full tablet:justify-center `}>
        <h1 className='my-[10px] leading-[normal] w-[81%] text-clamp-title tablet:w-[49%]'>{data.title}</h1>
        <div className='w-[207px] tablet:w-clamp-width-button text-[14px] tablet:text-clamp-button text-[#FFFFFF] my-[15px] mb-[30px] py-[10px] bg-[#143B62] border rounded-45px px-[12px] py-[10px] h-fit text-center' >
            <a href={data.buttonUrl} >{data.buttonText}</a>
        </div> 
        <div className='text-right text-clamp-footer leading-[normal] ml-[auto] tablet:mt-0 tablet:self-end w-[75%] tablet:w-[90%] tablet:text-center tablet:px-0 laptop:px-[30px] tablet:absolute tablet:bottom-0 tablet:mb-[30px]'>{data.footer}</div>

      
    </div>
  )
}
