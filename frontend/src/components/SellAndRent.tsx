import banner from "@public/banner-sell.png"
import Image from "next/image"
import { TbArrowsSort } from "react-icons/tb";
import { ToDateThai } from "./helpers"
import dayjs from "dayjs"
export const SellAndRent = () => {
    return <>
        <Image src={banner} alt="banner" width={100} height={100} sizes="100vm" className="object-fit-cover h-100 mb-5" priority />
        <div className="d-flex justify-content-between mb-3">
            <div>พบข้อมูล 5 ประกาศ</div>
            <div> <TbArrowsSort size={20} /> เรียงตาม:</div>
        </div>
        {[...Array(5)].map((_, index) => (
            <div className="property-group px-2 mb-3" key={index}>
                <div className="row shadow">
                    <div className="col-lg-7 px-0">
                        <div className="relative pe-none">
                            <div className="bg-light d-flex justify-content-center align-items-center">
                                {/* <IoBanOutline className="text-white w-50 h-50" /> */}
                                <Image src="/video1.png" className="object-fit-cover" width={100} height={100} style={{ height: "100%", aspectRatio: 1.999 }} alt="" sizes="100vm" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 p-1 p-lg-3">
                        <label className="bg-light rounded font2 p-3 border mb-4">กรุงเทพมหานคร</label>
                        <div className="d-flex mb-4">
                            <IconItem src="/ic-lo1.svg" />
                            <span className="font2">
                                <span>เลขที่ฝากขาย</span>
                                <span className="px-2">
                                    {String(12).padStart(5, "0")}
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-4">
                            <IconItem src="/ic-lo2.svg" />
                            <span className="font2">
                                20 ตารางวา
                            </span>
                        </div>
                        <div className="d-flex mb-4">
                            <IconItem src="/mdi_location.svg" />
                            <span className="font2">
                                พระราม 8 สามเสน ราชวัตร ศรีย่าน ดุสิต
                            </span>
                        </div>
                        <div className="d-flex mb-4">
                            <IconItem src="/ic_calendar.svg" />
                            <span className="font2">
                                {ToDateThai(dayjs(), "D MMMM BBBB")}
                            </span>
                        </div>
                        <div className="fw-bold text-lg-end text-center text-primary h2">฿ 1,490,000</div>
                    </div>
                </div>
            </div>
        ))}

    </>
}

const IconItem = ({ src, width = 25, height = 25 }: { src: string, width?: number, height?: number }) => {
    return (
        <div className="pe-1">
            <Image src={src} width={width} height={height} sizes="100vm" alt="" style={{ aspectRatio: 1 }} priority />
        </div>
    )
}