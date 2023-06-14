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

function CommunityListItem(props){
    const { post, onClick } = props;

    return (
        <Wrapper onClick={onClick}>
        <h1 style={{ color: "grey",  marginTop: 30, marginBottom: 30, fontSize: 30, fontWeight: "bold" }}>
          QnA
        </h1>
            <TitleText>{post.title}</TitleText>
        </Wrapper>
    );
}

export default CommunityListItem;