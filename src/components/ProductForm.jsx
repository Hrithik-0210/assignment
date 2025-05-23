import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
// import ProductList from "./ProductList";

const ProductForm = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    data: {},
  });

  const [jsonInput, setJsonInput] = useState("");
  const [jsonErr, setJsonErr] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://product-data-5biy.onrender.com/products");
    const data = await res.json();
    setProducts(data);
  };

  //add product in the db
  async function handleAddProduct(e) {
    e.preventDefault();

    const response = await fetch(
      "https://product-data-5biy.onrender.com/products"
    );
    const data = await response.json();

    const newId = (data.length + 1).toString();

    const productData = {
      id: newId,
      name: productDetails.name,
      data:
        Object.keys(productDetails.data).length === 0
          ? "N/A"
          : productDetails.data,
    };

    await fetch("https://product-data-5biy.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    alert("Product is added successfully !");
    // console.log("product added :", productDetails);
  }

  fetchProducts();

  function handleProductName(e) {
    setProductDetails((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  }

  function handleProductData(e) {
    const value = e.target.value;
    if (value === undefined) {
      setJsonInput("N/A");
    }
    setJsonInput(value);

    try {
      const jsonData = JSON.parse(value);
      setProductDetails((prev) => ({
        ...prev,
        data: jsonData,
      }));
      setJsonErr("");
    } catch (err) {
      setJsonErr("Invalid JSON", err);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div>
          <input
            type="text"
            placeholder="Product Name"
            className="w-56 h-8 p-1 text-sm  border border-gray-200 rounded"
            value={productDetails.name}
            onChange={handleProductName}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Product Data (JSON) "
            className="w-56 h-8 p-1 text-sm  border border-gray-200 rounded"
            value={jsonInput}
            onChange={handleProductData}
          />
          {jsonErr && <p className="text-red-500 text-sm mt-2">{jsonErr}</p>}
        </div>
        <button
          className="bg-blue-500 text-white rounded px-4 py-1"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default ProductForm;
