import Cookies from 'js-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../../action/post.action'
import '../../style/_postForm.scss'

const PostForm = () => {
     const [message, setMessage] = useState('')
     const [imageUrl, setImageUrl] = useState(null)
     const pseudo = Cookies.get('pseudo')
     const dispatch = useDispatch()

     const handleForm = (e) => {
          e.preventDefault()

          console.log(e)

          const data = new FormData()
          data.append('message', message)
          data.append('pseudo', pseudo)
          data.append('picture', imageUrl)

          dispatch(addPost(data))
          setMessage('')
          e.target[1].value = null
          setImageUrl(null)
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
                         accept=".png, .jpg, .jpeg, .webp"
                         className="pick-a-file"
                         type="file"
                         onChange={(e) => setImageUrl(e.target.files[0])}
                         required={false}
                    />

                    <label htmlFor="file">
                         Formats acceptés .jpg .jpeg .png .webp
                    </label>

                    <button type="submit" value="envoyer">
                         Envoyer
                    </button>
               </form>
          </div>
     )
}

export default PostForm
