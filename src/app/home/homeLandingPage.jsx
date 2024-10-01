import React from 'react'

export default function HomeLandingPage({data}) {
  console.log('making sure that we get the url: ', data.heroImageMobile.url)
  
  return (
    <div className={`pt-[25px] pb-[70px] px-[30px] `}>
        <h1 className='text-[20px] my-[10px] leading-[normal]'>{data.title}</h1>
        <div className='w-[60%] text-[14px] text-[#FFFFFF] my-[15px] mb-[30px] py-[10px] bg-[#143B62] border rounded-45px px-[12px] py-[10px] h-fit text-center' >
            <a href={data.buttonUrl} >{data.buttonText}</a>
        </div>
        <div className='text-right text-standard leading-[normal] ml-[auto] w-[85%]'>{data.footer}</div>

      
    </div>
  )
}
