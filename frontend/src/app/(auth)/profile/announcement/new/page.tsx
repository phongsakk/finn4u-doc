import SellRentForm from '@components/announcement/SellRentForm'
import { AddressProvider } from '@components/context/AddressContext'
import React from 'react'

function page() {
  return (
    <AddressProvider>
    <SellRentForm />
    </AddressProvider>
  )
}

export default page