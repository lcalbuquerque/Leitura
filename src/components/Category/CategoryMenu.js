import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../App.css'

class CategoryMenu extends Component {

    render() {

        const { categories } = this.props

        return (
            <ul className="categoriaLista">
                <li className="categoriaItem"><Link to="/home" className="categoriaLink">Home</Link></li>
                { categories.map(c =>
                    <li key={c.name} className="categoriaItem">
                        <Link to={`/${c.name}`} className="categoriaLink">{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</Link>
                    </li>
                )}
            </ul>
        )
    }
}

CategoryMenu.propTypes = {
    categories: PropTypes.array.isRequired
}

export default CategoryMenu