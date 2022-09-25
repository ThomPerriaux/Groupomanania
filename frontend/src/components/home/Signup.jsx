import { useState } from 'react'
import axios from 'axios'
import Login from './Login'
import '../../style/_logModules.scss'

const Signup = () => {
     const [formSubmit, setFormSumbit] = useState(false)
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [pseudo, setPseudo] = useState('')

     const [controlpassword, setControlPassword] = useState('')

     const handleSignup = (e) => {
          e.preventDefault()

          if (password !== controlpassword) {
               alert('🚨 Les mots de passe ne correspondent pas!')
          } else {
               axios.post('http://localhost:3001/api/auth/signup', {
                    email,
                    password,
                    pseudo,
               })
                    .then(() => {
                         setFormSumbit(true)
                    })
                    .catch((err) => {
                         if (err.response.data.error.errors.pseudo) {
                              alert(
                                   'Pseudo non autorisé ou dejà utilisé, veuillez en choisir un autre 👀'
                              )
                         } else if (err.response.data.error.errors.email) {
                              alert(
                                   'Adresse email non autorisée ou dejà utilisée, veuillez en choisir une autre 👀'
                              )
                         }
                    })
          }
     }

     return (
          <>
               {formSubmit ? (
                    <>
                         <Login />
                         <span></span>
                         <div className="success">
                              <h4>Enregistrement réussi.</h4>
                              <h4>Veuillez vous connecter.</h4>
                              <span>✅</span>
                         </div>
                    </>
               ) : (
                    <form action="" onSubmit={handleSignup} id="signup-form">
                         <label htmlFor="pseudo">Pseudo</label>
                         <br />
                         <input
                              type="text"
                              name="pseudo"
                              id="pseudo"
                              onChange={(e) => setPseudo(e.target.value)}
                              value={pseudo}
                         />
                         <br />

                         <label htmlFor="email">Adresse email</label>
                         <br />
                         <input
                              placeholder="prénom.nom@groupamania.com"
                              type="email"
                              name="email"
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                         />
                         <br />
                         <label htmlFor="password">Mot de passe</label>
                         <br />

                         <input
                              type="password"
                              name="password"
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                         />
                         <br />
                         <label htmlFor="password-conf">
                              Répéter le mot de passe
                         </label>
                         <br />
                         <input
                              type="password"
                              name="password"
                              id="password-conf"
                              onChange={(e) =>
                                   setControlPassword(e.target.value)
                              }
                              value={controlpassword}
                         />
                         <br />
                         <br />
                         <button type="submit" className="submit-btn">
                              S'enregistrer
                         </button>
                    </form>
               )}
          </>
     )
}

export default Signup
