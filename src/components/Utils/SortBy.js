import React, { Component } from 'react'
import SortIcon from '@material-ui/icons/Sort'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'
import { CONSTS } from '../../utils'

class SortBy extends Component {

  state = {
    sortByElem: null
  }

  //recupera objeto com as informações para ordenaão dos elementos
  getSortByValue = (value) => {
    return Object.keys(CONSTS.SORT_BY.OPTIONS).find( k => {
      return CONSTS.SORT_BY.OPTIONS[k].VALUE === value
    })
  }

  handleMenu = event => {
    this.setState({ sortByElem: event.currentTarget });
  }

  handleClose = event => {
    const { onChange } = this.props
    const key = this.getSortByValue(event.target.value)
    if(key){
      //monta objeto com informações para ordenação
      const { PROP, ASC } = CONSTS.SORT_BY.OPTIONS[key]
      const sortByInfo = {
        property: PROP,
        ascending: ASC
      }
      onChange(sortByInfo)
    }
    this.setState({ sortByElem: null });
  }

  render() {

    const { sortByElem } = this.state
    const { style } = this.props
    const openMenu = Boolean(sortByElem)

    return (
      <div className={style}>
        <IconButton
              aria-owns={openMenu ? 'sortBy' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
          <SortIcon/>
        </IconButton>
        <Menu
            id="sortBy"
            anchorEl={sortByElem}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={this.handleClose}
        >
          <MenuItem value={CONSTS.SORT_BY.OPTIONS.SCORE_ASC.VALUE} onClick={this.handleClose}>{CONSTS.SORT_BY.OPTIONS.SCORE_ASC.TEXT}</MenuItem>
          <MenuItem value={CONSTS.SORT_BY.OPTIONS.SCORE_DESC.VALUE} onClick={this.handleClose}>{CONSTS.SORT_BY.OPTIONS.SCORE_DESC.TEXT}</MenuItem>
          <MenuItem value={CONSTS.SORT_BY.OPTIONS.DATE_ASC.VALUE} onClick={this.handleClose}>{CONSTS.SORT_BY.OPTIONS.DATE_ASC.TEXT}</MenuItem>
          <MenuItem value={CONSTS.SORT_BY.OPTIONS.DATE_DESC.VALUE} onClick={this.handleClose}>{CONSTS.SORT_BY.OPTIONS.DATE_DESC.TEXT}</MenuItem>
        </Menu>
      </div>
    )
  }
}

SortBy.propTypes = {
	style: PropTypes.string,
  onChange: PropTypes.func
}

export default SortBy