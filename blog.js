fetch("blog.json")
  .then(function(response){
    return response.json();
  })
  .then(function(blogs){
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for(let blog of blogs){
      out += `
      <div class="relative flex items-center m-10 bg-white backdrop-filter backdrop-blur-md shadow-2xl shadow-slate-500 rounded-2xl justify-center">
        <div class="relative w-[17.5rem] sm:w-[15.5rem] md:w-[19rem] lg:w-[27rem] xl:w-[35rem] h-auto flex flex-col justify-center items-center opacity-80 hover:opacity-100">
          <div class="relative w-full truncate duration-500 border-8 border-solid rounded-t-2xl border-black/25">
            <img src="${blog.poster}" alt="blog image" class="object-cover w-full h-48 rounded-t-2xl"/>
          </div>
          <div class="relative flex flex-col items-center justify-center px-4 py-4 text-center bg-white rounded-b-2xl">
            <h3 class="duration-500 text-black uppercase font-medium text-sm tracking-wider py-2">
              <b>${blog.title}</b><br>
              <span class="text-base font-light lowercase">${blog.description}</span>
            </h3>

            <div class="mt-4">
               <a href="${blog.read}" rel="noopener noreferrer" class="px-4 py-2 text-white font-normal bg-amber-800 hover:bg-amber-900 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-amber-900 transform hover:scale-105" aria-label="Read ${blog.title}">

                <b>Read</b>
              </a>
            </div>
          </div>
        </div>
      </div>`;
    }

    placeholder.innerHTML = out;


    // Smooth scroll functionality
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    renderUserBlogs();
  });

// Change to the stored current theme.
changeToCurrTheme();
function renderUserBlogs() {
  let blogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
  let container = document.getElementById("user-blogs-output");
  if (!container) return;

  let out = "";
  for (let blog of blogs) {
    let imgSrc = blog.image || "./Assets/cats-dogs.jpg";
    out += `
      <div class="relative flex items-center m-10 bg-white shadow-2xl shadow-slate-500 rounded-2xl justify-center">
        <div class="relative w-[17.5rem] sm:w-[15.5rem] md:w-[19rem] lg:w-[27rem] xl:w-[35rem] h-auto flex flex-col justify-center items-center opacity-80 hover:opacity-100">
          <div class="relative w-full border-8 border-solid rounded-t-2xl border-black/25">
            <img src="${imgSrc}" alt="blog image" class="object-cover w-full h-48 rounded-t-2xl"/>
          </div>
          <div class="relative flex flex-col items-center justify-center px-4 py-4 text-center bg-white rounded-b-2xl">
            <h3 class="text-black uppercase font-medium text-sm tracking-wider py-2">
              <b>${blog.title}</b><br>
              <span class="text-base font-light lowercase">${blog.description}</span>
            </h3>
            <div class="mt-4 flex gap-2">
              <a href="./blogs/user-blog.html?id=${blog.id}" class="py-2 px-4 bg-amber-800 text-white hover:bg-amber-900 rounded-md">
                <b>Read</b>
              </a>
              <button onclick="deleteBlog(${blog.id})" class="py-2 px-4 bg-red-600 text-white bg-red-600 hover:bg-red-700 rounded-md">
                <b>Delete</b>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }
  container.innerHTML = out;
}

function hideCreateForm() {
  document.getElementById("create-blog-form").style.display = "none";
  document.getElementById("create-blog-btn").style.display = "inline-block";
}
function showCreateForm() {
  document.getElementById("create-blog-form").style.display = "block";
  document.getElementById("create-blog-btn").style.display = "none";
}

function submitBlog() {
  let title = document.getElementById("blog-title").value;
  let author = document.getElementById("blog-author").value;
  let avatar = document.getElementById("blog-avatar").value;
  let image = document.getElementById("blog-image").value;
  let description = document.getElementById("blog-description").value;
  let content = document.getElementById("blog-content").value;

  if (!title || !author || !description || !content) {
    alert("Please fill out all of the required fields.");
    return;
  }

  let blogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
  let newBlog = {
    id: Date.now(),
    title: title,
    author: author,
    avatar: avatar || "",
    image: image || "",
    description: description,
    content: content,
    date: new Date().toLocaleDateString()
  };

  blogs.push(newBlog);
  localStorage.setItem("userBlogs", JSON.stringify(blogs));
  hideCreateForm();
  renderUserBlogs();
}


function deleteBlog(id) {
  if (!confirm("Are you sure you want to delete this blog?")) return;
  let blogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
  blogs = blogs.filter(function(blog) { return blog.id !== id; });
  localStorage.setItem("userBlogs", JSON.stringify(blogs));
  renderUserBlogs();
}
