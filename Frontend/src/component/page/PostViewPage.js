import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/CommentInput";
import Button from "../ui/Button";
import data from "../../data.json";
import { useLocation } from "react-router";
import ReactHtmlParser from "html-react-parser";
import axios from 'axios';


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
  max-width: 720px;
  margin-bottom: 20px;

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

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

function PostViewPage(props) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { state } = useLocation();

  //게시글 수정 
  const moveToUpdate = () => {
    navigate('/update/' + postId);
  };
 // 게시글 삭제
 const deleteBoard = async () => {
  if (window.confirm('게시글을 삭제하시겠습니까?')){
    await axios.delete(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`).then((res) => {
      alert('삭제되었습니다.');
      navigate('/qna');
    })
  }
}
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
  
  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`);
      if (response.status === 200) {
        setPost(response.data);
      } else {
        console.error('Failed to fetch post, response status: ', response.status);
      } 
    } catch (error) {
      console.error('Failed to fetch post: ', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/answers/`, {
        answer: comment,
        question: postId
      });

      if (response.status === 201) {
        setComment(''); //댓글 작성 후에 입력부분 다시 새로고침
        fetchPost();
      } else {
        console.error('Failed to create comment, response status: ', response.status);
      }
    } catch (error) {
      console.error('댓글 생성에 실패: ', error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };
  return (
    <Wrapper>
      <Container>
        <div id="QnA" className="pagename">
          <h1
            style={{
              color: "grey",
              marginTop: 30,
              marginBottom: 30,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            QnA
          </h1>
        </div>
      </Container>
      <Container>
        <Button
          title="뒤로 가기"
          onClick={() => {
            navigate("/qna");
          }}
        />
      </Container>
      <Container>
        <PostContainer>
          <div>
            <div style={StyleSheet.imageContainer}>
              <img src={require("./tino.png")} style={styles.image} />
              {/* <img src="./public/profile.png" style={styles.image}></img> */}
            </div>
            <TitleText>{state.title}</TitleText>
            <div style={styles.contentContainer}>
              <span style={styles.nameText}>이름</span>
            </div>
            <ContentText>{post ? ReactHtmlParser(post.question) : '질문글 로딩중....'}</ContentText>
          </div>
        </PostContainer>
        
          {/* 이쯤에 삭제 수정 버튼 넣어주면 될것 같음  */}
          <Button
          title="삭제"
          onClick={deleteBoard}
        />
         {/* <Button
          title="수정"
          onClick={moveToUpdate}
        /> */}
        <Link to={`/update/${postId}`}>
        <Button
          title="수정"
          onClick={moveToUpdate}/>
        </Link>
        <CommentLabel>Comment</CommentLabel>
        {post ? <CommentList comments={post.answers} /> : <p> 댓글 로딩중 ...</p>}

        <form onSubmit={addComment}>
          <input
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="답변댓글 작성"
          />
        <Button title="댓글 작성" type="submit"/>
        </form>
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;
