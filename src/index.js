import "./styles.css";
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
const jsonQuery = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};

const getData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery)
  });
  if (!res.ok) {
    return;
  }
  const data = await res.json();
  return data;
};

const buildChart = async () => {
  const data1 = await getData();
  console.log(data);

  const data = {
    labels: [
      "12am-3am",
      "3am-6pm",
      "6am-9am",
      "9am-12am",
      "12pm-3pm",
      "3pm-6pm",
      "6pm-9pm",
      "9am-12am"
    ],
    datasets: [
      {
        name: "Some Data",
        type: "bar",
        values: [25, 40, 30, 35, 8, 52, 17, -4]
      },
      {
        name: "Another Set",
        type: "line",
        values: [25, 50, -10, 15, 18, 32, 27, 14]
      }
    ]
  };

  const chart = new frappe.Chart("#chart", {
    // or a DOM element,
    // new Chart() in case of ES6 module with above usage
    title: "My Awesome Chart",
    data: data,
    type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 250,
    colors: ["#7cd6fd", "#743ee2"]
  });
};
buildChart();
