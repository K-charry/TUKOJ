import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import Page from "./Page.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import ReactHtmlParser from "html-react-parser";
import axios from "axios";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  margin-bottom: 30px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
`;

function PostWritePage(props) {
  const navigate = useNavigate();
  const styles = {
    wrapper: {
      margin: 8,
      padding: 8,
      display: "flex",
      flexDirection: "row",
      border: "1px solid grey",
      borderRadius: 16,
    },
    imageContainer: {},
    image: {
      width: 50,
      height: 48,
      borderRadius: 25,
      border: "1px solid grey",
      float: "right",
    },
    contentContainer: {
      marginLeft: 10,
      display: "flex",
      flexDirections: "column",
      float: "right",
      marginRight: 14,
    },
    nameText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
    commentText: {
      color: "black",
      fontSize: 16,
    },
    Problem: {
      float: "left",
      fontSize: 16,
    },
  };
  const [postContent, setpostContent] = useState({
    title: "",
    question: "",
  });

  const test = () => {
    axios
      .post("http://127.0.0.1:8000/api/v1/qna/questions/", {
        title: postContent.title,
        question: postContent.question,
      })
      .then(function (response) {
        console.log(response);
        alert("질문글이 생성됐습니다.")
        navigate("/qna"); // '확인' 누르면 질문글 리스트 페이지로 리다이렉션
      })
      .catch(function (error) {
        console.log(error);
        alert("error: 질문글을 생성할 수 없습니다.")
      });
  };

  //적힌 내용들 저장해주는 state => 화면에 보여주려고!
  const [viewContent, setViewContent] = useState([]);

  const getValue = (e) => {
    const { name, value } = e.target;
    setpostContent({
      ...postContent,
      [name]: value,
    });
    console.log(postContent);
  };

  return (
    <Wrapper>
      <Container>
        <Button
          title="뒤로 가기"
          onClick={() => {
            navigate("/qna");
          }}
        />
      </Container>
      <Container classname="post-view">
        <input
          style={{ height: 50 }}
          className="title-input"
          type="text"
          placeholder="  제목"
          onChange={getValue}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          // data="여기 입력해줘여"
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setpostContent({
              ...postContent,
              question: data,
            });
            console.log(postContent);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
          <Button 
          className="submit-button"
          onClick={test}
          title="글 작성하기" />
      </Container>
      <div></div>
      <Container></Container>
    </Wrapper>
  );
}

export default PostWritePage;
