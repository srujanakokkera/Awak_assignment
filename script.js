document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous error messages
    document.getElementById('username-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
  
    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Validate form fields
    let valid = true;
    
    if (!username || !validateEmail(username)) {
      document.getElementById('username-error').textContent = 'Please enter a valid email.';
      document.getElementById('username-error').style.display = 'block';
      valid = false;
    }
    if (!password || password.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters long.';
        document.getElementById('password-error').style.display = 'block';
        valid = false;
      }
    
      if (valid) {
        // Perform API call
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
            rememberMe:rememberMe
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          alert('Login successful!');
         document.getElementById('login-form').reset(); //clear form fields after successful login
        })
        .catch(error => {
          alert('Login failed. Please try again.');
        });
      }
    });
    document.getElementById("toggle-password").addEventListener('change',function(){
      const passwordInput=document.getElementById('password');
      if(this.checked)
      {
        passwordInput.type='text';
      }
      else{
        passwordInput.type='password';
      }
    });
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    