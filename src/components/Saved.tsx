import "./saved.scss";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { loadingSaved } from "../lib/savedRestaurant";
import { RestaurantCardInfo } from "../types/types";

export default function Saved() {
  const [visitedData, setVisitedData] = useState<RestaurantCardInfo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setVisitedData(loadingSaved());
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <>
      <div className="saved_header">
        <span className="saved_header-title">Saved List</span>
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
