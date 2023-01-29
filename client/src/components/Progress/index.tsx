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
      <p style={{ fontSize: 10, alignSelf: "flex-end" }}>
        ${total.toLocaleString()}/${budget.limit.toLocaleString()}
      </p>
    </div>
  );
};

export default Progress;
