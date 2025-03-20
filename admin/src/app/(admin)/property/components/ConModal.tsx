"use client";
import { ConsignParam, DoAppraisal } from "@models/asset";
import { Button, Modal } from "react-bootstrap/";
import Image from "next/image";
import checkImage from "@/public/check.png";
import pencilImage from "@/public/pencil.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@utils/api";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { handleNumberChange } from "@component/dev/Helpers";
import ImportTagsModal, { TagModalType } from "./TagsModal";
import LoadingModal from "./LoadingModal";

dayjs().locale("th");

export type PropertyModal = {
  id?: number,
  open: boolean,
  close?: () => void
}

function ConModal(ModalOpen: PropertyModal) {
  console.log(ModalOpen)
  const [assetmodel, setAssetModel] = useState<any>();
  const [loadPage, setLoadPage] = useState<boolean>();

  const [editTags, setEditTags] = useState<TagModalType>();

  const [priceAppraisal, setPriceAppr] = useState<string>();
  const [collateralPrice, setcollPrice] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [images, setImages] = useState<any[]>([]);
  const [imagesSelect, setImagesSelect] = useState<{ [key: number]: number }>(
    {}
  );
  const [tags, setTags] = useState<any[]>([]);
  const [tagsSeclect, setTagsSelect] = useState<{ [key: number]: number }>([]);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [findInvester, setFindInvester] = useState<boolean>(false);
  const [max_tax, serMaxTax] = useState<string>();

  const [fromDate, setFromDate] = useState<Date | null>();
  const [fromTime, setFromTime] = useState<string>();
  const [toDate, setToDate] = useState<Date | null>();
  const [toTime, setToTime] = useState<string>();
  const [status, setStatus] = useState<number>(0);

  const handleModalClose = () => {
    ModalOpen.close?.();
    setLoadPage(false);
  }

  const handleTagClose = () => {
    setEditTags({ open: false });
  };

  useEffect(() => {
    const boot = async () => {
      setLoadPage(true)

      try {
        const { data: ass_res } = await axios.get(
          api.internal(`/api/asset/${ModalOpen.id}`)
        );
        console.log(ass_res);
        if (ass_res) {
          setAssetModel(ass_res.assetMain);
          if (ass_res.asset_appraisal) {
            setPriceAppr(ass_res.asset_appraisal.price_appraisal);
            setcollPrice(ass_res.asset_appraisal.collateral_price);
            setDuration(ass_res.asset_appraisal.duration);
          }
          if (ass_res.images) {
            setImages(ass_res.images || []);

            setImagesSelect(
              ass_res.images
                .filter((item: any) => item.is_display === true)
                .reduce((acc: { [key: number]: number }, item: any) => {
                  acc[item.id] = item.id;
                  return acc;
                }, {})
            );
          }

          if (ass_res.tags) {
            setTags(ass_res.tags || []);

            setTagsSelect(
              ass_res.tags
                .filter((item: any) => item.is_check === true)
                .reduce((acc: { [key: number]: number }, item: any) => {
                  acc[item.id] = item.id;
                  return acc;
                }, {})
            );
          }
          setIsPublished(ass_res.assetMain.is_published);
          if (ass_res.asset_auction) {
            setFromDate(ass_res.asset_auction.from_date);
            setFromTime(ass_res.asset_auction.from_time);
            setToDate(ass_res.asset_auction.to_date);
            setToTime(ass_res.asset_auction.to_time);
            serMaxTax(ass_res.asset_auction.max_tax);
          }
          setStatus(ass_res.assetMain.status);
        }
      } catch (error) {
        console.error("API assets error!", error);
      } finally {
        setLoadPage(false);
      }
    };
    if (ModalOpen.id != undefined) {
      boot();
    }
  }, [ModalOpen.id]);

  const handleChecktag = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked, value } = e.target;

    setTags((prevTags) =>
      prevTags.map((item) =>
        item.id === id ? { ...item, is_check: checked } : item
      )
    );

    setTagsSelect((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[id] = Number(value);
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const handleCheckboxImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked, value } = e.target;

    setImages((prevImages) =>
      prevImages.map((item) =>
        item.id === id ? { ...item, is_display: checked } : item
      )
    );

    setImagesSelect((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[id] = Number(value);
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const submitform = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(imagesSelect)
    if (Object.keys(imagesSelect).length === 0) return alert("กรุณากรอก: เลือกรูปภาพ");
    if (!priceAppraisal) return alert("กรุณากรอก: ราคาขายฝากจากการประเมิน");
    if (!collateralPrice) return alert("กรุณากรอก: มูลค่าทรัพย์สินค้ำระกัน");
    if (!duration) return alert("กรุณากรอก: ระยะเวลาขายฝาก");
    // if (!max_tax) return alert("กรุณากรอก: ระบุดอกเบี้ยสูงสุด (%)");

    const formData = {
      price_appraisal: Number(priceAppraisal),
      collateral_price: Number(collateralPrice),
      duration: Number(duration),
      display_images: Object.values(imagesSelect).map((e) => Number(e)),
      tags: Object.values(tagsSeclect),
      is_published: isPublished,
      find_invester: findInvester,
      status: status,
      auction: {
        from_date: fromDate || null,
        from_time: fromTime || null,
        to_date: toDate || null,
        to_time: toTime || null,
        max_tax: Number(max_tax),
      },
    } as DoAppraisal;

    try {
      const { data: ass_res } = await axios.post(
        api.internal(`/api/asset/appraisal/${ModalOpen.id}`),
        {
          formData,
        }
      );
      alert("บันทึกข้อมูลสำเร็จ");
      window.location.reload();
    } catch (error) {
      alert("ไม่สามารบันทึก กรุณาลองใหม่อีหครั้ง");
      console.error("API save appraisal error!", error);
    }
  };



  return (
    <>
      {editTags != undefined && editTags.open == true ? <ImportTagsModal open={editTags.open} close={handleTagClose} /> : null}


      <Modal
        show={ModalOpen.open}
        onHide={handleModalClose}
        id="modal-estimate"
        size="lg"
      >
        {loadPage ? (<>
          <LoadingModal />
        </>) : (
          <>

            <form onSubmit={submitform}>
              <Modal.Body>
                <Button variant="close" onClick={handleModalClose}></Button>
                <h3 className="mb-3">ข้อมูลจากการประเมินราคา</h3>
                <div className="row mb-3">
                  <div className="col-lg-5">
                    <input
                      onChange={(e) => {
                        handleNumberChange(e, setPriceAppr);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="ราคาขายฝากจากการประเมิน"
                      value={priceAppraisal ?? ""}
                    />
                  </div>
                  <div className="col-lg-4">
                    <input
                      onChange={(e) => {
                        handleNumberChange(e, setcollPrice);
                      }}
                      value={collateralPrice ?? ""}
                      type="text"
                      className="form-control"
                      placeholder="มูลค่าทรัพย์สินค้ำระกัน"
                    />
                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center">
                      <input
                        onChange={(e) => {
                          handleNumberChange(e, setDuration);
                        }}
                        value={duration ?? ""}
                        type="text"
                        className="form-control"
                        placeholder="ระยะเวลาขายฝาก"
                      />
                      <span className="mx-1">ปี</span>
                    </div>
                  </div>
                </div>

                <h4 className="mt-1 mb-3">
                  เลือกรูปภาพให้แสดง<span className="text-secondary">(3 รูป)</span>
                </h4>

                <div className="row mb-3">
                  {images.map((item: any, index: number) => (
                    <div
                      className="col-lg-4 col-sm-4 mb-1 nopad text-center"
                      key={index}
                    >
                      <label className="image-checkbox" htmlFor={`images-${index}`}>
                        <input
                          onChange={(e) => handleCheckboxImages(e, item.id)}
                          name="images[]"
                          value={item.id}
                          id={`images-${index}`}
                          className="select-image d-none"
                          type="checkbox"
                          checked={item.is_display}
                        />
                        <img
                          className="img-responsive w-100 object-fit"
                          src={item.name}
                          width={100}
                        />
                        <Image className="img-check" src={checkImage} alt="" />
                      </label>
                    </div>
                  ))}
                </div>

                <h4 className="mt-1 mb-3">อัพโหลดภาพจากการประเมิน</h4>
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <input
                      className="form-control mb-3 d-none"
                      type="file"
                      multiple
                      id="select-file"
                    />
                    <label className="btn btn-secondary" htmlFor="select-file">
                      อัพโหลดรูปภาพ
                    </label>
                  </div>
                </div>

                <h4 className="mb-3">การมองเห็นโพสต์</h4>

                <div className="form-check mb-3">
                  <div className="d-flex">
                    <input
                      onChange={() => setIsPublished(false)}
                      checked={!isPublished ? true : false}
                      className="form-check-input"
                      name="isPublished"
                      type="radio"
                      id="memberonly"
                    />
                    <label
                      className="form-check-label cs mx-2"
                      htmlFor="memberonly"
                    >
                      สมาชิกเท่านั้น
                    </label>

                    <input
                      onChange={() => setIsPublished(true)}
                      checked={isPublished ? true : false}
                      className="form-check-input ms-1 mx-2"
                      name="isPublished"
                      type="radio"
                      value="public"
                      id="public"
                    />
                    <label className="form-check-label" htmlFor="public">
                      สาธารณะ
                    </label>
                  </div>
                </div>

                <div className="row mb-3 ">
                  <h4 className="col-auto">การมองเห็นโพสต์</h4>
                  <span className="col-auto text-seccondary">(กรณีต้องการหาผู้ร่วมลงทุน)</span>
                </div>
                <div className="form-check mb-3">
                  <div className="d-flex">
                    <input
                      onChange={(e) => setFindInvester(e.target.checked)}
                      checked={findInvester}
                      className="form-check-input"
                      name="findInvester"
                      type="checkbox"
                      id="findInvester"
                    />
                    <label
                      className="form-check-label cs mx-2"
                      htmlFor="findInvester"
                    >
                      หาผู้ร่วมลงทุน
                    </label>
                  </div>
                </div>

                <div className="edit mb-3">
                  <h4 className="m-0">สถานที่สำคัญบริเวณพื้นที่</h4>

                  <div className="edit" onClick={() => setEditTags({ open: true, close: handleTagClose })}>
                    <Image src={pencilImage} className="" alt="" />
                    <p>แก้ไข</p>
                  </div>
                </div>

                <div className="area-check mb-3">
                  {tags?.map((item: any, index: number) => (
                    <label
                      className="col-sm-auto btn btn-light btn-primary"
                      htmlFor={`check_${index}`}
                      key={index}
                      tabIndex={0}
                    >
                      <input
                        name={`tags[${item.id}]`}
                        value={item.id}
                        type="checkbox"
                        id={`check_${index}`}
                        className="btn-check"
                        onChange={(e) => {
                          handleChecktag(e, item.id);
                        }}
                        checked={item.is_check}
                      />
                      {item.name}
                    </label>
                  ))}
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="row mb-3">
                    <h3>การประมูล</h3>
                    <div className="col-lg-6">
                      <div className="form-group mb-2">
                        <DatePicker
                          label="ตั้งแต่วันที่"
                          name="start_date"
                          value={fromDate ? dayjs(fromDate) : null}
                          onChange={(newDate: Dayjs | null) =>
                            setFromDate(newDate ? newDate.toDate() : null)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <TimePicker
                          label="ตั้งแต่เวลา"
                          name="start_time"
                          value={fromTime ? dayjs(fromTime, "HH:mm") : null}
                          onChange={(newTime) =>
                            setFromTime(newTime ? newTime.format("HH:mm") : "")
                          }
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-2">
                        <DatePicker
                          label="ถึงวันที่"
                          name="end_date"
                          value={toDate ? dayjs(toDate) : null}
                          onChange={(newDate: Dayjs | null) =>
                            setToDate(newDate ? newDate.toDate() : null)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <TimePicker
                          name="end_time"
                          label="ถึงเวลา"
                          value={toTime ? dayjs(toTime, "HH:mm") : null}
                          onChange={(newTime) =>
                            setToTime(newTime ? newTime.format("HH:mm") : "")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </LocalizationProvider>

                <div className="row">
                  <div className="form-group col-lg-6">
                    <label className="form-label">ระบุดอกเบี้ยสูงสุด (%)</label>
                    <input
                      onChange={(e) => {
                        handleNumberChange(e, serMaxTax);
                      }}
                      value={max_tax ?? ""}
                      className="form-control"
                      name="max_tax"
                    />
                  </div>
                </div>
                <h4 className="mb-3">สถานะ</h4>
                <div className="form-check mb-3">
                  <div className="d-flex">
                    <input
                      onChange={(e) => setStatus(Number(e.target.value))}
                      checked={status === 0 ? true : false}
                      className="form-check-input"
                      name="asset_status"
                      type="radio"
                      value={0}
                      id="wait_assessment"
                    />
                    <label
                      className="form-check-label cs mx-2"
                      htmlFor="wait_assessment"
                    >
                      รอการประเมินราคา
                    </label>

                    <input
                      onChange={(e) => setStatus(Number(e.target.value))}
                      checked={status === 2 ? true : false}
                      className="form-check-input ms-1 mx-2"
                      name="asset_status"
                      type="radio"
                      value={2}
                      id="wait_maching"
                    />
                    <label className="form-check-label" htmlFor="wait_maching">
                      รอ Maching
                    </label>

                    <input
                      onChange={(e) => setStatus(Number(e.target.value))}
                      checked={status === 1 ? true : false}
                      className="form-check-input ms-1 mx-2"
                      name="asset_status"
                      type="radio"
                      value={1}
                      id="join_invest"
                    />
                    <label className="form-check-label" htmlFor="join_invest">
                      ร่วมลงทุน
                    </label>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mx-1">
                  บันทึก
                </button>
              </Modal.Footer>
            </form>
          </>
        )}
      </Modal>
    </>

  );
}
export default ConModal;
