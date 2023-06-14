from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import subprocess
import json

app = Flask(__name__)
socketio = SocketIO(app, message_queue='redis://redis:6379')
app.debug = True # 오류 발생 확인을 위해 (프로덕션 환경에서는 보안 때문에X)

@app.route('/run', methods=['POST'])
def run_script():
    try:
        user_script = request.form['script']  # 사용자가 제출한 코드
        test_cases = json.loads(request.form.get('test_cases', '[]'))  # 기존 테스트케이스 받기
        
        # 먼저 사용자의 코드를 단독으로 실행하여 구문 오류 및 금지 함수를 확인하십시오.
        syntax_check_result = run_code(user_script, [])
        if 'error' in syntax_check_result.lower():
            # 오류가 발생하면 이 오류 메시지를 반환하고 채점을 중지합니다.
            return jsonify({"error": syntax_check_result})
        
        # 구문 오류가 없으면 테스트 케이스 적용을 계속합니다.
        results = run_solution(user_script, test_cases)  # 코드 채점결과 반환
        
        if any(test['status'] == 'Failed' for test in results):
            return jsonify({"output": "This is the wrong answer!", "results": json.dumps(results)})
        else:
            return jsonify({"output": "This is the correct answer!", "results": json.dumps(results)})
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

def run_solution(solution_code, test_cases):
    results = []

    for test_case in test_cases:
        proc = subprocess.Popen(
            ['python', '-c', solution_code],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

        stdout, stderr = proc.communicate(input=test_case['input'].encode())
        result = stdout.decode().strip()

        # 'result'와 'expected_out(예상결과)' 비교
        if result == test_case['output']:
            test_result = {
                'input': test_case['input'],
                'output': result,
                'expected': test_case['output'],
                'status': 'Passed',
            }
        else:
            test_result = {
                'input': test_case['input'],
                'output': result,
                'expected': test_case['output'],
                'status': 'Failed',
            }
        
        results.append(test_result)

        socketio.emit('test_case_result', test_result)
    
    return results

# Flask 서버(앱) 실행
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)