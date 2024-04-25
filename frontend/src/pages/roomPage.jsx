import { RoomList } from "../components/rooms/RoomList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  setRooms,
  setOrderStatuses,
  addOrder,
} from "../components/reducerSlice";
import authHeader from "../services/auth-header";

export const RoomPage = () => {
  let { id } = useParams();

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const rooms = useSelector((state) => state.toolkit.rooms);

  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${apiBase}/rooms/?hotel_id=${encodeURIComponent(id)}`, {
        headers: authHeader(),
      })
      .then((resp) => {
        dispatch(setRooms(resp.data));
      });

    axios
      .get(`${apiBase}/orders/info/statuses`, { headers: authHeader() })
      .then((resp) => {
        dispatch(setOrderStatuses(resp.data));
      });
  }, [apiBase, dispatch, id]);

  const addCart = (s) => {
    const status = orderStatuses.find((x) => x.name === "В корзине").val;
    axios
      .post(
        `${apiBase}/orders`,
        {
          status: +status,
          hotel_id: +id,
          room_id: +s,
        },
        { headers: authHeader() }
      )
      .then((resp) => {
        dispatch(addOrder(resp.data));
      });
  };

  return (
    <div>
      <RoomList rooms={rooms} addCart={addCart} />
    </div>
  );
};
