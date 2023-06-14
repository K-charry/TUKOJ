import React from "react";
import { useNavigate } from "react-router";
function Table({ columns, data }) {
    const navigator = useNavigate();
    function test(a) {
       navigator(`/problem/${a}`);
        console.log(a);
    }
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} onClick={() => test(item.id)}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.level}</td>
            <td>{item.len}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;