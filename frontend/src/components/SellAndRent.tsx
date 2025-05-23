"use client";
import banner from "@public/banner-sell.png";
import Image from "next/image";
import { TbArrowsSort } from "react-icons/tb";
import { formatNumber, ToDateThai } from "./helpers";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@utils/api/index";
import { AnnouncementItem } from "./AnnouncementItem";
import { LoadPage } from "./dev/LoadPage";
import Pagination from "./dev/pagination";
export const SellAndRent = ({ pageType }: { pageType: string }) => {
  const [asset, setAsset] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    page: 1,
    total: 1,
  });

  const changePage = (num: number) => {
    setPage((prev) => ({ ...prev, page: num }));
  };
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const { data: res } = await axios.get(
          api.internal(`/api/${pageType}`),
          {
            params: {
              page: page.page,
            },
          }
        );
        if (res.status) {
          setAsset(res.data);
          setPage(res.page);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [page.page]);
  return (
    <>
      {loading ? (
        <LoadPage />
      ) : (
        <>
          <Image
            src={banner}
            alt="banner"
            width={100}
            height={100}
            sizes="100vm"
            className="object-fit-cover h-100 mb-5"
            priority
          />
          <div className="d-flex justify-content-between mb-3">
            <div>พบข้อมูล {formatNumber(Number(asset?.length))} ประกาศ</div>
            <div>
              <TbArrowsSort size={20} /> เรียงตาม:
            </div>
          </div>
          {asset?.map((item, index) => (
            <div key={index} className="mb-5">
              <Link href={`/${pageType}/detail/${item.id}`}>
                <AnnouncementItem prompt={item} />
              </Link>
            </div>
          ))}
          <Pagination Page={page} change={changePage} />
        </>
      )}
    </>
  );
};
