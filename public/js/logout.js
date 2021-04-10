const logout = async () => {
  const response = await fetch('#', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// Event Listener
document
  .querySelector('#')
  .addEventListener('click', logout);
