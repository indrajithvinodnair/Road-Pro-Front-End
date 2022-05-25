import React from "react";
//import Card from "react-bootstrap/Card";

import '../../../static/css/gallery.css';

const Gallery = ({ data }) => {
 const model = data["modelName"];
 
  return (
    <div
      id="gallery"
      className="carousel slide gallery"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#gallery"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#gallery"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#gallery"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#gallery"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={`http://localhost:8000/${data["vehicleFront"]}`} height="700px" width="300px" className="d-block w-100" alt="front-side-img"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>{model} Front</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src={`http://localhost:8000/${data["vehicleRear"]}`} height="700px" width="300px"  className="d-block w-100" alt="rear-side-img" />
          <div className="carousel-caption d-none d-md-block">
            <h5>{model} Rear</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src={`http://localhost:8000/${data["vehicleSideLeft"]}`} height="700px" width="300px"  className="d-block w-100"  alt="left-side-img"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>{model} Side [L]</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src={`http://localhost:8000/${data["vehicleSideRight"]}`} height="700px" width="300px"  className="d-block w-100" alt="right-side-img"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>{model} Side [R]</h5>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#gallery"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#gallery"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Gallery;
