function handleFileSelect(event) {
  const files = event.target.files;
  const file = files[0];

  if (!file.type.match('image.*')) {
    return failSignin(event.target.parentElement.parentElement);
  }

  const reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (e) {
      const div = document.getElementById('output');
      div.innerHTML = ['<img class="thumb" title="', encodeURI(theFile.name), '" src="', e.target.result, '" />'].join('');
    };
  })(file);
  reader.readAsDataURL(file);
}

document.getElementById('articleImg')?.addEventListener('change', handleFileSelect, false);










