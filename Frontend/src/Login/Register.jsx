import React, {useState} from "react";
import axios from 'axios';
import './login.css';

function Register (props) {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [nickname, setNickname] = useState('');
    const [dept, setDept] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(email);
        axios.post(`http://127.0.0.1:8000/api/v1/users/register/`, {nickname, email, password})
            .then((response) => {
                console.log(response);
                // 회원가입 성공 후 처리할 내용을 여기에 작성합니다.
            })
            .catch((error) => {
                console.log(error);
                // 회원가입 실패 후 처리할 내용을 여기에 작성합니다.
            });
    }

    return (
        <div className="auth-form-container2">
            <div className="title">
                회원가입
            </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="nickname" className="label"></label>
                    <input value={nickname} className="input" id="nickname" onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" ></input>
                    <label htmlFor="email" className="label"></label>
                    <input type="email"  className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" id="email" name="email"/>
                    <label htmlFor="password" className="label"></label>
                    <input type="password" className="input" value={password} onChange={(e) => setPass(e.target.value)} placeholder="비밀번호" id="password" name="password"/>
                    <label htmlFor="dept" className="dept"></label>
                    <select className="dept" id="dept"  name="dept" defaultValue="" onChange={(e) => setDept(e.target.value)}required>
                        <option value="" disabled hidden>학과</option>
                        <option value="컴퓨터공학부 컴퓨터공학전공">컴퓨터공학부 컴퓨터공학전공</option>
                        <option value="컴퓨터공학부 소프트웨어전공">컴퓨터공학부 소프트웨어전공</option>
                        <option value="기계공학과">기계공학과</option>
                        <option value="기계설계공학과">기계설계공학과</option>
                        <option value="경영학부 산업경영전공">경영학부 산업경영전공</option>
                        <option value="경영학부 IT경영전공">경영학부 IT경영전공</option>
                        <option value="에너지전기공학과">에너지전기공학과</option>
                        <option value="전자공학부 전자공학전공">전자공학부 전자공학전공</option>
                        <option value="전자공학부 임베디드시스템전공">전자공학부 임베디드시스템전공</option>
                        <option value="신소재공학과">신소재공학과</option>
                        <option value="메카트로닉스공학부 메카트로닉스전공">메카트로닉스공학부 메카트로닉스전공</option>
                        <option value="메카트로닉스공학부 AI로봇전공">메카트로닉스공학부 AI로봇전공</option>
                        <option value="생명화학공학과">생명화학공학과</option>
                        <option value="나노반도체공학과">나노반도체공학과</option>
                        <option value="디자인공학부 산업디자인공학전공">디자인공학부 산업디자인공학전공</option>
                        <option value="디자인공학부 미디어디자인공학전공">디자인공학부 미디어디자인공학전공</option>
                        <option value="지식융합학부">지식융합학부</option>
                    </select>
                </form>
                <div className="btn">
                    <button className="btn-register"type="submit">회원가입</button>
                </div>
                <button className="btn-login2" onClick={()=> props.onFormSwitch('login')}>이미 계정이 있으신가요? <br/>로그인</button>
            </div>

    )


}

export default Register;