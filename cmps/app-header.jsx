const { useState, useEffect } = React

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    const [isClicked, setIsClicked] = useState(false)

    return <header className="app-header">
        <Link to="/" className="app-header-logo">
            <img src="assets/svg/horse.svg" className="img-logo" /> Appsus
        </Link>
        <span onClick={() => setIsClicked(!isClicked)} class="material-symbols-outlined menu">menu</span>
        {isClicked && <div className="header-modal">
            <NavLink to="/book"><img src="assets/png/book.png"/></NavLink>
            <NavLink to="/mail"><img src="assets/png/email.png"/></NavLink>
            <NavLink to="/note"><img src="assets/png/note.png"/></NavLink>
            <NavLink to="/about"><img src="assets/png/about.png"/></NavLink>

        </div>}
        {/* <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav> */}
    </header>
}


    
    