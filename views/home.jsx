const {useRef} = React


const { Link } = ReactRouterDOM


export function Home() {

    const titleRef = useRef()

    return <section className="home">
        <section className="home-text-container">
            <h1 className="home-title animate__animated animate__backInDown" ref={titleRef}>Wellcome to Appsus!</h1>
            <h3 className="home-text animate__animated animate__backInDown">All of your day to day needs in just ONE App</h3>
        </section>
        <main className="home-nav-container animate__animated animate__backInUp">
            <Link to="/about" ><img src="../../assets/png/book.png" alt="" /></Link>
            <Link to="/note"> <img src="../../assets/png/note.png" alt="" /></Link>
            <Link to="/mail">  <img src="../../assets/png/email.png" alt="" /></Link>

        </main>
    </section>
}