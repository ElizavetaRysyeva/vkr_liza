import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { setHotels } from "./reducerSlice";
import five from "./actives/5stars.png";
import four from "./actives/4stars.png";
import three from "./actives/3stars.png";
import two from "./actives/2stars.png";
import one from "./actives/1stars.png";

import { hotelTypes } from "../consts/consts";
import { countries } from "../consts/consts";
import { starRatings } from "../consts/consts";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const allHotels = useSelector((state) => state.toolkit.hotels);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [sendQuery, setSendQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
  const [selectedStarRatings, setSelectedStarRatings] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const hotelsToShow = allHotels.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 12);
  };

  const handleStarRatingChange = (number) => {
    if (selectedStarRatings.includes(number)) {
      // Если элемент уже выбран, удаляем его из массива
      setSelectedStarRatings(
        selectedStarRatings.filter((item) => item !== number)
      );
    } else {
      // Если элемент не выбран, добавляем его в массив
      setSelectedStarRatings([...selectedStarRatings, number]);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      let params = {};

      if (sendQuery) {
        params.name = sendQuery;
      }

      if (selectedCountry && selectedCountry.length > 0) {
        params.country = selectedCountry;
      }

      if (selectedStarRatings && selectedStarRatings.length > 0) {
        params.stars = selectedStarRatings.join(",");
      }

      if (selectedStarRatings && selectedHotelTypes.length > 0) {
        params.propertyType = selectedHotelTypes.join(",");
      }

      const response = await axios.get(`${apiBase}/hotels`, {
        params: params,
      });
      dispatch(setHotels(response.data));
    } catch (error) {
      console.error("Error fetching filtered hotels:", error);
    }
  }, [
    sendQuery,
    selectedCountry,
    selectedStarRatings,
    selectedHotelTypes,
    apiBase,
    dispatch,
  ]);

  useEffect(() => {
    fetchData();
  }, [
    sendQuery,
    selectedCountry,
    selectedStarRatings,
    selectedHotelTypes,
    fetchData,
  ]);

  // Для выбора страны
  const handleCountryChange = (event) => {
    setSelectedCountry(
      event.target.value === "Страна" ? "" : event.target.value
    );
  };

  return (
    <>
      {/* Поиск отеля по названию */}
      <div className="Row">
        <Row xs={1} md={1} style={{ paddingBottom: 30 }}>
          <Col xs={10} md={10}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Введите название отеля для поиска"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={2} md={2}>
            <Form.Group className="mb-3">
              <Button
                variant="outline-secondary"
                type="submit"
                onClick={() => {
                  setSendQuery(query);
                  fetchData();
                }}
                style={{ width: "100%" }}
              >
                Найти
              </Button>
            </Form.Group>
          </Col>
        </Row>

        {/* Фильтры отелей  */}
        <Row style={{ paddingBottom: 30 }}>
          <Col xs={2} md={2}>
            <h6>Тип </h6>

            <Form.Group>
              {hotelTypes &&
                hotelTypes.map((x) => (
                  <Form.Check
                    key={x.english}
                    type="checkbox"
                    label={x.russian}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedHotelTypes((prevTypes) => [
                          ...prevTypes,
                          x.english,
                        ]); // Добавление нового типа
                      } else {
                        setSelectedHotelTypes((prevTypes) =>
                          prevTypes.filter((type) => type !== x.english)
                        ); // Удаление типа из массива
                      }
                    }}
                  />
                ))}
            </Form.Group>
          </Col>

          <Col xs={2} md={2}>
            <h6>Классификация </h6>
            <Form.Group>
              {starRatings &&
                starRatings.map((x) => (
                  <Form.Check
                    key={x.number}
                    type="checkbox"
                    label={x.label}
                    checked={selectedStarRatings.includes(x.number)}
                    onChange={() => handleStarRatingChange(x.number)}
                  />
                ))}
            </Form.Group>
          </Col>

          <Col xs={2} md={2}>
            <h6>Страна</h6>
            <Form.Select aria-label="Страна" onClick={handleCountryChange}>
              <option>Страна</option>
              {countries &&
                countries.map((x) => (
                  <option key={x.english} value={x.english}>
                    {x.russian}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>

        <Row xs={3} md={3} className="g-4" style={{ paddingBottom: 20 }}>
          {allHotels &&
            hotelsToShow &&
            hotelsToShow.map((x) => (
              <Col key={x.id}>
                <Card style={{ height: "100%" }} key={x.id}>
                  <Card.Img
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      minHeight: 250,
                      maxHeight: 250,
                    }}
                    variant="top"
                    src={x.image}
                  />
                  <Card.Body>
                    <Card.Text style={{ textAlign: `center` }}>
                      {x.stars === 5 && (
                        <img
                          src={five}
                          style={{ height: `30px` }}
                          className="me-3"
                          alt="five"
                        />
                      )}
                      {x.stars === 4 && (
                        <img
                          src={four}
                          style={{ height: `30px` }}
                          className="me-3"
                          alt="five"
                        />
                      )}
                      {x.stars === 3 && (
                        <img
                          src={three}
                          style={{ height: `30px` }}
                          className="me-3"
                          alt="five"
                        />
                      )}
                      {x.stars === 2 && (
                        <img
                          src={two}
                          style={{ height: `30px` }}
                          className="me-3"
                          alt="five"
                        />
                      )}
                      {x.stars === 1 && (
                        <img
                          src={one}
                          style={{ height: `30px` }}
                          className="me-3"
                          alt="five"
                        />
                      )}
                    </Card.Text>
                    <Card.Title style={{ textAlign: `center` }}>
                      <p style={{ fontSize: 25 }}>{x.name}</p>
                    </Card.Title>

                    <Card.Text style={{ textAlign: `center` }}>
                      {x.country}, {x.city}
                    </Card.Text>
                    <Card.Text style={{ textAlign: `center` }}>
                      <Button
                        variant="outline-primary"
                        as={Link}
                        to={`hotel/${x.id}`}
                      >
                        Посмотреть номера
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>

        <Row style={{ justifyContent: "center" }}>
          {visibleCount < allHotels.length && (
            <Button
              variant="outline-primary"
              onClick={handleShowMore}
              style={{ width: "10%" }}
            >
              Показать еще
            </Button>
          )}
        </Row>

        {!hotelsToShow ||
          hotelsToShow.length < 0 ||
          ((!allHotels || allHotels.length < 0) && <h3>Отели не найдены</h3>)}
      </div>
    </>
  );
};

export default Component;
