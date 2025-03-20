"use client";
import React from 'react'
import { useParams } from "next/navigation";

function page() {
    const { id } = useParams(); 
    console.log(id)
  return (
    <div className='card flex-fill px-3 py-3'>
        <div className='row'>
            <h3 className='col-auto text-'></h3>
            <h3 className='col-auto'></h3>
        </div>
    </div>
  )
}

export default page