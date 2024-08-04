'use client'
import { useShoppingCar } from '@/hooks/useShoppingCar';
import { shoppingCarAtom } from '@/store/shopingCar.store';
import { atom, Provider, useAtom } from 'jotai'
import { NextPage } from "next";

interface Props {}

const ShoppingCar: NextPage<Props> = ({}) => {
  const {shoppingCar} = useShoppingCar()
  return (
    <Provider>
    <div className="relative">
      <div className=" shopping-car-float">
       {shoppingCar}
      </div>
      <button type="button" className="p-link layout-topbar-button">
        <i className="pi pi-shopping-cart"></i>
        <span>Car</span>
      </button>
    </div>
    </Provider>
  );
};

export default ShoppingCar;
