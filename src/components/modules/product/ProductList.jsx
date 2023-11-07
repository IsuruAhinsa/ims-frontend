import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
import Card from "../../partials/common/card/Card.jsx";
import CardFooter from "../../partials/common/card/CardFooter.jsx";
import Pagination from "react-js-pagination";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import { Confirm, Loading, Notify } from "notiflix";
import { isAdmin } from "../../../helpers/helper.js";
import {Link} from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // pagination states
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [productColumns, setProductColumns] = useState([]);

  const getProductColumns = () => {
    Loading.standard();
    axios.get(`${Constants.BASE_URL}/get-product-columns`).then((res) => {
      setProductColumns(res.data);
      Loading.remove();
    });
  };

  // search status
  const [input, setInput] = useState({
    order_by: "created_at",
    per_page: 5,
    direction: "asc",
    search: "",
  });

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getProducts = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/products?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setProducts(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setTotalItemsCount(res.data.meta.total);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
        Loading.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProductDelete = (productId) => {
    Confirm.show(
      "Delete",
      "Are you sure to delete this product record?",
      "Yes",
      "No",
      () => {
        Loading.standard();
        axios
          .delete(`${Constants.BASE_URL}/products/${productId}`)
          .then((res) => {
            Notify.success(res.data.msg);
            getProducts();
            Loading.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    );
  };

  useEffect(() => {
    getProducts();
    getProductColumns();
  }, []);

  return (
    <>
      <Breadcrumb title={"Products"} />
      <Row>
        <Container fluid>
          <Card
            title={"All Products"}
            to={"/product/create"}
            btnText={"Add Product"}
          >
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="search" className="form-label w-100">
                  Search
                  <input
                    className="form-control"
                    type="search"
                    placeholder={"Search..."}
                    name={"search"}
                    value={input.search}
                    onChange={handleInput}
                  />
                </label>
              </div>

              <div className="col-md-2">
                <label htmlFor="order_by" className="form-label w-100">
                  Order By
                  <select
                    className="custom-select"
                    name="order_by"
                    value={input.order_by}
                    onChange={handleInput}
                  >
                    {productColumns.map((column, index) => (
                      <option key={index} value={column.id}>
                        {column.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="col-md-2">
                <label htmlFor="direction" className="form-label w-100">
                  Direction
                  <select
                    className="custom-select"
                    name="direction"
                    value={input.direction}
                    onChange={handleInput}
                  >
                    <option value={"asc"}>ASC</option>
                    <option value={"desc"}>DESC</option>
                  </select>
                </label>
              </div>

              <div className="col-md-2">
                <label htmlFor="per_page" className="form-label w-100">
                  Per Page
                  <select
                    className="custom-select"
                    name="per_page"
                    value={input.per_page}
                    onChange={handleInput}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </label>
              </div>

              <div className="col-md-3">
                <div className="d-grid mt-4">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => getProducts(1)}
                  >
                    <i className="fas fa-search mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name / Brand</th>
                  <th scope="col">Attributes</th>
                  <th scope="col">Status</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Meta Data</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(products).length > 0 ? (
                  products.map((product, index) => (
                    <tr key={index}>
                      <th scope="row">{startFrom + index}</th>
                      <td>
                        <div className="font-weight-bold">{product.name}</div>
                        <div className="small">{product.brand}</div>
                      </td>
                      <td>
                        {product.attributes !== undefined &&
                        Object.keys(product.attributes).length > 0
                          ? product.attributes.map((attribute, index) => (
                              <div
                                className="small badge badge-success ml-2"
                                key={index}
                              >
                                {attribute.name} : {attribute.value}
                              </div>
                            ))
                          : null}
                      </td>
                      <td className="small">
                        <div>
                          <span className="text-primary">Status: </span>
                          {product.status}
                        </div>
                        <div>
                          <span className="text-primary">SKU: </span>
                          {product.sku}
                        </div>
                        <div>
                          <span className="text-primary">Stock: </span>
                          {product.stock}
                        </div>
                      </td>
                      <td>
                        <img
                          className="w-50 img-thumbnail"
                          src={product.photo}
                          alt={product.photo}
                        />
                      </td>
                      <td className="small">
                        <div className="badge badge-dark">
                          Sell Price &nbsp;
                          {product.sale_price.symbol} {product.sale_price.price}
                        </div>
                        <div>
                          <span className="text-primary">Price: </span>
                          {product.price}
                        </div>
                        <div>
                          <span className="text-primary">Discount: </span>
                          {product.discount_percentage} +{" "}
                          {product.discount_fixed}
                        </div>
                        <div>
                          <span className="text-primary">Cost: </span>
                          {product.cost}
                        </div>
                        <div>
                          <span className="text-primary">Discount Start: </span>
                          {product.discount_start}
                        </div>
                        <div>
                          <span className="text-primary">Discount End: </span>
                          {product.discount_end}
                        </div>
                      </td>
                      <td className="small">
                        <div>
                          <span className="text-primary">Category: </span>{" "}
                          {product.category}
                        </div>
                        <div>
                          <span className="text-primary">Sub Category: </span>{" "}
                          {product.subCategory}
                        </div>
                        <div>
                          <span className="text-primary">Country: </span>{" "}
                          {product.country}
                        </div>
                        <div>
                          <span className="text-primary">Supplier: </span>{" "}
                          {product.supplier}
                        </div>
                      </td>
                      <td className="small">
                        <div>
                          <span className="text-primary">Created by: </span>{" "}
                          {product.createdBy}
                        </div>
                        <div>
                          <span className="text-primary">Updated by: </span>{" "}
                          {product.updatedBy}
                        </div>
                        <div>
                          <span className="text-primary">Created at: </span>{" "}
                          {product.created_at}
                        </div>
                        <div>
                          <span className="text-primary">Updated at: </span>{" "}
                          {product.updated_at}
                        </div>
                      </td>
                      <td>
                        <ButtonGroup>
                          <Link to={`/product/${product.id}`}>
                            <Button>
                              <i className="fas fa-eye" />{" "}
                            </Button>
                          </Link>
                          {isAdmin() && (
                            <Button
                              variant={"danger"}
                              onClick={() => handleProductDelete(product.id)}
                            >
                              <i className="fas fa-trash" />{" "}
                            </Button>
                          )}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound colSpan={8} />
                )}
              </tbody>
            </table>

            <CardFooter>
              <nav className="d-flex justify-content-center pagination-sm">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={getProducts}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  prevPageText={"Prev"}
                  lastPageText={"Last"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                />
              </nav>
            </CardFooter>
          </Card>
        </Container>
      </Row>
    </>
  );
};

export default ProductList;
