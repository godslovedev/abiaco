// Helper function to get the currently logged-in user
function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

// Helper function to get posts from localStorage
function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

// Save a post to localStorage
function savePost(post) {
  const posts = getPosts();
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Handle post form submission (Add/Edit)
document.addEventListener("DOMContentLoaded", function () {
  const postForm = document.getElementById("postForm");
  if (!postForm) return;

  const productTitle = document.getElementById("productTitle");
  const productDesc = document.getElementById("productDesc");
  const productPrice = document.getElementById("productPrice");
  const productImage = document.getElementById("productImage");

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  let editingPost = null;

  // If editing an existing post
  if (postId) {
    const posts = getPosts();
    editingPost = posts.find(post => post.id === postId);
    if (editingPost) {
      productTitle.value = editingPost.title;
      productDesc.value = editingPost.description;
      productPrice.value = editingPost.price;
    }
  }

  postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = getCurrentUser();
    if (!user) return;

    const title = productTitle.value.trim();
    const description = productDesc.value.trim();
    const price = productPrice.value.trim();

    const reader = new FileReader();
    const imageFile = productImage.files[0];

    const submitPost = (imageDataUrl = editingPost?.image || "") => {
      const newPost = {
        id: editingPost ? editingPost.id : Date.now().toString(),
        title,
        description,
        price,
        image: imageDataUrl,
        userEmail: user.email,
        userName: user.name,
        userPic: user.profilePic || "assets/images/default-profile.png",
        createdAt: editingPost ? editingPost.createdAt : new Date().toISOString() // ✅ Add createdAt timestamp
      };

      let posts = getPosts();
      if (editingPost) {
        posts = posts.map(p => (p.id === newPost.id ? newPost : p));
      } else {
        posts.push(newPost);
      }

      localStorage.setItem("posts", JSON.stringify(posts));
      alert(editingPost ? "Post updated!" : "Post created!");
      window.location.href = "profile.html";
    };

    if (imageFile) {
      reader.onload = function (e) {
        submitPost(e.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      submitPost();
    }
  });
});
