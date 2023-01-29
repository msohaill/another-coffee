import { Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Budget } from "../../types/Budget";
import { Category } from "../../types/enums/Category";
import "./style.scss";

const Progress = ({ budget, total }: { budget: Budget; total: number }) => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (total +200 > budget.limit)
      axios.post('http://localhost:8000/message/', { category: budget.category, overflow: Math.round(total - budget.limit) })
        .then(res => setMessage(res.data))
        .catch(e => console.log(e));
  }, [budget.category, budget.limit, total]);

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
      <Tooltip title={message} sx={{ cursor: 'pointer' }} >
        <p style={{ fontSize: 10, alignSelf: 'flex-end', cursor: total > budget.limit ? 'pointer' : undefined }}>${total.toLocaleString()}/${budget.limit.toLocaleString()}</p>
      </Tooltip>
    </div>
  );
};

export default Progress;
