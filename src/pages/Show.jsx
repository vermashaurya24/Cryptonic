import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import showStore from "../stores/showStore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

const Show = () => {
  const id = useParams();
  const store = showStore();
  useEffect(() => {
    store.fetchData(id.id);
  }, []);
  if (!store.data) return <></>;
  return (
    <div>
      <Header back="true" />
      <header className="show-header">
        <img src={store.data?.image?.large} alt={store.data.symbol} />
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <div className="width">
        <div className="show-graph">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={store.graphData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Price"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="show-details">
        <div className="width">
          <h2>Details</h2>
          <div className="show-details-row">
            <h3>Market Cap Rank</h3>
            <span>#{store.data.market_cap_rank}</span>
          </div>
          <div className="show-details-row">
            <h3>24h High</h3>
            <span>${store.data.market_data?.high_24h?.usd}</span>
          </div>
          <div className="show-details-row">
            <h3>Circulating Supply</h3>
            <span>${store.data.market_data?.circulating_supply}</span>
          </div>
          <div className="show-details-row">
            <h3>Current Price</h3>
            <span>${store.data.market_data?.current_price.usd}</span>
          </div>
          <div className="show-details-row">
            <h3>1y Change</h3>
            <span>
              {store.data.market_data?.price_change_percentage_1y.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
