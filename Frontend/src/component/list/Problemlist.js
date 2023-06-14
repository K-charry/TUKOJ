import React, { useState, useEffect, FaAngleDown } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CommonTable from "../table/CommonTable";
import CommonTableColumn from "../table/CommonTableColumn";
import CommonTableRow from "../table/CommonTableRow";
import ReactDOM from "react-dom";
import "./Post.css";
import problemdata from "../../problemdata";
import styled from "styled-components";
import Pagination from "../../Pagination";
import PostList from "./Postlist";
const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
const ProblemList = (props) => {

  // 문제유형의 select
  const[problem, setProblem] = useState("문제유형");
  
  const handlechangeproblem = (event) => {
    setProblem(event.target.value);
  };

  // 레벨의 select
  const[level, setLevel] = useState("레벨");

  const handlechangelevel = (event) => {
    setLevel(event.target.value);
  };

  // 언어의 select
  const[lan, setLan] = useState("언어");

  const handlechangelan = (event) => {
    setLan(event.target.value);
  };
    
  //newDropdown
  const [Problemlist, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  // const [selectedOption, setSelectedOption] = useState(null);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const getProblem = () => {
   //navigate(`/problem/${index}`);
   console.log("test");
  }
  useEffect(() => {
    // setDataList(problemdata);
    axios
      .get("http://127.0.0.1:8000/api/v1/problems/list/")
      .then(function (response) {
        // const slicedData = response.data.slice(offset, offset + limit);
        console.log(response)
        setDataList(response.data);
        // setDataList(slicedData);
      })
      .catch(function (error) {
        console.log(error);
      });
   // setDataList(problemdata);
    // .then((res) => res.json())
    // .then((data) => problemdata(data));
  }, [page]);

  const slicedData = dataList.slice(offset, offset + limit);
  

  //dropdown
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState("");
 // const navigate = useNavigate();
 
  return (
    <>
      <Wrapper>
      <Container>
      <div className="pagename">
        {/* <h1 style={{ color: "grey", marginLeft: 150, marginTop: 100 }}> */}
        <h1 style={{ color: "grey",  marginTop: 30, marginBottom: 30, fontSize: 30, fontWeight: "bold" }}>
          PROBLEM LIST
        </h1>
      </div>
        <div>
          {/* 교재보고 셀렉트 */}
          <label  style={{borderRadius: 30}}>
            <select style={{textAlign: "center",width: 100, height: 30, float: "right", fontSize: 15}} value={problem} onChange={handlechangeproblem}>
            <option value="">전체(유형)</option>
        <option value="code">code</option>
        <option value="blank">blank</option>
        <option value="select">select</option>
      </select>
          </label>

        </div>
      <div
        style={{
          background: "#000066",
          // marginLeft: 150,
          // marginRight: 150,
          marginTop: 100,
          borderRadius: 10,
        }}
      >
        <CommonTable
          headersName={[
            "ID",
            "문제명",
            // borderRadius가 먹히지 않음
            <div  style={{borderRadius: 30}}>  
            {/* 교재보고 셀렉트 */}
            <label> 
              <select style={{textAlign: "center", width : 80, height : 30, fontSize: 15, color: "black"}} value={level} onChange={handlechangelevel}>
              <option style={{ color : "grey"}} value="">레벨</option>
              <option value="lv 1">lv 1</option>
              <option value="lv 2">lv 2</option>
              <option value="lv 3">lv 3</option>
              <option value="lv 4">lv 4</option>
              <option value="lv 5">lv 5</option>
              </select>
            </label>
          </div>,
            <div style={{borderRadius: 30}}>
            {/* 교재보고 셀렉트 */}
            <label>
              <select style={{textAlign: "center", width : 80, height : 30, fontSize: 15, color: "black"}} value={lan} onChange={handlechangelan}>
              <option style={{ color : "light-grey"}} value="">언어</option>
              <option value="c">c</option>
              <option value="c++">c++</option>
              <option value="python">python</option>
              <option value="java">java</option>
              </select>
            </label>
          </div>
          ]}
        >

          {/* problem의 데이터 받아와주는 부분 */}
          {
            // dataList.map(problem => (
            //   <CommonTableRow key={problem.id} problemType={problem.type}>
            //     <CommonTableColumn>{problem.id}</CommonTableColumn>
            //     <CommonTableColumn>{problem.title}</CommonTableColumn>
            //     <CommonTableColumn>{problem.type}</CommonTableColumn>
            //   </CommonTableRow>
            // ))
            slicedData.map(problem => (
              <CommonTableRow key={problem.id} problemType={problem.type}>
                <CommonTableColumn>{problem.id}</CommonTableColumn>
                <CommonTableColumn>{problem.title}</CommonTableColumn>
                <CommonTableColumn>{problem.type}</CommonTableColumn>
              </CommonTableRow>
            ))
          }
        </CommonTable>
      </div>

      <div>
        <Pagination
          total={dataList.length}
          // total={response.data.length}
          // total={setDataList}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        </div>

      </Container>
      </Wrapper>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export default ProblemList;
