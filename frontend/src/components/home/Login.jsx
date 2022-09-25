import { useState } from 'react'
import axios from 'axios'
import '../../style/_logModules.scss'
import Cookies from 'js-cookie'

//logique de connexion
const Login = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     const handleLogin = (e) => {
          e.preventDefault() //empeche la page de se recharger par defaut

          //envoi au back de l'email et du password entré
          axios.post('http://localhost:3001/api/auth/login', { 
               email,
               password,
          })
               .then((res) => {
                    if (res.data.error) {
                         alert('Utilisateur non trouvé!')
                    } else {
                         //succès : token-pseudo-utilisateur loggé enregistré dans un cookie puis redirection vers la page des posts
                         Cookies.set('token', res.data.token)
                         Cookies.set('pseudo', res.data.pseudo)
                         Cookies.set('currentUser', res.data.userId)
                         window.location = '/profile'
                    }
               })
               .catch((err) => {
                    console.log(err)
                    //erreur de logIn : pour des questions de confidentialité on ne dit pas "email non trouvé ou password invalide"
                    //email non trouvé = utilsateur non enregistré
                    //password erronné = utilisateur enregistré
                    alert('Combinaison email & mot de passe invalide 🙈 ') 
               })
     }

     return (
          <form action="" onSubmit={handleLogin} id="login-form"> 
               <label htmlFor="email">Email</label>
               <input
                    placeholder="prenom.nom@groupomania.com"
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
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
               />
               <br />
               <button type="submit" className="submit-btn">
                    Connexion
               </button>
          </form>
     )
}

export default Login
