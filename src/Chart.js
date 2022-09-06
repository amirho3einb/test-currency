import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import Select from "react-select";

const MyChart = () => {
  const [min, setMin] = useState({ value: "1min", label: "1min" });
  const [type, setType] = useState({ value: "BTC-USDT", label: "BTC-USDT" });

  const minOptions = [
    { value: "1min", label: "1min" },
    { value: "3min", label: "3min" },
    { value: "5min", label: "5min" },
    { value: "15min", label: "15min" },
    { value: "30min", label: "30min" },
    { value: "1hour", label: "1hour" },
    { value: "2hour", label: "2hour" },
    { value: "4hour", label: "4hour" },
    { value: "6hour", label: "6hour" },
    { value: "8hour", label: "8hour" },
    { value: "12hour", label: "12hour" },
    { value: "1day", label: "1day" },
    { value: "1week", label: "1week" },
  ];

  const typeOptions = [
    { value: "BTC-USDT", label: "BTC-USDT" },
    { value: "ETH-USDT", label: "ETH-USDT" },
  ];

  const { isLoading, error, data, isFetching } = useQuery(
    ["repoData", min, type],
    () =>
      axios
        .get(
          `https://api.kucoin.com/api/v1/market/candles?type=${min.value}&symbol=${type.value}&startAt=1659419098&endAt=1759419098`
        )
        .then((res) => res.data)
  );

  const [chartData, setChartData] = useState([]);
  const [closingPrices, setClosingPrices] = useState([]);

  useEffect(() => {
    if (data) {
      setChartData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (chartData.length > 0) {
      const tempClosingPrices = chartData.map((item) => parseInt(item[2]));
      console.log(tempClosingPrices);
      setClosingPrices(tempClosingPrices);
    }
  }, [chartData]);

  return (
    <>
      <div className="header">
        <Select value={min} onChange={setMin} options={minOptions} />
        <Select value={type} onChange={setType} options={typeOptions} />
      </div>
      <div >
        <LineChart closingPrices={closingPrices} />
      </div>
    </>
  );
};

export default MyChart;
