export async function getRestaurantData(param: string) {
  // search: string
  const APIKEY = process.env.REACT_APP_API_KEY;

  // 修正：ドメインの後に正しいパスを追加し、https:// を付ける
  const url = `/hotpepper/gourmet/v1/?key=${APIKEY}&format=json&${param}`;
  
  try {
    const response = await fetch(url);
    console.log("status", response.status);
    console.log("content-type", response.headers.get("content-type"));
    const text = await response.text();
    console.log("body head", text.slice(0, 200));

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    console.log('レスポンスデータ' , response);
    // return await response.json();
    return await JSON.parse(text);
  } catch (error) {
    console.error("Fetch失敗:", error);
    throw error;
  }
}
