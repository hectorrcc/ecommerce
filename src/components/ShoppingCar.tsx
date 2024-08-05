"use client";
import { useShoppingCar } from "@/hooks/useShoppingCar";
import { Provider } from "jotai";
import { NextPage } from "next";

interface Props {}

const ShoppingCar: NextPage<Props> = ({}) => {
  const { shoppingCar } = useShoppingCar();
  return (
    <Provider>
      <div className="relative">
        <div id="shoppingCarValues" className=" shopping-car-float">
          {shoppingCar}
        </div>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-shopping-cart"></i>
        </button>
      </div>
    </Provider>
  );
};

export default ShoppingCar;
