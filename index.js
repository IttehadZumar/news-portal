const categories = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
    .catch(error => console.log(error))
}

const displayCategories = data => {
  // console.log(data);
  const categoryLinks = document.getElementById('category-links');

  data.forEach(category => {
    // console.log(category.category_id);
    const li = document.createElement('li');
    li.classList.add('nav-item');

    li.innerHTML = `
        <a onclick = "newsByCategorie('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>
        `
    categoryLinks.appendChild(li);
  });
}
categories();

const newsByCategorie = (id) => {

  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  // console.log("url:", url)
  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error))
}

const displayNews = (allNews) => {
  const arrlen = allNews.length;
  if (arrlen == 0) {
    document.getElementById('total-news-displayed').innerText = "No news found";
    spinner.classList.add("d-none");
  }
  else {
    document.getElementById('total-news-displayed').innerText = `${arrlen} news found `;
  }
  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = " ";

  // sort array by total view
  let x = allNews.sort((a, b) => (b.total_view > a.total_view ? 1 : -1));


  allNews.forEach(news => {
    const div = document.createElement('div');
    div.classList.add('class="row"');
    div.classList.add('class="g-0"');

    div.innerHTML = `
    <div class="row g-0">
    <div class="col-md-4">
    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
    <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p style="text-overflow: ellipsis;" class="card-text">${news.details.length > 100 ? news.details.slice(0, 100) + '...' : news.details}</p>
        <p class="card-text"><small class="text-muted">
        <img src="${news.author.img}" class="w-25 h-25 p-3 img-fluid rounded-circle" alt="...">
        ${news.author.name ? news.author.name : "not available"}
        </small>
        </p>
        <p class="me-3 text-muted">view: <i class="fa-regular fa-eye"></i> ${news.total_view}</p>


        <!-- Button trigger modal -->
<button onclick = "loadNewsDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Details <i class="fa-solid fa-arrow-right"></i>
</button>


</div>
    </div>
        `;
    newsContainer.appendChild(div);

    spinner.classList.add("d-none");
  });
}
const loadNewsDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  // console.log(url);
  const res = await fetch(url)
  const data = await res.json()
  console.log(data);
  displayNewsDetail(data.data);
}

const displayNewsDetail = news => {
  console.log(news);
  const modalLabel = document.getElementById('exampleModalLabel');
  modalLabel.innerText = news[0].title;
  console.log(modalLabel);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerText = news[0].details;
  const modalExtra = document.getElementById('modal-extra');
  modalExtra.innerText = `Author Name: ${news[0].author.name}`;
  const modalExtra1 = document.getElementById('modal-extra1');
  modalExtra1.innerText = `publish date: ${news[0].author.published_date}`;
  const modalExtra2 = document.getElementById('modal-extra2');
  modalExtra2.innerText = `View: ${news[0].total_view}`;
  const modalExtra3 = document.getElementById('modal-extra3');
  modalExtra3.innerText = `Rating: ${news[0].rating.number}`;
}
/*  */

