import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import {Tab, Table, Tabs} from "react-bootstrap";
import {Loading} from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import {useParams} from "react-router-dom";
import {formatCurrency} from "../../../helpers/helper.js";

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState([]);

    const getProduct = () => {
        Loading.standard();
        axios
            .get(`${Constants.BASE_URL}/products/${params.id}`)
            .then((res) => {
                setProduct(res.data.data);
                Loading.remove();
            })
            .catch((err) => {
                console.log(err);
                Loading.remove();
            });
    };

    useEffect(() => {
        getProduct();
    }, []);
    return (
        <>
            <Breadcrumb title={"Product Details"} />
            <div className="container-fluid">
                <Card to={"/product"} title={product.name} btnText={"All Products"}>
                    <Tabs
                        defaultActiveKey="basic"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="basic" title="Basic Information">
                            <Table size={"sm"} bordered responsive striped>
                                <tbody>
                                <tr>
                                    <th>Title</th>
                                    <td>{product.name}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{product.slug}</td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>{product.subCategory}</td>
                                </tr>
                                <tr>
                                    <th>Sub Category</th>
                                    <td>{product.subCategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>Origin</th>
                                    <td>{product.country}</td>
                                </tr>
                                <tr>
                                    <th>Supplier</th>
                                    <td>{product.supplier}</td>
                                </tr>
                                <tr>
                                    <th>Created By</th>
                                    <td>{product.createdBy}</td>
                                </tr>
                                <tr>
                                    <th>Updated by</th>
                                    <td>{product.updatedBy}</td>
                                </tr>
                                <tr>
                                    <th>Created at</th>
                                    <td>{product.created_at}</td>
                                </tr>
                                <tr>
                                    <th>Updated at</th>
                                    <td>{product.updated_at}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="price" title="Price & Stock">
                            <Table size={"sm"} bordered responsive striped>
                                <tbody>
                                <tr>
                                    <th>Cost</th>
                                    <td>{product.cost}</td>
                                </tr>
                                <tr>
                                    <th>Original Sale Price</th>
                                    <td>{product.price}</td>
                                </tr>
                                <tr>
                                    <th>Sale Price</th>
                                    <td>{formatCurrency(product.sale_price?.price)}</td>
                                </tr>
                                <tr>
                                    <th>Discount %</th>
                                    <td>{product.discount_percentage}</td>
                                </tr>
                                <tr>
                                    <th>Discount Fixed</th>
                                    <td>{product.discount_fixed}</td>
                                </tr>
                                <tr>
                                    <th>Discount Start</th>
                                    <td>{product.discount_start}</td>
                                </tr>
                                <tr>
                                    <th>Discount End</th>
                                    <td>{product.discount_end}</td>
                                </tr>
                                <tr>
                                    <th>Discount Remaining Days</th>
                                    <td>{product.discount_remaining_days}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product.stock}</td>
                                </tr>
                                <tr>
                                    <th>SKU</th>
                                    <td>{product.sku}</td>
                                </tr>
                                <tr>
                                    <th>Profit</th>
                                    <td>{product.profit}</td>
                                </tr>
                                <tr>
                                    <th>Profit (%)</th>
                                    <td>{product.profit_percentage}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        </>
    );
};

export default ProductDetails;
