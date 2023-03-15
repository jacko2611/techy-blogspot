const usernameEl = document.getElementById('signup-username');
const passwordEl = document.getElementById('signup-password');
const submitBtn = document.getElementById('submit-btn');

async function signup(event) {
  event.preventDefault();
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();

  if (!username || !password) {
    alert('Please enter your username and password.');
  } else {
    usernameEl.value = '';
    passwordEl.value = '';
    
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.status === 201) {
        alert('Your account has been created.');
        window.location.href = '/login';
      }

    } catch (err) {
      alert('Invalid username or password. Either your username has been used or your password is less than 8 characters. Please try again.');
      console.log(err);
    }
  }
}

submitBtn.addEventListener('click', signup);
