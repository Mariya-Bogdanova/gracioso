// const button1AboutUs = document.getElementById('button1AboutUs');
// const boxUl = document.getElementById('boxUl');

document.forms.aboutUsForm?.addEventListener('click', async (event) => {
  try {
    event.preventDefault();
    if (event.target.className === 'button1AboutUs') {
      const boxNumber = event.target.parentElement.id;
      const response = await fetch('/partials/input.hbs');
      const hbs = await response.text();
      const template = window.Handlebars.compile(hbs);
      const boxUl = event.target.parentElement.getElementsByClassName("boxUl")[0];
      const inputID = boxUl.children.length
      const input = template({ numberId: inputID, box: boxNumber });
      boxUl.insertAdjacentHTML('beforeend', input);
    }
    // return window.location.assign('/');
  } catch (err) {
    console.error(err.message);
  }
})


