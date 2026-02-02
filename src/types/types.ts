export interface HotPepperResponseAll {
  results: {
    api_version: string;
    results_available: number;
    results_returned: number;
    results_start: number;
    shop: HotPepperResponseShop[]; // ←ここが必要
  };
}

export interface HotPepperResponseShop {
  id: string;
  name: string;
  address: string;
  station_name: string;
  large_service_area: {
    //関東,関西...
    code: string;
    name: string;
  };
  middle_area: {
    code: string;
    name: string;
  };
  lat: number;
  lng: number;
  genre: {
    //例）焼肉
    name: string;
  };
  sub_genre: {
    //例）居酒屋
    name: string;
  };
  budget: {
    name: string;
  };
  catch: string; //キャッチコピー
  access: string; //どこから何分
  open: string;
  close: string;
  urls: { pc: string }; //hotpepperのお店url
  photo: {
    pc: { l: string; m: string; s: string };
    mobile: { l: string; s: string };
  };
  card: string;
  non_smoking: string;
  parking: string;
  wifi: string;
  // 必要な分だけ増やす（全部書く必要はない）
}

export interface RestaurantCardInfo {
  id: string;
  name: string;
  access: string;
  budget: string;
  description: string;
  genre: string;
  opening: string;
  closing: string;
  lat: number;
  lng: number;
  hotpepperUrl: string;
  wifi: string;
  cardPayment: string;
  smoking: string;
  parking: string;
  imgUrl: string;
  address: string;
}
