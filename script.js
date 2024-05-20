// =========== LIVROS =======
document.addEventListener('DOMContentLoaded', function () {
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('productContainer');

            data.forEach(product => {
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
        })
        .catch(error => console.error('Erro carregando livros:', error));
});

// ========= FILTRO DE GENERO ==========
document.addEventListener('DOMContentLoaded', function() {
    fetch('genres.json')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById("filter");

            data.options.forEach(option => {
                const opt = document.createElement("option");
                opt.value = option.value;
                opt.textContent = option.text;
                dropdown.appendChild(opt);
            });
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});