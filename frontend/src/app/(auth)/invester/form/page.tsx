import Link from 'next/link'
import React from 'react'

function FormPage() {
    return (
        <div className='investment-form'>
            <div className="container">
                <div className="wrap">
                    <h3 className="title-content font2">Update ข้อมูลนักลงทุน</h3>

                    <p className="title font2">เลือกประเภทสินทรัพย์ที่สนใจ (สามารถเลือกได้มากกว่า 1 ประเภท)</p>
                    <div className="form">
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2">ที่ดินเปล่า</label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >บ้านเดี่ยว</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ทาวน์เฮ้าส์</label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >คอนโด</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2"
                                    >ที่ดินพร้อมสิ่งปลูกสร้าง</label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >พื้นที่เกษตรกรรม</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >พื้นที่อุตสาหกรรม</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="title font2">เลือกประเภทสินทรัพย์ที่สนใจ (สามารถเลือกได้มากกว่า 1 ประเภท)</p>
                    <div className="form">
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ทั่วประเทศ</label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ภาคกลาง</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >กรุงเทพฯ</label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ภาคอีสาน</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >กรุงเทพฯและปริมณฑล</label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ภาคตะวันตก</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ภาคเหนือ</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ภาคตะวันออก</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label font2" >ภาคใต้</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="title font2">เลือกช่วงราคาที่ต้องการลงทุน</p>
                    <div className="form">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <select id="Select1" className="form-select font2">
                                        <option>กรุณาเลือก</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link href="/invester/index" className="btn-icon  mt-5 mb-5">
                            <span>Update ข้อมูล</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FormPage