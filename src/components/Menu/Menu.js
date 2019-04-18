import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../App.css'
import { TiHomeOutline } from 'react-icons/ti/'
import '../../App.css'

class Menu extends Component {
    render() {

        const { categories } = this.props

        return (
            <div className="menu">
                <div className="home">
                    <div className="homeIcon">
                        <TiHomeOutline size="25" />
                    </div>
                    <Link to="/" className="homeLink">Home</Link>

                </div>
                <div className="categoriaTitulo">Categories</div>

                <ul className="categoriaLista">
                    {categories.map(c =>
                        <li key={c.name} className="categoriaItem">
                            {window.location.pathname.includes(c.name) ?
                                <Link to={`/${c.name}`} className="categoriaLink capitalize ativo">{c.name}</Link>
                                :
                                <Link to={`/${c.name}`} className="categoriaLink capitalize">{c.name}</Link>
                            }
                        </li>
                    )}
                </ul>
                <div className="addPost" onClick={this.props.addPost}>Add Post</div>
            </div>
        )
    }
}

Menu.propTypes = {
    categories: PropTypes.array.isRequired
}

export default Menu