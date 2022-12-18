import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {addHotels, setHotels, setOrderStatuses} from "../reducerSlice";
import authHeader from "../../services/auth-header";

const Component = () => {
  const defNewObj = {
    name: "",
    address: "",
    stars:"",
    image:"",
  };

  const [newHotel, setNewHotel] = useState(defNewObj);
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const hotel = useSelector((state) => state.toolkit.hotels);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/hotels`, { headers: authHeader() }).then((resp) => {
      dispatch(setHotels(resp.data));
    });



    axios
        .get(`${apiBase}/orders/info/statuses`, {headers: authHeader()})
        .then((resp) => {
          dispatch(setOrderStatuses(resp.data));
        });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios.post(`${apiBase}/hotels`, newHotel, { headers: authHeader() }).then((resp) => {
      dispatch(addHotels(resp.data));
      setNewHotel(defNewObj);
    });
  };

  const handleChange = (e) => {
    const newCategoryTmp = { ...newHotel };

    newCategoryTmp[e.target.name] = e.target.value;

    setNewHotel(newCategoryTmp);
  };

  return (
      <div className="mb-5 p-2 border border-top-0 rounded-bottom">
        <h3>Список отелей</h3>

        {hotel && (
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Адрес</th>
                <th>Звезд</th>
                <th>Изображение</th>
              </tr>
              </thead>
              <tbody>
              {hotel.length > 0 &&
                  hotel.map((x) => {
                    return (
                        <tr key={x.id}>
                          <td>{x.id}</td>
                          <td>{x.name}</td>
                          <td>{x.address}</td>
                          <td>{x.stars}</td>
                          <td>{x.image}</td>
                        </tr>
                    );
                  })}
              {!hotel.length && (
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
        )}

        <h3>Добавить новый отель</h3>

        <Form onSubmit={addNew}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Название"
                    value={newHotel.name}
                    onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    placeholder="Адрес"
                    value={newHotel.address}
                    onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col><Form.Group className="mb-3">
              <Form.Label>Звезд</Form.Label>
              <Form.Control
                  type="number"
                  name="stars"
                  placeholder="Звезд"
                  value={newHotel.stars}
                  onChange={handleChange}
              />
            </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Изображение</Form.Label>
                <Form.Control
                    type="text"
                    name="image"
                    placeholder="Изображение"
                    value={newHotel.image}
                    onChange={handleChange}
                />
              </Form.Group></Col>
          </Row>

          <Button  variant="light"  type="submit">
            Добавить
          </Button>
        </Form>
      </div>
  );
};

export default Component;
