import { useSelector } from 'react-redux'
import { isEmpty } from './Utils'
import Post from './Post'
import '../../style/_postFeed.scss'

//on affiche les posts
//isEmpty traite les asynchronités
const PostFeed = () => {
     //on recupere les données dans le state postReducer
     //on map l'array Posts dans un composant Post et en ordre antéchronologique
     const posts = useSelector((state) => state.postReducer)
     return (
               <div className="posts-container">
                    {/* si postsReducer n'est pas vide alors il peut être mappé  */}
                    {!isEmpty(posts) &&
                         posts
                              .sort((a, b) => b.date - a.date) //tri antéchronologique
                              .map((post, index) => (
                                   <Post post={post} key={index} />
                              ))}
               </div>
     )
}

export default PostFeed
