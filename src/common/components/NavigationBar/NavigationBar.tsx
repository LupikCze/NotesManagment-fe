import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useGetCurrentUser } from "../../../modules/users/hooks/queries/useGetCurrentUser/useGetCurrentUser";
import icon from "../../../resources/icons/edit_note_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import logout from "../../../resources/icons/logout_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import { links } from "../../router/links";

export const NavigationBar = () => {
  const { data: user } = useGetCurrentUser();
  return (
    <Navbar
      expand="lg"
      className={"navbar-dark"}
      style={{ backgroundColor: "#67001a", color: "white" }}
    >
      <Container className={"px-3 m-0"} fluid style={{ maxWidth: undefined }}>
        <Navbar.Brand
          className="d-flex align-items-center"
          style={{ color: "white", gap: "10px" }}
        >
          <img
            src={icon}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Notes Managment"
          />
          <h2>Notes Managment</h2>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ borderColor: "white" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              color: "white",
            }}
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link
              href={links.userDetail(user?.id)}
              style={{ color: "white" }}
            >
              <h4>My page</h4>
            </Nav.Link>
            <Nav.Link href={links.users()} style={{ color: "white" }}>
              <h4>Users</h4>
            </Nav.Link>
            <Nav.Link href={links.groups()} style={{ color: "white" }}>
              <h4>Groups</h4>
            </Nav.Link>
            <Nav.Link href={links.notes()} style={{ color: "white" }}>
              <h4>Notes</h4>
            </Nav.Link>
            <Nav.Link href={links.tags()} style={{ color: "white" }}>
              <h4>Tags</h4>
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link
              href="#"
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <img
                src={logout}
                width="30"
                height="30"
                alt="Logout"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = links.login();
                }}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
