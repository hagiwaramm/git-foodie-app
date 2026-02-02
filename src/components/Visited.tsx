import "./visited.scss";
import { useEffect, useState } from "react";
import { RestaurantCardInfo } from "../types/types";
import { useNavigate } from "react-router-dom";
import { loadingVisited } from "../lib/visitedRestaurant";
import RestaurantCard from "./RestaurantCard";

export default function Visited() {
  const [visitedData, setVisitedData] = useState<RestaurantCardInfo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setVisitedData(loadingVisited());
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <>
      <div className="visited_header">
        <span className="visited_header-title">Visited List</span>
      </div>
      <div className="content_list-wrapper">
        <ul className="content_list">
          {visitedData.map((shopResult) => (
            <li key={shopResult.id} className="content_restaurant-card">
              <RestaurantCard
                id={shopResult.id}
                name={shopResult.name}
                access={shopResult.access}
                budget={shopResult.budget}
                description={shopResult.description}
                genre={shopResult.genre}
                opening={shopResult.opening}
                closing={shopResult.closing}
                address={shopResult.address}
                lat={shopResult.lat}
                lng={shopResult.lng}
                hotpepperUrl={shopResult.hotpepperUrl}
                wifi={shopResult.wifi}
                cardPayment={shopResult.cardPayment}
                smoking={shopResult.smoking}
                parking={shopResult.parking}
                imgUrl={shopResult.imgUrl}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
