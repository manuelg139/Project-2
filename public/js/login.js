const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect login form values
  const email = document.querySelector('#').value.trim();
  const password = document.querySelector('#').value.trim();

  if (email && password) {
    const response = await fetch('ENTER PATH', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};


// Event Listener
document
  .querySelector('#')
  .addEventListener('submit', loginFormHandler);
