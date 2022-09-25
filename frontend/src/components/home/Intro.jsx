import '../../style/_intro.scss'

const Intro = () => {
     return (
          <div className="bloc-intro">
               <img src="./icon-left-font-mini.png" alt="logo" />
               <h1>Bienvenue sur myGroupomania</h1>
               <div className="intro-content">
                  <h2>Votre nouveau réseau social</h2>
                  <p>Ce nouvel outil dont vous allez pouvoir découvrir la Version 1 est résoluement tourné vers l'échange et la collaboration.</p>
                  <p className='feedback'>Vos feedbacks sont les bienvenus à mygroupomania@groupomania.com</p>
               </div>
               
          </div>
     )
}

export default Intro