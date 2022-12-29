const { Link } = ReactRouterDOM


export function Home() {

    return <section className="home">
        <section className="home-text-container">
            <h1 className="home-title">Wellcome to Appsus!</h1>
            <h3 className="home-text">All of your day to day needs in just ONE App</h3>
        </section>
        <main className="home-nav-container">
            < Link to="/about" ><img src="../../assets/png/book.png" alt="" /></Link>
            <Link to="/note"> <img src="../../assets/png/note.png" alt="" /></Link>
            <Link to="/mail">  <img src="../../assets/png/email.png" alt="" /></Link>

        </main>
    </section>
}