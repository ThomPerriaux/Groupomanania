import Cookies from 'js-cookie'
import '../../style/_header.scss'


const Header = () => {
    const pseudo = Cookies.get('pseudo')

    const handleLogOut = (e) => {
        e.preventDefault();
        Cookies.remove('token')
        Cookies.remove('currentUser')
        Cookies.remove('pseudo')
        window.location="/"
    }

    return (
        <>
            <div className="header">
                {/* <img src="./globe.png" alt="logo" /> */}
                <h1>Bienvenue {pseudo} 🙂</h1>
                <button onClick={(e) => handleLogOut(e)}><i className="fi fi-br-exit" alt="LogOut"></i></button>
            </div>
        </>
    )
}

export default Header
