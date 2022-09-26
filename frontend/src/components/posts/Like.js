import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { like } from '../../action/post.action'
import '../../style/_like.scss'

const Like = ({ post }) => {
     const [hasLiked, setHasLiked] = useState(false)
     const currentUser = Cookies.get('currentUser')
     const likesArray = post.usersLiked
     const dispatch = useDispatch()

     //fonction qui gere l'état du like suivant le userId à l'affichage
     //si le currentUser est présent dans le likesarray => on affiche le coeur rouge et inversement
     const likeItOrNot = () => {
          if (likesArray.includes(currentUser)) {
               setHasLiked(true)
          } else {
               setHasLiked(false)
          }
     }

     useEffect(() => {
          likeItOrNot()
     })

     //gestion du like/not like
     const handleLike = (e) => {
          const likeDetails = {
               _id: post._id, //id du post
               usersLiked: currentUser, //id du liker
          }
          //likeDetails est envoyé à l'action like en paramètre
          dispatch(like(likeDetails))
     }
     return (
          <div className="like">
               {/* si le currentUser aime dejà : coeur rouge / sinon coeur vide */}
               {hasLiked ? (
                    <button id="liked-btn" onClick={(e) => handleLike()} >
                         <i className="fa-solid fa-heart" id='liked'></i>
                    </button>
               ) : (
                    <button id="notLiked-btn" onClick={(e) => handleLike()}>
                         <i className="fa-regular fa-heart"></i>
                    </button>
               )}
          </div>
     )
}

export default Like
