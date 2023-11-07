import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import { Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import "./AddProdctPhoto.css";
import SubmitButton from "../../partials/common/SubmitButton.jsx";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import { Notify } from "notiflix";
import {useNavigate, useParams} from "react-router-dom";

const AddProductPhoto = () => {
  const params = useParams();
  const photoInputRef = useRef(null);
  const navigate = useNavigate();

  const [photos, setPhotos] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePhotoInputField = () => {
    photoInputRef.current.click();
  };

  const handlePhotoUploadInput = (e) => {
    let images = e.target.files;

    for (let i = 0; i < images.length; i++) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevState) => ({
          ...prevState,
          [i]: {
            ...prevState[i],
            photo: reader.result,
            ...prevState[i],
            is_primary: i == 0 ? 1 : 0,
          },
        }));
      };
      reader.readAsDataURL(images[i]);
    }
  };

  const handlePrimaryPhoto = (key) => {
    for (let i = 0; i < Object.keys(photos).length; i++) {
      setPhotos((prevState) => ({
        ...prevState,
        [i]: {
          ...prevState[key],
          is_primary: i == key ? 1 : 0,
        },
      }));
    }
  };

  const handleUploadPhotos = () => {
    axios
      .post(`${Constants.BASE_URL}/products/${params.id}/photos`, {photos}, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress(progress);
        },
      })
      .then((res) => {
        Notify.success(res.data.msg);

        setIsLoading(false);

        navigate("/product");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        }

        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <>
      <Breadcrumb title={"Add Product Photo"} />
      <Container fluid>
        <Card>
          <Card.Header>Add Product Photos</Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-center">
              <div
                className="border m-4 p-3 rounded photo-upload-container"
                onClick={handlePhotoInputField}
              >
                <i className="fas fa-camera fa-5x text-success" />
              </div>
            </div>
            <input
              type="file"
              id="photo_input"
              ref={photoInputRef}
              className="d-none"
              multiple={true}
              accept="image/png, image/jpg, image/jpeg, image/webp"
              onChange={handlePhotoUploadInput}
            />

            <Row>
              {Object.keys(photos).map((key) => (
                <Col md={2} key={key}>
                  <img
                    onClick={() => handlePrimaryPhoto(key)}
                    src={photos[key].photo}
                    className={
                      photos[key].is_primary == 1
                        ? "primary-photo img-thumbnail preview-photo"
                        : "img-thumbnail"
                    }
                    alt={"preview" + key}
                  />
                </Col>
              ))}

              <Col md={12} className={"mt-3"} style={{display: `${progress < 1 ? 'none' : 'block'}`}}>
                <ProgressBar
                  now={progress}
                  label={`${progress}%`}
                  striped={true}
                  animated={true}
                  variant={'success'}
                />
              </Col>

              <Col md={12} className={"mt-3"}>
                <SubmitButton
                  value={"Upload Photos"}
                  isLoading={isLoading}
                  onClick={handleUploadPhotos}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddProductPhoto;
