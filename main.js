// 03-19-2024
// Make a function that shows a list
// The list will have name, dates, times, locations, and descriptions
// The list will be from a URL
// Make a form in the HTML
// Make a function that get data from the form
// Make a function that display the data from the last function
// Make a button in HTML
// Make a function connected with the button
// The function will delete lists.

const COHORT = "2402-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  party: [],
};

const partyList = document.querySelector(`#party`);
const addPartyList = document.querySelector(`#addParty`);

async function render() {
  await getParty();
  renderParty();
}
render();

async function getParty() {
  try {
    const response = await fetch(API_URL);
    console.log(response);

    const json = await response.json();
    console.log(json);
    console.log(json.data);

    console.log(state.party);
    state.party = json.data;
    console.log(state.party);

  } catch(error){
    console.log("Error");
  }
}

function renderParty() {
  state.party.forEach((fiesta) => {
    const li = document.createElement(`li`);
    li.innerHTML = `${fiesta.name}: ${fiesta.description}`
    console.log(li);
    partyList.appendChild(li);
  })
}

// Add this function to your script
function addNewParty() {
  const nameInput = document.querySelector("#partyName").value;
  const descriptionInput = document.querySelector("#partyDescription").value;

  if (nameInput && descriptionInput) {
      // Create a new party object
      const newParty = {
          name: nameInput,
          description: descriptionInput,
      };

      // Add the new party to the state
      state.party.push(newParty);

      // Clear input fields
      document.querySelector("#partyName").value = "";
      document.querySelector("#partyDescription").value = "";

      // Update the UI
      renderParty();
  } else {
      console.log("Please enter both party name and description.");
  }
}

// Call addNewParty() when the form is submitted
document.querySelector("#addPartyForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  addNewParty();
});
