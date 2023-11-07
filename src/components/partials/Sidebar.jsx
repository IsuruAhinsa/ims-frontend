import { Link } from "react-router-dom";
import { isAdmin } from "../../helpers/helper.js";

const Sidebar = () => {
  const handleSidebar = () => {
    // eslint-disable-next-line no-undef
    $("body").toggleClass("sidebar-toggled");
    // eslint-disable-next-line no-undef
    $(".sidebar").toggleClass("toggled");
    // eslint-disable-next-line no-undef
    if ($(".sidebar").hasClass("toggled")) {
      // eslint-disable-next-line no-undef
      $(".sidebar .collapse").collapse("hide");
    }
  };

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to={'/'}
      >
        <div className="sidebar-brand-text mx-3">
          IMS Admin <sup>TM</sup>
        </div>
      </Link>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <Link className="nav-link" to={"/"}>
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
      </li>
      {/* Heading */}
      {isAdmin() && (
        <>
          {/* Divider */}
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Management</div>
          {/* Nav Item - Category */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#category"
              aria-expanded="true"
              aria-controls="category"
            >
              <i className="fas fa-fw fa-clipboard-list" />
              <span>Categories</span>
            </a>
            <div
              id="category"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Category Options</h6>
                <Link className="collapse-item" to="category">
                  Category List
                </Link>
                <Link className="collapse-item" to={`category/create`}>
                  Create Category
                </Link>
                <Link className="collapse-item" to="sub-category">
                  Sub Category List
                </Link>
                <Link className="collapse-item" to={`sub-category/create`}>
                  Create Sub Category
                </Link>
              </div>
            </div>
          </li>
          {/* Nav Item - Brands */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#barnd"
              aria-expanded="true"
              aria-controls="barnd"
            >
              <i className="fas fa-fw fa-wrench" />
              <span>Brands</span>
            </a>
            <div
              id="barnd"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Brands:</h6>
                <Link className="collapse-item" to={"/brand"}>
                  Brand List
                </Link>
                <Link className="collapse-item" to={"/brand/create"}>
                  Create Brand
                </Link>
              </div>
            </div>
          </li>
          {/* Nav Item - Suppliers */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#supplier"
              aria-expanded="true"
              aria-controls="supplier"
            >
              <i className="fas fa-fw fa-parachute-box" />
              <span>Suppliers</span>
            </a>
            <div
              id="supplier"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Suppliers:</h6>
                <Link className="collapse-item" to={"/supplier"}>
                  Supplier List
                </Link>
                <Link className="collapse-item" to={"/supplier/create"}>
                  Create Supplier
                </Link>
              </div>
            </div>
          </li>
          {/* Nav Item - Shops */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#shop"
              aria-expanded="true"
              aria-controls="shop"
            >
              <i className="fas fa-fw fa-store" />
              <span>Shops</span>
            </a>
            <div
              id="shop"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Shops:</h6>
                <Link className="collapse-item" to={"/shop"}>
                  Shop List
                </Link>
                <Link className="collapse-item" to={"/shop/create"}>
                  Create Shop
                </Link>
              </div>
            </div>
          </li>
          {/* Nav Item - Sales Manager */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#sales-manager"
              aria-expanded="true"
              aria-controls="sales-manager"
            >
              <i className="fas fa-fw fa-user-tie" />
              <span>Sales Managers</span>
            </a>
            <div
              id="sales-manager"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Sales Managers:</h6>
                <Link className="collapse-item" to={"/sales-manager"}>
                  Sales Manager List
                </Link>
                <Link className="collapse-item" to={"/sales-manager/create"}>
                  Add Sales Manager
                </Link>
              </div>
            </div>
          </li>
        </>
      )}
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Product Management</div>
      {/* Nav Item - Products */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#product-attributes"
          aria-expanded="true"
          aria-controls="product-attributes"
        >
          <i className="fas fa-fw fa-folder" />
          <span>Products</span>
        </a>
        <div
          id="product-attributes"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            {isAdmin() && (
              <>
                <h6 className="collapse-header">Management Option:</h6>
                <Link className="collapse-item" to={"/product-attributes"}>
                  Product Attributes
                </Link>
              </>
            )}
            <div className="collapse-divider" />
            <h6 className="collapse-header">Main:</h6>
            <Link className="collapse-item" to={"/product"}>
              Products
            </Link>
          </div>
        </div>
      </li>
      {/* Nav Item - Orders */}
      <li className="nav-item">
        <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#order"
            aria-expanded="true"
            aria-controls="order"
        >
          <i className="fas fa-fw fa-user-tie" />
          <span>Orders</span>
        </a>
        <div
            id="order"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Orders:</h6>
            <Link className="collapse-item" to={"/order"}>
              Order List
            </Link>
            <Link className="collapse-item" to={"/order/create"}>
              Add Order
            </Link>
          </div>
        </div>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      <div className="sidebar-heading">Accessories</div>
      <li className="nav-item">
        <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#barcode"
            aria-expanded="true"
            aria-controls="barcode"
        >
          <i className="fas fa-fw fa-barcode" />
          <span>Barcode</span>
        </a>
        <div
            id="barcode"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <div className="collapse-divider" />
            <h6 className="collapse-header">Barcode:</h6>
            <Link className="collapse-item" to={"/generate-barcode"}>
              Generate
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#report"
            aria-expanded="true"
            aria-controls="report"
        >
          <i className="fas fa-fw fa-print" />
          <span>Reports</span>
        </a>
        <div
            id="report"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <div className="collapse-divider" />
            <h6 className="collapse-header">Reports:</h6>
            <Link className="collapse-item" to={"/reports"}>
              Reports
            </Link>
          </div>
        </div>
      </li>
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button
          onClick={handleSidebar}
          className="rounded-circle border-0"
          id="sidebarToggle"
        />
      </div>
    </ul>
  );
};

export default Sidebar;
