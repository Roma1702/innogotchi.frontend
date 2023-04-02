import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { createFarm, updateFarm } from "../../http/FarmAPI";

export const UpdateFarm = ({ show, onHide, fetchFarm, create }) => {
    const { farm } = useContext(Context);
    const [value, setValue] = useState('')

    const click = async () => {
        let formData = new FormData();
        formData.append('Name', value);
        if (create){
            await createFarm(formData)
        } else {
            await updateFarm(formData)
        }
        setValue('')
        onHide()
        fetchFarm().then(data => {
            farm.setFarm(data);
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Give your farm name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Enter new farm name"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={click}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
};