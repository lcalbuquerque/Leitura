import React, { Component } from 'react'
import { fetchCategories } from './store/actions/categories'
import { fetchPosts, savePost, updatePost, sortPost } from './store/actions/posts'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import SortBy from './components/Utils/SortBy'
import PostModal from './components/Post/PostModal'
import PostList from './components/Post/PostList'
import PostDetails from './components/Post/PostDetails'
import CategoryMenu from './components/Category/CategoryMenu'
import { CONSTS } from './utils'
import './App.css'


//estado inicial de um novo post
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
                    property: CONSTS.SORT_BY.OPTIONS.SCORE_DESC.PROP,
                    ascending: CONSTS.SORT_BY.OPTIONS.SCORE_DESC.ASC
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
            alert("Please full fill all fields");
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
        const { categories, classes, sortPost } = this.props

        return (
            <BrowserRouter>
                <div>
                    <AppBar position="static">
                        <Toolbar className="appBar">
                            <Typography variant="title" color="inherit">
                                Projeto Leitura
                            </Typography>
                            <SortBy style="sortBy" onChange={sortPost}></SortBy>
                            <Button color="inherit" onClick={this.handleOpenPostModal}>Add post</Button>
                        </Toolbar>
                    </AppBar>
                    <PostModal open={openModalPost} post={postModal}
                        handleClose={this.handleClosePostModal}
                        handleSave={this.handleSavePostModal}
                        handleChange={this.handlePostModalPropChange}>
                    </PostModal>
                    <Grid container spacing={0}>
                        <Grid item xs={2} className="navGrid">
                            <CategoryMenu categories={categories}></CategoryMenu>
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

export default connect(mapStateToProps,mapDispatchToProps)(App)