import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";

import { hotelTypes } from "../../consts/consts";
import { countries } from "../../consts/consts";
import { starRatings } from "../../consts/consts";
import Row from "react-bootstrap/esm/Row";

export const FilterHotel = (props) => {
  const {
    setSelectedHotelTypes,
    selectedStarRatings,
    setSelectedStarRatings,
    setSelectedCountry,
  } = props;
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

  // Для выбора страны
  const handleCountryChange = (event) => {
    setSelectedCountry(
      event.target.value === "Страна" ? "" : event.target.value
    );
  };

  return (
    <div>
      <Row>
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
    </div>
  );
};
