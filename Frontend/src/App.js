import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainCommunity from "./component/page/MainCommunity";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
import Problemlist from "./component/list/Problemlist";
import Community from "./component/page/Community";
import Button from "./component/ui/Button";

import BoardUpdate from "./component/page/routes/BoardUpdate";
import Editor from "./Editor/editor";
import QnA from "./QnA";
import Footer from "./footer/footer";
import Headerbar from "./header/Header";
import Main from "./Main/main";
import QuizPage from "./OX_quiz/QuizPage";
import ShortQuizPage from "./ShortQuiz/shortQuiz";
import ProblemForm from "./Manage_problem/create_problem";
import LoginHome from "./Login/LoginHome";
import Manage from "./Manage_problem/manage";
import DeleteForm from "./Manage_problem/delete_problem";
import ProblemEditForm from "./Manage_problem/edit_problem";
import PostEditPage from "./component/page/PostEditPage";


const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-left: 360px;
  color: navy;
`;

// function App(props){
class App extends React.Component {
  render() {
    return (
      //<BrowserRouter>
      //   <MainTitleText> COMMUNITY </MainTitleText>
      <Router>
        <Headerbar />
        <Routes>
          {/* <h1> COMMUNITY </h1> */}
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/loginhome" element={<LoginHome />} />
          {/* <Route path="/qna/:id" element={<PostViewPage />} /> */}
          {/* <Route path="/login" element={<LoginComponent />} />
          {state.user.isLogin ? <MyPage /> : <LoginComponent />} */}
          <Route path="/problem/:id" element={<Editor />} />
          <Route path="/main_problem/:id" element={<Editor />} />
          <Route path="/Problemlist" element={<Problemlist />} />
          <Route path="/oxquiz/:id" element={<QuizPage />} />
          <Route path="/shortquiz/:id" element={<ShortQuizPage />} />
          <Route path="/Manage" element={<Manage />} />
          <Route path="/create_problem" element={<ProblemForm />} />
          <Route path="/delete_problem" element={<DeleteForm />} />
          <Route path="/edit_problem/:id" element={<ProblemEditForm />} />
          {/* <Route path="/Community" element={<Community/>}/> */}
          <Route path="/qna" element={<MainCommunity />} />
          <Route path="post-write" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
          {/* 수정 위한 Route */}
          {/* <Route path="/update/:postId" component={PostEditPage}/> */}
          <Route path="/update/:postId" element={<PostEditPage />}/>
        </Routes>
        <Footer />
      </Router>
      // </BrowserRouter>
    );
  }
}
export default App;
