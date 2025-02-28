"use server"
import { signOut } from '@setting/auth';
import React from 'react'

const page = async () => {
    await signOut();

    return (
        <div>signing out...</div>
    )
}

export default page