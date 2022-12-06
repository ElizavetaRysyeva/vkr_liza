import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import authHeader from "../services/auth-header";

const Component = () => {
    const apiBase = useSelector((state) => state.toolkit.apiBase);

    const [name, setName] = useState("");
    const [hotels, setHotels] = useState([]);

    const find = () => {
        axios.get(`${apiBase}/hotels/?name=${encodeURIComponent(name)}`, { headers: authHeader() }).then((resp) => {
            setHotels(resp.data);
        });
    };

    return (
        <>
            <h4>Поиск отеля по названию</h4>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Название отеля для поиска"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="outline-secondary" type="submit" onClick={find}>
                    Найти
                </Button>
            </Form.Group>

            <h4>Результаты поиска</h4>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th>Звезд</th>
                    <th>Номера</th>
                </tr>
                </thead>
                <tbody>
                {hotels.length > 0 &&
                    hotels.map((x) => {
                        return (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.address}</td>
                                <td>{x.stars}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button
                                            variant="outline-primary"
                                            as={Link}
                                            to={`info/${x.id}`}
                                        >
                                            Об отеле
                                        </Button>
                                        <Button variant="outline-primary" as={Link} to={`order/${x.id}`}>
                                            Забронировать номер
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        );
                    })}
                {!hotels.length && (
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default Component;
