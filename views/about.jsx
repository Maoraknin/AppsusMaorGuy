
export function About() {
    return <section className="about animate__animated animate__fadeIn">
        <div className="team-member-container">
            <div className="team-member-social-container">
                <img src="assets/img/me.jpg" className="team-member-img" />
                <h4 className="team-member-name">Maor Aknin</h4>
                <p className="team-member-job">Full-stack Developer</p>
                <ul className="social-buttons-list">
                    <li className="social-item">
                        <a href="https://github.com/Maoraknin" target="_blank">
                        <i class="fa-brands fa-github"></i>
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.facebook.com/maor.aknin.3/" target="_blank">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.linkedin.com/in/maor-aknin-b63a46243/" target="_blank">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="team-member-overview">
                <p>23 Years old from Givat Avni, Israel.
                    Always looking for a new challenge and to improve myself.
                    Studying Full-Stack development, in Coding-Academy</p>

            </div>
        </div>

        <div className="team-member-container">
            <div className="team-member-social-container">
                <img src="assets/img/guy.jpg" className="team-member-img" />
                <h4 className="team-member-name">Guy Agam</h4>
                <p className="team-member-job">Full-stack Developer</p>
                <ul className="social-buttons-list">
                    <li className="social-item">
                        <a href="https://github.com/Guyagam" target="_blank">
                            <i class="fa fa-github"></i>
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.facebook.com/guy.agam.9/" target="_blank">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="https://www.linkedin.com/in/guy-agam-647371229/" target="_blank">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="team-member-overview">
                <p>25 years old from Kfar-Yona student in Coding Academy.
For me, being a developer means that each one of my tasks is like a logical puzzle that I need to solve. I perceive the development process like an art process, by developing and creating creative technical solutions from their beginning till their end.</p>

            </div>
        </div>

    </section>
}
