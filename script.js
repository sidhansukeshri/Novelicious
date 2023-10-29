// Function to display the cart count
function updateCartCount(count) {
    const cartButton = document.getElementById('cart-button');
    cartButton.textContent = `My Cart (${count})`;
}

// Function to handle real-time search
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value.toLowerCase();

    // Filter the books based on the search query
    const filteredBooks = data.filter((book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        return title.includes(searchQuery) || author.includes(searchQuery);
    });

    // Display the filtered books
    displayBooks(filteredBooks);
}

// Attach the search event listener
document.getElementById('search-input').addEventListener('input', handleSearch);

// Initialize the cart data from localStorage
let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

// Function to handle adding items to the cart
function addToCart(bookTitle) {
    // In a real application, you would add the book to the user's cart and update the cart count.
    alert(`${bookTitle} added to your cart.`);
    // Add the book to the cart data
    cartData.push(bookTitle);
    // Store the updated cart data in localStorage
    localStorage.setItem('cartData', JSON.stringify(cartData));
    // Update the cart count
    cartCount = cartData.length;
    updateCartCount(cartCount);
}

// Cart count (in a real app, this would be retrieved from the user's cart data)
let cartCount = cartData.length;
updateCartCount(cartCount);

// Event listener for the "My Cart" button
document.getElementById('cart-button').addEventListener('click', function () {
    // Navigate to the cart page
    window.location.href = 'cart.html';
});

// Function to fetch and display books from the API
function fetchAndDisplayBooks() {
    // Make an API request to fetch book data
    fetch('api.php') // Assuming the API script is in the same directory
        .then((response) => {
            // Check if the response status is OK (200)
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error fetching book data: ' + response.statusText);
            }
        })
        .then((data) => {
            // Get the unique genres from the book data
            const genres = [...new Set(data.map((book) => book.genre))];

            // Get the selected value from the "Sort by Genre" dropdown
            const genreSort = document.getElementById('sort-genre').value;

            // Populate the "Sort by Genre" dropdown and maintain the selected option
            populateDropdown('sort-genre', genres, genreSort);

            const pagesSort = document.getElementById('sort-pages').value;
            const priceSort = document.getElementById('sort-price').value;

            // Sort and display the books based on selected sorting options
            const sortedBooks = sortBooks(data, genreSort, pagesSort, priceSort);
            displayBooks(sortedBooks);
        })
        .catch((error) => {
            console.error(error);
        });
}

// Function to populate a dropdown with options and maintain the selected option
function populateDropdown(dropdownId, options, selectedOption) {
    const dropdown = document.getElementById(dropdownId);

    // Clear existing options
    dropdown.innerHTML = '';

    // Add "All" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All ' + dropdownId.split('-')[1];
    dropdown.appendChild(allOption);

    // Add options for genres
    options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);

        if (option === selectedOption) {
            optionElement.selected = true; // Select the correct genre
        }
    });
}

// Function to display books on the page
function displayBooks(books) {
    const booksContainer = document.querySelector('.books');
    booksContainer.innerHTML = '';

    if (books.length === 0) {
        booksContainer.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach((book) => {
        const bookElement = createBookElement(book);
        booksContainer.appendChild(bookElement);
    });
}

// Function to create a book element
function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const price = typeof book.price === 'string' ? parseFloat(book.price) : book.price;

    bookElement.innerHTML = `
        <img src="${book.image_url}" alt="${book.title}">
        <h2>${book.title}</h2>
        <p>${book.description}</p>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p>Pages: ${book.pages}</p>
        <p>Price: $${price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
    `;

    const addToCartButton = bookElement.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
        addToCart(book.title);
    });

    return bookElement;
}

// Function to sort books based on selected sorting options
function sortBooks(books, genreSort, pagesSort, priceSort) {
    let sortedBooks = [...books];

    if (genreSort !== 'all') {
        sortedBooks = sortedBooks.filter((book) => book.genre === genreSort);
    }

    if (pagesSort !== 'all') {
        const pagesRange = pagesSort.split('-');
        sortedBooks = sortedBooks.filter((book) => {
            const pages = parseInt(book.pages);
            return pages >= parseInt(pagesRange[0]) && pages <= parseInt(pagesRange[1]);
        });
    }

    if (priceSort !== 'all') {
        sortedBooks.sort((a, b) => {
            if (priceSort === 'low-to-high') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }

    return sortedBooks;
}

// Event listener for sorting options
document.getElementById('sort-genre').addEventListener('change', fetchAndDisplayBooks);
document.getElementById('sort-pages').addEventListener('change', fetchAndDisplayBooks);
document.getElementById('sort-price').addEventListener('change', fetchAndDisplayBooks);

// Fetch and display books when the page loads
window.addEventListener('load', fetchAndDisplayBooks);
