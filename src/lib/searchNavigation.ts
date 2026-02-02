import { NavigateFunction } from "react-router-dom";

export type SearchParams = {
  area?: string;
  station?: string;
  keyword?: string;
  start?: string;
  count?: string;
};

export function navigateToSearch(
  navigate: NavigateFunction,
  params: SearchParams,
) {
  const query = new URLSearchParams();

  if (params.area) query.set("large_service_area", params.area);
  if (params.keyword)
    query.set("keyword", params.keyword + "," + params.station);
  if (params.start) query.set("start", params.start);
  if (params.count) query.set("count", params.count);

  navigate(`/search?${query.toString()}`);
}
