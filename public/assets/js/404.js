// JS for the 404 page
const goBackBtn = document.querySelector('.button-49');

const goBack = (e) => {
  e.preventDefault();

  // Built-in browser interface that allows changing the browser session history, or in this case to go back.
  history.back();
};

goBackBtn.addEventListener('click', goBack);
