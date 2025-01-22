let respData;
const getData = async () => {
    const response = await fetch("https://api.github.com/users/mirceaculita/repos");
    const data = await response.json();
    respData = data;
    return data;
};

(async () => {
    await getData();
    for(let i = 0; i<respData.length;i++){
        console.log(respData[i].name);
    }
})();

var personalInfoDiv = document.getElementById("personalInfo");
var personalKnowledgeDiv = document.getElementById("personalKnowledge");
var frame = document.getElementById('frame');

personalInfoDiv.style.display = 'none';
personalKnowledgeDiv.style.display = 'none';

function slideToOne(){
    personalInfoDiv.style.display = 'flex';
    personalKnowledgeDiv.style.display = 'none';
    frame.classList.remove("transf_right");
    frame.classList.add("transf_left");
    console.log("move right to personal info");
}
function slideToTwo(){
    personalInfoDiv.style.display = 'none';
    personalKnowledgeDiv.style.display = 'flex';
    frame.classList.remove("transf_right");
    frame.classList.add("transf_left");
    console.log("move right to knowledge");
}
function slideToZero(){
    frame.classList.add("transf_right");
    frame.classList.remove("transf_left");
    console.log("move left");
}
