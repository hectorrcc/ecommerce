"use client";

import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";

import Image from "next/image";
import Spinner from "./Spinner";
import Link from "next/link";
import ShoppingCarButton from "./ShoppingCarButton";
import { useMemoizedFn } from "ahooks";
import { ToastContainer } from "react-toastify";

interface Prop {
  products: Product[];
}

const ListDemo = ({ products }: Prop) => {
  const [dataViewValue, setDataViewValue] = useState<Product[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filteredValue, setFilteredValue] = useState<Product[] | null>(null);
  const [layout, setLayout] = useState<
    "grid" | "list" | (string & Record<string, unknown>)
  >("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null>(null);
  const [sortField, setSortField] = useState("");
  const [loading, setLoading] = useState(true);

  const sortOptions = [
    { label: "Precio de alto a bajo", value: "!price" },
    { label: "Precios de bajo a alto", value: "price" },
  ];

  useEffect(() => {
    setDataViewValue(products);
    setLoading(false);
  }, [products]);

  const onFilter = useMemoizedFn((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    if (value.length === 0) {
      setFilteredValue(null);
    } else {
      const filtered = dataViewValue?.filter((product) => {
        const productNameLowercase = product.name.toLowerCase();
        const searchValueLowercase = value.toLowerCase();
        return productNameLowercase.includes(searchValueLowercase);
      });

      setFilteredValue(filtered);
    }
  });

  const onSortChange = useMemoizedFn((event: DropdownChangeEvent) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  });

  const dataViewHeader = (
    <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
      <Dropdown
        value={sortKey}
        options={sortOptions}
        optionLabel="label"
        placeholder="Ordenar por precio"
        onChange={onSortChange}
      />
      <span className="p-input-icon-left">
        <InputText
          value={globalFilterValue}
          onChange={onFilter}
          placeholder="Buscar por nombre"
        />
      </span>
      <DataViewLayoutOptions
        layout={layout}
        onChange={(e) => setLayout(e.value)}
      />
    </div>
  );

  const dataviewListItem = useMemoizedFn((data: Product) => {
    return (
      <div className="col-12">
        <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
          <Image
            priority={false}
            width={600}
            height={150}
            src={`${data.image ? data.image : "/img/products/default.webp"}`}
            alt={data.name}
            className="my-4 md:my-0 w-9 md:w-2 shadow-2 mr-5"
          />
          <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
            <div className="font-bold text-2xl">{data.name}</div>
            <div className="mb-2">{data.description}</div>
            <Rating
              value={data.rating}
              readOnly
              cancel={false}
              className="mb-2"
            ></Rating>
            <div className="flex align-items-center">
              <i className="pi pi-tag mr-2"></i>
              <span className="font-semibold">{data.category}</span>
            </div>
          </div>
          <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
            <span className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">
              ${data.price}
            </span>
            <ShoppingCarButton type="list" />
          </div>
        </div>
      </div>
    );
  });

  const dataviewGridItem = useMemoizedFn((data: Product) => {
    return (
      <div className="col-12 lg:col-4">
        <div className="card m-3 border-1 surface-border">
          <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
            <div className="flex align-items-center">
              <i className="pi pi-tag mr-2" />
              <span className="font-semibold">{data.category}</span>
            </div>
          </div>
          <div className="flex flex-column align-items-center text-center mb-3">
            <Image
              priority={false}
              width={400}
              height={150}
              src={`${data.image ? data.image : "/img/products/default.webp"}`}
              alt={data.name}
              className="w-9 h-[120px] shadow-2 my-3 mx-0"
            />
            <div className="text-2xl font-bold">{data.name}</div>
            {/* <div className="mb-3">{data.description}</div> */}
            <Rating value={data.rating} readOnly cancel={false} />
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">${data.price}</span>
            <Link id="productDetail" href={`/products/${data.id}`}>
              <Button severity="secondary" outlined icon="pi pi-eye" />
            </Link>

            <ShoppingCarButton type="grid" />
          </div>
        </div>
      </div>
    );
  });

  const itemTemplate = useMemoizedFn(
    (
      data: Product,
      layout: "grid" | "list" | (string & Record<string, unknown>)
    ) => {
      if (!data) {
        return;
      }

      if (layout === "list") {
        return dataviewListItem(data);
      } else if (layout === "grid") {
        return dataviewGridItem(data);
      }
    }
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <DataView
          value={filteredValue || dataViewValue}
          layout={layout}
          paginator
          rows={9}
          sortOrder={sortOrder}
          sortField={sortField}
          itemTemplate={itemTemplate}
          header={dataViewHeader}
        ></DataView>
      )}
    </>
  );
};

export default ListDemo;
