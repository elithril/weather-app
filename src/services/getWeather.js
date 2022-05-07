export const getWeather = async (currentCity) => {
  const formatedTimezone = currentCity.timezone.replace('/', '%2F')
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${currentCity.pos[0]}&longitude=${currentCity.pos[1]}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=${formatedTimezone}`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: "Unable to retrieve places" };
  }
};
