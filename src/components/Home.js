import { Link } from 'react-router-dom';
import ticket from './../images/movie_tickets.jpg'

const Home = () => {
    return (
        <>
        <div className="text-centre">
            <h2>Find a movie to watch tonight!</h2>
            <hr />
            <Link to="/movies">
                <img src={ticket} alt="movie tickets" style={{ width: '200px', height: 'auto' }} />
            </Link>
        </div>
        </>
    )
}

export default Home;