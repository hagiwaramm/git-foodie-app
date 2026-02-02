import "./searchBar.scss";
import ButtonSearch from "./ButtonSearch";
import InputKeywords from "./InputKeywords";
import InputStation from "./InputStation";
import PullDownArea from "./PullDownArea";
import { useState } from "react";

interface SearchBarProps {
  handleSearch: (params: SearchParams) => void;
}

type SearchParams = {
  area: string;
  station: string;
  keyword: string; // "foo bar baz"
  start: string; //取得件数の頭
  count: string; //取得件総数
};

export default function SearchBar({ handleSearch }: SearchBarProps) {
  const [searchArea, setSearchArea] = useState("");
  const [searchStation, setSearchStation] = useState("");
  const [searchKeywords, setSearchKeywords] = useState("");

  const handleSearchButton = () => {
    console.log(searchKeywords);
    handleSearch({
      area: searchArea,
      station: searchStation,
      keyword: searchKeywords.trim().replace(/\s+/g, " "),
      start: "1",
      count: "100",
    });
  };

  return (
    <div className="search-bar">
      <PullDownArea setSearchArea={setSearchArea} />
      <InputStation setSearchStation={setSearchStation} />
      <InputKeywords setSearchKeywords={setSearchKeywords} />
      <ButtonSearch onFire={handleSearchButton} />
    </div>
  );
}
