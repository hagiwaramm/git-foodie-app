import "./home.scss";
import SearchBar from "./SearchBar/SearchBar";
import iconNext from "./../img/icon-next.svg";
import { useEffect, useState } from "react";
import { getRestaurantData } from "../lib/getRestaurantData";
import { useNavigate } from "react-router-dom";
import { navigateToSearch } from "../lib/searchNavigation";
import RestaurantCard from "./RestaurantCard";
import { RestaurantCardInfo } from "../types/types";
import topImg1 from "../img/top-1.png";
import topImg2 from "../img/top-2.png";
import topImg3 from "../img/top-3.png";
import { loadingSaved } from "../lib/savedRestaurant";

interface SearchParams {
  area: string;
  station: string;
  keyword: string; // "foo bar"
  start: string; //取得件数の頭
  count: string; //取得件総数
}

export default function Home() {
  const [savedData, setSavedData] = useState<RestaurantCardInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setSavedData(loadingSaved());
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <>
      <div className="home_top">
        <div className="home_img">
          <img className="home_img-item" src={topImg1} alt="top image" />
          <img className="home_img-item" src={topImg2} alt="top image" />
          <img className="home_img-item" src={topImg3} alt="top image" />
        </div>
        <div className="search-bar_wrapper search-bar_wrapper--home">
          <SearchBar
            handleSearch={(params) => navigateToSearch(navigate, params)}
          />
        </div>
      </div>
      <div className="home-content_wrapper">
        <div className="home-content_header">
          <p className="home-content_title">Recommended restaurants</p>
          <div className="link-saved">
            <a className="link-saved_text" href="/saved">
              See all your saved restaurant
            </a>
            <img src={iconNext} alt="See all your saved restaurants" />
          </div>
        </div>
        <div className="home-content_list-wrapper">
          <ul className="content_list">
            {savedData.map((shopResult) => (
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
      </div>
    </>
  );
}
