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

        productDiv.appendChild(img);
        productDiv.appendChild(productName);
        productContainer.appendChild(productDiv);
    });
}
