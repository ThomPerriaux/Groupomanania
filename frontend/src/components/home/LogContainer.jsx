import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

import '../../style/_logContainer.scss'

const LogContainer = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.Signup)
    const [logInModal, setLogInModal] = useState(props.Login)

    const handleModals = (e) => {
        if (e.target.id === 'register') {
            setSignUpModal(true)
            setLogInModal(false)
        } else if (e.target.id === 'login') {
            setSignUpModal(false)
            setLogInModal(true)
        }
    }
    return (
        <div className="log-container">
            <div className="log-choice">
                <button
                    onClick={handleModals}
                    id="register"
                    className={signUpModal ? 'active-btn' : null}
                >
                    Je m'inscris
                </button>
                <button
                    onClick={handleModals}
                    id="login"
                    className={logInModal ? 'active-btn' : null}
                >
                    Je me connecte
                </button>
            </div>
            <div className="log-modules">
                {signUpModal && <Signup />}
                {logInModal && <Login />}
            </div>
        </div>
    )
}

export default LogContainer
