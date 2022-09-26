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
               //email géré par Regex dans le userModel. Seules les adresses @groupomania sont autorisées
               axios.post('http://localhost:3001/api/auth/signup', {
                    email, 
                    password,
                    pseudo,
               })
                    .then(() => {
                         //enregistrement ok envoi sur la page de logIn
                         setFormSumbit(true)
                    })
                    .catch((err) => {
                         if (err.response.data.error.errors.pseudo) {
                              alert(
                                   //on ne précise pas que le pseudo est déjà présent
                                   'Pseudo non autorisé ou dejà utilisé, veuillez en choisir un autre 👀'
                              )
                         } else if (err.response.data.error.errors.email) {
                              alert(
                                   //on n'indique pas si l'utilisateur est déjà enregistré
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
                    //A validation du formulaire :
                    //1.on recupere le pseudo et le mail qui doivent être uniques et le mail conforme
                    //2.on verifie que les passwords correspondent
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

                         <label htmlFor="email">Adresse email @groupomania.com</label>
                         <br />
                         <input
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