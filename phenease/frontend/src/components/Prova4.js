import React from 'react';
import { ComposedChart,XAxis,YAxis,Tooltip,ResponsiveContainer,Customized } from 'recharts';


    // <div>
    //    <p>{props.paraula}</p>
    //</div>

function Prova4(props){ 
   // Comptem els pacients que tenen cada tret
  const data = props.tretsGen.map((tret) => {
    let count = 0;
    Object.values(props.tretsPacient).forEach((pacient) => {
      if (pacient[tret]) count++;
    });
    return { tret, count };
  });
  //a cada element li associem el nombre màxim d'aparicions d'aquell gen
  //en maxCount guardem el nombre de cops que apareix el tret que més cops es repeteix
  //això ens servirà per fer la gradació de colors en el heatmap
  const maxCount = Math.max(...data.map((element) => element.count), 1);

  // Heatmap és un component privat dins del component Prova4
  // a payload guardem informació per cada tret, és a dir, quin tret
  // és i quants cops apareix
  const Heatmap = (props) => {
    const { height, width, x, y, payload, index } = props;

    const cellHeight = 30;
    const intensity = Math.round((payload.count / maxCount) * 255);
    //i definim el color
    const color = `rgb(255, ${255 - intensity}, ${255 - intensity})`;
    // la g representa un grup d'elements; conté rect i text
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={cellHeight}
          fill={color}
          stroke="#ccc"
        />
        <text
          x={x + 5}
          y={y + cellHeight / 2 + 5}
          fill="#000"
          fontSize={12}
        >
          {payload.tret} ({payload.count})
        </text>
      </g>
    );
  };

  return (
    <div>
      <h2>
        Heatmap de trets afectats pel gen: {props.gen}
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 100 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="tret"
            width={100}
            tick={{ fontSize: 14 }}
          />
          <Tooltip
            formatter={(value, name) => [`${value} pacients`, "Tret"]}
          />
          <Customized
            component={({ height, width, offset }) =>
              data.map((entry, index) => {
                return (
                  <Heatmap
                    key={entry.tret}
                    height={height}
                    width={width - 100}
                    x={100}
                    y={index * 30}
                    payload={entry}
                    index={index}
                  />
                );
              })
            }
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Prova4;