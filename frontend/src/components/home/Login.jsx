import { useState } from 'react'
import axios from 'axios'
import '../../style/_logModules.scss'
import Cookies from 'js-cookie'

const Login = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     const handleLogin = (e) => {
          e.preventDefault()

          axios.post('http://localhost:3001/api/auth/login', {
               email,
               password,
          })
               .then((res) => {
                    if (res.data.error) {
                         alert('Utilisateur non trouvé!')
                    } else {
                         Cookies.set('token', res.data.token)
                         Cookies.set('pseudo', res.data.pseudo)
                         Cookies.set('currentUser', res.data.userId)
                         window.location = '/profile'
                    }
               })
               .catch((err) => {
                    console.log(err)
                    alert('Combinaison email & mot de passe invalide 🙈 ')
               })
     }

     return (
          <form action="" onSubmit={handleLogin} id="login-form">
               <label htmlFor="email">Email</label>
               <input
                    placeholder="Email communiqué lors de l'inscription et au format xx@ww.zz"
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
