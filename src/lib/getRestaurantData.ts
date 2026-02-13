export async function getRestaurantData(param: string) {
  // search: string
  const APIKEY = process.env.REACT_APP_API_KEY;

  // 修正：ドメインの後に正しいパスを追加し、https:// を付ける
  const url = `/hotpepper/gourmet/v1/?key=${APIKEY}&format=json&${param}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch失敗:", error);
    throw error;
  }
}
