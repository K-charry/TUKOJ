import React, {useState} from "react";
import axios from 'axios';
import logo from './logo.png';

function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(email);
        axios.post(`http://127.0.0.1:8000/api/login/`, {email, password})
            .then((response) => {
                console.log(response);
                // 로그인 성공 후 처리할 내용을 여기에 작성합니다.
            })
            .catch((error) => {
                console.log(error);
                // 로그인 실패 후 처리할 내용을 여기에 작성합니다.
            });
    }

    return (
        <div className="auth-form-container">
            <img src={logo} className="login-logo" />
            <div className="title">
                TUKOREA
            </div>
            <div className="title2">
                Online Judge
            </div>
            <br />
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="email"></label>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" id="email" name="email"/>
                <label className="label" htmlFor="password"></label>
                <input className="input" type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder="비밀번호" id="password" name="password"/>

            </form>
            <div className="btn">
                <button className="btn-login" type="submit">로그인</button>
            </div>
            <button className="btn-login2"onClick={()=> props.onFormSwitch('register')}>계정이 없으신가요? 회원가입</button>
        </div>
    )


}

export default Login;