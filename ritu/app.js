let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let loader = document.getElementById('load');

function showLoader(){
    searchBtn.style.display = 'none';
    loader.style.display = 'block';
}
function hideLoader(){
    loader.style.display = 'none';
    searchBtn.style.display = 'block';
}


const getData = async (searchValue) => {

    showLoader();
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
    let jsonData = await data.json();
    hideLoader();
    document.querySelector(".text").innerHTML=""
    let div = document.createElement("div");
    div.classList.add("detail");
    div.innerHTML=`
            <h2>Word : <span>${jsonData[0].word}</span></h2>
            <p>${jsonData[0].meanings[0].partOfSpeech}</p>
            <p>Meaning : <span>${jsonData[0].meanings[0].definitions[0].definition   }</span></p>
            <p>Example : <span>${jsonData[0].meanings[0].definitions[0].example == undefined ? "Not Found" : jsonData[0].meanings[0].definitions[0].example   }</span></p>
            <p>Synonyms : <span>${jsonData[0].meanings[0].synonyms}</span></p>
            <a href=${jsonData[0].sourceUrls[0]    } target="_blank">Read More</a>
    `
    document.querySelector(".text").appendChild(div)
    console.log(jsonData);
    console.log(jsonData[0].word);
    console.log(jsonData[0].meanings[0].definitions[0].definition       );

}

searchBtn.addEventListener("click", function(){
    let searchValue = searchInput.value;
    if(searchValue == ""){
        searchInput.value = "Enter a Word";
          searchInput.style.color = "red";
          searchInput.style.border = "2px solid red";
    }else{
        getData(searchValue)
    }
})

function invalidrev(rev)
{
  rev.value = ''
  rev.style.color = 'black';
  rev.style.border = 'none';
  document.getElementById('text-generation').innerHTML='';
}

// Quote Generator-----------------------------------------------------
const api = "https://api.quotable.io/random";

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");

btn.addEventListener("click", getQuote);

function getQuote() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      quote.innerHTML = `"${data.content}"`;
      author.innerHTML = `- ${data.author}`;
    });
}

//Image Slider-----------------------------------------------------

const slides = document.querySelectorAll('.slide');
let counter = 0;

slides.forEach(
    (slide,index)=>{
        slide.style.left = `${index * 100}%`;

    }
)


const goNext = () => {
    if (counter < slides.length - 1) {
        counter++;
        slideImage();
    }
};
const goPrev = () => {
    if (counter != 0) {
        counter--;
        slideImage();
    }
};

function slideImage (){
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        }
    )
}