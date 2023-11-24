// TODO: Create a function to get the coordinates from
// an address and display a map with a marker on it
const showMap = (userInput) => {
  // TODO: Construct the URL (with apiKey & userInput) and make the fetch request to the mapbox API
  const apiKey = "pk.eyJ1IjoiZWFkb3JhYmxlIiwiYSI6ImNsbGtyZzV4ZjI5MHMza3FodGwwODE1eHUifQ.B-be1MEPtRrGfQHnM340Jg";
  const encodedUserInput = encodeURIComponent(userInput);
  const baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const url = `${baseURL}${encodedUserInput}.json?access_token=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data.features[0]);
      // TODO: Insert the info into the DOM
      // - Extract the coordinates from the parsed JSON response (lang, lat)
      const longitude = data.features[0].geometry.coordinates[0];
      const latitude = data.features[0].geometry.coordinates[1];
      const coordinates = `${longitude},${latitude}`;

      // - Display the coordinates in the element where the coordinates will be displayed
      const displayCoordinates = document.querySelector(".font-monospace");
      displayCoordinates.innerHTML = `Coordinates: ${coordinates}`;

      // - Create a map using the Mapbox API and the coordinates
      // eslint-disable-next-line no-undef
      mapboxgl.accessToken = apiKey;
      // eslint-disable-next-line no-undef
      const map = new mapboxgl.Map({
        container: "map", // HTML element ID where the map will be displayed
        style: "mapbox://styles/mapbox/navigation-day-v1",
        center: [longitude, latitude], // Center the map at the coordinates
        zoom: 10 // Set the initial zoom level
      });

      // - Add a marker to the map at the coordinates
      // eslint-disable-next-line no-undef
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
};

// TODO: Select the form element
const selectForm = document.querySelector(".d-flex");

// TODO: Add event listener to the form that:
// - Prevents the default form submission behavior
selectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectUserInput = document.querySelector(".d-flex > .form-control");
  // - Get the user input
  const userInput = selectUserInput.value;
  // - Calls the showMap function with the user input as an argument
  showMap(userInput);
  // - Clears the form input field
  selectUserInput.value = "";
});
