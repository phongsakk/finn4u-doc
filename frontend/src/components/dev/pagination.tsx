"use client";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface PaginationInterface {
    page: number;
    total: number;
}

export const PaginationModel: PaginationInterface = {
    page: 1,
    total: 1,
};

function Pagination({ Page, change }: { Page: PaginationInterface, change: (num: number) => void }) {
    const [pages, setPages] = useState<any[]>([]);
    const total = Page.total;
    const current = Page.page;

    useEffect(() => {
        let PageArr = [];
        let i_start = current - 1 <= 0 ? 1 : current - 1;
        let i_end = current + 1 > total ? current : current + 1;

        const max = Math.max(i_start, i_end)
        const min = Math.min(i_start, i_end)
        for (let i = min; i <= max; i++) {
            PageArr.push(i)
        }

        if ((total - max) > 1) {
            PageArr.push("...")
        }

        if (max < total) {
            PageArr.push(total)
        }
        setPages(PageArr);
    }, [Page])

    return (
        <div className="pagination-main">
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center gap-2 align-items-center">
                    <li className="page-item">
                        <span
                            role="button"
                            className="text-muted"
                            onClick={() => { Page.page === 1 ? undefined : change(1) }}
                        >
                            <FaAngleDoubleLeft size={13} />
                        </span>
                    </li>
                    <li className="page-item">
                        <span
                            role="button"
                            className="text-muted"
                            onClick={() => { Page.page === 1 ? undefined : change(Math.max(1, Page.page - 1)) }
                            }
                        >
                            <FaChevronLeft size={13} />
                        </span>
                    </li>

                    {pages.map((item, index) => (
                        item === "..." ? (
                            <li key={index} className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        ) : (
                            <li key={index} className={`page-item ${Page.page === item ? "active" : ""}`}>
                                <Button
                                    disabled={Page.page === item}
                                    className={Page.page === item ? "bg-success text-white" : "bg-white"}
                                    variant="outline-success"
                                    onClick={() => change(item as number)}
                                >
                                    {item}
                                </Button>
                            </li>
                        )
                    )
                    )}

                    <li className="page-item ">
                        <span
                            role="button"
                            className="text-muted"
                            onClick={() => { Page.page === Page.total ? undefined : change(Math.min(Page.total, Page.page + 1)) }}
                        >
                            <FaChevronRight size={13} />
                        </span>
                    </li>

                    <li className="page-item">
                        <span
                            role="button"
                            className="text-muted"
                            onClick={() => { Page.page === Page.total ? undefined : change(Page.total) }
                            }
                        >
                            <FaAngleDoubleRight size={13} />
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
