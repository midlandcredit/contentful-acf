import React from 'react';
import Image from 'next/image';
import piggy from '../public/pinkPig.gif';

export default function Loading() {
  return (
    <div>
      <img 
        className='m-[auto]' 
        src='/loading.gif'
        alt="loading gif" 
      />
    </div>
  );
}
