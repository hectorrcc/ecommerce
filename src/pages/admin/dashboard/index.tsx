import { useEffect, useState, type ReactElement } from "react";
import Layout from "@/components/admin/Layout";
import dynamic from "next/dynamic";
import Link from "next/link";

// Carga dinámica del componente Charts
const Charts = dynamic(() => import("@/components/admin/Charts"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <div className="grid">
    <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Pedidos</span>
                    <div className="text-900 font-medium text-xl">500</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                </div>
            </div>
            <span className="text-green-500 font-medium">24 nuevas </span>
            <span className="text-500">desde la última visita</span>
        </div>
    </div>
    <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Ingresos</span>
                    <div className="text-900 font-medium text-xl">$5.670</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-map-marker text-orange-500 text-xl" />
                </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">desde la semana pasada</span>
        </div>
    </div>
    <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Clientes</span>
                    <div className="text-900 font-medium text-xl">68741</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-inbox text-cyan-500 text-xl" />
                </div>
            </div>
            <span className="text-green-500 font-medium">520 </span>
            <span className="text-500">recién registrado</span>
        </div>
    </div>
    <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Comentarios</span>
                    <div className="text-900 font-medium text-xl">152 No leído</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-comment text-purple-500 text-xl" />
                </div>
            </div>
            <span className="text-green-500 font-medium">85 </span>
            <span className="text-500">responded</span>
        </div>
    </div>
    <div className="col-12 lg:col-6 xl:col-6">
        <div className="card mb-0">
          <h5>Venta por meses</h5>
            <Charts />
        </div>
    </div>


  

    
</div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Dashboard;
