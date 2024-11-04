import React from 'react'
import Strip1 from './Strip1'
import Strip2 from './Strip2'
import Strip3 from './Strip3'
import Strip4 from './Strip4'

export default function Dashboard() {
  return (
    <div className=' bg-gray-200 text-gray-700'>
      <Strip1/>
      {/* <Strip2/> */}
      <Strip3/>
      <Strip4/>
    </div>
  )
}
