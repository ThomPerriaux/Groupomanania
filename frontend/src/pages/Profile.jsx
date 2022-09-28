import Header from '../components/posts/Header'
import PostForm from '../components/posts/PostForm'
import PostFeed from '../components/posts/PostFeed'
import Footer from '../components/home/Footer'
import { getPosts } from '../action/post.action'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension' //a enlever pour MEP
import thunk from "redux-thunk"
import rootReducer from '../reducers'
import { Provider } from 'react-redux'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const Profile = () => {

    store.dispatch(getPosts());

    return (

        <Provider store={store}>
            <Header />
            <PostForm />
            <PostFeed />
            <Footer />
        </Provider>
    )
}
 
export default Profile ;