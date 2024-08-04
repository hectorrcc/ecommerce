import {
  createProduct,
  editProduct as apiEditProduct,
} from "@/fetching/products";
import { productShema } from "@/schemas/product.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { Dialog } from "primereact/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { MouseEvent, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "primereact/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemoizedFn } from "ahooks";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  editProduct?: Product | undefined;
}

interface IFormInputs {
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  image?: string;
}

const Modal: NextPage<Props> = ({
  visible,
  setVisible,
  editProduct,
}: Props) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(productShema),
  });

  useEffect(() => {
    if (editProduct) {
      reset(editProduct);
    } else {
      reset({
        name: "",
        category: "",
        description: "",
        image: "",
      });
    }
  }, [editProduct]);

  const mutation = useMutation({
    mutationFn: (data: IFormInputs) =>
      toast.promise(
        !editProduct
          ? createProduct(data)
          : apiEditProduct(data, editProduct.id),
        {
          pending: "Guardando información",
          success: "Información guardada con éxito",
          error: "Error al guardar información",
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = useMemoizedFn(async (data) => {
    mutation.mutate(data);
    reset();
    setVisible(false);
  });

  const handleSetVisible = useMemoizedFn(() => {
    setVisible(false);

    reset();
  });
  const handleCancel = useMemoizedFn((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reset();
    if (editProduct) {
      setVisible(false);
    }
  });
  return (
    <div>
      <Dialog
        className="w-[400px]"
        header="Nuevo producto"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          handleSetVisible();
        }}
      >
        <div className="p-2 mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex  justify-center space-x-2 mb-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nike"
                />
                <span className="!text-red-600">{errors.name?.message}</span>
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una opción
                </label>
                <select
                  {...register("category")}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Categorías</option>
                  <option value="Deportivo">Deportivo</option>
                  <option value="Casual">Casual</option>
                </select>
                <span className="!text-red-600">
                  {errors.category?.message}
                </span>
              </div>
            </div>
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Precio
                </label>
                <input
                  {...register("price")}
                  type="number"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="50"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
                <span className="!text-red-600">{errors.price?.message}</span>
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Cantidad
                </label>
                <input
                  {...register("quantity")}
                  type="number"
                  id="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="20"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
                <span className="!text-red-600">
                  {errors.quantity?.message}
                </span>
              </div>
            </div>
            <div>
              <div className="grid gap-3 mb-6 md:grid-cols-2 ">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    URL imagen
                  </label>
                  <input
                    type="text"
                    {...register("image")}
                    id="imagen"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://http2.mlstatic.com/D_NQ_NP_604047-MLB76087068751_042024-O.webp"
                  />
                </div>
              </div>
              <div className="grid gap-3 mb-6 md:grid-cols-2 ">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Descripción
                  </label>
                  <textarea
                    {...register("description")}
                    id="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button size="small" label="Guardar" type="submit" />
              <Button
                size="small"
                label="Cancelar"
                onClick={handleCancel}
                severity="danger"
              />
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
