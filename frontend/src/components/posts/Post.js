import Cookies from 'js-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deletePost, editPost } from '../../action/post.action'
import '../../style/_post.scss'
import Like from './Like'
import { isEmpty } from './Utils'

//les post sont recupérés grâce aux props
const Post = ({ post }) => {
    const [editToggle, setEditToggle] = useState(false)
    const [editMessage, setEditMessage] = useState(post.message)

    const dispatch = useDispatch()

    const currentUser = Cookies.get('currentUser')
    const pseudo = Cookies.get ('pseudo')

    const handleEdit = (e) => {
        e.preventDefault(); //evite que la page en se recharge

        const editedPost = { //construction de l'objet qui va être dispatché avec l'action editPost
            id:post._id,
            message: editMessage,
        }
        dispatch(editPost(editedPost))
         setEditToggle(false)//remise en mode publication et non édition
    }

    return (
        <div className="post-container">
            <div className="post-header">
                {post.pseudo} a publié le {post.publicationDate}
            </div>
            <div className="post-content">
                {/* si une imageUrl existe la div s'affiche pour eviter une erreur GetPosts sur la console*/}
                {post.imageUrl? <img src={post.imageUrl} alt="" /> : null }

                {/* Edit toggle permet de basculer entre une textArea ou le post publié. C'est le bouton EDIT qui le gère */}
                {editToggle ? (
                    //Gestion de l'édition
                    <form onSubmit={(e) => handleEdit(e)}>
                        <textarea
                            rows="10"
                            defaultValue={post.message} //affiche le message
                            onChange={(e) => setEditMessage(e.target.value)}
                        ></textarea>
                        <button type="submit">Valider les modifications</button>
                    </form>
                ) : (
                    // affichage des posts
                    <p>{post.message}</p>
                )}
            </div>

            {/* gestion des editions suppressions
            Si le current user est l'auteur ou si le current user est l'admin alors les options s'affichent */}
            {((!isEmpty(currentUser) && currentUser === post.userId) || (!isEmpty(currentUser) && pseudo === "Admin")) && (
                <div className="post-option">
                    <div className="post-edit">
                        <button className="edit-delete-btn">
                            {/* Affichage de l'icone Editer */}
                            <img
                                src="./edit.svg"
                                alt="éditer"
                                //au click : l'inverse de editToggle est paramétré
                                onClick={() => setEditToggle(!editToggle)}
                            />
                        </button>
                    </div>
                    <div className="post-delete">
                        <button className="edit-delete-btn">
                            {/* Affichage de l'icone Supprimer */}
                            <img
                                src="./delete.svg"
                                alt="supprimer"
                                //au click cela lance l'action deletePost avec l'id du post en paramètre
                                onClick={() => dispatch(deletePost(post._id))}
                            />
                        </button>
                    </div>
                </div>
            )}

            {/* GESTION DES LIKES - Composant */}
            <Like post={post} />
        </div>
    )
}

export default Post
