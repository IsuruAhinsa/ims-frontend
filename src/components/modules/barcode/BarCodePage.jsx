import React, { useState } from "react";
import { formatCurrency } from "../../../helpers/helper.js";
import Barcode from "react-barcode";

const BarCodePage = React.forwardRef((props, ref) => {
  const [paperSize, setPaperSize] = useState({
    a4: {
      width: 8.27 * 72,
      height: 11.69 * 72,
    },
  });

  const style = {
    printArea: {
      width: paperSize.a4.width,
      height: paperSize.a4.height,
      padding: "36px",
      display: "flex",
      flexWrap: "wrap",
    },

    barcodeItem: {
      width: "33.33%",
      padding: "18px",
      textAlign: "center",
      fontSize: "12px",
      border: "1px solid #e8e8e8",
      height: "fit-content",
    },

    deletedText: {
      color: "red",
      textDecoration: "line-through",
      fontSize: "10px",
      marginRight: "0.5rem !important",
    },
  };
  return (
    <div style={style.printArea} ref={ref}>
      {props.products.map((product, index) => (
        <div style={style.barcodeItem} key={index}>
          <div className={"text-dark font-weight-bold"}>{product.name}</div>
          <div>
            Price:{" "}
            {product?.sale_price?.discount !== 0
              ? formatCurrency(product?.sale_price?.price)
              : null}
            <div
              style={product?.sale_price?.discount !== 0 && style.deletedText}
            >
              {product.price}
            </div>
          </div>
          <Barcode value={product.sku} width={0.5} fontSize={7} height={50} />
        </div>
      ))}
    </div>
  );
});

export default BarCodePage;
