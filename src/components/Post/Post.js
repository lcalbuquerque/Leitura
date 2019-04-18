import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost, updatePostVoteScore } from '../../store/actions/posts'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import { TiEdit, TiTrash, TiEyeOutline, TiThMenuOutline } from 'react-icons/ti/'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import VoteScore from '../Utils/VoteScore'
import { formatDateTime } from '../../utils'
import '../../App.css'

class Post extends Component {

    handleRemove = post => {
        this.props.dispatch(deletePost(post))
            .then(() => {
                if (!this.props.path) {
                    this.props.history.push('/home')
                }
            })
    }

    clickVoteScore = (option) => {
        const { post } = this.props
        this.props.dispatch(updatePostVoteScore(post, option))
    }

    render() {

        const { post, path, handleOpenPostModal } = this.props
        const isAdd = !!path
        const formattedDT = post ? formatDateTime(post.timestamp) : null

        return (
            <div style={{ marginBottom: '8px', marginTop: '8px', borderRadius: '4px' }}>
                {post && <Card key={post.id}>
                    <div style={{ padding: '15px' }} >
                        <div style={{ color: '#696363' }}>
                            Created at: {formattedDT}
                        </div>
                        <h2 style={{ fontFamily: 'Helvetica', fontWeight: 'normal', margin: '8px 0px' }}>
                            {post.title}
                        </h2>
                        <div style={{ color: '#696363' }}>
                            Author: {post.author}
                        </div>
                        {!isAdd &&
                            <div style={{ color: '#696363', marginTop: '20px' }}>
                                {post.body}
                            </div>}
                    </div>
                    <div style={{ marginLeft: '15px' }}>
                        <Grid container spacing={0}>
                            <Grid item xs={8}>
                                <VoteScore voteFunc={this.clickVoteScore} voteValue={post.voteScore} />
                            </Grid>
                            <div xs={6} className="cardActions">
                                <div className="comments">
                                    <TiThMenuOutline />
                                    <div className="commentsLabel">{`${post.commentCount} Comments`}</div>
                                </div>
                                {isAdd &&
                                    <Tooltip title="Details">
                                        <IconButton component={Link} to={`/${post.category}/${post.id}`} color="inherit">
                                            <TiEyeOutline />
                                        </IconButton>
                                    </Tooltip>}
                                <Tooltip title="Edit">
                                    <IconButton onClick={() => handleOpenPostModal(post)} color="inherit">
                                        <TiEdit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => this.handleRemove(post)} color="inherit" >
                                        <TiTrash />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grid>
                    </div>
                </Card>}
            </div>
        )
    }
}

Post.propTypes = {
    path: PropTypes.string,
    post: PropTypes.object,
    handleOpenPostModal: PropTypes.func.isRequired
}

export default connect()(Post)