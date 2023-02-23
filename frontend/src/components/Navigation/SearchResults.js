import { NavLink } from "react-router-dom"

function SearchResultIndex({spot, setSearch, setShowSearchMenu, showSearchMenu}){


    return(
        <div onClick={() => {
            console.log('fire')
            setShowSearchMenu(false)
            setSearch('')
            console.log('show menu b4', showSearchMenu)
            console.log('what is show menu after', showSearchMenu)
            }}>
            <NavLink  to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="search-results-index-item" style={{paddingLeft: '20px', height: '30px'}}>
                    {spot.name}
                </div>
            </NavLink>
        </div>
    )
}

export default SearchResultIndex
