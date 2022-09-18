
import Intro from "../components/home/Intro";
import LogContainer from "../components/home/LogContainer"
import '../style/_home.scss'

//Logique inscription/connexion
const Home = () => {
    return (
        <div className="home">
        <Intro />
        <LogContainer Login={false} Signup={true} />
        </div>
    );
}

export default Home;