import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';


function TretsComuns(props){ 
    
    const [tretsData, setTretsData] = useState([]);
    useEffect(() => {
    axios.get(`http://localhost:8000/api/trets_count/?idclinic=${props.idclinic}`)
      .then(res => setTretsData(res.data))
      .catch(err => console.error(err));
    }, []);
      
    return(
    <div>
        <h2 className="text-xl font-bold mb-2">Trets fenotípics més comuns</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tretsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nom" angle={-40} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
    </div>
    )
}
export default TretsComuns;