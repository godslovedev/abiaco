document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const profileForm = document.getElementById("profileForm");
  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");
  const phoneInput = document.getElementById("profilePhone");
  const whatsappInput = document.getElementById("profileWhatsapp");
  const categoryInput = document.getElementById("profileCategory");
  const profileImage = document.getElementById("profileImage");
  const profilePicInput = document.getElementById("profilePic");

  // Load user data into form
  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone || "";
  whatsappInput.value = user.whatsapp;
  categoryInput.value = user.category;
  profileImage.src = user.profilePic;

  // Preview new profile image
  profilePicInput.addEventListener("change", function () {
    const file = profilePicInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Save changes
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      whatsapp: whatsappInput.value.trim(),
      category: categoryInput.value.trim(),
      profilePic: profileImage.src
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
    }
  });
});
