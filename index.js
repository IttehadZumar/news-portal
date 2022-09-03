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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log("url:", url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}

const displayNews = (allNews) => {
    // console.log(allNews);
    const newsContainer = document.getElementById('news-container');
    for (const news of allNews){
        // console.log(news);
    }
    allNews.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('class="row"');
        div.classList.add('class="g-0"');

        div.innerHTML = `
        <div class="col-md-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p style="text-overflow: ellipsis;" class="card-text">${news.details}</p>
                        <p class="card-text"><small class="text-muted">
                        <img src="${news.author.img}" class="img-fluid rounded-start" alt="...">
                        ${news.author.name}
                        </small>
                        <small>${news.total_view}</small>

                        

                        </p>

                        
        `;
        newsContainer.appendChild(div);
    });
}

