
import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
// import './CommentInput.css';
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    width: calc(100% -32px);
    ${(props) => 
    props.height &&
    `
    height: ${props.height}px;
    `}
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
`;

const CommentInput = ({ onInsert }) => {
    const [value, setValue] = useState({
        name: '',
        content: ''
    });

    const onChangeName = useCallback(
        (e) => {
            setValue({
                name: e.target.value,
                content: value.content,
            });
        },
        [value]
    );

    const onChangeContent = useCallback(
        (e) => {
            setValue({
                name: value.name,
                content: e.target.value,
            });
        },
        [value]
    );


    const onSubmit = useCallback(
        e => {
            onInsert(value.name, value.content);
            setValue({
                name: '',
                content: ''
            });

            e.preventDefault();
        },
        [onInsert, value],
    );

    return (
        <form className="CommentInsert" onSubmit={onSubmit}>
            <div>
            <input classNames="inputNames"
                placeholder="이름"
                value={value.name}
                onChange={onChangeName}
            /></div>
            <div>
            <input placeholder="댓글"
                value={value.content}
                onChange={onChangeContent}
            />
            </div>
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    )
}

export default CommentInput;