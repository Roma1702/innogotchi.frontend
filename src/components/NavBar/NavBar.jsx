import { Nav, Navbar, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { ACCOUNT_DETAILS_ROUTE, FARM_ROUTE, HOME_ROUTE, INNOGOTCHI_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchUser } from "../../http/UserAPI";

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { farm } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.isAuth) {
      fetchUser().then(data => {
        user.setImage({ 
          contentType: data.fileExtension,
          fileContents: data.profilePhoto
        })
      })
    }
  })

  const logOut = () => {
    debugger
    user.setUser({})
    user.setIsAuth(false)
    user.setImage({})
    farm.setStatistic({})
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="ms-3 me-4 fs-4" onClick={() => navigate(HOME_ROUTE)}>Innogotchi game</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user.isAuth ?
            <>
              {user.image && (
                <img
                  src={`data:${user.image.contentType};base64,${user.image.fileContents}`}
                  alt="Choose your avatar"
                  height="50"
                  width="60"
                  style={{ borderRadius: 40 }}
                />
              )}
              <Nav className="m-auto gap-3 fs-5">
                <Link className="text-decoration-none text-white" to={FARM_ROUTE}>Farm overview</Link>
                <Link className="text-decoration-none text-white" to={INNOGOTCHI_ROUTE}>Innogotchi</Link>
                <Link className="text-decoration-none text-white" to={ACCOUNT_DETAILS_ROUTE}>Account settings</Link>
              </Nav>
              <Nav>
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={() => logOut()}
                >
                  Log out
                </Button>
              </Nav>
            </>
            :
            <div className="ms-auto">
              <Nav>
                <Button
                  className="me-2"
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Log in
                </Button>
              </Nav>
            </div>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
);

export default NavBar;