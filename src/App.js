import React, { Component } from 'react'
import { fetchCategories } from './store/actions/categories'
import { fetchPosts, savePost, updatePost, sortPost } from './store/actions/posts'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import SortBy from './components/AuxUI/SortBy'
import PostModal from './components/Post/PostModal'
import PostList from './components/Post/PostList'
import PostDetails from './components/Post/PostDetails'
import Menu from './components/Menu/Menu'
import { SORT_OPTIONS } from './utils'
import './App.css'

const defaultPostModal = {
    title: '',
    category: '',
    author: '',
    body: ''
}

class App extends Component {

    state = {
        openModalPost: false,
        postModal: defaultPostModal
    }

    componentDidMount() {
        this.props.loadCategories()
        this.props.loadPosts()
            .then(
                () => this.props.sortPost({
                    property: SORT_OPTIONS.Score_Desc.PROP,
                    ascending: SORT_OPTIONS.Score_Desc.ASC
                })
            )
    }

    handleOpenPostModal = post => {
        this.setState({
            openModalPost: true,
            postModal: post && post.id ? post : defaultPostModal
        })
    }

    handleClosePostModal = () => {
        this.setState({
            openModalPost: false,
        })
    }

    handleSavePostModal = () => {
        const { postModal } = this.state
        // Validate Post
        if (!postModal.category || postModal.title.length < 3
            || postModal.author.length < 2 || postModal.body < 3) {
            alert("Please fill all fields");
            return false
        }

        if (postModal && postModal.id) {
            this.props.updatePost(postModal).then(() => {
                this.handleClosePostModal()
            })
        } else {
            this.props.savePost(postModal).then(() => {
                this.handleClosePostModal()
            })
        }
    }

    handlePostModalPropChange = propName => event => {
        const { postModal } = this.state
        this.setState({
            postModal: {
                ...postModal,
                [propName]: event.target.value,
            }
        })
    }

    render() {

        const { openModalPost, postModal } = this.state
        const { categories, sortPost } = this.props

        return (
            <BrowserRouter>
                <div>
                    <div className="header">
                        Projeto Leitura
                            <SortBy onChange={sortPost} />
                    </div>
                    <PostModal open={openModalPost} post={postModal} handleClose={this.handleClosePostModal}
                        handleSave={this.handleSavePostModal} handleChange={this.handlePostModalPropChange} />
                    <Grid container spacing={0}>
                        <Grid item xs={2} className="navGrid">
                            <Menu categories={categories} addPost={this.handleOpenPostModal}></Menu>
                        </Grid>
                        <Grid item xs={10}>
                            <Switch>
                                <Route exact path='/:category' render={({ match }) => {
                                    return <PostList handleOpenPostModal={this.handleOpenPostModal} path={match.params.category} />
                                }} />
                                <Route exact path='/:category/:postId' render={({ match }) => {
                                    return <PostDetails handleOpenPostModal={this.handleOpenPostModal} postId={match.params.postId} />
                                }} />
                                <Route render={() => {
                                    return <PostList handleOpenPostModal={this.handleOpenPostModal} path='/' />
                                }} />
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({ categories }) {
    return { categories }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: () => dispatch(fetchPosts()),
        loadCategories: () => dispatch(fetchCategories()),
        savePost: (post) => dispatch(savePost(post)),
        updatePost: (post) => dispatch(updatePost(post)),
        sortPost: (option) => dispatch(sortPost(option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)