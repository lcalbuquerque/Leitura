import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import PropTypes from 'prop-types'

const styles = {
  formControl: {
    minWidth: 120
  }
}

class CategoryUISelect extends Component {

  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {

    const { open } = this.state
    const { post , classes, categories, onChange } = this.props

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="categorySelect">Category</InputLabel>
            <Select open={open} onClose={this.handleClose} onOpen={this.handleOpen}
                value={post.category} onChange={onChange}
                inputProps={{ name: 'category', id: 'categorySelect' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            categories && categories.map(
              c => <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    )
  }
}

  function mapStateToProps ({categories }) {
    return { categories }
  }

CategoryUISelect.propTypes = {
	post: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(CategoryUISelect))