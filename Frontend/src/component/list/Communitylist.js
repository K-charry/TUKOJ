import axios from "axios";
import React, { useState, useEffect, FaAngleDown } from "react";
import styled from "styled-components";
import CommunityListItem from "./CommunityListItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function Communitylist(props) {
  const [dataList, setDataList] = useState([]);
  const { posts, onClickItem } = props;
  useEffect(() => {
    // setDataList(problemdata);
    axios
      .get("http://127.0.0.1:8000/api/v1/qna/questions/${id}")
      .then(function (response) {
        setDataList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setDataList(problemdata);
    // .then((res) => res.json())
    // .then((data) => problemdata(data));
  }, []);
  return (
    <Wrapper>
      {/* {posts.map((post, index) => { */}
      {dataList &&
        dataList.map((item, index) => {
          return (
            // <CommunityListItem
            //     key={post.id}
            //     post={post}
            //     onClick={() => {
            //         onClickItem(post);
            //     }}
            // />
            <CommunityListItem
              key={item.id}
              post={item}
              onClick={() => {
                onClickItem(item);
              }}
            />
          );
        })}
    </Wrapper>
  );
}

export default Communitylist;
