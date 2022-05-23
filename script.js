const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');

//Loading Function
function loading() {
   loader.hidden = false;
   quoteContainer.hidden = true;
}

function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote
async function getQuote() {
   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
   const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   try {
       loading();
       const response = await fetch(proxyUrl + apiUrl);
       const data = await response.json();
       if (data.quoteAuthor === '') {
        authorText.innerText = 'Unknown';
       }
       else{
        authorText.innerText = data.quoteAuthor;
       }
       if(data.quoteText.length > 120)
       {
           quoteText.classList.add('long-quote');
       }
       else{
           quoteText.classList.remove('long-quote');
       }
       quoteText.innerText = data.quoteText;
       complete();
   } catch (error) {
       //getQuote();
       console.log(error);
   }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function switchTheme(event) {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggleIcon.children[0].textContent = 'Dark Mode';
      toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      toggleIcon.children[0].textContent = 'Light Mode';
      toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    }
  }

newQuoteBtn.addEventListener('click', getQuote);

twitterBtn.addEventListener('click', tweetQuote);

toggleSwitch.addEventListener('change', switchTheme);

getQuote();





