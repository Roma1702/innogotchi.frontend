import React, { useContext, useEffect, useState } from "react";
import { Container, InputGroup, Form, Button, Pagination } from "react-bootstrap";
import { Context } from "../..";
import { confirmRequest, getRequests, getUserByName, inviteUser, rejectRequest } from "../../http/UserAPI";

export const Home = () => {
    const { user } = useContext(Context)
    const [requests, setRequests] = useState([])
    const [searchedUser, setSearchedUser] = useState({})
    const [userName, setUserName] = useState('')
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        getRequests().then(data => setRequests(data))
    }, [])

    const searchUser = async () => {
        debugger
        await getUserByName(userName)
            .then(data => {
                if (data !== "") {
                    setSearchedUser(data);
                    setDisplay(true);
                }
            });
    }

    const inviteClick = async (invitation) => {
        await inviteUser(invitation)
        setDisplay(false);
    }

    const confirmClick = async (name) => {
        await confirmRequest(name)
        setDisplay(false);
    }

    const rejectClick = async (name) => {
        await rejectRequest(name)
        setDisplay(false);
    }

    return (
        <Container>
            {user.isAuth ?
                <Container>
                    <div className="text-center mt-5 fs-1 badge">
                        Welcome to home page!
                    </div>
                    <div className="text-center mt-5">
                        <span className="badge bg-primary fs-5 mb-4">Getting friends with another users</span><br />
                        <InputGroup className="mb-3">
                            <Button variant="secondary" id="button-addon1" onClick={searchUser}>
                                Search
                            </Button>
                            <Form.Control
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                placeholder="Username"
                                onChange={e => setUserName(e.target.value)}
                                value={userName}
                            />
                        </InputGroup>
                    </div>
                    {display && (
                        <div>
                            <p>Name: {searchedUser.name} {searchedUser.surname}</p>
                            <p>Email: {searchedUser.email}</p>
                            <img
                                src={`data:${searchedUser.fileExtension};base64,${searchedUser.profilePhoto}`}
                                alt="Profile photo"
                                height="70"
                                style={{ borderRadius: 20 }}
                            /> <br />
                            <Button
                                onClick={() => inviteClick(`${searchedUser.name} ${searchedUser.surname}`)}
                                className="m-2"
                            >
                                Invite
                            </Button>
                        </div>
                    )}
                    <div className="badge">
                        <h2>Friend Requests</h2>
                        {requests.map((request) => (
                            <div key={request.email}>
                                <p>Name: {request.name} {request.surname}</p>
                                <p>Email: {request.email}</p>
                                <img
                                    src={`data:${request.fileExtension};base64,${request.profilePhoto}`}
                                    alt="Profile photo"
                                    height="70"
                                    style={{ borderRadius: 20 }}
                                /> <br />
                                <Button variant="success" className="m-2" onClick={() => confirmClick(`${request.name} ${request.surname}`)}>Confirm</Button>
                                <Button variant="danger" className="m-2" onClick={() => rejectClick(`${request.name} ${request.surname}`)}>Reject</Button>
                            </div>
                        ))}
                    </div>
                </Container>
                :
                <div className="text-center mt-5 fs-1 badge">
                    Welcome to innogotchi farm!
                </div>}
        </Container>
    )
}