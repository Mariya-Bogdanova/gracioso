const shopList = document.getElementById('shopList');

document.forms.updateArticleForm?.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const response = await fetch(event.target.action, {
      method: "PUT",
      body: new FormData(event.target)
    });
    return window.location.assign('/');
  } catch (err) {
    console.error(err.message);
  }
});

shopList?.addEventListener('click', async (event) => {
  try {
    if (event.target.className === 'aDelete') {
      event.preventDefault();
      const response = await fetch(event.target.href, {
        method: 'DELETE',
      });
      return window.location.assign('/');
    }
  } catch (err) {
    console.error(err.message);
  }
})
