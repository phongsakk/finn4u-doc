"use client";
import { api } from "@utils/api/index";
import axios from "axios";
import { useEffect } from "react";

function page() {
  useEffect(() => {
    const boot = async () => {
      const test = await axios.post(api.internal("/api/test"));
      console.log(test)
    };
    boot();
  });
  return <div>page</div>;
}
export default page;
