import Cookies from 'js-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../../action/post.action'
import '../../style/_postForm.scss'

//Creation d'un post

const PostForm = () => {
     const [message, setMessage] = useState('') //valeur récupérée dans la textArea
     const [imageUrl, setImageUrl] = useState(null) //valeur récupérée si req.file (lien d'une image stockée dans le back
     const pseudo = Cookies.get('pseudo')
     const dispatch = useDispatch() //methode dispatch de Redux

     const handleForm = (e) => {
          e.preventDefault()

          const data = new FormData()
          data.append('message', message)
          data.append('pseudo', pseudo)
          data.append('picture', imageUrl)

          dispatch(addPost(data)) //dispatch de data via addPost (action)
          setMessage('') //réinitialisation de la text area
          e.target[1].value = null ////réinitialisation du req.file
          setImageUrl(null) ////réinitialisation de imageUrl
     }

     return (
          <div className="form-container">
               <form onSubmit={(e) => handleForm(e)}>
                    <label htmlFor="text">Publiez votre post</label>
                    <textarea
                         id="text"
                         type="text"
                         rows="7"
                         placeholder="Ecrivez votre post ici ..."
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <input
                         id="file"
                         accept=".png, .jpg, .jpeg, .webp" //seuls ces formats sont autorisés
                         className="pick-a-file"
                         type="file"
                         onChange={(e) => setImageUrl(e.target.files[0])}
                         required={false} //l'image n'est pas requise
                    />

                    <label htmlFor="file">
                         {/* Indication sur les formats autorisés */}
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
