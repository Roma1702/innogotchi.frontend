import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom";

export const FarmItem = (props) => {
    return (
        <>
            <Nav className="mt-3">
                <Link className="text-decoration-none text-black" to={props.name}>
                    <h4>{props.name}</h4>
                </Link>
            </Nav>
        </>
    );
}