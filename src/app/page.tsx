import ListDemo from "@/components/list";
import Spinner from "@/components/Spinner";
import { getProducts } from "@/fetching/products";
import styles from "@/styles/modules/home.module.css";
import { Suspense } from "react";

export default async function Home() {
 const products = await getProducts()

  return (
    <div className="grid w-full">
      <div className="col-12">
        <div className="card">
          <h5>Products</h5>
          <Suspense fallback={<Spinner/>}>
            <ListDemo products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
