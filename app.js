
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});


const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; 

    if (products.length > 0) {
        products.forEach(product => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;

            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="addCart">Add To Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCart')) {
        const productId = event.target.closest('.item').dataset.id;
        addToCart(productId);
    }
});


const addToCart = (productId) => {
    const index = cart.findIndex(item => item.product_id === productId);

    if (index === -1) {
        cart.push({ product_id: productId, quantity: 1 });
    } else {
        cart[index].quantity += 1;
    }

    addCartToHTML();
    addCartToMemory();
};


const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};


const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.product_id);
        if (product) {
            totalQuantity += item.quantity;

            const newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            newItem.innerHTML = `
                <div class="image"><img src="${product.image}" alt=""></div>
                <div class="name">${product.name}</div>
                <div class="totalPrice">$${(product.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus">&lt;</span>
                    <span>${item.quantity}</span>
                    <span class="plus">&gt;</span>
                </div>
            `;

            listCartHTML.appendChild(newItem);
        }
    });

    iconCartSpan.innerText = totalQuantity;
};


listCartHTML.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('minus') || target.classList.contains('plus')) {
        const productId = target.closest('.item').dataset.id;
        const type = target.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(productId, type);
    }
});

const changeQuantityCart = (productId, type) => {
    const index = cart.findIndex(item => item.product_id === productId);
    if (index !== -1) {
        if (type === 'plus') {
            cart[index].quantity += 1;
        } else {
            cart[index].quantity -= 1;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1); 
            }
        }

        addCartToHTML();
        addCartToMemory();
    }
};


const initApp = () => {
    fetch('products.json')
        .then(res => res.json())
        .then(data => {
            products = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => {
            console.error("Error loading products.json. Make sure you're using a local server.");
        });
};

initApp();
