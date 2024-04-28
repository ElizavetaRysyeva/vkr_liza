import { useDispatch, useSelector } from "react-redux";

import { useCallback, useEffect, useState } from "react";
import { FilterHotel } from "../components/hotels/FilterHotel";
import { HotelList } from "../components/hotels/HotelList";
import { setHotels } from "../components/reducerSlice";
import axios from "axios";
import { Row } from "react-bootstrap";
import { FindHotel } from "../components/hotels/FindHotel";

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
  const [selectedMaxCount, setSelectedMaxCount] = useState([]);

  const hotelsToShow = allHotels.slice(0, visibleCount);

  const fetchData = useCallback(async () => {
    try {
      let params = {};
      let roomParams = {};
      if (sendQuery) {
        const russianPattern = /[а-яА-Я]/;
        const englishPattern = /[a-zA-Z]/;

        const isRussianInput = russianPattern.test(sendQuery);
        const isEnglishInput = englishPattern.test(sendQuery);

        if (isRussianInput && isEnglishInput) {
          const russianPart = sendQuery.match(russianPattern).join("");
          const englishPart = sendQuery.match(englishPattern).join("");

          params.name = englishPart;

          roomParams.category_rus = russianPart;
        } else if (isRussianInput) {
          roomParams.category_rus = sendQuery;
        } else {
          params.name = sendQuery;
        }
      }

      if (selectedCountry && selectedCountry.length > 0) {
        params.country_rus = selectedCountry;
      }

      if (selectedStarRatings && selectedStarRatings.length > 0) {
        params.stars = selectedStarRatings.join(",");
      }

      if (selectedHotelTypes && selectedHotelTypes.length > 0) {
        params.propertyType = selectedHotelTypes.join(",");
      }

      if (selectedMaxCount && selectedMaxCount.length > 0) {
        roomParams.max_count = selectedMaxCount.join(",");
      }

      if (Object.keys(roomParams).length > 0) {
        const responseHotelIds = await axios.get(`${apiBase}/rooms`, {
          params: roomParams,
        });
        console.log("я зашел");
        const ids = responseHotelIds.data.join(", ");

        params.id = ids;
      }

      const response = await axios.get(`${apiBase}/hotels`, {
        params: params,
      });

      // Отправляем отфильтрованные отели в хранилище
      dispatch(setHotels(response.data));
    } catch (error) {
      console.error("Error fetching filtered hotels:", error);
    }
  }, [
    sendQuery,
    selectedCountry,
    selectedStarRatings,
    selectedHotelTypes,
    selectedMaxCount,
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

  return (
    <div className="mb-5">
      {/* Поиск отеля */}

      <Row xs={1} md={1} style={{ paddingBottom: 30 }}>
        <FindHotel
          query={query}
          setQuery={setQuery}
          setSendQuery={setSendQuery}
          fetchData={fetchData}
        />
      </Row>

      {/* Фильтры отелей  */}
      <Row style={{ paddingBottom: 30 }}>
        <FilterHotel
          setSelectedCountry={setSelectedCountry}
          setSelectedHotelTypes={setSelectedHotelTypes}
          setSelectedStarRatings={setSelectedStarRatings}
          selectedStarRatings={selectedStarRatings}
          selectedMaxCount={selectedMaxCount}
          setSelectedMaxCount={setSelectedMaxCount}
        />
      </Row>

      {/* Список отелей */}
      <HotelList
        allHotels={allHotels}
        hotelsToShow={hotelsToShow}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
      />
    </div>
  );
};

export default Component;
