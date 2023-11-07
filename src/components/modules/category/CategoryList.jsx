import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import CategoryPhotoModal from "./CategoryPhotoModal.jsx";
import CardFooter from "../../partials/common/card/CardFooter.jsx";
import Pagination from "react-js-pagination";
import { Button, ButtonGroup } from "react-bootstrap";
import CategoryDetailModal from "./CategoryDetailModal.jsx";
import { Confirm, Loading, Notify } from "notiflix";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import {useNavigate} from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalPhoto, setModalPhoto] = useState("");

  // pagination states
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // search status
  const [input, setInput] = useState({
    order_by: "serial",
    per_page: 5,
    direction: "asc",
    search: "",
  });

  const [category, setCategory] = useState([]);
  const [detailModalShow, setDetailModalShow] = React.useState(false);

  const navigate = useNavigate();

  const getCategories = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setCategories(res.data.data);
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

  useEffect(() => {
    getCategories();
  }, []);

  const handlePhotoModal = (photo) => {
    if (photo !== `http://127.0.0.1:8000/images/no-img.png`) {
      setModalPhoto(photo);
      setModalShow(true);
    }
  };

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDetailModal = (category) => {
    setCategory(category);
    setDetailModalShow(true);
  };

  // delete category
  const handleCategoryDelete = (categoryId) => {
    Confirm.show(
      "Delete",
      "Are you sure to delete this category?",
      "Yes",
      "No",
      () => {
        Loading.standard();
        axios
          .delete(`${Constants.BASE_URL}/category/${categoryId}`)
          .then((res) => {
            Notify.success(res.data.msg);
            getCategories();
            Loading.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    );
  };

  return (
    <>
      <Breadcrumb title={"Categories"} />
      <div className="row">
        <div className="container-fluid">
          <Card
            title={"All Categories"}
            to={"/category/create"}
            btnText={"Create"}
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
                    <option value={"name"}>Name</option>
                    <option value={"created_at"}>Created at</option>
                    <option value={"updated_at"}>Updated at</option>
                    <option value={"serial"}>Serial</option>
                    <option value={"status"}>Status</option>
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
                    onClick={() => getCategories(1)}
                  >
                    <i className="fas fa-search mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Serial No</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Date Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(categories).length > 0 ? (
                  categories.map((category, index) => (
                    <tr key={index}>
                      <th scope="row">{startFrom + index}</th>
                      <td>{category.name}</td>
                      <td>{category.serial}</td>
                      <td className="text-center">
                        <img
                          onClick={() => handlePhotoModal(category.photo_full)}
                          className="w-50 img-thumbnail"
                          src={category.photo}
                          alt={category.photo}
                        />
                      </td>
                      <td>{category.status}</td>
                      <td>{category.created_by}</td>
                      <td>
                        <p>Created: {category.created_at}</p>
                        <p>Updated: {category.updated_at}</p>
                      </td>
                      <td>
                        <ButtonGroup>
                          <Button onClick={() => handleDetailModal(category)}>
                            <i className="fas fa-eye" />{" "}
                          </Button>
                          <Button
                            variant={"success"}
                            onClick={() => navigate(`/category/edit/${category.id}`)}
                          >
                            <i className="fas fa-pen" />{" "}
                          </Button>
                          <Button
                            variant={"danger"}
                            onClick={() => handleCategoryDelete(category.id)}
                          >
                            <i className="fas fa-trash" />{" "}
                          </Button>
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
                  onChange={getCategories}
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
        </div>
      </div>

      <CategoryPhotoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        photo={modalPhoto}
      />

      <CategoryDetailModal
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
        category={category}
      />
    </>
  );
};

export default CategoryList;
