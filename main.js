// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const posts = JSON.parse(localStorage.getItem("posts")) || [];

// Load posts to the home feed
function loadPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<p>No posts available.</p>";
    return;
  }

  posts.forEach((post, index) => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    postCard.innerHTML = `
      <img src="${post.image || 'assets/images/default.jpg'}" alt="Product">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <p><strong>Price:</strong> ₦${post.price}</p>
      <p><strong>Posted by:</strong> ${post.username}</p>
      <div class="poster-info">
        <img src="${post.profilePic || 'assets/images/default-profile.png'}" alt="Profile" class="profile-pic">
        <a href="profile.html?user=${post.userId}">${post.username}</a>
        <a href="https://wa.me/${post.whatsapp}" target="_blank">Chat on WhatsApp</a>
        <a href="tel:${post.phone}">Call</a>
      </div>
      ${currentUser && currentUser.id === post.userId ? `
        <button onclick="editPost(${index})">Edit Post</button>
      ` : ""}
    `;

    container.appendChild(postCard);
  });
}

// Search Function
document.getElementById("searchInput")?.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(keyword) ||
    post.description.toLowerCase().includes(keyword)
  );

  displayFilteredPosts(filteredPosts);
});

function displayFilteredPosts(filtered) {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No matching posts found.</p>";
    return;
  }

  filtered.forEach((post, index) => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    postCard.innerHTML = `
      <img src="${post.image || 'assets/images/default.jpg'}" alt="Product">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <p><strong>Price:</strong> ₦${post.price}</p>
      <p><strong>Posted by:</strong> ${post.username}</p>
      <div class="poster-info">
        <img src="${post.profilePic || 'assets/images/default-profile.png'}" alt="Profile" class="profile-pic">
        <a href="profile.html?user=${post.userId}">${post.username}</a>
        <a href="https://wa.me/${post.whatsapp}" target="_blank">Chat on WhatsApp</a>
        <a href="tel:${post.phone}">Call</a>
      </div>
      ${currentUser && currentUser.id === post.userId ? `
        <button onclick="editPost(${index})">Edit Post</button>
      ` : ""}
    `;

    container.appendChild(postCard);
  });
}

function editPost(index) {
  localStorage.setItem("editPostIndex", index);
  window.location.href = "post.html";
}

// Run when page loads
document.addEventListener("DOMContentLoaded", loadPosts);
