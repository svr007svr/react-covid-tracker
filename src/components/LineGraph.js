import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {numeral} from 'numeral';

const option = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersects: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral (tooltipItem.value).format ('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral (value).format ('0a');
          },
        },
      },
    ],
  },
};

function LineGraph({caseType = 'cases', country}) {
  const [data, setData] = useState ({});
  const [CD, setCD] = useState ({});

  // console.log (data);
  // console.log (country);

  const buildChartData = (data, caseType = 'cases') => {
    const chartData = [];

    console.log (chartData);
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDataPoint,
        };
        chartData.push (newDataPoint);
      }
      lastDataPoint = data[caseType][date];
    }
    return chartData;
  };

  const buildCountryChart = (data, caseType = 'cases') => {
    console.log (data);
    const chartData = [];

    let lastDataPoint;
    for (let date in data) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[date] - lastDataPoint,
        };
        chartData.push (newDataPoint);
      }
      lastDataPoint = data[date];
    }
    return chartData;
  };

  useEffect (
    async () => {
      console.log (country);
      const url = country === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=30'
        : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`;

      await fetch (url).then (res => res.json ()).then (data => {
        if (country !== 'worldwidw') {
          setCD (data.timeline);
          const chartData = buildCountryChart (CD);
        }
        const chartData = buildChartData (data, caseType);
        setData (chartData);

        // const chartData = buildChartData (data, caseType);
        // setData (chartData);
      });
    },
    [caseType]
  );

  return (
    <div className="mt-5 bg-dark text-light ">
      {data.length > 0 &&
        <Line
          option={option}
          data={{
            labelColor: ['red'],
            datasets: [
              {
                label: 'WorldWide Cases Chart',
                data: data,
                backgroundColor: 'rgba(204,16,52,0.5)',
                borderColor: '#fff',

                borderWidth: 0.5,
              },
            ],
          }}
        />}
    </div>
  );
}

export default LineGraph;
