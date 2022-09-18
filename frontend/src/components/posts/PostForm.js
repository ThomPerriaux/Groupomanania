import Cookies from 'js-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost, getPosts } from '../../action/post.action'
import '../../style/_postForm.scss'

const PostForm = () => {
    const [message, setMessage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const pseudo = Cookies.get('pseudo')
    const dispatch = useDispatch()

    const handleForm = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('message', message)
        data.append('pseudo', pseudo)
        if (imageUrl){
           data.append('picture', imageUrl) 
        }
        

        dispatch(addPost(data))
        setMessage('')
        setImageUrl('')
        dispatch(getPosts())
    }

    return (
        <div className="form-container">
            <form onSubmit={(e) => handleForm(e)}>
                <textarea
                    type="text"
                    rows="7"
                    placeholder="Ecrivez votre post ici ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <input
                    className="pick-a-file"
                    type="file"
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    required={false}
                />
                <button type="submit" value="envoyer">
                    Envoyer
                </button>
            </form>
        </div>
    )
}

export default PostForm
