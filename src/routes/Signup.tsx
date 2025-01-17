import { isDisabled } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const baseAPI = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/';
  const navi = useNavigate();

  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (regex.test(inputEmail) && inputPassword.length>=8);
  }

  function BackToLogin() {
    navi('/', { replace : true });
  }

  function SignUp() {
    axios.post(baseAPI+`auth/signup`,
      {
        email : inputEmail,
        password : inputPassword
      },
      {
      headers : {
        'Content-Type' : 'application/json'
        }
      }
    ).then(() => navi('/'));
  }

  return(
    <div className="wrap">
      <button className="backToLogin" onClick={() => { BackToLogin() }}>뒤로가기</button>
      <div className="signupMainFrame">
        <div className="idpw">
          <p>이메일</p>
          <input type="email" placeholder="Email" onChange={(email) => setInputEmail(email.target.value)}></input>
          <p>비밀번호</p>
          <input type='password' placeholder="Password" onChange={(password) => setInputPassword(password.target.value)}></input>
        </div>
        <button type='button' className="signup" disabled={!validate()} onClick={SignUp}>회원가입</button>
      </div>
  </div>
  )
}