import { shoppingCarAtom } from "@/store/shopingCar.store";
import { useMemoizedFn } from "ahooks";
import { useAtom } from "jotai";
import { toast } from "react-toastify";

export const useShoppingCar = () => {
  const [shoppingCar, setShoppingCar] = useAtom(shoppingCarAtom);

  const addShoppingCar = useMemoizedFn(() => {
    setShoppingCar(shoppingCar + 1);
    toast("Producto agregado", { type: "success" });
  });

  return { addShoppingCar, shoppingCar };
};
