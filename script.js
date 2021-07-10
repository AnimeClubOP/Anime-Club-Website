const sfwBtn = document.getElementById('sfw');
const nsfwBtn = document.getElementById('nsfw');
const select = document.getElementById('select');
select.addEventListener('click',getSelectedCategoryPics)
const showPics = document.getElementById('showPics')
const superDiv = document.getElementById('superDiv')
superDiv.addEventListener('click',menuShow)

sfwBtn.addEventListener('click',()=>{
    sfwBtn.style.background = "rgba(13,110,139,0.4)";
    nsfwBtn.style.borderColor = "rgba(13,110,139,0.7)";
    sfwBtn.style.borderColor = "blueviolet"
    sfwBtn.style.transition = "border-color 0.3s ease"
    nsfwBtn.style.background = "black"
    document.querySelector('.sfw').style.display = "block"
    document.querySelector(".nsfw").style.display = "none"; 
})

nsfwBtn.addEventListener('click',()=>{
    sfwBtn.style.background = "black"
    sfwBtn.style.borderColor = "rgba(13,110,139,0.7)";
    nsfwBtn.style.background = "rgba(13,110,139,0.4)";
    nsfwBtn.style.borderColor = "blueviolet";
    nsfwBtn.style.transition = "border-color 0.3s ease";

    document.querySelector(".sfw").style.display = "none";
    document.querySelector(".nsfw").style.display = "block"; 
})

const APIURL = 'https://api.waifu.pics/many/'
// Api Calls

function getSelectedCategoryPics(e){
    showPics.innerHTML = "";
    e.preventDefault();
    if(e.target.classList.contains('sfw-li')){
        url = APIURL + "sfw/" + `${e.target.innerHTML}`;
        fetch(url, {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => populateImages(data));
    }

    if (e.target.classList.contains("nsfw-li")) {
      url = APIURL + "nsfw/" + `${e.target.innerHTML}`;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => populateImages(data));
    }
}

function populateImages(data){
    picsArray = data.files 
    picsArray.forEach(pic=>{
        picEl = document.createElement('div')
        picEl.classList.add('pic-card')

        picEl.innerHTML = `<img src="${pic}" alt="Oye ! Oye ! Oye ! Wait a minute for the pics Note : Try again if pics don't appear in 10 secs">`;

        showPics.appendChild(picEl)
    })
}


function initialPopulate(){
    fetch("https://api.waifu.pics/many/sfw/waifu", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => populateImages(data));
}

initialPopulate();


function menuShow(e){
    document.getElementById("checkbox1").checked = false;
    showPics.innerHTML = "";
    e.preventDefault()
    if(e.target.innerHTML == "Nsfw"){
        fetch(
          `https://api.waifu.pics/many/nsfw/waifu`,
          {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => populateImages(data));
    }
    else{
        fetch(
          `https://api.waifu.pics/many/sfw/${e.target.innerHTML.toLowerCase()}`,
          {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => populateImages(data));
    }
}