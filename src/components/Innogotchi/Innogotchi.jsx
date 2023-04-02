import { Button, Card, Col, Container, Row } from "react-bootstrap";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { deleteInnogotchi, drinkInnogotchi, feedInnogotchi, fetchChunk, fetchFilteredChunk, getCount, getInnogotchiState } from "../../http/InnogotchiAPI";
import { Pages } from "../Pages";
import { observer } from "mobx-react-lite";
import { UpdateInnogtchi } from "../modals/UpdateInnogotchi";

export const Innogotchi = observer(() => {
    const { innogotchi } = useContext(Context);
    const [petVisible, setPetVisible] = useState(false);

    const feedClick = async (name) => {
        await feedInnogotchi(name)
        await fetchFilteredChunk("happyDays", innogotchi.page - 1, innogotchi.size)
            .then(data => innogotchi.setInnogotchiState(data))
    }

    const drinkClick = async (name) => {
        await drinkInnogotchi(name)
        await fetchFilteredChunk("happyDays", innogotchi.page - 1, innogotchi.size)
            .then(data => innogotchi.setInnogotchiState(data))
    }

    const deleteClick = async (name) => {
        await deleteInnogotchi(name)
        const prevCount = innogotchi.innogotchi.length
        await fetchChunk(innogotchi.page - 1, innogotchi.size).then((data) => {
            if (data) {
                innogotchi.setInnogotchi(data)
            }
        })
        await fetchFilteredChunk("happyDays", innogotchi.page - 1, innogotchi.size)
            .then(data => innogotchi.setInnogotchiState(data))
        if (innogotchi.innogotchi.length < prevCount && innogotchi.page > 1) {
            innogotchi.setPage(innogotchi.page - 1)
        }
    }

    useEffect(() => {
        fetchChunk(innogotchi.page - 1, innogotchi.size).then((data) =>
            innogotchi.setInnogotchi(data))
        getCount().then(data => innogotchi.setTotalCount(data.data))
    }, [innogotchi.page, innogotchi.size]);

    useEffect(() => {
        fetchFilteredChunk("happyDays", innogotchi.page - 1, innogotchi.size)
            .then(data => innogotchi.setInnogotchiState(data))
    }, [innogotchi.page, innogotchi.size]);

    const mergedArray = innogotchi.totalCount === 0 ? [] : innogotchi.innogotchi?.map((item) => {
        const matchingItem = innogotchi.innogotchiState?.find(
            (stateItem) => stateItem.name === item.name);
        return {
            ...item,
            ...matchingItem
        };
    });

    return (
        <Container>
            <Button
                onClick={() => setPetVisible(true)}
                className='m-4'
            >
                +Create
            </Button>
            <Row className='d-flex'>
                {mergedArray === [] ? <></> : mergedArray.map((pet) => (
                    <Col
                        md={4}
                        className='d-flex justify-content-center align-items-center'
                    >
                        <Card className='m-4' key={pet.name}>
                            <Card.Img
                                src={`data:${pet.body.fileExtension};base64,${pet.body.image}`}
                                height='250'
                            ></Card.Img>
                            <Card.Img
                                src={`data:${pet.eyes.fileExtension};base64,${pet.eyes.image}`}
                                style={{ position: "absolute", top: '7%', left: '-5%' }}
                                height='50'
                            ></Card.Img>
                            <Card.Img
                                src={`data:${pet.nose.fileExtension};base64,${pet.nose.image}`}
                                style={{ position: "absolute", top: '13%', left: '-5%' }}
                                height='30'
                            ></Card.Img>
                            <Card.Img
                                src={`data:${pet.mouth.fileExtension};base64,${pet.mouth.image}`}
                                style={{ position: "absolute", top: '14%', left: '-5%' }}
                                height='50'
                            ></Card.Img>
                            <Card.Body>
                                <Card.Title>{pet.name}</Card.Title>
                                <Card.Text>Hunger: {pet.innogotchiStateDto?.hunger}</Card.Text>
                                <Card.Text>Thirsty: {pet.innogotchiStateDto?.thirsty}</Card.Text>
                                <Button
                                    variant="success"
                                    className='me-2'
                                    onClick={() => feedClick(pet.name)}
                                >
                                    Feed
                                </Button>
                                <Button
                                    variant="warning"
                                    className='me-2'
                                    onClick={() => drinkClick(pet.name)}
                                >
                                    Drink
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteClick(pet.name)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Pages />
                </Col>
            </Row>
            <UpdateInnogtchi show={petVisible} onHide={() => setPetVisible(false)} fetchChunk={fetchChunk} fetchFilteredChunk={fetchFilteredChunk} getCount={getCount} />
        </Container>
    );
});