
import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const LIKE = "LIKE"

//Recuperer les posts
export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get('http://localhost:3001/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

//Ajouter un post
export const addPost = (data) => {
    //on récupère la data via le dispatch
    //la data est envoyée au back puis la réponse est traitée suivant les instructions du reducer
    return (dispatch) => {
        return axios
            .post('http://localhost:3001/api/profile',data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                dispatch({ type: ADD_POST, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

//Modifier un post
export const editPost = (editedPost) => {
    return (dispatch) => {
        return axios
            .put(`http://localhost:3001/api/profile/${editedPost.id}` ,editedPost,
            {headers: { Authorization: `Bearer ${token}`}}
            )
            .then((res) => {
                dispatch({ type: EDIT_POST, payload: {res}})
                
            })
            .catch((err) => console.log(err))
    }
}

//Supprimer un post
export const deletePost = (postId) => {
    return (dispatch) => {
        return axios
            .delete(`http://localhost:3001/api/profile/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                dispatch({ type: DELETE_POST, payload: { postId } })
            })
            .catch((err) => console.log(err))
    }
}

//logique des Like
export const like = (data) => {
    //data = id du post & id du liker sont envoyés au back
    return (dispatch) => {
        return axios
            .post(`http://localhost:3001/api/profile/${data._id}/like`,data,{
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                //l'id du liker reçu du back est dispatché au reducer via le payload
                dispatch({ type: LIKE, payload: {res}})
            })
            .catch((err) => console.log(err))
    }
}