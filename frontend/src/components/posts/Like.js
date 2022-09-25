import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { like } from '../../action/post.action';
import '../../style/_like.scss';

const Like = ({ post }) => {

    const [hasLiked, setHasLiked] = useState(false)
    const currentUser = Cookies.get('currentUser')
    const likesArray = post.usersLiked
    const dispatch = useDispatch()

    const likeItOrNot = () => {
        console.log(likesArray)
        if (likesArray.includes(currentUser)) {setHasLiked(true) }
        else {setHasLiked(false)}} 

       useEffect(()=>{likeItOrNot()})
    
       const handleLike = (e)=> {
        const likeDetails = {
              _id: post._id, //id du post
              usersLiked: currentUser, //id du liker
              likes: post.likes  
        }
        dispatch(like(likeDetails))
    }
    return (
        <div className="like">
            {hasLiked ? (
                <button
                    id="liked-btn"
                    onClick={(e) => handleLike()}
                >
                    <i className="fa-solid fa-heart"></i>
                </button>
            ) : (
                <button 
                    id="notLiked-btn"
                    onClick={(e) => handleLike()}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            )}
        </div>
    )
}

export default Like
