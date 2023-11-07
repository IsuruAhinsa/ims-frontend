import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Confirm, Loading, Notify } from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import { Button, ButtonGroup } from "react-bootstrap";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import CardFooter from "../../partials/common/card/CardFooter.jsx";
import Pagination from "react-js-pagination";
import ShopDetailModal from "./ShopDetailModal.jsx";

const ShopList = () => {
  const [shops, setShops] = useState([]);

  // pagination states
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // search status
  const [input, setInput] = useState({
    order_by: "company",
    per_page: 5,
    direction: "asc",
    search: "",
  });

  const [shop, setShop] = useState([]);
  const [detailModalShow, setDetailModalShow] = React.useState(false);

  const navigate = useNavigate();

  const getShops = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/shop?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setShops(res.data.data);
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
    getShops();
  }, []);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDetailModal = (shop) => {
    setShop(shop);
    setDetailModalShow(true);
  };

  // delete shop
  const handleShopDelete = (shopId) => {
    Confirm.show(
      "Delete",
      "Are you sure to delete this shop record?",
      "Yes",
      "No",
      () => {
        Loading.standard();
        axios
          .delete(`${Constants.BASE_URL}/shop/${shopId}`)
          .then((res) => {
            Notify.success(res.data.msg);
            getShops();
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
      <Breadcrumb title={"Shops"} />
      <div className="row">
        <div className="container-fluid">
          <Card title={"All Shops"} to={"/shop/create"} btnText={"Create Shop"}>
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
                    <option value={"company"}>Company</option>
                    <option value={"email"}>Email</option>
                    <option value={"phone"}>Phone</option>
                    <option value={"landmark"}>Landmark</option>
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
                    onClick={() => getShops(1)}
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
                    <th scope="col">Logo</th>
                    <th scope="col">Company</th>
                    <th scope="col">Status</th>
                    <th scope="col">Address</th>
                    <th scope="col">Meta</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(shops).length > 0 ? (
                    shops.map((shop, index) => (
                      <tr key={index}>
                        <th scope="row">{startFrom + index}</th>
                        <td>
                          <img
                            className="img-thumbnail w-25"
                            src={shop.logo}
                            alt={shop.logo}
                          />
                        </td>
                        <td>
                          <div className="font-weight-bold">{shop.company}</div>
                          <div className="text-primary">{shop.email}</div>
                          <div className="text-success">{shop.phone}</div>
                        </td>
                        <td>{shop.status}</td>
                        <td>
                          <div>{shop.address.address}</div>
                          <div>{shop.address.landmark}</div>
                          <div>
                            {shop.address.city} {shop.address.city_si}
                          </div>
                          <div>
                            {shop.address.district} {shop.address.district_si}
                          </div>
                          <div>
                            {shop.address.province} {shop.address.province_si}
                          </div>
                        </td>
                        <td>
                          <div>Created At: {shop.created_at}</div>
                          <div>Updated At: {shop.updated_at}</div>
                          <div>
                            Created By:{" "}
                            <span className="text-primary">
                              {shop.created_by}
                            </span>
                          </div>
                        </td>
                        <td>
                          <ButtonGroup>
                            <Button onClick={() => handleDetailModal(shop)}>
                              <i className="fas fa-eye" />{" "}
                            </Button>
                            <Button
                              variant={"success"}
                              onClick={() => navigate(`/shop/edit/${shop.id}`)}
                            >
                              <i className="fas fa-pen" />{" "}
                            </Button>
                            <Button
                              variant={"danger"}
                              onClick={() => handleShopDelete(shop.id)}
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
                  onChange={getShops}
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

      <ShopDetailModal
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
        shop={shop}
        address={shop.address}
      />
    </>
  );
};

export default ShopList;
