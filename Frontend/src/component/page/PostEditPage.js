import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

function PostEditPage(props) {
  const navigate = useNavigate();
  const {postId}=useParams();

  const [postContent, setPostContent] = useState({
    title: "",
    question: "",
  });

  useEffect(() => {
    // 게시물 데이터 초기화 로직
    setPostContent({
      title: "",
      question: "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://backend:8000/api/v1/qna/questions/${postId}/`, postContent);
      alert("게시물이 수정되었습니다.");
      navigate("/qna");
    } catch (error) {
      console.log(error);
      alert("게시물 수정에 실패했습니다.");
    }
  };

useEffect(() => {
    // 게시물 데이터 가져오기
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://backend:8000/api/v1/qna/questions/${postId}`);
        const postData = response.data;
        setPostContent({
          title: postData.title,
          question: postData.question,
        });
      } catch (error) {
        console.log(error);
        alert("게시물을 가져오는 데 실패했습니다.");
      }
    };

    fetchPostData();
  }, [postId]);

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
          placeholder="제목"
          onChange={handleInputChange}
          name="title"
          value={postContent.title}
        />
        <CKEditor
          editor={ClassicEditor}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            setPostContent((prevState) => ({
              ...prevState,
              question: data,
            }));
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
          data={postContent.question}
        />
        <Button className="submit-button" onClick={handleSubmit} title="수정" />
      </Container>
      <div></div>
      <Container></Container>
    </Wrapper>
  );
}

export default PostEditPage;
