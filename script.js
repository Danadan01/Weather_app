const input = document.querySelector("#cityName");
const searchButtn = document.querySelector("#searchButtn");
const errorDiv = document.querySelector(".error");

const apiKey = "07e3a19d42c6ebc51210f9535c369963";


const fetchWeather = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) {
      errorDiv.style.display = "block";
      throw new Error("Invalid city");
    } else {
      const data = await res.json();
      const { main, wind, name, weather } = data;
      const [descriptionObj] = weather;

      document.querySelector(
        ".weatherIcon"
      ).src = `https://openweathermap.org/img/wn/${descriptionObj.icon}@4x.png`;
      document.querySelector(".temp").innerHTML = `${Math.floor(main.temp)}°C`;
      document.querySelector(".city").innerHTML = name;
      document.querySelector(".humidity").innerHTML = `${main.humidity}%`;
      document.querySelector(".wind").innerHTML = `${wind.speed}m/s`;
      errorDiv.style.display = "none";
    }
  } catch (error) {
    errorDiv.innerHTML = error.toString().replace("Error:", ''); 
  }
}
;(fetchWeather("Stockholm"));

searchButtn.addEventListener("click", () => {
  const city = input.value;
  fetchWeather(city);
});
