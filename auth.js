document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // === Signup Logic ===
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const whatsapp = document.getElementById("whatsapp").value.trim();
      const category = document.getElementById("category").value.trim();

      if (!name || !email || !password || !whatsapp || !category) {
        alert("Please fill in all fields.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find(user => user.email === email);

      if (existingUser) {
        alert("A user with this email already exists.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        whatsapp,
        category,
        phone: "",
        profilePic: "assets/images/default-profile.png"
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      alert("Signup successful!");
      window.location.href = "profile.html";
    });
  }

  // === Login Logic ===
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        alert("Please enter your email and password.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const matchedUser = users.find(user => user.email === email && user.password === password);

      if (!matchedUser) {
        alert("Invalid email or password.");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      alert("Login successful!");
      window.location.href = "profile.html";
    });
  }
});
