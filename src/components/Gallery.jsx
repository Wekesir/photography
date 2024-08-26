import React from "react";

export default function Gallery() {
  return (
    <div className="container-fluid py-4">
      <h1 className="text-white text-center fw-bold py-4">
        Our <span className="gradient-text">Gallery</span>
      </h1>
      <div className="row g-2">
        <div className="col-6 col-md-2">
          <img
            src="https://cdn.pixabay.com/photo/2023/10/06/07/02/spiders-web-8297580_640.jpg"
            alt=""
          />
        </div>
        <div className="col-6 col-md-2">
          <img
            src="https://cdn.pixabay.com/photo/2023/11/06/02/16/butterfly-8368603_640.jpg"
            alt=""
          />
        </div>
        <div className="col-6 col-md-2">
          <img
            src="https://cdn.pixabay.com/photo/2023/09/04/19/10/butterfly-8233505_640.jpg"
            alt=""
          />
        </div>
        <div className="col-6 col-md-2">
          <img
            src="https://cdn.pixabay.com/photo/2014/07/29/08/55/cactus-404362_640.jpg"
            alt=""
          />
        </div>
        <div className="col-6 col-md-2">
          <img
            src="https://cdn.pixabay.com/photo/2022/12/16/16/15/green-leaves-7660080_640.jpg"
            alt=""
          />
        </div>
        <div className="col-6 col-md-2">
          <img
            src="https://cdn.pixabay.com/photo/2013/08/15/12/44/padlock-172770_640.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
