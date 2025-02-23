'use client'

import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const { id } = useParams()

  return (
    <div>{id ? `Page ID: ${id}` : 'Loading...'}</div>
  )
}

export default Page
