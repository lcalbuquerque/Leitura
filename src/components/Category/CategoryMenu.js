import React, { Component } from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

 const styles = theme => ({
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    }
  })

class CategoryMenu extends Component{

  state = {
    openCategories: false
  }

  handleClick = () => this.setState({openCategories: !this.state.openCategories})

  render (){

    const { categories, classes } = this.props
    const { openCategories } = this.state

    return (
      <MenuList component="nav">
        <MenuItem component={Link} to="/home" key="home">
            <ListItemText inset primary="Home"/>
        </MenuItem>
        <MenuItem onClick={this.handleClick}>
            <ListItemText inset primary="Categories" />
            {openCategories ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={openCategories} timeout="auto" unmountOnExit>
          <MenuList component="div" disablePadding>
            {categories && categories.map(c =>
              <MenuItem component={Link} to={`/${c.name}`} key={c.name} className={classes.nested}>
                <ListItemText inset primary={c.name}/>
              </MenuItem>)}
          </MenuList>
        </Collapse>
      </MenuList>
    )
  }
}

CategoryMenu.propTypes = {
	categories: PropTypes.array.isRequired
}

export default withStyles(styles)(CategoryMenu)