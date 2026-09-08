import axios from "axios";

/** 获取城市位置 */
async function getCityLocation(city: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&language=zh&count=1`;
  const res = await axios(url);

  if (res.data.results) {
    return res.data.results[0];
  } else {
    throw "未找到地理位置";
  }
}

/** 获取天气 */
export const getWeather = async (city: string, date: string) => {
  const { latitude, longitude } = await getCityLocation(city);

  try {
    const resp = await axios(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto`,
    );

    return resp.data;
  } catch (error) {
    console.log("----------- error ---------\n", error);
  }
};
