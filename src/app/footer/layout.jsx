'use client';
import React from 'react'

export default function Layout({data}) {
    console.log('are we getting the data from the Layout component:', data.title)
  return (
    <div>this is the layout: {data.title}</div>
  )
}
