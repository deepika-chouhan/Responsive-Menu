const debounce = (func, delay) =>{
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
}
(function() {
  calWidth();
  window.addEventListener("resize", debounce(calWidth, 100));
  addEventListeners();

})()

function addEventListeners() {
  let allLiElements = document.querySelectorAll("li:not(.more):not(.addPage)");
  for(i=0; i<allLiElements.length; i++) {
      allLiElements[i].addEventListener('click', handleActiveEle);
  }
} 
function calWidth() {
  let navWidth = 0;
  let moreWidth = document.querySelector('.more').offsetWidth;
  let addPage = document.querySelector(".addPage").offsetWidth;
  let allLiElements = document.querySelectorAll("#main > li:not(.more):not(.addPage)");
  for(i=0;i<allLiElements.length;i++) {
      navWidth += allLiElements[i].offsetWidth;
  }

  let availableSpace = document.querySelector("#nav-main").offsetWidth - moreWidth - addPage - 70;

  if (navWidth > availableSpace) {
      let allLiElements = document.querySelectorAll("#main > li:not(.more):not(.addPage)")
      let lastItem = allLiElements[allLiElements.length -1];
      lastItem.setAttribute('data-width', lastItem.offsetWidth);
      document.querySelector("#main .more ul").prepend(lastItem);
      calWidth();
  } else {
      let firstMoreElement = document.querySelector("#main li.more li");
      if (firstMoreElement && navWidth + parseInt(firstMoreElement.dataset.width) < availableSpace) {
          document.querySelector("#main").insertBefore(firstMoreElement, document.querySelector('.more'));
      }
  }
  let moreElements = document.querySelectorAll('.more li');
  if (moreElements.length > 0) {
      let moreElement =  document.querySelector(".more")
      moreElement.style.display = 'block';
      document.querySelector(".more a span").innerHTML = moreElements.length;
  } else {
      document.querySelector(".more").style.display = 'none'
  }
} 

function handleAddPage() {
  let value = prompt("Enter page name");
  if (value) {
    let li = document.createElement('li'); 
    let a = document.createElement('a');
    a.setAttribute('href', `index.html#${value.trim()}`);
    a.innerHTML = value
    li.appendChild(a);
    document.querySelector("#main").insertBefore(li, document.querySelector('.more'));
    calWidth();
    li.addEventListener('click', handleActiveEle)
  }
}

function handleActiveEle (e) {
  let parentElement = e.target.parentElement;
  if (parentElement.className === 'selected') return;
  let selectedElement = document.querySelector('.selected');
  selectedElement.removeAttribute('class', 'selected');
  parentElement.setAttribute('class', 'selected');
}