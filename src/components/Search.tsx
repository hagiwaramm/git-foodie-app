import "./search.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRestaurantData } from "../lib/getRestaurantData";
import { HotPepperResponseAll, HotPepperResponseShop } from "../types/types";
import { navigateToSearch } from "../lib/searchNavigation";
import SearchBar from "./SearchBar/SearchBar";
import RestaurantCard from "./RestaurantCard";

export default function Search() {
  const navigate = useNavigate();

  const [results, setResults] = useState<HotPepperResponseAll | null>(null);
  const [shopResults, setShopResults] = useState<HotPepperResponseShop[]>([]);
  const [restaurantStartNumber, setRestaurantStartNumber] = useState(1);
  const [canBack, setCanBack] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const { search } = useLocation();

  useEffect(() => {
    setRestaurantStartNumber(1);
  }, [search]);

  useEffect(() => {
    // const query = params.toString();
    setRestaurantStartNumber(1);
    (async () => {
      try {
        const params = new URLSearchParams(search);
        params.set("start", String(restaurantStartNumber));

        const data = await getRestaurantData(params.toString());
        setResults(data);
        setShopResults(data.results.shop ?? []);
      } catch (error) {
        throw error;
      }
    })();
  }, [search, restaurantStartNumber]);

  if (!results) {
    return <p>Searching...</p>;
  }

  const restaurantNumber = results.results.results_available;

  let pageNumberStr = restaurantStartNumber.toString();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // ふわっと戻したいなら
    });
  }

  function onClickPageBack() {
    if (restaurantStartNumber - 100 <= 0) {
      setCanBack(false);
    }
    setCanBack(true);
    setRestaurantStartNumber((prev) => prev - 100);
    scrollToTop();
  }

  function onClickPageNext() {
    if (restaurantStartNumber + 100 > restaurantNumber) {
      setCanNext(false);
    }
    setCanBack(true);
    setRestaurantStartNumber((prev) => prev + 100);
    scrollToTop();
  }
  return (
    <>
      <div className="search-content">
        <SearchBar
          handleSearch={(params) =>
            navigateToSearch(navigate, {
              ...params,
              start: pageNumberStr, // 再検索時は先頭に戻す
            })
          }
        />
        <p>We found {restaurantNumber} restaurants!</p>
        <div className="search-content_list-wrapper">
          <ul className="search-content_list">
            {shopResults.map((shopResult) => (
              <li
                key={shopResult.id}
                className="search-content_restaurant-card"
              >
                <RestaurantCard
                  id={shopResult.id}
                  name={shopResult.name}
                  access={shopResult.access}
                  budget={shopResult.budget.name}
                  description={shopResult.catch}
                  genre={shopResult.genre.name}
                  opening={shopResult.open}
                  closing={shopResult.close}
                  address={shopResult.address}
                  lat={shopResult.lat}
                  lng={shopResult.lng}
                  hotpepperUrl={shopResult.urls.pc}
                  wifi={shopResult.wifi}
                  cardPayment={shopResult.card}
                  smoking={shopResult.non_smoking}
                  parking={shopResult.parking}
                  imgUrl={shopResult.photo.pc.l}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="search-pagenation">
          <button
            className="pagenation-button pagenation-button--back"
            onClick={onClickPageBack}
            disabled={!canBack}
          >
            ＜ Back
          </button>
          <button
            className="pagenation-button pagenation-button--next"
            onClick={onClickPageNext}
            disabled={!canNext}
          >
            Next ＞
          </button>
        </div>
      </div>
    </>
  );
}
