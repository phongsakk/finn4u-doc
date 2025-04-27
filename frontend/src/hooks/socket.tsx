"use client"
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
// import "../setting/loadEnv"

type SocketCallback = (data: any) => void

type SocketContextProps = {
  listenners: Array<string>;
  setListenners: (input: Array<string>) => void;
  callbacks: Map<string, SocketCallback>,
  addCallbacks: (name: string, callback: SocketCallback) => void
  removeCallbacks: (name: string) => void
};

const SOCKET_BASE_URL: string = process.env.NEXT_PUBLIC_SOCKET_BASE_URL ?? "http://localhost:3000"
const SOCKET_PATH: string = process.env.NEXT_PUBLIC_SOCKET_PATH ?? ""
const SOCKET_PREFIX: string = process.env.NEXT_PUBLIC_SOCKET_PREFIX ?? "ocr-update"

const SocketContext = createContext<SocketContextProps>({
  listenners: [],
  setListenners: () => { },
  callbacks: new Map<string, SocketCallback>(),
  addCallbacks: () => { },
  removeCallbacks: () => { },
});

export const useSocket = () => useContext(SocketContext)

export const SocketListener = () => {
  const { listenners, callbacks } = useSocket()

  useEffect(() => {
    // console.log("change", listenners);
    let _socket: Socket

    const start = async () => {
      _socket = io(SOCKET_BASE_URL, {
        reconnectionDelayMax: 10000,
        path: SOCKET_PATH
      });

      listenners.map((listenner) => {
        // console.log("listen: ", listenner)
        _socket.on(`${SOCKET_PREFIX}-${listenner}`, (data) => {
          callbacks.forEach((callback) => callback(data))
        });
      })
    };
    start();
    return () => {
      _socket.close()
    }
  }, [listenners, callbacks]);

  return null
}

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [listenners, setListenners] = useState<Array<string>>([])
  const [callbacks, setCallbacks] = useState<Map<string, SocketCallback>>(new Map<string, SocketCallback>())

  const addCallbacks = (key: string, callback: SocketCallback) => {
    setCallbacks((pre) => {
      const entried = pre.entries();
      const mapped = new Map(entried)
      mapped.set(key, callback)
      return mapped
    })
  }

  const removeCallbacks = (key: string) => {
    setCallbacks((pre) => {
      const entried = pre.entries();
      const mapped = new Map(entried)
      mapped.delete(key)
      return mapped
    })
  }

  return <SocketContext.Provider value={{
    listenners, setListenners,
    callbacks, addCallbacks, removeCallbacks
  }}>
    <SocketListener />
    {children}
  </SocketContext.Provider>
}
