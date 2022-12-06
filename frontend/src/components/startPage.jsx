import FindHotel from "./findHotel";
import HotelList from "./hotelList";
const Component = () => {
    return (
        <div className="mb-5">
            <FindHotel />
            <hr className="my-5" />
            <HotelList />
        </div>
    );
};

export default Component;
