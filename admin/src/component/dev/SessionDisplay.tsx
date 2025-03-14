"use client"
import React from 'react'
import { useSession } from "next-auth/react";

const SessionDisplay = () => {
  return null
  if (process.env.NODE_ENV !== "development") return null;

  const { data: session } = useSession()

  return (
    <div style={{
      position: "fixed",
      bottom: "0",
      left: "0",
      width: "100vw",
      padding: 30,
      textWrap: "wrap",
      overflow: "hidden",
      zIndex: 1000,
      backgroundColor: "rgba(255, 255, 255)",
    }}>
      SessionDisplay
      <div style={{
        width: "100%",
        textWrap: "wrap",
        wordBreak: "break-all"
      }}>{JSON.stringify(session)}</div>
    </div>
  )
}

export default SessionDisplay