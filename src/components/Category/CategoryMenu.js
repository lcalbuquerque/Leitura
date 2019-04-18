import React, { Component } from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import Collapse from '@material-ui/core/Collapse'
import PropTypes from 'prop-types'
import '../../App.css'

class CategoryMenu extends Component{

  state = {
    openCategories: false
  }

  handleClick = () => this.setState({openCategories: !this.state.openCategories})

  render (){

    const { categories } = this.props
    const { openCategories } = this.state

    return (
      <MenuList component="nav">
        <MenuItem component={Link} to="/home" key="home">
            <ListItemText inset primary="Home"/>
        </MenuItem>
        <MenuItem onClick={this.handleClick}>
                <ListItemText inset primary="Categories" />
                {openCategories ? <TiArrowSortedUp size="25" /> : <TiArrowSortedDown size="25" />}
            </MenuItem>
            <Collapse in={openCategories} timeout="auto" unmountOnExit className="nested">
          <MenuList component="div" disablePadding>
            {categories && categories.map(c =>
                        <MenuItem component={Link} to={`/${c.name}`} key={c.name}>
                            <ListItemText inset primary={c.name} />
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

export default CategoryMenu