import { useSelector } from 'react-redux'
import { isEmpty } from './Utils'
import Post from './Post'

const PostFeed = () => {
    const posts = useSelector((state) => state.postReducer)
    return (
        <div className="posts-container">
            {!isEmpty(posts) &&
                posts
                    .sort((a, b) => b.date - a.date)
                    .map((post, index) => <Post post={post} key={index} />)}
        </div>
    )
}

export default PostFeed
