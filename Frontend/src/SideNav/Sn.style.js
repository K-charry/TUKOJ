import styled from "styled-components";
import { Link } from 'react-router-dom';

// 사이드바 전체를 감싸는 div
export const SnContainer = styled.div`
  min-width: 16rem;
  width: auto;
  height: auto;
  min-height: 70vh;
  font-size: 14px;
`

// SbItem에서 하위메뉴들을 묶어줄 div
export const SnSub = styled.div`
  overflow: hidden;
`;

// 메뉴명을 보여줄 div
export const SnTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${props => (props.depth * 20)}px;
  height: 32px;
  &:hover {
    background-color: #f6f6f2;
    cursor: pointer;
    border-right: solid 5px;
  }
`;

// 제일 하위메뉴에서 클릭할 Link
export const SnLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;