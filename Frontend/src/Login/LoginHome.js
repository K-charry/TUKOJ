import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";

function LoginHome(){
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return(
        <div className="LoginHome">
            {
                currentForm == "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
        </div>
    )

}

export default LoginHome;