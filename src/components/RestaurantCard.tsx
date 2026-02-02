import "./restaurantCard.scss";
import iconLocation from "./../img/icon-location.svg";
import iconPrice from "./../img/icon-price.svg";

import iconClose from "./../img/button-close.png";
import { MouseEvent, useEffect, useRef, useState } from "react";
import SavedButton from "./SavedButton";
import VisitedButton from "./VisitedButton";
import { RestaurantCardInfo } from "../types/types";
import { judgeIsSaved, toggleSaved } from "../lib/savedRestaurant";
import {
  judgeIsVisited,
  loadingVisited,
  toggleVisited,
} from "../lib/visitedRestaurant";

export default function RestaurantCard({
  id,
  name,
  access,
  budget,
  description,
  genre,
  opening,
  closing,
  lat,
  lng,
  hotpepperUrl,
  wifi,
  cardPayment,
  smoking,
  parking,
  address,
  imgUrl,
}: RestaurantCardInfo) {
  const [showDialog, setShowDialog] = useState(false);
  const [saved, setSaved] = useState(false);
  const [visited, setVisited] = useState(false);

  const restaurantToSave: RestaurantCardInfo = {
    id,
    name,
    access,
    budget,
    description,
    genre,
    opening,
    closing,
    lat,
    lng,
    hotpepperUrl,
    wifi,
    cardPayment,
    smoking,
    parking,
    address,
    imgUrl,
  };

  useEffect(() => {
    setSaved(judgeIsSaved(id));
    setVisited(judgeIsVisited(id));
  }, [id]);

  const targetDialog = useRef<HTMLDialogElement>(null);
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  function openDialog(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setShowDialog(true);
    const dialog = targetDialog.current;
    if (!dialog) return;
    dialog.showModal();
  }

  function closeDialog() {
    setShowDialog(false);
    targetDialog.current?.close();
  }

  function onClickSaved(e: MouseEvent<HTMLButtonElement>) {
    console.log("saved button is clicked");
    e.stopPropagation();
    if (!saved) {
      toggleSaved(restaurantToSave);
      setSaved(true);
      console.log("now is saved");
    } else {
      toggleSaved(restaurantToSave);
      setSaved(false);
    }
  }

  function onClickVisited(e: MouseEvent<HTMLButtonElement>) {
    console.log("visited button is clicked");
    e.stopPropagation();
    if (!visited) {
      toggleVisited(restaurantToSave);
      setVisited(true);
      console.log("now is visited");
    } else {
      toggleVisited(restaurantToSave);
      setVisited(false);
    }
    console.log(loadingVisited());
  }

  return (
    <div className="restaurant-card">
      <div className="dialog-btn--open" onClick={openDialog}>
        <div className="restaurant-card_img-wrapper">
          <img src={imgUrl} alt="restaurant image" />
          <VisitedButton onClick={onClickVisited} visited={visited} />
        </div>
        <div className="restaurant-card_content">
          <span className="restaurant-card_title">{name}</span>
          <div className="restaurant-card_info">
            <div className="restaurant-card_info-item">
              <img
                className="restaurant-card_icon restaurant-card_icon--access"
                src={iconLocation}
                alt="Restaurant's access information"
              />
              <span className="restaurant-card_text restaurant-card_text--access">
                {access}
              </span>
            </div>
            <div className="restaurant-card_info-item">
              <img
                className="restaurant-card_icon restaurant-card_icon--price"
                src={iconPrice}
                alt="Restaurant's price information"
              />
              <span className="restaurant-card_text restaurant-card_text--price">
                {budget}
              </span>
            </div>
          </div>
          <p className="restaurant-card_description">{description}</p>
          <div className="restaurant-card_footer">
            <span className="restaurant-card_genre">{genre}</span>
            <SavedButton onClick={onClickSaved} saved={saved} />
          </div>
        </div>
      </div>
      <dialog className={showDialog ? "dialog" : ""} ref={targetDialog}>
        <div className="dialog-buttons dialog-buttons--top">
          <div className="dialog-content_btn-wrapper">
            <button className="restaurant-card_btn restaurant-card_btn--not-visited">
              <span>Visited</span>
              <VisitedButton onClick={onClickVisited} visited={visited} />
            </button>
            <SavedButton onClick={onClickSaved} saved={saved} />
          </div>
        </div>

        <div className="dialog-wrapper">
          <div className="dialog-img">
            <img src={imgUrl} alt="restaurant image" />
          </div>
          <div className="dialog-content_wrapper">
            <div className="dialog-content">
              <div className="content--top">
                <span className="content_restaurant-name">{name}</span>
                <div className="content_info">
                  <span className="content_genre">{genre}</span>
                  <span className="content_budget">Price: {budget}</span>
                </div>
                <div className="content_description">{description}</div>
              </div>
              <hr />
              <div className="dialog-info dialog-info--basic">
                <span className="dialog-info_title">Basic information</span>
                <table>
                  <tr>
                    <th>Opening hour</th>
                    <td>{opening}</td>
                  </tr>
                  <tr>
                    <th>Closed</th>
                    <td>{closing}</td>
                  </tr>
                  <tr>
                    <th>Access</th>
                    <td>{access}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{address}</td>
                  </tr>
                  <tr>
                    <th></th>
                    <td>
                      <div className="google-map_wrapper">
                        <iframe
                          title="map"
                          width="350"
                          height="100"
                          src={src}
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Appoiment URL</th>
                    <td>
                      <a
                        href={hotpepperUrl}
                        target="_blank"
                        style={{ color: "$main" }}
                      >
                        {hotpepperUrl}
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="dialog-info dialog-info--facility">
                <span className="dialog-info_title">Facility information</span>
                <table>
                  <tr>
                    <th>Wifi</th>
                    <td>{wifi}</td>
                  </tr>

                  <tr>
                    <th>Credit card</th>
                    <td>{cardPayment}</td>
                  </tr>
                  <tr>
                    <th>Non-smoking area</th>
                    <td>{smoking}</td>
                  </tr>
                  <tr>
                    <th>Parking</th>
                    <td>{parking}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-buttons dialog-buttons--bottom">
          <button className="dialog-btn--close" onClick={closeDialog}>
            <img src={iconClose} alt="close dialog" />
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
