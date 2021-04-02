document.forms.aboutUsForm?.addEventListener('click', async (event) => {
  try {
    if (event.target.className === 'button1AboutUs') {
      event.preventDefault();
      const boxNumber = event.target.parentElement.id;
      const response = await fetch('/partials/input.hbs');
      const hbs = await response.text();
      const template = window.Handlebars.compile(hbs);
      const boxUl = event.target.parentElement.getElementsByClassName("boxUl")[0];
      const inputID = boxUl.children.length
      const input = template({ numberId: inputID, box: boxNumber });
      boxUl.insertAdjacentHTML('beforeend', input);
    }
  } catch (err) {
    console.error(err.message);
  }
})


