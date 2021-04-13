const emailFormHandler = async (event) => {
  event.preventDefault();

  const from = document.querySelector('#email-from').value.trim();
  const to = document.querySelector('#email-to').value.trim();
  const subject = document.querySelector('#email-subject').value.trim();
  const content = document.querySelector('#email-content').value.trim();

  if (from && to && subject && content) {
    const response = await fetch('/api/emailers', {
      method: 'POST',
      body: JSON.stringify({ from, to, subject, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
      document.location.replace('/api/dashboard');
      console.log('Success')
    }
    else {
      alert ("Please make sure all fields are completed");
    }
  }
};

document
  .querySelector('.email-form')
  .addEventListener('submit', emailFormHandler);