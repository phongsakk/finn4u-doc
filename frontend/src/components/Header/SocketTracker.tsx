"use client"
import { AlertConfirm } from '@components/alert/SwalAlert'
import { useSocket } from '@hooks/socket'
import { useRouter } from "next/navigation"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import * as z from 'zod'

const ResponseSchema = z.object({
  message: z.string(),
  status: z.boolean(),
  data: z.object({
    user_id: z.number(),
    list: z.array(z.object({
      id: z.number(),
      asset_id: z.number(),
      user_id: z.number()
    }))
  })
})

const ListennerSchema = z.object({
  message: z.string(),
  newTab: z.boolean().default(false),
  url: z.string().default("")
})

const SocketTracker = () => {
  // const [data, setData] = React.useState<any>()
  const router = useRouter()
  const { data: session } = useSession()
  const { setListenners, addCallbacks } = useSocket();
  React.useEffect(() => {
    // Your socket tracking logic here
    (async () => {
      const resp = await axios.get("/api/bid/track");
      const { data } = ResponseSchema.parse(resp.data);
      setListenners([
        "test",
        data.user_id.toString(),
        ...data.list.map((item) => item.asset_id.toString())
      ]);
      addCallbacks("SocketTracker", (data) => {
        ///// Socket Logic
        const parsed = ListennerSchema.parse(JSON.parse(data))
        AlertConfirm<undefined>(parsed.message, "info", (data) => {
          if (data.isConfirmed) {
            if (parsed.newTab === true) {
              window.open(parsed.url, "_blank");
            } else {
              router.push(parsed.url)
            }
          }
        })
      });
    })();
  }, [session]);


  return null
}

export default SocketTracker