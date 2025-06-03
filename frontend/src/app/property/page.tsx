"use client";
import CustomImage from "../../components/CustomImage";
import Link from "next/link";
import { faMagnifyingGlass, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, FormSelect, Row } from "react-bootstrap";
import { IoBanOutline } from "react-icons/io5";
import { api } from "@utils/api/index";
import Loading from "@components/dev/loading";
import { formatCurrency, formatNumber, ToDateThai } from "@components/helpers";
import Pagination from "@components/dev/pagination";
import { FormSelectCustom } from "@components/FormCustom/FormSelectCustom";
import { PriceRange } from "@models/MasterModel";
import ImageApi from "@components/ImageApi";
import dayjs from "dayjs";
const MasterData = {
  asset_type: [],
  price_range: [],
};
const SearchModel = {
  asset_type: "",
  price_range: "",
  search_box: "",
};

function Propertysale() {
  const [master, setMaster] = useState(MasterData);
  const [formSearch, setFormSearch] = useState(SearchModel);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState({
    page: 1,
    total: 1,
  });

  const changePage = (num: number) => {
    setPage((prev) => ({ ...prev, page: num }));
  };

  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const { data: res_astype } = await axios.get(
          api.internal("/api/asset-type")
        );
        if (res_astype.status) {
          setMaster({
            asset_type: res_astype.data,
            price_range: PriceRange as [],
          });
        }
      } catch (err) {
        console.error("Error fetching asset types:", err);
      }
    };

    fetchAssetTypes();
  }, []); // Runs only on mount

  const handleSearch = (e: any) => {
    setFormSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formAction = async () => {
    // console.log(assetTypeSelect, search);
  };

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const { data: res_assets } = await axios.get(
          api.internal("/api/consignor/asset/public"),
          {
            params: {
              page: page.page,
              asset_type: formSearch.asset_type,
            },
          }
        );

        if (res_assets.status) {
          setAssets(res_assets.data);
          setPage(res_assets.page);
        }
      } catch (err) {
        console.error("Error fetching assets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [page.page, formSearch.asset_type]);
  return (
    <div className="property-sale">
      <Banner />
      <div className="container-fluid">
        <p className="title-content">ทรัพย์สินขายฝาก</p>
        <div className="step-line"></div>
        <form action={formAction} className="container">
          <Row className="filter">
            <FormSelectCustom
              groupClass="col-lg-3 mb-3"
              name="asset_type"
              onChange={handleSearch}
              data={master.asset_type as []}
              choose="ประเภททรัพย์สิน"
              value={formSearch.asset_type}
            />
            <FormSelectCustom
              groupClass="col-lg-3 mb-3"
              name="price_range"
              onChange={handleSearch}
              data={master.price_range as []}
              choose="ช่วงราคา"
              value={formSearch.price_range}
            />
            <div className="col-lg-2"></div>
            <div className="col-lg-4">
              <div className="search-group">
                <FormControl
                  name="search_box"
                  value={formSearch.search_box}
                  onChange={handleSearch}
                />
                <Link href="#" className="form-label">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
              </div>
            </div>
          </Row>
        </form>
      </div>

      <div className="container">
        <div className="land-sale-2 p-2 p-md-3 p-lg-0">
          {loading ? (
            <Loading />
          ) : (
            <>
              {assets?.map((item: any, index) => (
                <div
                  className="not-sale mb-5 property-item pe-auto "
                  key={index}
                >
                  <div className="row shadow">
                    <div className="col-lg-7 bg-white">
                      <div className="relative pe-none h-100">
                        <ImageApi
                          className="property-img"
                          src={item?.asset_image}
                          style={{ aspectRatio: 1.79, height: "100%" }}
                        />
                        <span className="badge font2">
                          {item.asset_type_name}
                        </span>
                        <button className="btn btn-sold font2">SOLD</button>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="locataion p-1 p-sm-5 p-lg-5">
                        <p className="font2">{item.province_name}</p>
                        <ul>
                          <li>
                            <CustomImage
                              src="/ic-lo1.svg"
                              alt="ic-lo1"
                              style={{
                                width: "6%",
                                height: "auto",
                              }}
                            />
                            <span className="font2">
                              <span>เลขที่ฝากขาย</span>
                              <span className="px-2">
                                {String(item.id).padStart(5, "0")}
                              </span>
                            </span>
                          </li>
                          <li>
                            <CustomImage
                              src="/ic-lo2.svg"
                              alt="ic-lo2"
                              style={{
                                width: "6%",
                                height: "auto",
                              }}
                            />

                            <span className="font2">{item.aria_size}</span>
                          </li>
                          {item.price_appraisal ? (
                            <li>
                              <CustomImage
                                src="/ic-lo3.svg"
                                alt="ic-lo3"
                                style={{
                                  width: "6%",
                                  height: "auto",
                                }}
                              />

                              <span className="font2">
                                มูลค่าสินทรัพย์ค้ำประกัน
                              </span>
                              <span className="text-primary font2 px-1">
                                {formatCurrency(item.collateral_price)}
                              </span>
                            </li>
                          ) : null}

                          <li>
                            <CustomImage
                              src="/ic-lo4.svg"
                              alt="ic-lo4"
                              style={{
                                width: "6%",
                                height: "auto",
                              }}
                            />

                            <span className="font2">
                              ราคาขายฝาก
                              <span className="text-primary font2 px-1">
                                {formatNumber(item.price_appraisal)}
                              </span>
                              บาท
                            </span>
                          </li>
                          <li>
                            <CustomImage
                              src="/ic-lo5.svg"
                              alt="ic-lo5"
                              style={{
                                width: "6%",
                                height: "auto",
                              }}
                            />
                            <span className="font2">
                              {ToDateThai(dayjs(item?.date_sell))}
                            </span>
                          </li>
                        </ul>
                        <div className="wrap">
                          <Link
                            href={`/property/detail/${item.id}`}
                            role="button"
                            className="btn btn-light"
                          >
                            ข้อมูลเพิ่มเติม
                          </Link>
                          <Link
                            href={`/property/detail/${item.id}`}
                            role="button"
                            className="btn btn-primary"
                          >
                            ลงทุน
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <Pagination Page={page} change={changePage} />
      </div>
    </div>
  );
}
export default Propertysale;
