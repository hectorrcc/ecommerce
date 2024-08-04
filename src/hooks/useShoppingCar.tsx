import { shoppingCarAtom } from "@/store/shopingCar.store";
import { useAtom } from "jotai";

export const useShoppingCar = () => {
  const [shoppingCar, setShoppingCar] = useAtom(shoppingCarAtom);

  const addShoppingCar = () => {
    setShoppingCar(shoppingCar + 1);
  };

  return{addShoppingCar, shoppingCar}
};
