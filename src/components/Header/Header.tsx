import "./header.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <a className="app-icon__btn" href="/">
          Where to eat next ...?
        </a>
        <div className="list-icon__wrapper">
          <a className="list-icon__btn list-icon__btn--visited" href="/visited">
            Visited list
          </a>
          <a className="list-icon__btn list-icon__btn--saved" href="/saved">
            Saved list
          </a>
        </div>
      </div>
    </div>
  );
}
