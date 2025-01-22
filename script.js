let respData;
let projectsDiv = document.getElementById("projectsDiv");
let square_rotate = document.getElementById("square_rotate");
let scrollWeight = 25;

const getData = async () => {
    const response = await fetch("https://api.github.com/users/mirceaculita/repos");
    const data = await response.json();
    respData = data;
    return data;
};

(async () => {
    await getData();
    for(let i = 0; i<respData.length;i++){

        var cardDiv = document.createElement("card");
        cardDiv.className = "card";
        var detailsDiv = document.createElement("div");
        detailsDiv.className = "card-details";
        var cardTitle = document.createElement("p");
        cardTitle.className = "text-title";
        var cardDetails = document.createElement("p");
        cardDetails.className = "text-body";
        var cardButton = document.createElement("button");
        cardButton.className = "card-button";
        console.log(respData[i]);   
        cardButton.onclick = () => window.open(respData[i].html_url, '_blank');

        var cardTitleContent = document.createTextNode(respData[i].name);
        var cardDetailsContent = document.createTextNode(respData[i].description);
        var cardButtonContent = document.createTextNode("More Info");

        cardTitle.appendChild(cardTitleContent);
        cardDetails.appendChild(cardDetailsContent);
        cardButton.appendChild(cardButtonContent);

        detailsDiv.appendChild(cardTitle);
        detailsDiv.appendChild(cardDetails);

        cardDiv.appendChild(detailsDiv);
        cardDiv.appendChild(cardButton);

        projectsDiv.appendChild(cardDiv);
        //console.log(respData[i].name);
    }
})();

document.getElementById("emailButton").onclick = () => window.open("https://mail.google.com/mail/u/0/?fs=1&to=culita88@gmail.com&tf=cm", '_blank');
document.getElementById("linkedInButton").onclick = () => window.open("https://www.linkedin.com/in/mircea-florin-culita-4a000527b/", '_blank');
document.getElementById("cvButton").onclick = () => window.open("https://drive.google.com/file/d/1pRmBsmMSwvpMsUuaHhMXcjm8xTBAYdZu/view", '_blank');



var maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
window.onscroll = function(){
        
    
    rotateValue = window.scrollY/(maxScrollY/360);
    sizeValue = window.scrollY/(maxScrollY/80);
    if(sizeValue<=80){
        
    square_rotate.style.setProperty("--width", sizeValue);
    square_rotate.style.transform = "rotate("+rotateValue+"deg)";
    }
    else{
        
    square_rotate.style.setProperty("--width", 80);
    square_rotate.style.transform = "rotate("+360+"deg)";
    }
}

square_rotate.onclick  = () => {
        window.scrollTo({
        top: 0,
      });
}

const move = document.getElementById("move");

document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    move.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    
    }, {duration: 1000, fill: "forwards"})

}

