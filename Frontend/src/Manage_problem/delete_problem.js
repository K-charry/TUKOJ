import axios from "axios";
import React from "react";
import "./problem.css";

function DeleteForm({ problem }) {
  const handleSubmit = async () => {
    try {
      await axios.delete(
        `http://backend:8000/api/v1/problems/code/${problem.id}`
      );
      alert("문제가 성공적으로 삭제되었습니다!");
    } catch (error) {
      console.log(error);
      alert("문제 삭제에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://backend:8000/api/v1/problems/code/${problem.id}`
      );
      alert("문제가 성공적으로 삭제되었습니다!");
    } catch (error) {
      console.log(error);
      alert("문제 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="btn">
      <button onClick={handleSubmit} type="button" className="submit-btn">
        Save
      </button>
      <button onClick={handleDelete} type="button" className="delete-btn">
        Delete
      </button>
    </div>
  );
}

export default DeleteForm;
