import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import CategoryUISelect from '../AuxUI/CategoryUISelect'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const PostModal = ({ open, post, handleClose, handleSave, handleChange }) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="addPostDialog">
                <DialogTitle id="addPostDialog">{`Title: ${post.title} `}</DialogTitle>
                <DialogContent>
                    <CategoryUISelect post={post} onChange={handleChange('category')} ></CategoryUISelect>
                    <TextField autoFocus margin="dense" id="title" label="Title"
                        type="text" value={post.title} placeholder="Title" onChange={handleChange('title')} fullWidth />
                    <TextField margin="dense" id="author" label="Author" type="text"
                        value={post.author} onChange={handleChange('author')} />
                    <TextField id="body" label="Body" multiline rowsMax="4" value={post.body}
                        onChange={handleChange('body')} margin="normal" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        {(post && post.id) ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

PostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default PostModal