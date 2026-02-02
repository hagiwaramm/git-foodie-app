import { Dispatch, SetStateAction, useState } from "react";
import "./pulldownArea.scss";

interface PullDownAreaProps {
  setSearchArea: Dispatch<SetStateAction<string>>;
}

export default function PullDownArea({ setSearchArea }: PullDownAreaProps) {
  const [areaSelected, setAreaSelected] = useState(false);

  return (
    <>
      <div className="pulldown-area">
        <select
          name="area"
          id="area"
          className={areaSelected === false ? "notSelected" : "isSelected"}
          onChange={(e) => {
            setAreaSelected(true);
            setSearchArea(e.target.value);
          }}
        >
          <option value="" disabled selected>
            Area
          </option>
          <option value="SS40">北海道</option>
          <option value="SS50">東北</option>
          <option value="SS10">関東</option>
          <option value="SS60">北陸・甲信越</option>
          <option value="SS20">関西</option>
          <option value="SS30">東海</option>
          <option value="SS70">中国</option>
          <option value="SS90">九州・沖縄</option>
        </select>
      </div>
    </>
  );
}
