import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partials/common/Breadcrumb.jsx";
import Card from "../../partials/common/card/Card.jsx";
import SubmitButton from "../../partials/common/SubmitButton.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Constants from "../../../constants/Constants.js";
import { Notify } from "notiflix";
import { Button } from "react-bootstrap";

const AddProduct = () => {
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeField, setAttributeField] = useState([]);
  const [attributeFieldId, setAttributeFieldId] = useState(1);
  const [specificationField, setSpecificationField] = useState([]);
  const [specificationFieldId, setSpecificationFieldId] = useState(1);
  const [attributeInput, setAttributeInput] = useState({});
  const [specificationInput, setSpecificationInput] = useState({});

  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value;
      slug = slug.toLowerCase();
      slug = slug.replaceAll(" ", "-");
      setInput((prevState) => ({ ...prevState, slug: slug }));
    }

    if (e.target.name === "category") {
      getSubCategories(e.target.value);
    }

    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAttributeInput = (e, id) => {
    setAttributeInput((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleAttributeFields = () => {
    if (attributes.length >= attributeFieldId) {
      setAttributeFieldId(attributeFieldId + 1);
      setAttributeField((prevState) => [...prevState, attributeFieldId]);
    }
  };

  const handleAttributeFieldRemove = (id) => {
    setAttributeField((oldValues) => {
      return oldValues.filter((attributeField) => attributeField !== id);
    });

    setAttributeInput((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });

    setAttributeFieldId(attributeFieldId - 1);
  };

  const handleSpecificationInput = (e, id) => {
    setSpecificationInput((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSpecificationFields = () => {
    setSpecificationFieldId(specificationFieldId + 1);
    setSpecificationField((prevState) => [...prevState, specificationFieldId]);
  };

  const handleSpecificationFieldRemove = (id) => {
    setSpecificationField((oldValues) => {
      return oldValues.filter(
        (specificationField) => specificationField !== id,
      );
    });

    setSpecificationInput((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });

    setSpecificationFieldId(specificationFieldId - 1);
  };

  const getCategories = () => {
    axios.get(`${Constants.BASE_URL}/get-categories-list`).then((res) => {
      setCategories(res.data);
    });
  };

  const getSubCategories = (categoryId) => {
    axios
      .get(`${Constants.BASE_URL}/get-sub-categories-list/${categoryId}`)
      .then((res) => {
        setSubCategories(res.data);
      });
  };

  const getBrands = () => {
    axios.get(`${Constants.BASE_URL}/get-brands-list`).then((res) => {
      setBrands(res.data);
    });
  };

  const getCountries = () => {
    axios.get(`${Constants.BASE_URL}/get-countries-list`).then((res) => {
      setCountries(res.data);
    });
  };

  const getSuppliers = () => {
    axios.get(`${Constants.BASE_URL}/get-suppliers-list`).then((res) => {
      setSuppliers(res.data);
    });
  };

  const getAttributes = () => {
    axios
      .get(`${Constants.BASE_URL}/get-attribute-list`)
      .then((res) => {
        setAttributes(res.data);
      });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .post(`${Constants.BASE_URL}/products`, input)
      .then((res) => {
        Notify.success(res.data.msg);

        setIsLoading(false);

        if (res.data.product_id !== undefined) {
          navigate("/product/photo/" + res.data.product_id);
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        }

        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
    getBrands();
    getCountries();
    getSuppliers();
    getAttributes();
  }, []);

  useEffect(() => {
    setInput((prevState) => ({ ...prevState, attributes: attributeInput }));
  }, [attributeInput]);

  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      specifications: specificationInput,
    }));
  }, [specificationInput]);

  return (
    <>
      <Breadcrumb title={"Create Product"} />
      <div className="container-fluid">
        <Card to={"/product"} title={"Create Product"} btnText={"Product List"}>
          <form className="form-row" onSubmit={handleCreateProduct}>
            <div className="form-group col-md-6">
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className={
                  errors.name ? "form-control border-danger" : "form-control"
                }
                id="name"
                placeholder={"Enter product name"}
                name={"name"}
                value={input.name}
                onChange={handleInput}
              />
              <div className="text-xs text-danger ml-2">
                {errors.name ? errors.name[0] : null}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="slug" className="form-label">
                Product Slug
              </label>
              <input
                type="text"
                className={
                  errors.slug ? "form-control border-danger" : "form-control"
                }
                id="slug"
                placeholder={"Enter product slug"}
                name={"slug"}
                value={input.slug}
                onChange={handleInput}
              />
              <div className="text-xs text-danger ml-2">
                {errors.slug ? errors.slug[0] : null}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="status" className="form-label">
                Product Status
              </label>
              <select
                name="status"
                value={input.status}
                onChange={handleInput}
                className={
                  errors.status
                    ? "custom-select border-danger"
                    : "custom-select"
                }
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              <div className="text-xs text-danger ml-2">
                {errors.status ? errors.status[0] : null}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                value={input.category}
                onChange={handleInput}
                className={
                  errors.category
                    ? "custom-select border-danger"
                    : "custom-select"
                }
              >
                <option>Select Category</option>
                {Object.keys(categories).length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option>No Categories</option>
                )}
              </select>
              <div className="text-xs text-danger ml-2">
                {errors.category ? errors.category[0] : null}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="subCategory" className="form-label">
                Sub Category
              </label>
              <select
                name="subCategory"
                value={input.subCategory}
                onChange={handleInput}
                className={
                  errors.subCategory
                    ? "custom-select border-danger"
                    : "custom-select"
                }
                disabled={Object.keys(subCategories).length < 1}
              >
                <option>Select Sub Category</option>
                {Object.keys(subCategories).length > 0 ? (
                  subCategories.map((subCategory, index) => (
                    <option key={index} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))
                ) : (
                  <option>No Sub Categories</option>
                )}
              </select>
              <div className="text-xs text-danger ml-2">
                {errors.subCategory ? errors.subCategory[0] : null}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="brand" className="form-label">
                Brands
              </label>
              <select
                name="brand"
                value={input.brand}
                onChange={handleInput}
                className={
                  errors.brand ? "custom-select border-danger" : "custom-select"
                }
              >
                <option>Select Brand</option>
                {Object.keys(brands).length > 0 ? (
                  brands.map((brand, index) => (
                    <option key={index} value={brand.id}>
                      {brand.name}
                    </option>
                  ))
                ) : (
                  <option>No Brands</option>
                )}
              </select>
              <div className="text-xs text-danger ml-2">
                {errors.brand ? errors.brand[0] : null}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="country" className="form-label">
                Choose Product Origin
              </label>
              <select
                name="country"
                value={input.country}
                onChange={handleInput}
                className={
                  errors.country
                    ? "custom-select border-danger"
                    : "custom-select"
                }
              >
                <option>Select Product Origin</option>
                {Object.keys(countries).length > 0 ? (
                  countries.map((country, index) => (
                    <option key={index} value={country.id}>
                      {country.name}
                    </option>
                  ))
                ) : (
                  <option>No Countries</option>
                )}
              </select>
              <div className="text-xs text-danger ml-2">
                {errors.country ? errors.country[0] : null}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="supplier" className="form-label">
                Choose Supplier
              </label>
              <select
                name="supplier"
                value={input.supplier}
                onChange={handleInput}
                className={
                  errors.supplier
                    ? "custom-select border-danger"
                    : "custom-select"
                }
              >
                <option>Select Supplier</option>
                {Object.keys(suppliers).length > 0 ? (
                  suppliers.map((supplier, index) => (
                    <option key={index} value={supplier.id}>
                      {supplier.company} {supplier.phone}
                    </option>
                  ))
                ) : (
                  <option>No Suppliers</option>
                )}
              </select>
              <div className="text-xs text-danger ml-2">
                {errors.supplier ? errors.supplier[0] : null}
              </div>
            </div>

            <div className="col-md-12 my-2">
              <Card title={"Product Attributes"}>
                {attributeField.map((id, index) => (
                  <div key={index} className="row">
                    <div className="form-group col-md-5">
                      <label htmlFor="attribute" className="form-label">
                        Choose Attribute
                      </label>
                      <select
                        name="attribute"
                        value={
                          attributeInput[id] !== undefined
                            ? attributeInput[id].attribute
                            : null
                        }
                        onChange={(e) => handleAttributeInput(e, id)}
                        className={
                          errors.attribute
                            ? "custom-select border-danger"
                            : "custom-select"
                        }
                      >
                        <option>Select Attribute</option>
                        {Object.keys(attributes).length > 0 ? (
                          attributes.map((attribute, attributeIndex) => (
                            <option key={attributeIndex} value={attribute.id}>
                              {attribute.name}
                            </option>
                          ))
                        ) : (
                          <option>No Attributes</option>
                        )}
                      </select>
                      <div className="text-xs text-danger ml-2">
                        {errors.attribute ? errors.attribute[0] : null}
                      </div>
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="value" className="form-label">
                        Choose Attribute Value
                      </label>
                      <select
                        name="value"
                        value={
                          attributeInput[id] !== undefined
                            ? attributeInput[id].value
                            : null
                        }
                        onChange={(e) => handleAttributeInput(e, id)}
                        className={
                          errors.value
                            ? "custom-select border-danger"
                            : "custom-select"
                        }
                      >
                        <option>Select Attribute Value</option>
                        {attributes.map((attribute) => (
                          <>
                            {attributeInput[id] !== undefined &&
                            attribute.id == attributeInput[id].attribute
                              ? attribute.values.map((attributeValue, valueIndex) => (
                                  <option key={valueIndex} value={attributeValue.id}>
                                    {attributeValue.name}
                                  </option>
                                ))
                              : null}
                          </>
                        ))}
                      </select>
                      <div className="text-xs text-danger ml-2">
                        {errors.value ? errors.value[0] : null}
                      </div>
                    </div>
                    {attributeField.length - 1 === index ? (
                      <div className="col-md-2 d-flex justify-content-center align-items-md-center">
                        <Button
                          variant={"danger"}
                          size={"sm"}
                          onClick={() => handleAttributeFieldRemove(id)}
                        >
                          <i className="fas fa-minus-circle" />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="row d-flex justify-content-center">
                  <Button
                    disabled={attributes.length < attributeFieldId}
                    variant={"success"}
                    onClick={handleAttributeFields}
                  >
                    Add Attribute
                  </Button>
                </div>
              </Card>
            </div>

            <div className="col-md-12 my-2">
              <Card title={"Product Specifications"}>
                {specificationField.map((id, index) => (
                  <div key={index} className="row">
                    <div className="form-group col-md-5">
                      <label
                        htmlFor="specification_name"
                        className="form-label"
                      >
                        Specification Name
                      </label>
                      <input
                        type="text"
                        className={
                          errors.specification_name
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        id="specification_name"
                        placeholder={"Enter product specification name"}
                        name={"specification_name"}
                        value={
                          specificationInput[id] !== undefined
                            ? specificationInput[id].specification_name
                            : null
                        }
                        onChange={(e) => handleSpecificationInput(e, id)}
                      />
                      <div className="text-xs text-danger ml-2">
                        {errors.specification_name
                          ? errors.specification_name[0]
                          : null}
                      </div>
                    </div>
                    <div className="form-group col-md-5">
                      <label
                        htmlFor="specification_value"
                        className="form-label"
                      >
                        Specification Value
                      </label>
                      <input
                        type="text"
                        className={
                          errors.specification_value
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        id="specification_value"
                        placeholder={"Enter product specification value"}
                        name={"specification_value"}
                        value={
                          specificationInput[id] !== undefined
                            ? specificationInput[id].specification_value
                            : null
                        }
                        onChange={(e) => handleSpecificationInput(e, id)}
                      />
                      <div className="text-xs text-danger ml-2">
                        {errors.specification_value
                          ? errors.specification_value[0]
                          : null}
                      </div>
                    </div>
                    {specificationField.length - 1 === index ? (
                      <div className="col-md-2 d-flex justify-content-center align-items-md-center">
                        <Button
                          variant={"danger"}
                          size={"sm"}
                          onClick={() => handleSpecificationFieldRemove(id)}
                        >
                          <i className="fas fa-minus-circle" />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="row d-flex justify-content-center">
                  <Button
                    variant={"success"}
                    onClick={handleSpecificationFields}
                  >
                    Add Specification
                  </Button>
                </div>
              </Card>
            </div>

            <div className="col-md-12 my-2">
              <Card title={"Product Price and Stock"}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="cost" className="form-label">
                      Product Cost
                    </label>
                    <input
                        type="number"
                        className={
                          errors.cost ? "form-control border-danger" : "form-control"
                        }
                        id="cost"
                        placeholder={"Enter product cost"}
                        name={"cost"}
                        value={input.cost}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.cost ? errors.cost[0] : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="price" className="form-label">
                      Product Sale Price
                    </label>
                    <input
                        type="number"
                        className={
                          errors.price ? "form-control border-danger" : "form-control"
                        }
                        id="price"
                        placeholder={"Enter product price"}
                        name={"price"}
                        value={input.price}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.price ? errors.price[0] : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="discount" className="form-label">
                      Discount %
                    </label>
                    <input
                        type="number"
                        className={
                          errors.discount ? "form-control border-danger" : "form-control"
                        }
                        id="discount"
                        placeholder={"Enter product discount"}
                        name={"discount"}
                        value={input.discount}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.discount ? errors.discount[0] : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="discount_fixed" className="form-label">
                      Discount Fixed Amount
                    </label>
                    <input
                        type="number"
                        className={
                          errors.discount_fixed ? "form-control border-danger" : "form-control"
                        }
                        id="discount_fixed"
                        placeholder={"Enter product discount fixed"}
                        name={"discount_fixed"}
                        value={input.discount_fixed}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.discount_fixed ? errors.discount_fixed[0] : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="discount_start" className="form-label">
                      Discount Start Date
                    </label>
                    <input
                        type="datetime-local"
                        className={
                          errors.discount_start ? "form-control border-danger" : "form-control"
                        }
                        id="discount_start"
                        placeholder={"Enter product discount start date"}
                        name={"discount_start"}
                        value={input.discount_start}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.discount_start ? errors.discount_start[0] : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="discount_end" className="form-label">
                      Discount End Date
                    </label>
                    <input
                        type="datetime-local"
                        className={
                          errors.discount_end ? "form-control border-danger" : "form-control"
                        }
                        id="discount_end"
                        placeholder={"Enter product discount end date"}
                        name={"discount_end"}
                        value={input.discount_end}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.discount_end ? errors.discount_end[0] : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="stock" className="form-label">
                      Product Stock
                    </label>
                    <input
                        type="number"
                        className={
                          errors.stock ? "form-control border-danger" : "form-control"
                        }
                        id="stock"
                        placeholder={"Enter product stock"}
                        name={"stock"}
                        value={input.stock}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.stock ? errors.stock[0] : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="sku" className="form-label">
                      Product SKU
                    </label>
                    <input
                        type="text"
                        className={
                          errors.sku ? "form-control border-danger" : "form-control"
                        }
                        id="sku"
                        placeholder={"Enter product sku"}
                        name={"sku"}
                        value={input.sku}
                        onChange={handleInput}
                    />
                    <div className="text-xs text-danger ml-2">
                      {errors.sku ? errors.sku[0] : null}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="description" className="form-label">
                Product Description
              </label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                placeholder={"Type some description about product..."}
                value={input.description}
                onChange={handleInput}
              ></textarea>
              <div className="text-xs text-danger ml-2">
                {errors.description ? errors.description[0] : null}
              </div>
            </div>
            <SubmitButton value={"Create Product"} isLoading={isLoading} />
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
