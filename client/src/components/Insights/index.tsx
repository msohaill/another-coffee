import { Paper } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Label,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import Nav from "../Nav";

const Insights = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const data = [
    {
      name: "JAN",
      spent: 251.98,
    },
    {
      name: "FEB",
      spent: 16.98,
    },
    {
      name: "MAR",
      spent: 92.99,
    },
    {
      name: "APR",
      spent: 500.34,
    },
    {
      name: "MAY",
      spent: 1032.11,
    },
    {
      name: "JUN",
      spent: 624.14,
    },
    {
      name: "JUL",
      spent: 315.56,
    },
    {
      name: "AUG",
      spent: 924.11,
    },
    {
      name: "SEP",
      spent: 80.91,
    },
    {
      name: "OCT",
      spent: 100.39,
    },
    {
      name: "NOV",
      spent: 724.13,
    },
    {
      name: "DEC",
      spent: 80.91,
    },
  ];
  return (
    <>
      <Nav title="Insights" goHome setPage={setPage} />
      <Paper className="tab" sx={{ boxShadow: "none" }}>
        <h2>Your spending trends.</h2>
        <ResponsiveContainer width="100%" height="20%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" hide />
            <Label
              value="Pages of my website"
              offset={0}
              position="insideBottom"
            />
            <YAxis hide />
            <Tooltip
              formatter={(_v, _name, _item, _index, p) =>
                `$${(p[0].value as number)?.toFixed(2).toLocaleString()}`
              }
            />
            <Line
              type="monotone"
              dataKey="spent"
              stroke="#222938"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
        <h2>Total Expenditure</h2>
        <p style={{ fontSize: 30, margin: 0 }}>${data.reduce((p, c) => p + c.spent, 0).toLocaleString()}</p>
      </Paper>
    </>
  );
};

export default Insights;
