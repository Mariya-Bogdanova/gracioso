function failSignin(signinForm) {
  signinForm.adminName.setCustomValidity('Неверные имя пользователя и/или пароль.');
  signinForm.adminName.reportValidity();
}

document.forms.signinForm?.addEventListener('submit', async (event) => {
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
    return failSignin(event.target);
  }
  if (response.status !== 200) {
    console.log('!==200')
    return failSignin(event.target);
  }
  return window.location.assign('/');
});

