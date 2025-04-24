import React, { useState } from "react";

const ProductList = ({ products }) => {
  const [filters, setFilters] = useState({ color: "", capacity: "" });

  const colors = [
    ...new Set(products.map((product) => product?.data?.color).filter(Boolean)),
  ];
  const capacities = [
    ...new Set(
      products
        .map(
          (p) => p.data?.capacity || p.data?.Capacity || p.data?.["capacity GB"]
        )
        .filter(Boolean)
    ),
  ];
  // console.log(colors);
  const handleFilter = () => {
    return products.filter((product) => {
      const colorMatch = filters.color
        ? product.data?.color === filters.color ||
          product.data?.Color === filters.color
        : true;
      const capacityMatch = filters.capacity
        ? product.data?.capacity === filters.capacity ||
          product.data?.Capacity === filters.capacity ||
          product.data?.["capacity GB"] === filters.capacity
        : true;
      return colorMatch && capacityMatch;
    });
  };

  const filterData = handleFilter();

  return (
    <>
      <div className="flex gap-4 my-6">
        <select
          className="border px-2 py-1 rounded w-36"
          value={filters.color}
          onChange={(e) => setFilters({ ...filters, color: e.target.value })}
        >
          <option value="">All Colors</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>

        <select
          className="border px-2 py-1 rounded w-36"
          value={filters.capacity}
          onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
        >
          <option value="">All Capacities</option>
          {capacities.map((cap, index) => (
            <option key={index} value={cap}>
              {cap}
            </option>
          ))}
        </select>
      </div>
      <div className=" my-6">
        {filterData && filterData.length > 0 ? (
          filterData.map((product) => (
            <div key={product.id} className=" my-2 shadow-md rounded p-2">
              <p className="text-lg font-semibold"> {product.name}</p>
              <div>
                {product.data && typeof product.data === "object" ? (
                  Object.entries(product.data).map(([key, value], index) => (
                    <li key={index} className="list-none">
                      {key} : {value}
                    </li>
                  ))
                ) : (
                  <p>{product.data}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center font-semibold text-amber-900">
            No data Found !
          </h1>
        )}
      </div>
    </>
  );
};

export default ProductList;
