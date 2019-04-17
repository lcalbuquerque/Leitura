import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import PropTypes from 'prop-types'

const PostList = ({ posts, path, handleOpenPostModal}) => {
    return (
      <div>
        {posts &&
          posts.map(p => <Post key={p.id} handleOpenPostModal={handleOpenPostModal} path={path} post={p} />)}
      </div>
    )
}

function mapStateToProps ({posts}, ownProps) {
  return {
    posts: posts.filter(p => ownProps.path === '/' || ownProps.path === 'home' ||  p.category === ownProps.path),
  }
}

PostList.propTypes = {
	path: PropTypes.string.isRequired,
	handleOpenPostModal: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(PostList)