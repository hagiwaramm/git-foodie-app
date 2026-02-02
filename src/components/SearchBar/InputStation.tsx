import { Dispatch, SetStateAction } from "react";
import "./inputStation.scss";

interface inputStationProps {
  setSearchStation: Dispatch<SetStateAction<string>>;
}

export default function InputStation({ setSearchStation }: inputStationProps) {
  return (
    <div className="input-station">
      <input
        type="text"
        placeholder="Station, City, Distinct"
        onChange={(e) => {
          setSearchStation(e.target.value);
        }}
      />
    </div>
  );
}
