"use client";
import { useShoppingCar } from "@/hooks/useShoppingCar";
import { NextPage } from "next";
import { Button } from "primereact/button";

interface Props {
  type?: "list" | "grid";
}

const ShoppingCarButton: NextPage<Props> = ({ type = "list" }: Props) => {
  const { addShoppingCar } = useShoppingCar();
  return (
    <div>
      {type === "grid" ? (
        <Button icon="pi pi-cart-plus" onClick={addShoppingCar} />
      ) : (
        <Button
          icon="pi pi-cart-plus"
          label="Add to Cart"
          size="small"
          className="mb-2"
          onClick={addShoppingCar}
        />
      )}
    </div>
  );
};

export default ShoppingCarButton;
