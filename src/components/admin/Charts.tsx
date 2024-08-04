"use client";
import { NextPage } from "next";
import { useState } from "react";
import Chart from "react-apexcharts";

interface Props {}

const optionsInit = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
    ],
  },
};

const seriesInit = [
  {
    name: "Ventas",
    data: [20000, 18000, 19000, 30000, 25000, 23600, 23900],
  },
];

const Charts: NextPage<Props> = ({}) => {
  const [options, setOptions] = useState(optionsInit);
  const [series, setSeries] = useState(seriesInit);
  return (
    <div>
      <Chart options={options} series={series} type="bar" width="500"  />
    </div>
  );
};

export default Charts;
