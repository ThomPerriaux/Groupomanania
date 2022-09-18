import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.scss'

//REDUX
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension' //a enlever pour MEP
import thunk from "redux-thunk"
import rootReducer from './reducers'
import { getPosts } from './action/post.action'


const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
