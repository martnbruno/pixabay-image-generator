import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";

const Imagen = ({ imagen }) => {
  const { largeImageURL, likes, previewURL, tags, views } = imagen;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card">
        <img
          src={previewURL}
          alt={tags}
          className="card-img-top"
          width="100%"
          height="150px"
        />
        <div className="card-body">
          <p className="card-text row align-items-center justify-content-center">
            <div className="mr-2">
              <FaHeart />
            </div>

            {likes}
          </p>
          <p className="card-text row align-items-center justify-content-center">
            <div className="mr-2">
              <FaEye />
            </div>
            {views}
          </p>
        </div>
        <div className="card-footer">
          <a
            href={largeImageURL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-block"
          >
            Ver Imagen
          </a>
        </div>
      </div>
    </div>
  );
};

export default Imagen;
