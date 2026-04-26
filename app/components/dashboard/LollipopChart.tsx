"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Input from "../elements/Input";
import Dropdown from "../elements/Dropdown";
import { lollipopChartMonths, lollipopChartValues, lollipopChartOptions, lollipopChartSeries } from "../data/MockData";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LollipopBarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  const months = lollipopChartMonths;
  const values = lollipopChartValues;
  const options = lollipopChartOptions;
  const series = lollipopChartSeries;

  return (
    <div className="w-full p-4 mt-8 bg-[#391F68] rounded-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-white text-xs sm:text-sm font-medium">Total Payments</h2>
        </div>
        <div className="flex flex-row  gap-1 sm:gap-2   items-center w-full sm:w-auto">
          {/* calendar */}
          <Input 
            type="date" 
            placeholder="Select Date" 
            className="border text-xs  sm:text-sm rounded-2xl sm:rounded-3xl px-1 sm:px-3 py-1 outline-none text-white border-[#5FDA78] w-full max-w-[150px] xs:w-auto"
            containerClassName="border-none!"
          />
          
          <Dropdown
            options={months}
            value={selectedMonth}
            onChange={(month) => setSelectedMonth(month)}
            placeholder="March"
            triggerClassName="max-w-[105px]!  hover:bg-transparent!"
            containerClassName="w-full  flex justify-end xs:w-auto"
          />
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="min-w-[600px] sm:min-w-full">
          <Chart options={options} series={series} type="line" height={200} />
        </div>
      </div>
    </div>
  );
};

export default LollipopBarChart;