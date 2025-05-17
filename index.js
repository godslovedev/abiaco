document.addEventListener("DOMContentLoaded", function () {
  const postList = document.getElementById("postList");
  const logoutBtn = document.getElementById("logoutBtn");

  // Load posts from localStorage
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (posts.length === 0) {
    postList.innerHTML = "<p>No posts yet. Be the first to add one!</p>";
    return;
  }

  posts.reverse().forEach(post => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    const postDate = new Date(post.createdAt || Date.now());
    const formattedDate = postDate.toLocaleString();

   postCard.innerHTML = `
  <div class="post-left">
    <div class="user-info">
      <img src="${post.userPic || "assets/images/default-profile.png"}" alt="${post.userName}" class="profile-pic" />
      <div>
        <p><strong>${post.userName}</strong></p>
        <p><a href="https://wa.me/${post.userEmail}">${post.userEmail}</a></p>
        <p><small><em>Posted on: ${formattedDate}</em></small></p>
      </div>
    </div>
    <h3>${post.title}</h3>
    <p>${post.description}</p>
  </div>
  <div class="post-right">
    <img src="${post.image}" alt="Product Image" class="post-image" />
  </div>
`;


    postList.appendChild(postCard);
  });

  // Logout
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
