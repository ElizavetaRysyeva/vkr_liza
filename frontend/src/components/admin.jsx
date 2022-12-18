import { useState } from "react";
import Nav from "react-bootstrap/Nav";

import Orders from "./admin/orders";
import Hotels from "./admin/hotels";
import Rooms from "./admin/rooms"

const Component = () => {
  const [selectedTab, setSelectedTab] = useState("Hotels");

  const handleChange = (eventKey) => {
    setSelectedTab(eventKey);
  };

  return (
    <>
      <h2>Интерфейс администратора</h2>
      <Nav variant="tabs" defaultActiveKey="/home" onSelect={handleChange}>
        <Nav.Item>
          <Nav.Link eventKey="Hotels" active={selectedTab === "Hotels"}>
            Отели
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Rooms" active={selectedTab === "Rooms"}>
            Номера
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Orders" active={selectedTab === "Orders"}>
            Заказы
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedTab === "Hotels" && <Hotels />}
      {selectedTab === "Rooms" && <Rooms />}
      {selectedTab === "Orders" && <Orders />}
    </>
  );
};

export default Component;
