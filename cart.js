// Function to open the cart sidebar
function openSidebar() {
    document.getElementById("cartSidebar").classList.add("open");
}

// Function to close the cart sidebar
function closeSidebar() {
    document.getElementById("cartSidebar").classList.remove("open");
}

let cart = []; // Cart array

// Function to add items to cart
function addToCart(productId) {
    const productCard = document.getElementById(productId);
    
    // Check if the productCard is found
    if (!productCard) {
        console.error("Product card not found");
        return;
    }

    // Get product details
    const productTitle = productCard.querySelector('.card-title').textContent;
    const productPrice = productCard.querySelector('.card-price').textContent;
    const productImage = productCard.querySelector('.card-img-top').src;

    // Create a product object
    const product = {
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
    };

    // Add the product to the cart array
    cart.push(product);

    // Update the cart UI and sidebar
    updateCartUI();
    openSidebar();
    updateEmptyCartMessage();

    // Disable the add-to-cart button
    disableCardButton(productId);
}

// Function to retrieve product card and disable its link button
function disableCardButton(productId) {
    const productCard = document.getElementById(productId);
    
    if (productCard) {
        const button = productCard.querySelector('.add_to_cart_button');

        if (button) {
            // Add class and disable button
            button.classList.add('disabled-class');
            button.onclick = (event) => event.preventDefault();
            console.log(`Product ${productId} button disabled.`);
        } else {
            console.warn(`Button for product ${productId} not found.`);
        }
    } else {
        console.warn(`Product card with ID ${productId} not found.`);
    }
}

// Function to update the empty cart message
function updateEmptyCartMessage() {
    const emptyCart = document.getElementById('empty_cart');
    emptyCart.innerText = cart.length === 0 ? 'Your Cart Is Empty' : 'Your Added Items';
}

// Function to update the cart UI
function updateCartUI() {
    const cartCounter = document.getElementById('cart-counter');
    const cartCounterSidebar = document.getElementById('cart-counter-sidebar');
    
    // Update cart item count in the main and sidebar counters
    if (cartCounter) cartCounter.innerText = cart.length;
    if (cartCounterSidebar) cartCounterSidebar.innerText = cart.length;

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    // Populate the cart items in the sidebar
    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // Initialize item count
        let itemCount = 1; // Default count

        // Function to update the displayed price based on count
        const updatePriceDisplay = () => {
            priceDisplay.innerText = ` $${item.price * itemCount}`;
            countDisplay.innerText = itemCount; // Update the count display
        };

        // Create HTML structure for the cart item
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.title}" class="sidebarCardImg"> 
                <div class='cart-header-price-cotainer'>
                <h5>${item.title}</h5>
                <p>${item.price}$/each</p>
                <div class="increment_button">
                    <button class="decrement icrement_decrement_button"><</button>
                    <span class="count">1</span>
                    <button class="increment icrement_decrement_button">></button>
                </div>
                </div>
                
                <p class="price-display total_price">$${item.price}</p>
                <button class="remove_button" onclick="removeFromCart('${item.id}')"><i class="fa fa-trash" aria-hidden="true"></i>
</button>
            </div>
        `;

        // Select the newly created elements
        const countDisplay = cartItem.querySelector('.count');
        const priceDisplay = cartItem.querySelector('.price-display');
        const incrementButton = cartItem.querySelector('.increment');
        const decrementButton = cartItem.querySelector('.decrement');

        // Update displayed price
        updatePriceDisplay();

        // Add event listeners for increment and decrement buttons
        incrementButton.addEventListener('click', () => {
            itemCount++;
            updatePriceDisplay();
        });

        decrementButton.addEventListener('click', () => {
            if (itemCount > 1) { // Prevent negative count
                itemCount--;
                updatePriceDisplay();
            }
        });

        // Append the cart item to the cart items container
        cartItemsContainer.appendChild(cartItem);
    });
}


// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI(); 
    updateEmptyCartMessage(); 

    // Re-enable the add-to-cart button after removing the item
    enableCardButton(productId);
}

// Function to re-enable button and remove disabled class within a specific card
function enableCardButton(cardId) {
    const card = document.getElementById(cardId);

    if (card) {
        const button = card.querySelector('.add_to_cart_button');

        if (button) {
            button.classList.remove('disabled-class');
            button.onclick = () => addToCart(cardId); // Reattach the onclick event
        } else {
            console.warn(`Button not found in card with ID: ${cardId}`);
        }
    } else {
        console.warn(`Card with ID ${cardId} not found.`);
    }
}
