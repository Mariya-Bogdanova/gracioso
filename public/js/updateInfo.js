const updateInfoA = document.getElementById('updateInfoA');

// updateInfoA?.addEventListener('click', async (event) => {
//   try {
//       event.preventDefault();
//       const response = await fetch('/updateAboutUsForm.hbs');


//       // const boxNumber = event.target.parentElement.id;
//       const hbs = await response.text();
//       const template = window.Handlebars.compile(hbs);
//       const boxUl = event.target.parentElement.getElementsByClassName("boxUl")[0];
//       const inputID = boxUl.children.length
//       const input = template({ numberId: inputID, box: boxNumber });
//       boxUl.insertAdjacentHTML('beforeend', input);
//   } catch (err) {
//     console.error(err.message);
//   }
// })
