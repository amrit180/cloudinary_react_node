import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const ImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const uploadImageToServer = (e) => {
    let files = e.target.files;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) =>
            await axios
              .post("http://localhost:8000/api/upload-image", {
                urls: uri,
                fName: "test",
              })
              .then((res) => {
                console.log(res.data);
                images.push(res.data.secure_url);
              })
        );
      }
      setLoading(false);
    }
  };
  return (
    <>
      {images?.map((v, i) => {
        return (
          <div key={i}>
            <img src={v} style={{ height: 300, height: 300 }} />;
          </div>
        );
      })}
      <label className="btn btn-primary btn-raised mt-3">
        UPLOAD PRODUCT IMAGE
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={uploadImageToServer}
        />
      </label>
    </>
  );
};

export default ImageUploader;
