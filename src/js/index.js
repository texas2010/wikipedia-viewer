import '../main.css'
import getJSON from './request'

const searchButton = document.getElementById('searchButton');
const searchText = document.getElementById('searchInput');
const randomArticle = document.getElementById('randomArticle');
const searchResults = document.getElementById('searchResults');

const getSearch = (e) => {
  if (searchText.value.length > 0) {
    if (e.keyCode === 13) {
      findResults()
    } else if (e.target.id === 'searchButton') {
      findResults()
    }
  }
}

const findResults = async () => {
  const searchQuery = searchText.value
  // const searchQuery = 'asdfasdf'
  const data = await getJSON(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`);
  console.log(data.query);
  viewResults(data.query.search)
}

const viewResults = (arr) => {
  searchResults.innerHTML = ''
  if (arr.length > 0) {
    arr.forEach(item => {
      searchResults.appendChild(eachViewResult(item))
    });
  } else {
    searchResults.appendChild(viewWarning())
  }
}

const eachViewResult = ({ title, pageid, snippet }) => {
  const element = document.createElement('a');
  element.setAttribute('class', 'resultsBox');
  element.setAttribute('href', `https://en.wikipedia.org/wiki/${title}`);
  element.setAttribute('target', '_blank');
  element.setAttribute('rel', 'noopener noreferrer');
  const divEl = document.createElement('div');

  const titleEl = document.createElement('h1');
  titleEl.setAttribute('class', 'title');
  titleEl.textContent = title;
  divEl.appendChild(titleEl);

  const bodyEl = document.createElement('p');
  bodyEl.setAttribute('class', 'subtitle is-4');
  bodyEl.innerHTML = snippet;
  divEl.appendChild(bodyEl);
  
  element.appendChild(divEl);
  return element;
}

const viewWarning = () => {
  const element = document.createElement('div')
  element.setAttribute('class', 'warning title')
  element.textContent = 'Not Found!'
  return element
}

searchButton.addEventListener('click', getSearch)
searchText.addEventListener('keydown', getSearch)
