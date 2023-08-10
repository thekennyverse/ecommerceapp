// register.js


async function registerUser() {

  const username = document.getElementById('username').value;
  const password_hash = document.getElementById('password').value;
  const fullName = document.getElementById('full_name').value;
  const email = document.getElementById('email').value; // Add the input field for email

  const host = "http://localhost:4000";
  const url = `${host}/user`; // Update the URL to the new endpoint
  const headers = {
    'Content-Type': 'application/json'
  };
  const method = "POST";
  const body = JSON.stringify({ username, password_hash, full_name: fullName, email }); // Include email in the payload

  try {
    console.log(body)
    const response = await fetch(url, { method, headers, body });
    const data = await response.json();
    console.log(data)

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
