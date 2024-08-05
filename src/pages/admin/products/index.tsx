import { ReactInstance, useRef, useState, type ReactElement } from "react";
import Layout from "@/components/admin/Layout";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Image from "next/image";
import { Rating } from "primereact/rating";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteProduct, getProducts } from "@/fetching/products";
import Spinner from "@/components/Spinner";
import Modal from "@/components/admin/Modal";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { toast, ToastContainer } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useMemoizedFn } from "ahooks";

const Products = () => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();
  const [editProduct, setEditPorduct] = useState<Product | undefined>();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const mutation = useMutation({
    mutationFn: (id: string) =>
      toast.promise(deleteProduct(id), {
        pending: "Eliminando Producto",
        success: "Producto eliminado",
        error: "Error eliminando producto",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const imageBodyTemplate = useMemoizedFn((rowData: Product) => {
    return (
      <Image
        src={`${rowData.image ? rowData.image : "/img/products/default.webp"}`}
        alt=""
        className="shadow-2 w-32 h-[61px]"
        width={100}
        height={100}
        priority
      />
    );
  });
  const priceBodyTemplate = useMemoizedFn((rowData: Product) => {
    return `$${rowData.price}`;
  });

  const ratingBodyTemplate = useMemoizedFn((rowData: Product) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  });

  const accept = useMemoizedFn((id: string) => {
    mutation.mutate(id);
  });

  const confirmDelete = useMemoizedFn((id: string) => {
    confirmDialog({
      message: "¿Quieres eliminar este registro?",
      header: "Confirmación de eliminación",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
    });
  });

  const handelEditProduct = useMemoizedFn((product: Product) => {
    setEditPorduct(product);
    setVisible(true);
  });

  const buttonsMenu = (rowData: Product) => {
    return (
      <div>
        <button
          onClick={() => handelEditProduct(rowData)}
          className="border-2 !border-cyan-500 rounded-full p-1 w-[40px] h-[40px] mx-1 !text-gray-600"
        >
          <span className="pi pi-pencil"></span>
        </button>
        <button
          onClick={() => confirmDelete(rowData.id)}
          className="border-2 !border-red-500 rounded-full p-1 w-[40px] h-[40px] mx-1 !text-gray-600"
        >
          <span className="pi pi-trash"></span>
        </button>
      </div>
    );
  };
  const handleVisible = useMemoizedFn(() => {
    setEditPorduct(undefined);
    setVisible(true);
  });

  return (
    <div className="col-12">
      <ConfirmDialog />
      <ToastContainer hideProgressBar={true} theme="colored" autoClose={3000} />

      <Modal
        visible={visible}
        setVisible={setVisible}
        editProduct={editProduct}
      />

      <div className="flex justify-between mb-2">
        <h5>Productos</h5>
        <div className="space-x-2">
          <Button size="small" onClick={handleVisible} label="Nuevo" />
          <Button
            icon="pi pi-print"
            outlined
            aria-label="Filter"
            size="small"
            onClick={handlePrint}
          />
        </div>
      </div>
      <div ref={componentRef} className="card">
        {query.isFetching ? (
          <Spinner />
        ) : (
          <DataTable value={query.data} dataKey="id">
            <Column expander style={{ width: "3em" }} />
            <Column field="name" header="Nombre" sortable />
            <Column header="Imagen" body={imageBodyTemplate} />
            <Column
              field="price"
              header="Precio"
              sortable
              body={priceBodyTemplate}
            />
            <Column field="quantity" header="cantidad" sortable />
            <Column field="category" header="Categoría" sortable />
            <Column
              field="rating"
              header="Reviews"
              sortable
              body={ratingBodyTemplate}
            />
            <Column field="rating" header="Opciones" body={buttonsMenu} />
          </DataTable>
        )}
      </div>
    </div>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  const queryClientHome = new QueryClient();
  return (
    <QueryClientProvider client={queryClientHome}>
      <Layout>
        <Products />
      </Layout>
    </QueryClientProvider>
  );
};

export default Products;
