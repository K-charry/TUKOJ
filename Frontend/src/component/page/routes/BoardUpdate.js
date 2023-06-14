import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "../../ui/Button";
import axios from 'axios';
import QnA from '../../../QnA';

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
const BoardUpdate = () => {
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
    const navigate = useNavigate();
    const { postId } = useParams(); // /update/:postid와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
   
    const [postContent, setPostContent] = useState({
        title: "",
        question: "",
      });

      useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`
            //   `http://127.0.0.1:8000/api/v1/post/update/${postId}/`
            );
            const postData = response.data;
            // setPostContent(postData);
            setPostContent({
                title: postData.title,
                question: postData.question,
            })
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchPost();
      }, [postId]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPostContent((prevState) => ({
          ...prevState,
          [name]: value,
          //밑에 추가해줌
          question: postContent.data,
        }));
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = {
          title: postContent.title,
          question: postContent.question,
        };
        try {
          await axios.put(
            // `http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`,
            `http://127.0.0.1:8000/api/v1/qna/questions/update/${postId}/`,
            updatedPost
          );
          alert("게시글 수정 성공");
          navigate("/post"); // manage 페이지로 이동
        } catch (error) {
          console.log(error);
          alert("게시글 수정 실패");
        }
      };

    //   const updateBoard = async () => {
    //     await axios.patch(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`, postContent).then((res) => {
    //       alert('수정되었습니다.');
    //     //   navigate('/post/' + postId);
    //       navigate(`/post/${postId}`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert('수정 실패');
    //     });
    //   };
    
      const backToDetail = () => {
        navigate('/post/' + postId);
      };
  

    return (
    //   <div>
    //     <div>
    //       <span>제목</span>
    //       <input type="text" name="title" value={postContent.title} onChange={handleSubmit} />
    //     </div>
    //     <br />
    //     {/* <div>
    //       <span>작성자</span>
    //       <input type="text" name="createdBy" value={createdBy} readOnly={true} />
    //     </div> */}
    //     <br />
    //     <div>
    //       <span>내용</span>
    //       <textarea
    //         name="contents"
    //         cols="30"
    //         rows="10"
    //         value={postContent.contents}
    //         onChange={handleChange}
    //       ></textarea>
    //     </div>
        
        <Wrapper>
        <Container>
            <Button
            title="뒤로 가기"
            onClick={() => {
                navigate("/post");
            }}
            />
        </Container>
        <Container classname="post-view">
            <input
            style={{ height: 50 }}
            className="title-input"
            type="text"
            placeholder="  제목"
            onChange={handleChange}
            // onChange={(e) =>
            //  handleChange({ ...postContent, title: e.target.value})
            // }
            value={postContent.title}
            required
            name="title"
            />
            <CKEditor
            editor={ClassicEditor}
            data={postContent.question} //기존의 글 불러오게끔
            // data="여기 입력해줘여"
            onReady={(editor) => {}}
            // onChange={(event, editor) => {
            //     const data = editor.getData();
            //     setPostContent({
            //     ...postContent,
            //     question: data,
            //     });
            // }}
            onChange={handleChange}
            onBlur={(event, editor) => {
                console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
                console.log("Focus.", editor);
            }}
            required
            />
            {/* <button className="submit-button" onClick={handleSubmit}> 
            <Button title="글 작성하기" />
            </button> */}
            <br />
            <div>
            {/* <Button title="수정" onClick={updateBoard}/>
            <Button title="취소" onClick={backToDetail}/> */}
                <Button type="submit" className="submit-btn" title="수정"/>
            </div>
        </Container>
        <div></div>
        <Container></Container>
        </Wrapper>
        
    );
  };
  
  export default BoardUpdate;