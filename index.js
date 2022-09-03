const categories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
}

const displayCategories = catagories => {

    const categoryLinks = document.getElementById('category-links');

    catagories.forEach(category => {
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add('nav-item');

        li.innerHTML = `
        <a class="nav-link" href="#">${category.category_name}</a>
        `
        categoryLinks.appendChild(li);
    });
}
categories();