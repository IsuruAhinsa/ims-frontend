import React from 'react';
import {Button, ButtonGroup, Stack} from "react-bootstrap";

const ProductListArea = ({products, handleCart}) => {
    return (
        <Stack gap={3}>
            {Object.keys(products).length
                ? products.map((product, index) => (
                    <>
                        <div
                            key={index}
                            className="d-flex p-1 align-items-start"
                        >
                            <img
                                src={product.photo}
                                className="w-25"
                                alt={product.photo}
                            />
                            <div className="flex-grow-1 ml-3 small">
                                <div className="font-weight-bold">
                                    {product.name}
                                </div>
                                <div>Original Price: {product.price}</div>
                                <div>
                                    Sell Price: {product.sale_price.symbol}{" "}
                                    {product.sale_price.price}
                                </div>
                                {product.sale_price.discount != 0.0 && (
                                    <div>
                                        Discount: {product.sale_price.symbol}{" "}
                                        {product.sale_price.discount}
                                    </div>
                                )}
                                <div>SKU: {product.sku}</div>
                                <div>Stock: {product.stock}</div>
                                <div className="mt-1">
                                    <ButtonGroup size={"sm"}>
                                        <Button variant={"success"}>
                                            <i className="fas fa-eye" />
                                        </Button>
                                        <Button
                                            variant={"warning"}
                                            onClick={() => handleCart(product.id)}
                                        >
                                            <i className="fas fa-plus-circle" />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </>
                ))
                : null}
        </Stack>
    );
};

export default ProductListArea;
