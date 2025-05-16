// js/admin.js
if (localStorage.getItem("isAdmin") !== "true") {
  window.location.href = "admlog.html";
}


document.addEventListener("DOMContentLoaded", function () {
  const complaintList = document.getElementById("complaintList");
  const noData = document.getElementById("noData");

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  if (complaints.length === 0) {
    noData.style.display = "block";
    return;
  }

  complaints.reverse().forEach(c => {
    const card = document.createElement("div");
    card.className = "complaint-card";

    card.innerHTML = `
      <div class="user-info">
        <img src="${c.userPic}" alt="User Picture" />
        <div>
          <strong>${c.userName}</strong><br>
          <small>${c.userEmail}</small>
        </div>
      </div>

      <span class="type-label">${c.type}</span>

      <p class="complaint-description">${c.description}</p>

      ${c.image ? `<img class="complaint-image" src="${c.image}" alt="Attached Image">` : ''}

      <div class="timestamp">Submitted on ${new Date(c.submittedAt).toLocaleString()}</div>
    `;

    complaintList.appendChild(card);
  });
});
