import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled, { createGlobalStyle } from 'styled-components';
import './editor.css';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python'; // 자바스크립트에서 파이썬으로 바꿔줌..!
import 'ace-builds/src-noconflict/theme-monokai';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import {FaRegLightbulb} from "react-icons/fa";

const Layout = styled.div`
  flex-direction: row;
  padding: 5px 1;
  color: #000000;
  font-size: 20px;
  font-family: sans-serif;
  flex: 1;
  background-color: #FFFFFF;
`;
const SourceCodeContainer = styled.div`
  flex: 3;
`;

function ProblemInfoComponent({problemId}) {
  const [problemData, setProblemData] = useState({});
  useEffect(() => {
    if (problemId !== undefined) {
       axios
      .get(`http://backend:8000/api/v1/problems/code/${problemId}/`)
      .then(response => {
        setProblemData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    } 
  }, [problemId]);
  return (
  <div>
    <div key={problemData.id}>
      <div className='description-container'>
        <p className='description-text'> {problemData.id}. {problemData.title} </p>
        <p className='description-text'> {problemData.description}</p>
      </div>
      <div className='io-container'>
        <div className='input-container'>
          Input<br /> {problemData.input_format}
        </div>
        <div className='output-container'>
          Output<br />  {problemData.output_format}
        </div>
      </div>
    </div>
</div>

  );
}

function SourceCodeInputComponent({ 
  problemId, 
  executionResult, 
  setExecutionResult,
  sourceCode,
  handleSourceCodeChange
 }) {
  return (
    <div className="source-code-input">
      <AceEditor
        mode="python" // javascript에서 python으로 바꿈.
        theme="monokai"
        name="source-code-editor"
        value={sourceCode}
        onChange={handleSourceCodeChange}
        editorProps={{ $blockScrolling: true }}
        height="500px"
        width="100%"
        // style={{ borderRadius: '30px' }}
        fontSize={12}
      />
      {/* <button onClick={handleSourceCodeSubmit} className="submit-button">Submit</button> */}
    </div>
  );
}

function ExecutionResultComponent({ problemId, executionResult, setExecutionResult }) {

  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, [executionResult]);

  return (
    <div className="execution-result">
      <h4>실행 결과</h4>
      <p>{executionResult}</p>
    </div>
  );
}

function Editor() {
  const { id } = useParams(); // URL 파라미터로부터 id 가져오기
  const problemId = id; // problemId에 할당

  const [executionResult, setExecutionResult] = useState(null);
  const [sourceCode, setSourceCode] = useState('');

  function handleSourceCodeChange(value) {
    setSourceCode(value);
  }

  useEffect(() => {
    // 클라이언트(리액트 앱)에서 Flask서버(채점서버)에 연결
    const socket = io('http://localhost/judge');
    socket.on('test_case_result', (data) => {
      console.log(data);
      setExecutionResult(`Test case input: ${data.input}\nTest case status: ${data.status}\nOutput: ${data.output}\nExpected output: ${data.expected}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSourceCodeSubmit() {
    axios
    .post('http://backend:8000/api/v1/solutions/submit/', {
      source_code: sourceCode,
      problem: problemId, //CodingProblem id
    })
    .then(response => {
      console.log('Response', response);
      alert('소스코드가 성공적으로 제출 됐습니다!');
      })
      .catch(error => {
        console.error(error);
        alert('소스코드를 제출하는 동안 에러가 발생했습니다.');
      });
    }

  const [problemData, setProblemData] = useState([]);
  const [showHint, setShowHint] = useState(false); // 상태 추가: 힌트 보기 여부
  useEffect(() => {
    if (problemId !== undefined) {
      axios
        .get(`http://backend:8000/api/v1/problems/code/${problemId}/`)
        .then(response => {
          setProblemData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [problemId]);
  /*헤더 글씨 만큼 크기 자동 조절 기능*/

  // 힌트 보기 함수
  function showHintModal() {
    setShowHint(true);
  }
  // 힌트 모달 닫기 함수
  function closeHintModal() {
    setShowHint(false);
  }

  return (
    <div className="online-judge-layout">
      <div className='editor-header'>
        <div className='editor-header-wrapper'>
          <div className='editor-header-container1'>
            LV  {problemData.level} &nbsp;&nbsp;&gt;&nbsp;&nbsp; {problemData.id}. &nbsp;{problemData.title}
          </div>
          <button className="hint-button" onClick={showHintModal}>힌트</button>
        </div>
      </div>
      <Layout className="editor_container">
        <div className="problem_info_container">
          <ProblemInfoComponent problemId={problemId} />
        </div>
        <SourceCodeContainer className="source-code-and-execution-result" >
          <div className="source-code-container">
            <SourceCodeInputComponent 
              problemId={problemId} 
              executionResult={executionResult} 
              setExecutionResult={setExecutionResult}
              sourceCode={sourceCode} // 소스 코드를 SourceCodeInputComponent에 전달
              handleSourceCodeChange={handleSourceCodeChange}
              handleSourceCodeSubmit={handleSourceCodeSubmit}
            />
          </div>
          <div className="execute-container">
            <ExecutionResultComponent problemId={problemId} executionResult={executionResult} setExecutionResult={setExecutionResult}/>
            {/* <SourceCodeInputComponent onSubmit={handleSourceCodeSubmit} /> */}
          </div>
        </SourceCodeContainer>
        {/* 힌트 모달 */}
        {showHint && (
          <div className="hint-modal" style={{ zIndex: 1 }}>
            {/* 힌트 내용 */}
            <div className="hint-content">
              <FaRegLightbulb className="hint-icon" />
              <span className="hint-text">힌트</span>
              <div className='hint-content2'>
                <p className='hint-text2'>{problemData.hint}</p>
              </div>
            </div>
            {/* 닫기 버튼 */}
            <div className='hint-close-button-container'>
              <button className="hint-close-button" onClick={closeHintModal}>닫기</button>
            </div>
          </div>
        )}
      </Layout>
      <div className="editor-footer">
          <div className="button-container">
            <button onClick={handleSourceCodeSubmit} className="submit-button">제출</button>
            {/* <button className="execute-button">실행</button> */}
          </div>
      </div>
    </div>
  );
}
export default Editor;
