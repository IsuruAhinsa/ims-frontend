import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import BarCodePage from "./BarCodePage.jsx";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

const BarCode = () => {
  const style = {
    barcodeAreaWrapper: {
      boxShadow: "0 0 10px silver",
      margin: "25px auto 25px auto",
      width: '595px',
    }
  }

  // search status
  const [input, setInput] = useState({
    name: "",
    category_id: "",
    sub_category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const componentRef = useRef();

  const handleInput = (e) => {
    if (e.target.name === "category_id") {
      getSubCategories(e.target.value);
    }

    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getCategories = () => {
    axios.get(`${Constants.BASE_URL}/get-categories-list`).then((res) => {
      setCategories(res.data);
    });
  };

  const getSubCategories = (categoryId) => {
    axios
      .get(`${Constants.BASE_URL}/get-sub-categories-list/${categoryId}`)
      .then((res) => {
        setSubCategories(res.data);
      });
  };

  const handleProductSearch = () => {
    axios
      .get(
        `${Constants.BASE_URL}/get-product-list-for-barcode?name=${input.name}&category_id=${input.category_id}&sub_category_id=${input.sub_category_id}`,
      )
      .then((res) => {
        setProducts(res.data.data);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Breadcrumb title={"Generate BarCode"} />
      <div className="row">
        <div className="container-fluid">
          <Card
            title={"Print & Generate BarCode"}
            to={"/category/create"}
            btnText={"Barcodes"}
          >
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="category_id" className="form-label w-100">
                  Select Category
                  <select
                    className="custom-select"
                    name="category_id"
                    value={input.category_id}
                    onChange={handleInput}
                  >
                    <option>Select Category</option>
                    {Object.keys(categories).length > 0 ? (
                      categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option>No Categories</option>
                    )}
                  </select>
                </label>
              </div>

              <div className="col-md-3">
                <label htmlFor="sub_category_id" className="form-label w-100">
                  Select Sub Category
                  <select
                    className="custom-select"
                    name="sub_category_id"
                    value={input.sub_category_id}
                    onChange={handleInput}
                    disabled={Object.keys(subCategories).length < 1}
                  >
                    <option>Select Sub Category</option>
                    {Object.keys(subCategories).length > 0 ? (
                      subCategories.map((subCategory, index) => (
                        <option key={index} value={subCategory.id}>
                          {subCategory.name}
                        </option>
                      ))
                    ) : (
                      <option>No Sub Categories</option>
                    )}
                  </select>
                </label>
              </div>

              <div className="col-md-3">
                <label htmlFor="name" className="form-label w-100">
                  Product Name
                  <input
                    className="form-control"
                    type="search"
                    placeholder={"Enter Product Name"}
                    name={"name"}
                    value={input.name}
                    onChange={handleInput}
                  />
                </label>
              </div>

              <div className="col-md-3">
                <div className="d-grid mt-4">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleProductSearch}
                  >
                    <i className="fas fa-search mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {Object.keys(products).length > 0 && (
        <>
          <Button className="mt-2" onClick={handlePrint}>Print</Button>
          <div style={style.barcodeAreaWrapper}>
            <BarCodePage products={products} ref={componentRef} />
          </div>
        </>
      )}
    </>
  );
};

export default BarCode;
