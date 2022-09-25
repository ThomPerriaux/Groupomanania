
import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const LIKE = "LIKE"

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

export const addPost = (data) => {
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

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios
            .delete(`http://localhost:3001/api/profile/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } })
            })
            .catch((err) => console.log(err))
    }
}

export const like = (data) => {
    return (dispatch) => {
        return axios
            .post(`http://localhost:3001/api/profile/${data._id}/like`,data,{
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                dispatch({ type: LIKE, payload: {res}})
                
            })
            
            .catch((err) => console.log(err))
    }
}

