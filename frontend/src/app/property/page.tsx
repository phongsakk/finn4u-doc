"use client";
import CustomImage from "../../components/CustomImage";
import Link from "next/link";
import {
  faMagnifyingGlass,
  faClock,
  faAngleLeft,
  faAngleRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "./banner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { Map } from "@components/dev/map";
import { api } from "@utils/api/index";
import Loading from "@components/dev/loading";
import { formatCurrency, formatNumber } from "@components/helpers";
import Pagination, { PaginationInterface, PaginationModel } from "@components/dev/pagination";

function Propertysale() {
  const [assetTypes, setAssetTypes] = useState([]);
  const [assetTypeSelect, setAsTypeSelect] = useState<number>();
  const [search, setSearch] = useState("");
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    total: 1,
  });

  const [loading, setLoading] = useState(true);

  // Function to update page number safely
  const changePage = (num: number) => {
    setPage((prev) => ({ ...prev, page: num }));
  };
  console.log(123)
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const { data: res_assets } = await axios.get(api.internal("/api/general/asset"), {
          params: {
            page: page.page,
            asset_type: assetTypeSelect
          },
        });

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
  }, [page.page, assetTypeSelect]); // Runs only when page.page changes

  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const { data: res_astype } = await axios.get(api.internal("/api/asset-type"));
        if (res_astype.status) {
          setAssetTypes(res_astype.data);
        }
      } catch (err) {
        console.error("Error fetching asset types:", err);
      }
    };

    fetchAssetTypes();
  }, []); // Runs only on mount
  const formAction = async () => {
    console.log(assetTypeSelect, search);
  };
  return (
    <div className="property-sale">
      <Banner />
      <div className="container-fluid">
        <p className="title-content">ทรัพย์สินขายฝาก</p>
        <div className="step-line"></div>
        <form action={formAction} className="container">
          <div className="row filter">
            <div className="col-lg-2">
              <div className="mb-3">
                <FormSelect
                  name="asset_type"
                  onChange={(e) => setAsTypeSelect(Number(e.target.value))}
                >
                  <option value="">ประเภททรัพย์สิน</option>
                  {assetTypes.map(
                    (
                      item: {
                        id: string;
                        name: string;
                      },
                      index
                    ) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    )
                  )}
                </FormSelect>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="mb-3">
                <select id="Select1_2" className="form-select">
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="col-lg-5"></div>
            <div className="col-lg-3">
              <div className="search-group">
                <FormControl
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Link href="#" className="form-label">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="container">
        <div className="land-sale-2">
          {loading ? (
            <Loading />
          ) : (
            <>
              {assets?.map((item: any, index) => (
                <div
                  className="not-sale mb-5 property-item pe-auto"
                  key={index}
                >
                  <div className="row shadow">
                    <div className="col-lg-7">
                      <div className="relative pe-none">
                        <Map
                          position={{
                            lat: item.location_x,
                            lng: item.locataion_y,
                          }}
                        />
                        <span className="badge font2">
                          {item.asset_type_name}
                        </span>
                        <button className="btn btn-sold font2">SOLD</button>
                        <div className="time">
                          <div className="text-center">
                            <p className="font2">รอการลงทุน</p>
                            <p className="text-warning font2">
                              1 วัน 3.50 ชั่วโมง
                            </p>
                          </div>
                          <div className="icon">
                            <FontAwesomeIcon icon={faClock} />
                            <i className="fa-solid fa-clock"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="locataion p-5">
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
                          {item.collateral ? (
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
                                {formatCurrency(item.collateral)}
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
                                {formatNumber(item.consignment_price)}
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
                            <span className="font2">11 เมษายน 2565</span>
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
        {page && <Pagination Page={page} change={changePage} />}
      </div>
    </div>
  );
}
export default Propertysale;
