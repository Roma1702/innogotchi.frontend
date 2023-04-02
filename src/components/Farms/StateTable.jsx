import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Context } from "../..";

export const StateTable = observer(() => {
    const { innogotchi } = useContext(Context);

    let innogotchiItems = innogotchi.innogotchiState?.map(pet =>
        <tr key={pet.id}>
            <td>{pet.name}</td>
            <td>{pet.innogotchiStateDto.age == 0 ? 'Newborn' : pet.innogotchiStateDto.age}</td>
            <td>{pet.innogotchiStateDto.hunger}</td>
            <td>{pet.innogotchiStateDto.thirsty}</td>
            <td>{pet.innogotchiStateDto.happinessDays}</td>
        </tr>)

    return (
        <div className="ms-5">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Age</th>
                        <th>Hunger Level</th>
                        <th>Thirsty Level</th>
                        <th>Happiness days count</th>
                    </tr>
                </thead>
                <tbody>
                    {innogotchiItems}
                </tbody>
            </Table>
        </div>
    );
});