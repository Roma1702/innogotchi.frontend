import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Row, Col, Badge } from 'react-bootstrap'
import { Context } from '../..';
import { deleteUser, fetchUser, updatePassword, updateUser } from '../../http/UserAPI'

export const AccountDetails = observer(() => {
  const { user } = useContext(Context)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newImage, setNewImage] = useState({
    contentType: '',
    fileContents: ''
  });
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    fetchUser().then(data => {
      setName(data.name)
      setSurname(data.surname)
      setEmail(data.email)
      setNewImage({
        contentType: data.fileExtension,
        fileContents: data.profilePhoto
      })
    })
      .catch(error => console.error(error))
  }, []);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewImage({
        contentType: file.type,
        fileContents: reader.result.split(',')[1]
      });
    };
    reader.readAsDataURL(file);
  };

  const click = async () => {
    try {
      let formData = new FormData();
      formData.append('Name', name);
      formData.append('Surname', surname);
      formData.append('Email', email);
      formData.append('ProfilePhoto', newImage.fileContents);
      formData.append('FileExtension', newImage.contentType);
      await updateUser(formData)
      setError1("Successfully updated!")
      fetchUser().then(data => {
        user.setImage({
          contentType: data.fileExtension,
          fileContents: data.profilePhoto
        })
      })
    } catch (e) {
      setError1("Invalid data!")
    }
  }

  const changePassword = async () => {
    try {
      let formData = new FormData();
      formData.append('CurrentPassword', oldPassword);
      formData.append('NewPassword', newPassword);
      formData.append('ConfirmPassword', newPassword);
      await updatePassword(formData)
      setError2("Successfully updated!")
    } catch (e) {
      setError2("Invalid data!")
    }
  }

  const deleteAccount = async () => {
    await deleteUser();
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center p-4"
    >
      <Row>
        <Col>
          <Form className="d-flex flex-column">
            <h3 className='text-center badge fs-4'>
              Account settings
            </h3>
            {user.image && (
              <img
                src={`data:${user.image.contentType};base64,${user.image.fileContents}`}
                alt="Choose your avatar"
                width="330"
                height="220"
                style={{ margin: 'auto', borderRadius: 20 }}
                accept=".svg,.jpg,.png"
                className="mt-3"
              />
            )}
            <Form.Control
              className="mt-4"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              value={email}
              disabled
            />
            <Form.Control
              className="mt-3"
              onChange={handleImageUpload}
              type="file"
              accept=".svg,.jpg,.png"
            />
            {error1 && <div style={{ color: 'red' }}>{error1}</div>}
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              <Button
                className="mt-3"
                onClick={click}
              >
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
        <Col style={{ marginTop: 233 }} className="ms-5">
          <Form className="d-flex flex-column">
            <h4 className='text-center mt-4 badge fs-4'>
              Password change form
            </h4>
            <Form.Control
              className="mt-3"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
            <Form.Control
              className="mt-3"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <Form.Control
              className="mt-3"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            {error2 && <div>{error2}</div>}
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              <Button
                className="mt-3"
                onClick={changePassword}
              >
                Submit
              </Button>
            </Row>
            <Row className="d-flex justify-content-between mt-2 pl-3 pr-3">
              <Button
                variant="danger"
                onClick={deleteAccount}
              >
                Delete account
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});