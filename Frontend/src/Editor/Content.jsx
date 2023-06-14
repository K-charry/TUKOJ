import styled from "styled-components";
import { problemData } from "../App";


const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px;
  width: 100%;
  min-height: 200px;
  background: #303666;
  color: #0f0e17;
  border-radius: 8px;
  text-align: center;
`;

function Content() {
  const onlineJudgeLayoutData = problemData.getData();
  return (
    <Main>
      <h1>{window.location.pathname}</h1>
      {onlineJudgeLayoutData && (
        <div>
          <p>{onlineJudgeLayoutData.title}</p>
          <p>{onlineJudgeLayoutData.description}</p>
          {/* OnlineJudgeLayout의 데이터를 출력 */}
        </div>
      )}
    </Main>
  );
}

export default Content;
