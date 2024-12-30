const pollForm = document.getElementById("pollForm");
const pollResults = document.getElementById("pollResults");
const pollQuestion = document.getElementById("pollQuestion");
const pollOptions = document.getElementById("pollOptions");

// Load the poll data from localStorage if it exists
let poll = JSON.parse(localStorage.getItem('poll')) || null;

if (poll) {
  showPollResults(poll);
}

pollForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;

  // Create a new poll and store it in localStorage
  poll = {
    question,
    options: [
      { text: option1, votes: 0 },
      { text: option2, votes: 0 },
    ],
  };
  localStorage.setItem('poll', JSON.stringify(poll));

  showPollResults(poll);
});

async function showPollResults(poll) {
  pollResults.style.display = "block";
  pollQuestion.textContent = poll.question;
  pollOptions.innerHTML = "";

  poll.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.textContent = `${option.text}: ${option.votes} votes`;
    optionDiv.style.cursor = "pointer";

    // Add an event listener to handle voting
    optionDiv.addEventListener("click", () => {
      poll.options[index].votes++;
      localStorage.setItem('poll', JSON.stringify(poll));  // Save updated poll to localStorage
      showPollResults(poll);
    });

    pollOptions.appendChild(optionDiv);
  });
}
