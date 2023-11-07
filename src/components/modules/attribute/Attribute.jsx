import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import AddAttributeFormModal from "./AddAttributeFormModal.jsx";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import NoDataFound from "../../partials/common/NoDataFound.jsx";
import { Confirm, Loading, Notify } from "notiflix";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import Pagination from "react-js-pagination";
import EditAttributeFormModal from "./EditAttributeFormModal.jsx";
import AddAttributeValueFormModal from "./AddAttributeValueFormModal.jsx";

const Attribute = () => {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addValueModalShow, setAddValueModalShow] = useState(false);
  const [attributes, setAttributes] = useState([]);

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

  const [attribute, setAttribute] = useState([]);

  const getAttributes = (pageNumber) => {
    Loading.standard();

    axios
      .get(
        `${Constants.BASE_URL}/attribute?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`,
      )
      .then((res) => {
        setAttributes(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setTotalItemsCount(res.data.meta.total);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
        Loading.remove();
      })
      .catch((err) => {
        console.log(err);
        Loading.remove();
      });
  };

  const handleProductAttributeDelete = (attributeId) => {
    Confirm.show(
      "Delete",
      "Are you sure to delete this attribute?",
      "Yes",
      "No",
      () => {
        Loading.standard();
        axios
          .delete(
            `${Constants.BASE_URL}/attribute/${attributeId}`,
          )
          .then((res) => {
            Notify.success(res.data.msg);
            getAttributes();
            Loading.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    );
  };

  const handleAttributeEditModal = (attribute) => {
    setAttribute(attribute);
    setEditModalShow(true);
  };

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateAttributeValueModal = (attribute) => {
    setAttribute(attribute);
    setAddValueModalShow(true);
  };

  const handleDeleteAttributeValue = (
    attribute,
    attributeValue,
  ) => {
    Confirm.show(
      `Delete "${attributeValue.name}" ?`,
      "Are you sure to delete this attribute value?",
      "Yes",
      "No",
      () => {
        Loading.standard();
        axios
          .delete(
            `${Constants.BASE_URL}/attribute/${attribute.id}/values/${attributeValue.id}`,
          )
          .then((res) => {
            Notify.success(res.data.msg);
            getAttributes();
            Loading.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    );
  };

  useEffect(() => {
    getAttributes();
  }, []);

  return (
    <>
      <Breadcrumb title={"Product Attributes"} />
      <Row>
        <Container fluid>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <div>Product Attributes</div>
                <Button
                  size={"sm"}
                  variant={"outline-primary"}
                  onClick={() => setModalShow(true)}
                >
                  Add Product Attribute
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
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
                      onClick={() => getAttributes(1)}
                    >
                      <i className="fas fa-search mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <Table bordered size={"sm"}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Values</th>
                    <th scope="col">Status</th>
                    <th scope="col">Meta Data</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(attributes).length > 0 ? (
                    attributes.map((attribute, index) => (
                      <tr key={index}>
                        <th scope="row">{startFrom + index}</th>
                        <td>{attribute.name}</td>
                        <td>
                          <ListGroup horizontal={"sm"}>
                            {attribute.values.map((value, index) => (
                              <ListGroup.Item
                                variant={"success"}
                                key={index}
                                action
                                onClick={() =>
                                  handleDeleteAttributeValue(attribute, value)
                                }
                              >
                                {value.name}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>

                          <Button
                            className={"m-2"}
                            size={"sm"}
                            variant={"primary"}
                            onClick={() =>
                              handleCreateAttributeValueModal(
                                attribute,
                              )
                            }
                          >
                            <i className="fas fa-plus-circle" />{" "}
                          </Button>
                        </td>
                        <td>{attribute.status}</td>
                        <td>
                          <div>Created: {attribute.created_at}</div>
                          <div>Updated: {attribute.updated_at}</div>
                          <div>
                            Created By:{" "}
                            <span>{attribute.created_by}</span>
                          </div>
                        </td>
                        <td>
                          <ButtonGroup>
                            <Button
                              variant={"success"}
                              onClick={() =>
                                handleAttributeEditModal(
                                  attribute,
                                )
                              }
                            >
                              <i className="fas fa-pen" />{" "}
                            </Button>
                            <Button
                              variant={"danger"}
                              onClick={() =>
                                handleProductAttributeDelete(
                                  attribute.id,
                                )
                              }
                            >
                              <i className="fas fa-trash" />{" "}
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <NoDataFound colSpan={5} />
                  )}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
              <nav className="d-flex justify-content-center pagination-sm">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={getAttributes}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  prevPageText={"Prev"}
                  lastPageText={"Last"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                />
              </nav>
            </Card.Footer>
          </Card>
        </Container>
      </Row>

      <AddAttributeFormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        getAttributes={getAttributes}
      />

      <EditAttributeFormModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        getAttributes={getAttributes}
        attribute={attribute}
      />

      <AddAttributeValueFormModal
        show={addValueModalShow}
        onHide={() => setAddValueModalShow(false)}
        getAttributes={getAttributes}
        attribute={attribute}
      />
    </>
  );
};

export default Attribute;
