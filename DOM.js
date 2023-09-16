"use strict";
const buttonElement = document.getElementById("add-form-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const inputText = document.querySelectorAll(".add-form-text");
let quoteGlobal = ""; //для чего?? но если убрать, то перестают работать лайки

const comments = [{
  name: 'Глеб Фокин',
  text: 'Это будет первый комментарий на этой странице',
  date: '12.02.22 12:18',
  likesCounter: 3,
  isActiveLike: false,
},
{

  name: 'Варвара Н.',
  text: 'Мне нравится как оформлена эта страница! ❤',
  date: '13.02.22 19:22',
  likesCounter: 75,
  isActiveLike: true,
}];

const initLikeButtons = () => {
  const likeButtons = document.querySelectorAll('.like-button');
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const likeButtonActive = comments[likeButton.dataset.index];
      likeButtonActive.isActiveLike ? --likeButtonActive.likesCounter : ++likeButtonActive.likesCounter; //??? каким-то образом работает
      likeButtonActive.isActiveLike = !likeButtonActive.isActiveLike; //??? каким-то образом работает

      renderComments();
    });
  };

  const quotElements = document.querySelectorAll(".comment");
  for (const quotElement of quotElements) {
    quotElement.addEventListener("click", () => {
      const index = quotElement.dataset.index;
      const comment = comments[index];

      quoteGlobal = `${comment.name}:\n${comment.text}`;
      inputText.value = `"${quoteGlobal}"\n`;
      document.querySelector(".add-form-text").focus();
    });
  };
};

const plusZero = (str) => {
  return str < 10 ? `0${str}` : str;
};

const now = (currentDate) => {
  let date = plusZero(currentDate.getDate());
  let month = plusZero(currentDate.getMonth() + 1);
  let hours = plusZero(currentDate.getHours());
  let mins = plusZero(currentDate.getMinutes());
  return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
};

const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `
    <li class="comment data-index='${index}'">
    <div class="comment-header data-index='${index}'">
      <div>${comment.name}</div>
      <div>${comment.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text" data-index='${index}'>
      ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likesCounter}</span>
        <button data-index='${index}' class="${comment.isActiveLike ? 'like-button -active-like' : 'like-button'}"></button>
      </div>
    </div>
    </li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;

  quoteGlobal = "";
  inputText.value = "";
  nameInputElement.value = "";


  initLikeButtons();
};

renderComments();

const createNewComment = () => {
  let currentDate = new Date();
  comments.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    text: commentInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    quote: quoteGlobal,
    date: now(currentDate),
    likesCounter: 0,
    isActiveLike: false,
  });
};

renderComments();

buttonElement.addEventListener("click", () => {

  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
  if (nameInputElement.value === '') {
    nameInputElement.classList.add("error");
    return;
  };
  if (commentInputElement.value === '') {
    commentInputElement.classList.add("error");
    return;
  };

  createNewComment();
  renderComments();
  /*
  function formatDate(date) {
    const locale = 'ru-RU'
    const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    return `${date.toLocaleString(locale, options)} ${date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`
  };
  formatDate();
  */
  /*
  let myDate = new Date(); 
  let day = String(myDate.getDay()).padStart(2, '0');
  let month = String(myDate.getMonth()).padStart(2, '0');
  let year = String(myDate.getFullYear()).padStart(2, '0');
  let hour = String(myDate.getHours()).padStart(2, '0'); 
  let minute = String(myDate.getMinutes()).padStart(2, '0'); 
  if (day < 10) { 
      day = "0" + day; 
  };
  if (month < 10) { 
      month = "0" + month; 
  };
  if (year < 10) { 
      year = "0" + year; 
  };
  if (minute < 10) { 
      minute = "0" + minute; 
  };
  let time = day + "." + month + "." + year + " " + hour + ":" + minute;
  */
  /*
  const oldListHtml = listElement.innerHTML;
  listElement.innerHTML = oldListHtml +
    `<li class="comment">
    <div class="comment-header">
      <div>${nameInputElement.value}</div>
      <div> ${formatDate(new Date())} </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${commentInputElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`
  */
});

renderComments();

console.log("It works!");