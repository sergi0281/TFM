import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, LabelList } from 'recharts';
import axios from 'axios';


function GraficaBarres(props){ 
    
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/gens_count/?idclinic=${props.idclinic}`)
          .then(res => setData(res.data))
          .catch(err => console.error(err));
      }, []);
    
      
    return(
    <div>
        <div>
            <h2 className="text-xl font-semibold mb-4">Distribució de gens dels pacients</h2>
        
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="gen" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#38bdf8" >
                        <LabelList dataKey="gen" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
    )
}
export default GraficaBarres;