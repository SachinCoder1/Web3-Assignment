import React, { useState, useEffect, useContext } from "react";
import MainLayout from "../components/layouts/MainLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button, Input } from "@material-tailwind/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { fetchTimestamp } from "../api/AnalyticsApi";
import { timeConverter } from "../utils/timeConverter";

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const [contractAddressInput, setContractAddressInput] = useState("");

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: analyticsData.lengt
          ? analyticsData.map((item) => item.avg)
          : [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  useEffect(() => {
    const fetchTimeStamp = async () => {
      if (contractAddress.length) {
        const data = await fetchTimestamp(contractAddress);
        console.log(data);
        if (data) {
          setAnalyticsData(data.dataPoints);
        } else {
          setAnalyticsData([]);
        }
      }
    };
    fetchTimeStamp();
  }, [contractAddress]);

  return (
    <MainLayout>
      <div className="space-y-10">
        <Input
          name="address"
          value={contractAddressInput}
          onChange={(e) => {
            setContractAddressInput(e.target.value);
          }}
          label="Contract Address"
        />
        <Button
          onClick={() => {
            setContractAddress(contractAddressInput);
          }}
          className="flex items-center justify-center text-base gap-x-2 bg-primary"
          fullWidth
          disabled={!contractAddressInput.length}
        >
          Check Address
          <AiOutlineArrowRight className="text-2xl" />
        </Button>
      </div>
      <div className="w-3/4">
        <Line
          options={options}
          data={{
            labels: analyticsData.length
              ? analyticsData.map((item) => timeConverter(item.timestamp))
              : [33, 53, 85, 41, 44, 65],
            datasets: [
              {
                label: "First dataset",
                data: analyticsData.length
                  ? analyticsData.map((item) => item.avg)
                  : [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
              },
            ],
          }}
        />
      </div>
    </MainLayout>
  );
}
