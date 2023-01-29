import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import './style.scss'

const Progress = ({ category }: { category: string}) => {
  const data = [
    {
      name: "Page A",
      pv: Math.floor(Math.random() * 100),
    },
  ];

  return (
    <div className='progress'>
      <p>{category}</p>
      <ResponsiveContainer width="100%" >
        <BarChart layout="vertical" data={data} height={10} width={200}>
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis dataKey="name" type="category" scale="band" hide />
          <Bar dataKey="pv" barSize={7} fill="#413ea0" />
        </BarChart>
      </ResponsiveContainer>
      <p style={{ fontSize: 10, alignSelf: 'flex-end' }}>${Math.round(1200 * (data[0].pv / 100))}/$1,200</p>
    </div>
  );
};

export default Progress;
