document.addEventListener('DOMContentLoaded', function () {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('productContainer');

            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.name;

                const productName = document.createElement('div');
                productName.classList.add('product-name');
                productName.textContent = product.name;

                productDiv.appendChild(img);
                productDiv.appendChild(productName);
                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Erro carregando livros:', error));
});