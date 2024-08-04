import { number, object, string } from "yup";

export const productShema = object().shape({
  name: string().required("Nombre requerido"),
  price: number()
    .required("Precio requierido")
    .typeError("EL precio es requerido"),
  quantity: number()
    .required("Cantidad requerida")
    .typeError("La cantidad es requerida"),
  category: string().notOneOf([""], "Selecciona una opción").required(),
  description: string(),
  image: string().url("Formato de url inálido"),
});
