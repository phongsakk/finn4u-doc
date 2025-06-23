"use client";
import React from "react";

function LoadingBox() {
  return [...Array(3)].map((_, index) => (
    <div className="col-lg-4 mb-" key={index}>
      <div className="card overflow-hidden">
        <div className="head">
          <div className="not-hover position-relative">
            <div
              className="bg-light"
              style={{
                aspectRatio: 1.33,
                height: "auto",
              }}
            ></div>
          </div>
        </div>
        <div className="card-body">
          {[...Array(4)].map((_item, i) => (
            <div
              className="lazyload mb-3 rounded"
              style={{ height: "28px" }}
              key={i}
            ></div>
          ))}
        </div>
      </div>
    </div>
  ));
}

export default LoadingBox;
