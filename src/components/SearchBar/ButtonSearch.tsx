import "./buttonSearch.scss";

interface ButtonSearchProps {
  onFire: () => void;
}

export default function ButtonSearch({ onFire }: ButtonSearchProps) {
  return (
    <button className="buttonSearch" onClick={() => onFire()}>
      Search
    </button>
  );
}
