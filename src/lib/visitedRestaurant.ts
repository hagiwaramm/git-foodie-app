import { RestaurantCardInfo } from "../types/types";

const KEY = "Visited_restaurants_v1";

//保存済の配列を読み取る
export function loadingVisited(): RestaurantCardInfo[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

//cardをlocalstorageに保存する{
export function visitedNew(restaurantCard: RestaurantCardInfo[]) {
  localStorage.setItem(KEY, JSON.stringify(restaurantCard));
}

//Visitedにあるかないかを判定する
export function judgeIsVisited(id: string): boolean {
  return loadingVisited().some((each) => each.id === id);
}

//保存or削除をやる
export function toggleVisited(restaurantCard: RestaurantCardInfo) {
  const list = loadingVisited();
  const exists = list.some((each) => each.id === restaurantCard.id);
  if (!exists) {
    //もしもなかったら
    visitedNew([...list, restaurantCard]);
  } else {
    visitedNew(list.filter((any) => any.id !== restaurantCard.id));
  }

  return !exists;
}
