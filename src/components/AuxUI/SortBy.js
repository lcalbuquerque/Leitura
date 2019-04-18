import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'
import { SORT_OPTIONS } from '../../utils'
import { TiArrowUnsorted } from 'react-icons/ti'

class SortBy extends Component {

    state = {
        sortByElem: null
    }

    getSortByValue = (value) => {
        return Object.keys(SORT_OPTIONS).find(k => {
            return SORT_OPTIONS[k].value === value
        })
    }

    handleMenu = event => {
        this.setState({ sortByElem: event.currentTarget });
    }

    handleClose = event => {
        const { onChange } = this.props
        const key = this.getSortByValue(event.target.value)
        if (key) {
            const { prop, asc } = SORT_OPTIONS[key]
            const sortByInfo = { property: prop, ascending: asc }
            onChange(sortByInfo)
        }
        this.setState({ sortByElem: null });
    }

    render() {

        const { sortByElem } = this.state
        const openMenu = Boolean(sortByElem)

        return (
            <div className="sortBy">
                <IconButton aria-owns={openMenu ? 'sortBy' : null} aria-haspopup="true" onClick={this.handleMenu} color="inherit">
                    <TiArrowUnsorted  />
                </IconButton>
                <Menu id="sortBy" anchorEl={sortByElem} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={openMenu} onClose={this.handleClose} >
                    <MenuItem value={SORT_OPTIONS.Score_Asc.value} onClick={this.handleClose}>{SORT_OPTIONS.Score_Asc.text}</MenuItem>
                    <MenuItem value={SORT_OPTIONS.Score_Desc.value} onClick={this.handleClose}>{SORT_OPTIONS.Score_Desc.text}</MenuItem>
                    <MenuItem value={SORT_OPTIONS.Date_Asc.value} onClick={this.handleClose}>{SORT_OPTIONS.Date_Asc.text}</MenuItem>
                    <MenuItem value={SORT_OPTIONS.Date_Desc.value} onClick={this.handleClose}>{SORT_OPTIONS.Date_Desc.text}</MenuItem>
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