import { ADD_POST, DELETE_POST, EDIT_POST, GET_POSTS, LIKE} from "../action/post.action";

const initialState = {}

export default function postReducer(state = initialState, action) 
{
    switch (action.type) {
        case GET_POSTS:
            return action.payload 
        case ADD_POST:
            return [action.payload, ...state]
        case EDIT_POST:
            return state.map((post) => {
                if (post._id === action.payload.res.data.id){
                    return {
                        ...post,
                        message: action.payload.res.data.message
                    }
                } else return post;
            })
        case DELETE_POST:
            return state.filter((post)=>post._id !== action.payload.postId )
        case LIKE:
            return state.map((post) => {
                if (post._id === action.payload._id){
                    return {
                        usersLiked: action.payload.usersLiked
                    }
                }else{
                    return post
                }
            })
        default:
            return state
    }
}