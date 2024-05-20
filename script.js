document.addEventListener('DOMContentLoaded', function () {
    let books = [];

    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            books = data;
            displayBooks(books);
        })
        .catch(error => console.error('Erro carregando livros:', error));

    fetch('genres.json')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById("filter");

            // Add "Show All" option
            const showAllOption = document.createElement("option");
            showAllOption.value = "";
            showAllOption.textContent = "Show All";
            dropdown.appendChild(showAllOption);

            data.options.forEach(option => {
                const opt = document.createElement("option");
                opt.value = option.text; // Use text for filtering
                opt.textContent = option.text;
                dropdown.appendChild(opt);
            });

            // Add event listener to the dropdown
            dropdown.addEventListener('change', function () {
                const selectedGenre = this.value;
                if (selectedGenre === "") {
                    displayBooks(books); // Show all books
                } else {
                    const filteredBooks = books.filter(book => book.genre.includes(selectedGenre));
                    displayBooks(filteredBooks);
                }
            });
        })
        .catch(error => console.error('Error fetching the JSON:', error));

    // Add event listener for search input
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    });
});

function displayBooks(books) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear previous books

    books.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const img = document.createElement('img');
        img.src = `book-covers/${product.id}.jpg`;
        img.alt = product.title;

        const productName = document.createElement('div');
        productName.classList.add('product-name');
        productName.textContent = product.title;

        const productAuthor = document.createElement('div');
        productAuthor.classList.add('product-author');
        productAuthor.textContent = product.author;

        productDiv.appendChild(img);
        productDiv.appendChild(productName);
        productDiv.appendChild(productAuthor);
        productContainer.appendChild(productDiv);
    });
}
