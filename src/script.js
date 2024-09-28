class News {
    apiKey = '0ehYarwpgNomTKildjqjlFIPwp5yikde'; 

    async getHeadlines(category = 'home') {
        const urlMap = {
            home: `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${this.apiKey}`,
            business: `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${this.apiKey}`,
            sports: `https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=${this.apiKey}`,
            politics: `https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=${this.apiKey}`
        };

        try {
            const res = await fetch(urlMap[category]);
            const data = await res.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    }

    async searchHeadlines(query) {
        const headlines = await this.getHeadlines('home');
        return headlines.filter(article => article.title.toLowerCase().includes(query.toLowerCase()));
    }
}

class NewsPaper {
    display(articles) {
        const main = document.querySelector('.main');
        main.innerHTML = '';

        articles.forEach(article => {
            const headline = document.createElement('a');
            headline.classList.add('headline');
            headline.href = article.url;
            headline.target = '_blank';

            if (article.multimedia && article.multimedia.length > 0) {
                const image = document.createElement('img');
                image.src = article.multimedia[0].url;
                headline.appendChild(image);
            }

            const title = document.createElement('h2');
            title.textContent = article.title;
            headline.appendChild(title);

            main.appendChild(headline);
        });
    }
}

(async () => {
    const nytApi = new News();
    const newsPaper = new NewsPaper();
    
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const noResultsText = document.getElementById('no-results-text');

    let currentCategory = 'home';
    let headlines = await nytApi.getHeadlines(currentCategory);
    newsPaper.display(headlines);

    document.querySelectorAll('.category').forEach(button => {
        button.addEventListener('click', async () => {
            currentCategory = button.getAttribute('data-category');
            headlines = await nytApi.getHeadlines(currentCategory);
            newsPaper.display(headlines);
        });
    });

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        searchInput.value = ''; 
        if (query) {
            const filteredHeadlines = await nytApi.searchHeadlines(query);
            if (filteredHeadlines.length > 0) {
                noResultsText.style.display = 'none';
                newsPaper.display(filteredHeadlines);
            } else {
                noResultsText.style.display = 'block';
                setTimeout(() => noResultsText.style.display = 'none', 2000);
            }
        } else {
            noResultsText.style.display = 'block';
            setTimeout(() => noResultsText.style.display = 'none', 2000);
        }
    });

    
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', () => {
        const categoryBar = document.querySelector('.category-bar');
        categoryBar.classList.toggle('active');
    });
})();
