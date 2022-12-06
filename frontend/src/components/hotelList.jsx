import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import {setHotels} from "./reducerSlice";
import authHeader from "../services/auth-header";
import five from "./actives/5stars.png"
import four from "./actives/4stars.png"
import three from "./actives/3stars.png"
import two from "./actives/2stars.png"
import one from "./actives/1stars.png"

const Component = () => {
    const apiBase = useSelector((state) => state.toolkit.apiBase);
    const hotels = useSelector((state) => state.toolkit.hotels);
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get(`${apiBase}/hotels`, {headers: authHeader()}).then((resp) => {
            dispatch(setHotels(resp.data));
        });
    }, [apiBase, dispatch]);


    return (
        <>
            <h1>Отели</h1>
            <div className='Row'>
                <Row xs={1} md={2} className="g-4">
                    {hotels &&
                        hotels.map((x) => (
                            <Col>
                                <Card style={{height: '100%', padding: 10}}>
                                    <Card.Img style={{height: '100%'}} variant="top" src={x.image}/>
                                    <Card.Body>
                                        <Card.Text style={{textAlign: `center`}}>
                                            {x.stars == 5 &&
                                                <img src={five} style={{height: `30px`}}
                                                     className="me-3"
                                                     alt="five"/>
                                            }
                                            {x.stars == 4 &&
                                                <img src={four} style={{height: `30px`}}
                                                     className="me-3"
                                                     alt="five"/>
                                            }
                                            {x.stars == 3 &&
                                                <img src={three} style={{height: `30px`}}
                                                     className="me-3"
                                                     alt="five"/>
                                            }
                                            {x.stars == 2 &&
                                                <img src={two} style={{height: `30px`}}
                                                     className="me-3"
                                                     alt="five"/>
                                            }
                                            {x.stars == 1 &&
                                                <img src={one} style={{height: `30px`}}
                                                     className="me-3"
                                                     alt="five"/>
                                            }
                                        </Card.Text>
                                        <Card.Title style={{textAlign: `center`}}><p style={{fontSize: 25}}>{x.name}
                                        </p></Card.Title>

                                        <Card.Text style={{textAlign: `center`}}>
                                            {x.address}
                                        </Card.Text>
                                        <Card.Text style={{textAlign: `center`}}>

                                            <Button variant="outline-primary" as={Link} to={`hotel/${x.id}`}>
                                                Посмотреть номера
                                            </Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>


                {!hotels && (
                    <>
                        <h3>Отели не найдены</h3>
                    </>
                )}
            </div>


        </>
    );
};

export default Component;


