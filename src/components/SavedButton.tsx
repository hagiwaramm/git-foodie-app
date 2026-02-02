import "./savedButton.scss";
import iconSaved from "./../img/saved-selected.svg";
import iconNotSaved from "./../img/save-disable.svg";

interface onClickSavedProps {
  saved: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SavedButton({ saved, onClick }: onClickSavedProps) {
  return (
    <>
      <div className="saved-button_wrapper">
        <button
          className={`saved-button ${saved ? "saved-button--saved" : "saved-button--not-saved"}`}
          onClick={onClick}
        >
          <img src={saved ? iconSaved : iconNotSaved} alt="saved button" />
        </button>
      </div>
    </>
  );
}
