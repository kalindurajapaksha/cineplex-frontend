import jwtDecode from "jwt-decode";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import {
  Form,
  Link,
  NavLink,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import { TokenData } from "../pages/Authentication";

const MainNavigation = () => {
  const { pathname } = useLocation();
  const token = useRouteLoaderData("root") as string | null;
  let tokenData: TokenData;
  if (token) {
    tokenData = jwtDecode(token);
  }
  return (
    <header className="mb-3">
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <Link style={{ textDecoration: "none" }} to="/">
            <h1>CINEPLEX</h1>
          </Link>
        </Col>
        {!["/auth", "/bookings"].includes(pathname) && (
          <Col className="d-flex justify-content-end">
            {!token && (
              <Link to="/auth?mode=login">
                <Button> Login </Button>
              </Link>
            )}
            {token && (
              <>
                <Dropdown style={{ marginRight: "10px" }}>
                  <Dropdown.Toggle variant="success">
                    {`Hi, ${tokenData.firstName}`}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/bookings">
                      {/* <Link style={{ textDecoration: "none" }} to="/bookings"> */}
                      Bookings
                      {/* </Link> */}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form action="/logout" method="post">
                  <Button type="submit">Logout</Button>
                </Form>
              </>
            )}
          </Col>
        )}
      </Row>
    </header>
  );
};

export default MainNavigation;
