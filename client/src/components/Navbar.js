import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateAuthData } from "../redux/slices/auth";
import Stopwatch from "./Stopwatch";

function NavBar({isAdmin,status,setStatus}) {
  const dispatch = useDispatch();

  const { username, isAuth } = useSelector((state) => state.auth);

  function logout() {
    localStorage.clear();
    dispatch(
      updateAuthData({
        name: null,
        level: null,
        isAdmin: null,
        isAuth: false,
      })
    );
  }

  return (
    <>
      <Navbar expand="lg">
        <Container className="cont" fluid>
          <h1>Treasure Hunt</h1>

          {isAuth && !isAdmin && <div className="timer"><Stopwatch/></div>}
          {isAuth && (

            <Navbar.Collapse className="justify-content-end">
				{isAdmin?
              <Navbar.Text onClick={()=>setStatus(0)} style={{cursor:"pointer",color:"black"}}>Statistics</Navbar.Text>:null}
              {/* // <Navbar.Text onClick={()=>setStatus(0)} style={{cursor:"pointer",color:"black"}} >Home</Navbar.Text>:null} */}
				{isAdmin?
              <Navbar.Text onClick={()=>setStatus(1)} style={{cursor:"pointer",color:"black"}}>Leaderboard</Navbar.Text>:null}
				{!isAdmin?
              <Navbar.Text onClick={()=>setStatus(!status)} style={{cursor:"pointer",color:"black"}}>Home/Leaderboard</Navbar.Text>:null}

              <Navbar.Text className="mx-3">{username}</Navbar.Text>
              <Button
                className="mx-3"
                variant="primary"
                type="submit"
                onClick={logout}
              >
                Log Out
              </Button>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
