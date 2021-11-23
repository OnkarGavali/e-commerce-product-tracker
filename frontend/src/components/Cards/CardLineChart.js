import React from "react";
import Chart from "chart.js";
import { connect } from "react-redux";

function CardLineChart({chartProductList}) {
  React.useEffect(() => {
    const date = new Date();
    const day = date.getDay()
    const daylist = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDayList = [daylist[day], ...daylist.slice(day+1), ...daylist.slice(0,day),daylist[day]]
    const color = ["#ed64a6","#4c51bf","#fff","#4dff4d","#3366ff"]
    
    let i = 0 
    const dataset = [] 
    chartProductList.map((product) => {
      const li= []
      product.prices.map((price)=>{
        li.push(price)
      })
      dataset.push({
        label: product.ProductTagName,
        backgroundColor: color[i],
        borderColor: color[i],
        data:li,
        fill: false
      })
    })
    
    
    var config = {
      type: "line",
      data: {
        labels: currentDayList,
        datasets: dataset,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Days",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview-Line
              </h6>
              <h2 className="text-white text-xl font-semibold">Product Price graph</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  chartProductList : state.chartProductList.chartProductList,
})

export default connect(mapStateToProps)(CardLineChart);