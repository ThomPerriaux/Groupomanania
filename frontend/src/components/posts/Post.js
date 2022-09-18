import Cookies from 'js-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deletePost, editPost } from '../../action/post.action'
import '../../style/_post.scss'
import Like from './Like'
import { isEmpty } from './Utils'

const Post = ({ post }) => {
    const [editToggle, setEditToggle] = useState(false)
    const [editMessage, setEditMessage] = useState(post.message)

    const dispatch = useDispatch()

    const currentUser = Cookies.get('currentUser')
    const admin = '631ef449275dab2a3037fde7'

    const handleEdit = (e) => {
        e.preventDefault();

        const editedPost = {
            id:post._id,
            message: editMessage,
        }
        dispatch(editPost(editedPost))
        console.log(editedPost);
        setEditToggle(false)
    }

    return (
        <div className="post-container">
            <div className="post-header">
                {post.pseudo} a publié le {post.publicationDate}
            </div>
            <div className="post-content">
                <img src={post.imageUrl} alt="" />
                {editToggle ? (
                    <form onSubmit={(e) => handleEdit(e)}>
                        <textarea
                            rows="10"
                            defaultValue={post.message}
                            onChange={(e) => setEditMessage(e.target.value)}
                        ></textarea>
                        <button type="submit">Valider les modifications</button>
                    </form>
                ) : (
                    <p>{post.message}</p>
                )}
            </div>

            {/* gestion des editions suppressions */}
            {((!isEmpty(currentUser) && currentUser === post.userId) ||
                (!isEmpty(currentUser) && currentUser === admin)) && (
                <div className="post-option">
                    <div className="post-edit">
                        <button className="edit-delete-btn">
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
                            <img
                                src="./delete.svg"
                                alt="supprimer"
                                onClick={() => dispatch(deletePost(post._id))}
                            />
                        </button>
                    </div>
                </div>
            )}

            {/* GESTION DES LIKES */}
            <Like post={post} />
        </div>
    )
}

export default Post
