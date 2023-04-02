import { Button, Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap"
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { fetchFarm, getFarmStatistic, deleteFarm } from "../../http/FarmAPI";
import { UpdateFarm } from "../modals/UpdateFarm";
import { StateTable } from "./StateTable";
import { Pages } from "../Pages";
import { fetchFilteredChunk, getCount } from "../../http/InnogotchiAPI";

export const Farm = observer(() => {
    const { innogotchi } = useContext(Context);
    const { farm } = useContext(Context);
    const [farmVisible, setFarmVisible] = useState(false);

    const deleteClick = async () => {
        await deleteFarm()
        farm.setFarm({})
        farm.setStatistic({})
        fetchFarm().then(data => {
            farm.setFarm(data);
        })
        getFarmStatistic().then(data => {
            farm.setStatistic(data)
        })
    }

    useEffect(() => {
        fetchFarm().then(data => farm.setFarm(data))
        getFarmStatistic().then(data => farm.setStatistic(data))
        getCount().then(data => innogotchi.setTotalCount(data.data))
    }, []);

    useEffect(() => {
        fetchFilteredChunk(innogotchi.filter, innogotchi.page - 1, innogotchi.size)
        .then(data => innogotchi.setInnogotchiState(data))
    }, [innogotchi.page, deleteClick, innogotchi.filter]);

    if (farm.farm !== '') {
        return (
            <Container>
                <Row className="mt-5">
                    <Col md={6}>
                        <div className="badge fs-2">{farm.farm.name}</div>
                        <Button
                            className="me-2"
                            variant="success"
                            onClick={() => setFarmVisible(true)}
                        >
                            Update
                        </Button>
                        <Button
                            onClick={deleteClick}
                            variant="danger"
                        >
                            Delete
                        </Button>
                        <Row className="mt-3" md={8}>
                            <Col className="mt-3 badge fs-3">
                                <div>Count of alive pets:</div>
                                <div>Count of dead pets:</div>
                                <div>Average feed period:</div>
                                <div>Average drinking period:</div>
                                <div >Average happiness days:</div>
                                <div>Average age:</div>
                            </Col>
                            <Col className="mt-3 badge fs-3">
                                <div>{farm.statistic.countOfAlivePets}</div>
                                <div>{farm.statistic.countOfDeadPets}</div>
                                <div>{farm.statistic.averageFeedPeriod}</div>
                                <div>{farm.statistic.averageDrinking}</div>
                                <div>{farm.statistic.averageHappinessDays}</div>
                                <div>{farm.statistic.averageAge}</div>
                            </Col>
                        </Row>
                        <UpdateFarm show={farmVisible} onHide={() => setFarmVisible(false)} fetchFarm={fetchFarm} create={false} />
                    </Col>
                    {innogotchi.totalCount === 0 ?
                        <></>
                        :
                        <Col md={6}>
                            <Row md={8}>
                                <Col className="justify-content-start ms-5 mt-3">   
                                    <DropdownButton id="dropdown-basic-button" title="Sort by">
                                        <Dropdown.Item onClick={() => innogotchi.setFilter("happyDays")}>Happy days</Dropdown.Item>
                                        <Dropdown.Item onClick={() => innogotchi.setFilter("age")}>Age</Dropdown.Item>
                                        <Dropdown.Item onClick={() => innogotchi.setFilter("hunger")}>Hunger</Dropdown.Item>
                                        <Dropdown.Item onClick={() => innogotchi.setFilter("thirsty")}>Thirsty</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                            </Row>
                            <Row md={8}>
                                <Col className="d-flex flex-column align-items-center mt-3">
                                    <StateTable />
                                </Col>
                            </Row>
                            <Row md={8}>
                                <Col className="d-flex flex-column align-items-center">
                                    <Pages />
                                </Col>
                            </Row>
                        </Col>
                    }
                </Row>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Button
                onClick={() => setFarmVisible(true)}
            >
                Create
            </Button>
            <span className="badge fs-2">Create your own farm now</span>
            <UpdateFarm show={farmVisible} onHide={() => setFarmVisible(false)} fetchFarm={fetchFarm} create={true} />
        </Container>
    );
});