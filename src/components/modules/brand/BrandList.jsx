import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Confirm, Loading, Notify} from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import {Button, ButtonGroup} from "react-bootstrap";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import CardFooter from "../../partials/common/card/CardFooter.jsx";
import Pagination from "react-js-pagination";
import CategoryDetailModal from "../brand/BrandDetailModal.jsx";

const BrandList = () => {
    const [brands, setBrands] = useState([]);

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

    const [brand, setBrand] = useState([]);
    const [detailModalShow, setDetailModalShow] = React.useState(false);

    const navigate = useNavigate();

    const getBrands = (pageNumber) => {
        Loading.standard();

        axios
            .get(
                `${Constants.BASE_URL}/brand?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
            )
            .then((res) => {
                setBrands(res.data.data);
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
        getBrands();
    }, []);

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleDetailModal = (brand) => {
        setBrand(brand);
        setDetailModalShow(true);
    };

    // delete brand
    const handleBrandDelete = (brandId) => {
        Confirm.show(
            "Delete",
            "Are you sure to delete this brand?",
            "Yes",
            "No",
            () => {
                Loading.standard();
                axios
                    .delete(`${Constants.BASE_URL}/brand/${brandId}`)
                    .then((res) => {
                        Notify.success(res.data.msg);
                        getBrands();
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
            <Breadcrumb title={"Brands"} />
            <div className="row">
                <div className="container-fluid">
                    <Card
                        title={"All Brands"}
                        to={"/brand/create"}
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
                                        onClick={() => getBrands(1)}
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
                                <th scope="col">Logo</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Date Time</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(brands).length > 0 ? (
                                brands.map((brand, index) => (
                                    <tr key={index}>
                                        <th scope="row">{startFrom + index}</th>
                                        <td>{brand.name}</td>
                                        <td className="text-center">
                                            <img
                                                className="w-50 img-thumbnail"
                                                src={brand.logo}
                                                alt={brand.logo}
                                            />
                                        </td>
                                        <td>{brand.status}</td>
                                        <td>{brand.created_by}</td>
                                        <td>
                                            <p>Created: {brand.created_at}</p>
                                            <p>Updated: {brand.updated_at}</p>
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Button onClick={() => handleDetailModal(brand)}>
                                                    <i className="fas fa-eye" />{" "}
                                                </Button>
                                                <Button
                                                    variant={"success"}
                                                    onClick={() => navigate(`/brand/edit/${brand.id}`)}
                                                >
                                                    <i className="fas fa-pen" />{" "}
                                                </Button>
                                                <Button
                                                    variant={"danger"}
                                                    onClick={() => handleBrandDelete(brand.id)}
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
                                    onChange={getBrands}
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

            <CategoryDetailModal
                show={detailModalShow}
                onHide={() => setDetailModalShow(false)}
                brand={brand}
            />
        </>
    );
};

export default BrandList;