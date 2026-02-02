import "./visitedButton.scss";
import iconNotVisited from "./../img/visited-disable.svg";
import iconVisited from "./../img/visited-selected.svg";

interface onClickVisitedProps {
  visited: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function VisitedButton({
  visited,
  onClick,
}: onClickVisitedProps) {
  return (
    <>
      <div className="visited-button_wrapper">
        <button
          className={`visited-button ${visited ? "visited-button--visited" : "visited-button--not-visited"}`}
          onClick={onClick}
        >
          <img
            src={visited ? iconVisited : iconNotVisited}
            alt="saved button"
          />
        </button>
      </div>
    </>
  );
}
