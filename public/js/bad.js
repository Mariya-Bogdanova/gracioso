document.forms.bidForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { method, action } = event.target;
  let response;
  try {
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminName: event.target.adminName.value,
        adminPassword: event.target.adminPassword.value,
      }),
    });
  } catch (err) {
    console.error(err.message);
  }
  if (response.status !== 200) {
    console.log('!==200')
    return failSignin(event.target);
  }
  return window.location.assign('/');
});
