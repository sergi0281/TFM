import React from 'react';
import { ComposedChart,XAxis,YAxis,Tooltip,ResponsiveContainer,Customized } from 'recharts';


    // <div>
    //    <p>{props.paraula}</p>
    //</div>

function Prova4(props){ 
  console.log("el tretsPacient i el TretsGen són així")
  //console.log(props.tretsPacient)
  //console.log(props.tretsGen)
   // Comptem els pacients que tenen cada tret
  const data = props.tretsGen.map((tret) => {
    let count = 0;
    //Object.values(props.tretsPacient).forEach((pacient) => {
    //  console.log('Tret:', tret, '| Pacient té el tret?', pacient[tret]);
    //  if (pacient[tret]) count++;
    //});
    //return { tret, count };
    Object.values(props.tretsPacient).forEach((pacient) => {
      //if (pacient.caracteristiques) {
      //  console.log('Tret actual:', tret);
      //  console.log('Característiques del pacient:', pacient.caracteristiques);
      //  pacient.caracteristiques.forEach((carac) => {
      //    console.log('Comparant:', carac, '===', tret, '?', carac === tret);
      //  });
      //}
      if (pacient.caracteristiques && pacient.caracteristiques.some((carac) => carac.codi === tret)) {
        count++;
      }
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
    //console.log('DATA PER AL HEATMAP:', data);
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={cellHeight}
          fill={color}
          stroke="#ccc"
          >
          <title>
            {`${payload.tret}: ${payload.count} pacients`}
          </title>
        </rect>
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

      <ResponsiveContainer width="100%" height={data.length * 35}>
        <ComposedChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 50, bottom: 20, left: 100 }}
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
                    width={width - 150}
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