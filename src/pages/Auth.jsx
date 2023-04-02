import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/UserAPI";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

export const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState({
        contentType: '',
        fileContents: ''
    })
    const [error, setError] = useState(null);

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(username, password);
            } else {
                const formData = new FormData();
                formData.append('Name', name);
                formData.append('Surname', surname);
                formData.append('Email', email);
                formData.append('Password', password);
                formData.append('ConfirmPassword', confirmPassword);
                formData.append('ProfilePhoto', image.fileContents);
                formData.append('FileExtension', image.contentType);
                await registration(formData);
                data = await login(name + ' ' + surname, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
        } catch (e) {
            setError("Invalid grant type")
        }
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setImage({
                contentType: file.type,
                fileContents: fileReader.result.split(',')[1]
            });
        };
    };

    if (isLogin) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: window.innerHeight }}
            >
                <Card style={{ width: 600 }} className="p-5">
                    <h2 className="m-auto bg-success badge fs-3">Log in</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Enter your username..."
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <div>
                                Don't have account? <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
                            </div>
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                                className="mt-3"
                            >
                                Log in
                            </Button>
                        </Row>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </Form>
                </Card>
            </Container>
        );
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-2"
        >
            <Card style={{ width: 600 }} className="p-4">
                <h2 className="m-auto bg-success badge fs-3">Sign up</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your surname..."
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Confirm your password..."
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={handleFileInputChange}
                        type="file"
                        accept=".svg,.jpg,.png"
                    />
                    {image && (
                        <img
                            src={`data:${image.contentType};base64,${image.fileContents}`}
                            alt="Choose your avatar"
                            width="220"
                            height="160"
                            style={{ margin: 'auto', borderRadius: 20 }}
                            accept=".svg,.jpg,.png"
                            className="mt-3"
                        />
                    )}
                    <Row className="d-flex justify-content-between mt-3">
                        <div>
                            Do you have account? <NavLink to={LOGIN_ROUTE}>Log in!</NavLink>
                        </div>
                        <Button
                            className="mt-3"
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Sign up
                        </Button>
                    </Row>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </Form>
            </Card>
        </Container>
    );
});