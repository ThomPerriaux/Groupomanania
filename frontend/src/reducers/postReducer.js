//import des actions
import { ADD_POST, DELETE_POST, EDIT_POST, GET_POSTS, LIKE} from "../action/post.action";

//initialisation de l'initialState
const initialState = {}

//définition du postReducer
export default function postReducer(state = initialState, action) 
{
    switch (action.type) {
        case GET_POSTS:
            //retourne les posts contenus dans le state
            return action.payload //
        case ADD_POST:
            //retourne le post créé et aussi ceux existants
            return [action.payload, ...state]
        case EDIT_POST:
            //on mappe ce qu'il y a dans le state
            //si un des post correspond à celui du payload alors le contenu est modifié
            return state.map((post) => {
                if (post._id === action.payload.res.data.id){
                    return {
                        ...post,
                        message: action.payload.res.data.message
                    }
                } else return post;
            })
        case DELETE_POST:
            //tous les posts ayant un id different de celui du payload sont conservés
            return state.filter((post)=>post._id !== action.payload.postId )
        case LIKE:
            //le reducer reçoit l'id du post et la liste des likers
            return state.map((post) => {
                //si un des post correspond à l'_id du payload alors on retourne le post et la mise à jour de ses fans => mettra à jour le useState
                if (post._id === action.payload.res.data._id){
                    return {
                        ...post,
                        usersLiked: action.payload.res.data.likers
                    }
                }else{
                    return post
                }
            })
        default:
            return state
    }
}