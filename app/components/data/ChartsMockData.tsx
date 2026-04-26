// DonutChart mock data
export const donutChartMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const donutChartData = [
  {
    label: "Total Amount",
    value: 10000,
    color: "#5FDA78",
    amount: "£ 10,000"
  },
  {
    label: "Shugun Account",
    value: 5000,
    color: "#CC9B00",
    amount: "£ 5,000"
  },
  {
    label: "Couple Account",
    value: 9000,
    color: "#EF5930",
    amount: "£ 9,000"
  }
];

export const donutChartOptions = {
  chart: {
    type: "donut" as const,
  },
  labels: donutChartData.map(item => item.label),
  colors: donutChartData.map(item => item.color),

  legend: {
    show: false, // hide default legend (you can custom design),
  },

  dataLabels: {
    enabled: false,
  },

  stroke: {
    width: 3, // clean edges like your design
    colors: ["#391F68"],
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%", // controls thickness
      },
    },
  },

  states: {
    hover: {
      filter: {
        type: "none"
      }
    }
  }
};

export const donutChartSeries = donutChartData.map(item => item.value);

export const dashLineChartOptions = {
  chart: {
    type: "line" as const,
    height: 350,
    zoom: { enabled: false },
    toolbar: { show: false }, // cleaner UI
  },

  dataLabels: {
    enabled: false,
  },

  // Both dashed lines
  stroke: {
    width: [3, 3],
    curve: "smooth" as const,
    dashArray: [6, 6],
  },

  // Colors like your design
  colors: ["#5FDA78", "#F1CF18"],

  legend: {
    show: false, // you can use custom legend like your UI
  },

  markers: {
    size: 0,
    hover: {
      sizeOffset: 5,
    },
  },

  grid: {
    borderColor: "#4A2A7A", // matches purple background better
    strokeDashArray: 4,
  },

  xaxis: {
    categories: [
      "01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12",
    ],
    labels: {
      style: {
        colors: "#CFC3E6",
      },
    },
    axisBorder: {
      show: false, // keep hidden if you don't want bottom line
    },
    axisTicks: {
      show: false,
    },
  },

  yaxis: {
    labels: {
      style: {
        colors: "#CFC3E6",
      },
    },
  },

  tooltip: {
    theme: "dark",
  }
};

export const dashLineChartSeries = [
  {
    name: "Active",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  },
  {
    name: "Inactive",
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  },
];

// DashLineChart mock data
export const dashLineChartMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const dashLineChartActiveSeries = [
  {
    name: "Active",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  },
  {
    name: "Inactive",
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  },
];