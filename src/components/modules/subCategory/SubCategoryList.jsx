import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import SubCategoryPhotoModal from "./SubCategoryPhotoModal.jsx";
import SubCategoryDetailModal from "./SubCategoryDetailModal.jsx";
import { useNavigate } from "react-router-dom";
import Card from "../../partials/common/card/Card.jsx";
import { Button, ButtonGroup } from "react-bootstrap";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import CardFooter from "../../partials/common/card/CardFooter.jsx";
import Pagination from "react-js-pagination";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import {Confirm, Loading, Notify} from "notiflix";

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
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

  const [subCategory, setSubCategory] = useState([]);
  const [detailModalShow, setDetailModalShow] = React.useState(false);

  const navigate = useNavigate();

  const getSubCategories = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/sub-category?page${pageNumber}&search=${input.search}&direction=${input.direction}&order_by=${input.order_by}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setSubCategories(res.data.data);
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
    getSubCategories();
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

  const handleDetailModal = (subCategory) => {
    setSubCategory(subCategory);
    setDetailModalShow(true);
  };

  const handleSubCategoryDelete = (subCategoryId) => {
    Confirm.show(
        "Delete",
        "Are you sure to delete this sub category?",
        "Yes",
        "No",
        () => {
          Loading.standard();
          axios
              .delete(`${Constants.BASE_URL}/sub-category/${subCategoryId}`)
              .then((res) => {
                Notify.success(res.data.msg);
                getSubCategories();
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
      <Breadcrumb title={"Sub Categories"} />
      <div className="row">
        <div className="container-fluid">
          <Card
            title={"All Sub Categories"}
            to={"/sub-category/create"}
            btnText={"Create Sub Category"}
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
                    onClick={() => getSubCategories(1)}
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
                  <th scope="col">Category Name</th>
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
                {Object.keys(subCategories).length > 0 ? (
                  subCategories.map((subCategory, index) => (
                    <tr key={index}>
                      <th scope="row">{startFrom + index}</th>
                      <td>{subCategory.category}</td>
                      <td>{subCategory.name}</td>
                      <td>{subCategory.serial}</td>
                      <td className="text-center">
                        <img
                          onClick={() =>
                            handlePhotoModal(subCategory.photo_full)
                          }
                          className="w-50 img-thumbnail"
                          src={subCategory.photo}
                          alt={subCategory.photo}
                        />
                      </td>
                      <td>{subCategory.status}</td>
                      <td>{subCategory.created_by}</td>
                      <td>
                        <div>Created: {subCategory.created_at}</div>
                        <div>Updated: {subCategory.updated_at}</div>
                      </td>
                      <td>
                        <ButtonGroup>
                          <Button
                            onClick={() => handleDetailModal(subCategory)}
                          >
                            <i className="fas fa-eye" />{" "}
                          </Button>
                          <Button
                            variant={"success"}
                            onClick={() =>
                              navigate(`/sub-category/edit/${subCategory.id}`)
                            }
                          >
                            <i className="fas fa-pen" />{" "}
                          </Button>
                          <Button
                            variant={"danger"}
                            onClick={() =>
                              handleSubCategoryDelete(subCategory.id)
                            }
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
                  onChange={getSubCategories}
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

      <SubCategoryPhotoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        photo={modalPhoto}
      />

      <SubCategoryDetailModal
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
        subCategory={subCategory}
      />
    </>
  );
};

export default SubCategoryList;
