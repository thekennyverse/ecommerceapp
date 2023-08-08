// register.js

async function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value; // Add other form fields as needed
  
    const host = "http://localhost:4000";
    const url = `${host}/register`; // This should match the backend route for user registration
    const headers = {
      'Content-Type': 'application/json'
    };
    const method = "POST";
    const body = JSON.stringify({ username, password, full_name: fullName }); // Modify the payload based on your server's expected data
  
    try {
      const response = await fetch(url, { method, headers, body });
      const data = await response.json();
  
      if (response.ok) {
        console.log("Registration successful:", data);
        // Redirect to the login page after successful registration
        window.location.href = `${host}/loginLanding`;
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
  