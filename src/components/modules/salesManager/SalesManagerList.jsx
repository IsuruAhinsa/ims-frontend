import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Confirm, Loading, Notify } from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import SalesManagerDetailModal from "./SalesManagerDetailModal.jsx";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import { Button, ButtonGroup } from "react-bootstrap";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import CardFooter from "../../partials/common/card/CardFooter.jsx";
import Pagination from "react-js-pagination";

const SalesManagerList = () => {
  const [salesManagers, setSalesManagers] = useState([]);

  // pagination states
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // search status
  const [input, setInput] = useState({
    order_by: "name",
    per_page: 5,
    direction: "asc",
    search: "",
  });

  const [salesManager, setSalesManager] = useState([]);
  const [detailModalShow, setDetailModalShow] = React.useState(false);

  const navigate = useNavigate();

  const getSalesManagers = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/sales-managers?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setSalesManagers(res.data.data);
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
    getSalesManagers();
  }, []);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDetailModal = (salesManager) => {
    setSalesManager(salesManager);
    setDetailModalShow(true);
  };

  // delete supplier
  const handleSalesManagerDelete = (salesManagerId) => {
    Confirm.show(
      "Delete",
      "Are you sure to delete this sales manager record?",
      "Yes",
      "No",
      () => {
        Loading.standard();
        axios
          .delete(`${Constants.BASE_URL}/sales-managers/${salesManagerId}`)
          .then((res) => {
            Notify.success(res.data.msg);
            getSalesManagers();
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
      <Breadcrumb title={"Sales Managers"} />
      <div className="row">
        <div className="container-fluid">
          <Card
            title={"All Sales Managers"}
            to={"/sales-manager/create"}
            btnText={"Add Sales Manager"}
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
                    <option value={"email"}>Email</option>
                    <option value={"phone"}>Phone</option>
                    <option value={"nic"}>NIC</option>
                    <option value={"created_at"}>Created at</option>
                    <option value={"updated_at"}>Updated at</option>
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
                    onClick={() => getSalesManagers(1)}
                  >
                    <i className="fas fa-search mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">NIC / Passport / Licence</th>
                    <th scope="col">Shop</th>
                    <th scope="col">Status</th>
                    <th scope="col">Address</th>
                    <th scope="col">Meta</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(salesManagers).length > 0 ? (
                    salesManagers.map((salesManager, index) => (
                      <tr key={index}>
                        <th scope="row">{startFrom + index}</th>
                        <td>
                          <img
                            className="img-thumbnail w-50"
                            src={salesManager.photo}
                            alt={salesManager.photo}
                          />
                          <div className="font-weight-bold">
                            {salesManager.name}
                          </div>
                          <div className="text-primary">
                            {salesManager.email}
                          </div>
                          <div className="text-success">
                            {salesManager.phone}
                          </div>
                        </td>
                        <td>
                          <img
                            className="img-thumbnail w-50"
                            src={salesManager.nic_photo}
                            alt={salesManager.nic_photo}
                          />
                          <div className="text-success">{salesManager.nic}</div>
                        </td>
                        <td>
                          <div>{salesManager.shop.company}</div>
                          <div>{salesManager.shop.email}</div>
                          <div>{salesManager.shop.phone}</div>
                          <div className="small bg-gray-100 p-1 border border-dark rounded">
                            <div>{salesManager.shop.address.address}</div>
                            <div>{salesManager.shop.address.landmark}</div>
                            <div>
                              {salesManager.shop.address.city}{" "}
                              {salesManager.shop.address.city_si}
                            </div>
                            <div>
                              {salesManager.shop.address.district}{" "}
                              {salesManager.shop.address.district_si}
                            </div>
                            <div>
                              {salesManager.shop.address.province}{" "}
                              {salesManager.shop.address.province_si}
                            </div>
                          </div>
                        </td>
                        <td>{salesManager.status}</td>
                        <td>
                          <div>{salesManager.address.address}</div>
                          <div>{salesManager.address.landmark}</div>
                          <div>
                            {salesManager.address.city}{" "}
                            {salesManager.address.city_si}
                          </div>
                          <div>
                            {salesManager.address.district}{" "}
                            {salesManager.address.district_si}
                          </div>
                          <div>
                            {salesManager.address.province}{" "}
                            {salesManager.address.province_si}
                          </div>
                        </td>
                        <td>
                          <div>Created At: {salesManager.created_at}</div>
                          <div>Updated At: {salesManager.updated_at}</div>
                          <div>
                            Created By:{" "}
                            <span className="text-primary">
                              {salesManager.created_by}
                            </span>
                          </div>
                        </td>
                        <td>
                          <ButtonGroup>
                            <Button
                              onClick={() => handleDetailModal(salesManager)}
                            >
                              <i className="fas fa-eye" />{" "}
                            </Button>
                            <Button
                              variant={"success"}
                              onClick={() =>
                                navigate(`/sales-manager/edit/${salesManager.id}`)
                              }
                            >
                              <i className="fas fa-pen" />{" "}
                            </Button>
                            <Button
                              variant={"danger"}
                              onClick={() =>
                                handleSalesManagerDelete(salesManager.id)
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
            </div>

            <CardFooter>
              <nav className="d-flex justify-content-center pagination-sm">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={getSalesManagers}
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

      <SalesManagerDetailModal
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
        salesManager={salesManager}
      />
    </>
  );
};

export default SalesManagerList;
