import React from 'react';
import { useNavigate } from 'react-router';

const CommonTableRow = ({ children, problemType }) => {
  const navigator = useNavigate();
  const test = (id) => {
     switch (problemType) {
        case 'code':
           navigator(`/problem/${id}`);
           break;
        case 'blank':
           navigator(`/shortquiz/${id}`);
           break;
        case 'select':
           navigator(`/oxquiz/${id}`);
           break;
        default:
           console.error("Invalid problem type");
           break;
     }
  };
  return (
    <tr className="common-table-row" onClick = {() => test(children[0].props.children)}>
      {
        children
      }
    </tr>
  )
}


export default CommonTableRow;