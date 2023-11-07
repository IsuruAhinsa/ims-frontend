import "./assets/css/styles.min.css";
import "./assets/vendor/jquery/jquery.min";
import "./assets/vendor/fontawesome-free/css/all.min.css";
import "./assets/vendor/bootstrap/js/bootstrap.bundle.min";
import "./assets/vendor/jquery-easing/jquery.easing.min";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect, useState } from "react";
import MasterLayout from "./components/layouts/MasterLayout.jsx";
import Dashboard from "./components/modules/Dashboard.jsx";
import AddCategory from "./components/modules/category/AddCategory.jsx";
import GuestLayout from "./components/layouts/GuestLayout.jsx";
import Login from "./components/modules/auth/Login.jsx";
import CategoryList from "./components/modules/category/CategoryList.jsx";
import EditCategory from "./components/modules/category/EditCategory.jsx";
import SubCategoryList from "./components/modules/subCategory/SubCategoryList.jsx";
import AddSubCategory from "./components/modules/subCategory/AddSubCategory.jsx";
import EditSubCategory from "./components/modules/subCategory/EditSubCategory.jsx";
import BrandList from "./components/modules/brand/BrandList.jsx";
import AddBrand from "./components/modules/brand/AddBrand.jsx";
import EditBrand from "./components/modules/brand/EditBrand.jsx";
import SupplierList from "./components/modules/supplier/SupplierList.jsx";
import AddSupplier from "./components/modules/supplier/AddSupplier.jsx";
import EditSupplier from "./components/modules/supplier/EditSupplier.jsx";
import Attribute from "./components/modules/attribute/Attribute.jsx";
import ProductList from "./components/modules/product/ProductList.jsx";
import AddProduct from "./components/modules/product/AddProduct.jsx";
import EditProduct from "./components/modules/product/EditProduct.jsx";
import AddProductPhoto from "./components/modules/product/AddProductPhoto.jsx";
import ShopList from "./components/modules/shop/ShopList.jsx";
import AddShop from "./components/modules/shop/AddShop.jsx";
import EditShop from "./components/modules/shop/EditShop.jsx";
import SalesManagerList from "./components/modules/salesManager/SalesManagerList.jsx";
import AddSalesManager from "./components/modules/salesManager/AddSalesManager.jsx";
import EditSalesManager from "./components/modules/salesManager/EditSalesManager.jsx";
import OrderList from "./components/modules/order/OrderList.jsx";
import AddOrder from "./components/modules/order/AddOrder.jsx";
import OrderDetails from "./components/modules/order/OrderDetails.jsx";
import BarCode from "./components/modules/barcode/BarCode.jsx";
import Report from "./components/modules/report/Report.jsx";
import ProductDetails from "./components/modules/product/ProductDetails.jsx";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.token !== undefined) setAuth(true);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {auth ? (
          <Route element={<MasterLayout />}>
            <Route path={"/"} element={<Dashboard />} />

            <Route path={"/category"} element={<CategoryList />} />
            <Route path={"/category/create"} element={<AddCategory />} />
            <Route path={"/category/edit/:id"} element={<EditCategory />} />

            <Route path={"/sub-category"} element={<SubCategoryList />} />
            <Route path={"/sub-category/create"} element={<AddSubCategory />} />
            <Route path={"/sub-category/edit/:id"} element={<EditSubCategory />} />

            <Route path={"/brand"} element={<BrandList />} />
            <Route path={"/brand/create"} element={<AddBrand />} />
            <Route path={"/brand/edit/:id"} element={<EditBrand />} />

            <Route path={"/supplier"} element={<SupplierList />} />
            <Route path={"/supplier/create"} element={<AddSupplier />} />
            <Route path={"/supplier/edit/:id"} element={<EditSupplier />} />

            <Route path={"/product-attributes"} element={<Attribute />} />

            <Route path={"/product"} element={<ProductList />} />
            <Route path={"/product/create"} element={<AddProduct />} />
            <Route path={"/product/edit/:id"} element={<EditProduct />} />
            <Route path={"/product/photo/:id"} element={<AddProductPhoto />} />
            <Route path={"/product/:id"} element={<ProductDetails />} />

            <Route path={"/shop"} element={<ShopList />} />
            <Route path={"/shop/create"} element={<AddShop />} />
            <Route path={"/shop/edit/:id"} element={<EditShop />} />

            <Route path={"/sales-manager"} element={<SalesManagerList />} />
            <Route path={"/sales-manager/create"} element={<AddSalesManager />} />
            <Route path={"/sales-manager/edit/:id"} element={<EditSalesManager />} />

            <Route path={"/order"} element={<OrderList />} />
            <Route path={"/order/create"} element={<AddOrder />} />
            <Route path={"/order/:id"} element={<OrderDetails />} />

            <Route path={"/generate-barcode"} element={<BarCode />} />

            <Route path={"/reports"} element={<Report />} />
          </Route>
        ) : (
          <Route element={<GuestLayout />}>
            <Route path={"/"} element={<Login />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
