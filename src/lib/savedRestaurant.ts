import { RestaurantCardInfo } from "../types/types";

const KEY = "saved_restaurants_v1";

//保存済の配列を読み取る
export function loadingSaved(): RestaurantCardInfo[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

//cardをlocalstorageに保存する{
export function saveNew(restaurantCard: RestaurantCardInfo[]) {
  localStorage.setItem(KEY, JSON.stringify(restaurantCard));
}

//savedにあるかないかを判定する
export function judgeIsSaved(id: string): boolean {
  return loadingSaved().some((each) => each.id === id);
}

//保存or削除をやる
export function toggleSaved(restaurantCard: RestaurantCardInfo) {
  const list = loadingSaved();
  const exists = list.some((each) => each.id === restaurantCard.id);
  if (!exists) {
    //もしもなかったら
    saveNew([...list, restaurantCard]);
  } else {
    saveNew(list.filter((any) => any.id !== restaurantCard.id));
  }

  return !exists;
}
