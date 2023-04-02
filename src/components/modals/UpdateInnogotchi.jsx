import { useContext, useState } from "react";
import { Context } from "../..";
import { addInnogotchi } from "../../http/InnogotchiAPI";
import { Button, Form, Modal } from "react-bootstrap";

export const UpdateInnogtchi = ({ show, onHide, fetchChunk, fetchFilteredChunk, getCount }) => {
    const { innogotchi } = useContext(Context);
    const [name, setName] = useState('')
    const [body, setBody] = useState({
        fileExtension: '',
        image: '',
        partType: 1
    })
    const [eyes, setEyes] = useState({
        fileExtension: '',
        image: '',
        partType: 2
    })
    const [mouth, setMouth] = useState({
        fileExtension: '',
        image: '',
        partType: 3
    })
    const [nose, setNose] = useState({
        fileExtension: '',
        image: '',
        partType: 4
    })

    const click = async () => {
        let formData = new FormData();
        formData.append('Name', name);
        formData.append('Body.Image', body.image);
        formData.append('Body.FileExtension', body.fileExtension);
        formData.append('Body.PartType', body.partType);
        formData.append('Eyes.Image', eyes.image);
        formData.append('Eyes.FileExtension', eyes.fileExtension);
        formData.append('Eyes.PartType', eyes.partType);
        formData.append('Nose.Image', nose.image);
        formData.append('Nose.FileExtension', nose.fileExtension);
        formData.append('Nose.PartType', nose.partType);
        formData.append('Mouth.Image', mouth.image);
        formData.append('Mouth.FileExtension', mouth.fileExtension);
        formData.append('Mouth.PartType', mouth.partType);
        await addInnogotchi(formData)
        setName('')
        setBody({})
        setEyes({})
        setMouth({})
        setNose({})
        onHide()
        fetchChunk(innogotchi.page - 1, innogotchi.size).then((data) =>
        innogotchi.setInnogotchi(data))
        getCount().then(data => innogotchi.setTotalCount(data.data))
        fetchFilteredChunk("happyDays", innogotchi.page - 1, innogotchi.size)
            .then(data => innogotchi.setInnogotchiState(data))
    }

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 1) {
                setBody({
                    fileExtension: file.type,
                    image: reader.result.split(',')[1],
                    partType: 1
                });
            }
            else if (type === 2) {
                setEyes({
                    fileExtension: file.type,
                    image: reader.result.split(',')[1],
                    partType: 2
                });
            }
            else if (type === 3) {
                setMouth({
                    fileExtension: file.type,
                    image: reader.result.split(',')[1],
                    partType: 3
                });
            }
            else {
                setNose({
                    fileExtension: file.type,
                    image: reader.result.split(',')[1],
                    partType: 4
                });
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create your innogotchi
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Give your pet name"}
                    />
                    <Form.Label
                        className="m-2"
                    >
                        Choose body
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => handleImageUpload(e, 1)}
                        type="file"
                        accept=".svg"
                    />
                    <Form.Label
                        className="m-2"
                    >
                        Choose eyes
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => handleImageUpload(e, 2)}
                        type="file"
                        accept=".svg"
                    />
                    <Form.Label
                        className="m-2"
                    >
                        Choose nose
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => handleImageUpload(e, 4)}
                        type="file"
                        accept=".svg"
                    />
                    <Form.Label
                        className="m-2"
                    >
                        Choose mouth
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => handleImageUpload(e, 3)}
                        type="file"
                        accept=".svg"
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