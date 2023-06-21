import "./main.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import tino from "./tino.png";
import PostList from "../component/page/MainCommunity";

function Main(props) {
  // 공지사항 목록 창과 문제 목록 창을 겹치도록 설정합니다.
  React.useEffect(() => {
    const noticeContainer = document.querySelector(".notice-container");
    const problemContainer = document.querySelector(".problem-container");
    noticeContainer.style.zIndex = 2;
    problemContainer.style.zIndex = 1;
  }, []);

  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    // setDataList(problemdata);
    axios
      .get("http://backend:8000/api/v1/problems/list/")
      .then(function (response) {
        // console.log(response)
        setDataList(response.data.slice(0, 5)); // 처음 5개 요소만 사용
      })
      .catch(function (error) {
        console.log(error);
      });
    // setDataList(problemdata);
    // .then((res) => res.json())
    // .then((data) => problemdata(data));
  }, []);

  const [dataList2, setDataList2] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    // setDataList(problemdata);
    axios
      .get(`http://backend:8000/api/v1/qna/questions/`)
      .then(function (response) {
        setDataList2(response.data.slice(0, 5)); // 처음 5개 요소만 사용
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="main-tino-container">
        <img src={tino} className="main-tino" />
      </div>
      <div className="container">
        <div className="notice-container">
          <h2>Q&A</h2>
          <ul>
            {dataList2.map((qna) => (
              <li key={qna.id}>
                <Link to={`/post/${qna.id}`} state={qna}>
                  {qna.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="problem-container">
          <h2>PROBLEM LIST</h2>
          <ul>
            {dataList.map((problem) => (
              <li key={problem.id}>
                <Link to={`/main_problem/${problem.id}`}>{problem.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
