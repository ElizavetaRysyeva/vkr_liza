import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

export const RoomList = (props) => {
  const { rooms, addCart } = props;
  const isLoggedIn = useSelector((state) => state.toolkit.isLoggedIn);

  return (
    <>
      <h1>
        Номера
        <Button variant="outline-secondary" as={Link} to={`/`}>
          На предыдущую страницу
        </Button>
      </h1>

      <hr />
      <div className="Row">
        <Row xs={1} md={3} className="g-4">
          {rooms &&
            rooms.map((x) => (
              <Col>
                <Card style={{ height: "100%", padding: 10 }} key={x.id}>
                  <Card.Img
                    style={{ height: 300 }}
                    variant="top"
                    src={x.room_img}
                  />
                  <Card.Body>
                    <Card.Title style={{ textAlign: `center` }}>
                      <p style={{ fontSize: 25 }}>{x.category_rus}</p>
                    </Card.Title>

                    <Card.Text style={{ textAlign: `center` }}>
                      Вместительность: {x.max_count} чел.
                      <p>Стоимость: {x.price} руб/сутки</p>
                    </Card.Text>
                    <Card.Text style={{ textAlign: `justify` }}>
                      {x.description}
                    </Card.Text>
                    <Card.Text style={{ textAlign: `center` }}>
                      {isLoggedIn && (
                        <Button
                          key={x.id}
                          variant="outline-primary"
                          className="m-1"
                          onClick={() => {
                            addCart(x.id);
                          }}
                        >
                          Забронировать номер
                        </Button>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>

        {!rooms.length && (
          <>
            <Card style={{ height: "100%", padding: 10 }}>
              <Card.Body>
                <Card.Text style={{ textAlign: `center` }}>
                  <h4>Свободных номеров нет :</h4>
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
    </>
  );
};
