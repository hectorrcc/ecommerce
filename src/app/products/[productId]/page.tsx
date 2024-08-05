// pages/product/[id].tsx

import ShoppingCarButton from "@/components/ShoppingCarButton";
import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { ParsedUrlQuery } from "querystring";

interface Prop {
  product: Product;
}

const Page = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const { productId } = context.params!;

  const response = await fetch(`http://localhost:4000/products/${productId}`);
  const product = await response.json();
  return (
    <div id="productDetailPage" className="card">
      {product ? (
        <div className="grid ">
          <div className="col-6">
            <Image
              priority={false}
              src={product.image ? product.image : `/img/products/default.webp`}
              width={600}
              height={300}
              alt=""
            />
          </div>
          <div className="col-6">
            <Link href={"/"}>
              {" "}
              <Button
                icon="pi pi-arrow-left"
                rounded
                outlined
                severity="secondary"
                aria-label="Bookmark"
              />
            </Link>
            <h3>{product?.name}</h3>
            <div className="flex mb-4">
              <span className="mr-2">{product?.rating}</span>{" "}
              <Rating value={product?.rating} readOnly cancel={false} />
            </div>

            <span className="text-2xl font-semibold">${product?.price}</span>

            <div className="mb-2">{product?.description}</div>
            <ShoppingCarButton />
          </div>
        </div>
      ) : (
        <div className=" text-center">
          <h1>404</h1> <h2></h2>Producto no encontrado{" "}
        </div>
      )}
    </div>
  );
};

export default Page;
