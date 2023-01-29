import { Tooltip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Budget } from "../../types/Budget";
import { Category } from "../../types/enums/Category";
import "./style.scss";

const Progress = ({ budget, total }: { budget: Budget; total: number }) => {
  const data = [
    {
      name: "Page A",
      pv: Math.round((100 * total) / budget.limit),
    },
  ];

  return (
    <div className="progress">
      <p>{Category[budget.category]}</p>
      <ResponsiveContainer width="100%">
        <BarChart layout="vertical" data={data} height={10} width={200}>
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis dataKey="name" type="category" scale="band" hide />
          <Bar dataKey="pv" barSize={7} fill="#413ea0" />
        </BarChart>
      </ResponsiveContainer>
      <Tooltip title={total > budget.limit ? 'Wow, you\'re above your budget! Better keep track next month!' : null} sx={{ cursor: 'pointer' }} >
        <p style={{ fontSize: 10, alignSelf: 'flex-end', cursor: total > budget.limit ? 'pointer' : undefined }}>${total.toLocaleString()}/${budget.limit.toLocaleString()}</p>
      </Tooltip>
    </div>
  );
};

export default Progress;
