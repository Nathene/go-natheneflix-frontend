import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch(`${process.env.REACT_APP_BACKEND}/natheneflix/logout`, requestOptions)
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setJwtToken("");
      toggleRefresh(false)
    })
    navigate("/natheneflix/login");
  }

  const toggleRefresh = useCallback((status) => {
    if (status) {
      let i = setInterval(() => {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }
        fetch(`${process.env.REACT_APP_BACKEND}/natheneflix/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
          }
        })
        .catch(error => {
          console.log("user is not logged in");
          clearInterval(i); // Stop the interval when there's an error
          setTickInterval(null);
        })
      }, 600000);
      setTickInterval(i)
    } else {
      setTickInterval(null);
      clearInterval(tickInterval);
    }
    
  }, [tickInterval])


  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      fetch(`${process.env.REACT_APP_BACKEND}/natheneflix/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch(error => {
          console.log("user is not logged in", error);
        })
    }
  }, [jwtToken, toggleRefresh])

  


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          {jwtToken === "" ? (
            <Link to="/natheneflix/login">
              <span className="badge bg-success">Login</span>
            </Link>
          ) : (
            <a href="/#!" onClick={logOut}>
              <span className="badge bg-danger">Logout</span>
            </a>
          )}
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/natheneflix/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link
                to="/natheneflix/movies"
                className="list-group-item list-group-item-action"
              >
                Movies
              </Link>
              <Link
                to="/natheneflix/genres"
                className="list-group-item list-group-item-action"
              >
                Genres
              </Link>
              {jwtToken !== "" && (
                <>
                  <Link
                    to="/natheneflix/admin/movie/0"
                    className="list-group-item list-group-item-action"
                  >
                    Add Movie
                  </Link>
                  <Link
                    to="/natheneflix/manage-catalogue"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Catalogue
                  </Link>
                  <Link
                    to="/natheneflix/graphql"
                    className="list-group-item list-group-item-action"
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
