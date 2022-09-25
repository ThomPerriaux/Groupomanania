
import Intro from "../components/home/Intro";
import Footer from "../components/home/Footer";
import LogContainer from "../components/home/LogContainer"
import '../style/_home.scss'

//Logique inscription/connexion
const Home = () => {
    return (
        <div className="home">
        <Intro />
        {/* Par defaut l'utilisateur arrive sur le module d'inscription */}
        <LogContainer Login={false} Signup={true} /> 
        <Footer />
        </div>
        
    );
}

export default Home;