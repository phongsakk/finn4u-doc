import React from 'react'

const page = () => {
  return (
    <div>page
      <ul>
        <li>
          {process.env.NEXT_PUBLIC_AUTH_URL}
        </li>
        <li>
          {process.env.NEXT_PUBLIC_IMAGE_HOST}
        </li>
        <li>
          {process.env.NEXT_PUBLIC_API_URL}
        </li>
        <li>
          {process.env.NEXT_PUBLIC_AUTH_SECRET}
        </li>
      </ul>
    </div>
  )
}

export default page