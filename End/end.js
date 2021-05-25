const username = document.querySelector("#username");
const saveBtn = document.querySelector("#save");
const finaScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finaScore.innerText = mostRecentScore;


//script for saving the high score
username.addEventListener("keyup", () => {
    console.log(username.value);
    //this reverses the already disabled state if the statement is true
    saveBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clickeed me");
    e.preventDefault();
    
};