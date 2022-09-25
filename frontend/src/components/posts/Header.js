import Cookies from 'js-cookie'
import '../../style/_header.scss'

const Header = () => {
     //on recupère le pseudo connecté pour personnaliser l'accueil
     const pseudo = Cookies.get('pseudo')

     //au log-out on supprime le cookie et on redirige vers la page d'accueil
     const handleLogOut = (e) => {
          e.preventDefault()
          Cookies.remove('token')
          Cookies.remove('currentUser')
          Cookies.remove('pseudo')
          window.location = '/'
     }

     return (
          <>
               <div className="header">
                    <img src="./icon-left-font-monochrome-white.svg" alt="" />
                    <h1>Bienvenue {pseudo} 🙂</h1>
                    <button onClick={(e) => handleLogOut(e)}>
                         <i className="fi fi-br-exit" alt="LogOut"></i>
                    </button>
               </div>
          </>
     )
}

export default Header