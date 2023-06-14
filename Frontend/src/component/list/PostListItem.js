import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    background: lightgrey;
    cursor: pointer;
    :hover {
        background: grey;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

function PostListItem(props){
    const { post, onClick } = props;
    // const { post, onClickItem } = props;

    return (
        // <article key={id} onClick={() => onClickItem({ id, title })}>
        //          <h3>{id}. {title}</h3>
        //         </article>
        // <Wrapper onClick={onClickItem({ post })}>
        //     <TitleText>{post.title}</TitleText>
        // </Wrapper>
        
        <Wrapper onClick={onClick}>
            <TitleText>{post.title}</TitleText>
        </Wrapper>
    );
}

export default PostListItem;