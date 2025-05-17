// complain.js

// Get the currently logged-in user
function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

// Get all complaints/suggestions from localStorage
function getComplaints() {
  return JSON.parse(localStorage.getItem("complaints")) || [];
}

// Save a new complaint/suggestion
function saveComplaint(complaint) {
  const complaints = getComplaints();
  complaints.push(complaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));
}

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const complaintForm = document.getElementById("complaintForm");
  if (!complaintForm) return;

  const typeRadios = document.getElementsByName("type");
  const complaintDesc = document.getElementById("complaintDesc");
  const complaintImage = document.getElementById("complaintImage");

  complaintForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = getCurrentUser();
    if (!user) return;

    // Get selected type (Complaint or Suggestion)
    let type = "";
    for (let radio of typeRadios) {
      if (radio.checked) {
        type = radio.value;
        break;
      }
    }

    const description = complaintDesc.value.trim();
    const imageFile = complaintImage.files[0];
    const reader = new FileReader();

    const submitComplaint = (imageDataUrl = "") => {
      const newComplaint = {
        id: Date.now().toString(),
        type, // Complaint or Suggestion
        description,
        image: imageDataUrl,
        userEmail: user.email,
        userName: user.name,
        userPic: user.profilePic || "assets/images/default-profile.png",
        submittedAt: new Date().toISOString()
      };

      saveComplaint(newComplaint);
      alert("Your submission has been sent to the admin.");
      window.location.href = "profile.html";
    };

    if (imageFile) {
      reader.onload = function (e) {
        submitComplaint(e.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      submitComplaint();
    }
  });
});
