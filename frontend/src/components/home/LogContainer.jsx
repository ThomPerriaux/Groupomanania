import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

import '../../style/_logContainer.scss'

const LogContainer = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.Signup) //state communiqué par le props
    const [logInModal, setLogInModal] = useState(props.Login) //state communiqué par le props

    const handleModals = (e) => {
        if (e.target.id === 'register') { //si s'enregistrer est cliqué alors le formulaire d'inscritpion s'affiche
            setSignUpModal(true)
            setLogInModal(false)
        } else if (e.target.id === 'login') { //si se connecter est cliqué alors le formulaire de connexion s'affiche
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
                    className={signUpModal ? 'active-btn' : null} //active-btn : scss
                >
                    Je m'inscris
                </button>
                <button
                    onClick={handleModals}
                    id="login"
                    className={logInModal ? 'active-btn' : null} //active-btn : scss
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