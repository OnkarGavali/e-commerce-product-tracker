import React from "react";
import Chart from "chart.js";
import { connect } from "react-redux";

function CardBarChart({chartProductList}) {
 
  React.useEffect(() => {
    const date = new Date();
    const day = date.getDay()
    const daylist = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDayList = [daylist[day], ...daylist.slice(day+1), ...daylist.slice(0,day),daylist[day]]
    const color = ["#ed64a6","#4c51bf","#ffaa00","#4dff4d","#3366ff"]
    
    let i = 0 
    const dataset = [] 
    chartProductList.map((product) => {
      const li= []
      product.prices.map((price)=>{
        li.push(price)
      })
      dataset.push({
        label:  product.ProductTagName,
        backgroundColor: color[i],
        borderColor: color[i],
        data:li,
        fill: false,
        barThickness: 8,
      })
    })

    
    let config = {
      type: "bar",
      data: {
        labels: currentDayList,
        datasets: dataset,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Overview-Bar
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
               Product Price graph
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  chartProductList : state.chartProductList.chartProductList,
})

export default connect(mapStateToProps)(CardBarChart) 