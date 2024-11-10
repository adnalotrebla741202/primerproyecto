// Datos de productos
const products = [
    { id: 1, name: 'Chalupas', price: 46.00 },
    { id: 2, name: 'Chancla', price: 50.00 },
    { id: 3, name: 'Memela', price: 38.00 },
    { id: 4, name: 'Pelona', price: 31.00 },
    { id: 5, name: 'Atole', price: 25.00 },
    { id: 6, name: 'Café', price: 28.00 },
    { id: 7, name: 'Coca Cola', price: 30.00 },
    { id: 8, name: 'Lassi', price: 40.00 },
];

let cart = [];

// Función para mostrar el carrito
const updateCart = () =>
{
    const cartList = document.querySelector('.cart__items');
    const cartTotal = document.querySelector('.cart__total');
    const checkoutButton = document.querySelector('.cart__checkout');
    const clearButton = document.querySelector('.cart__clear');
    const cartIndicator = document.querySelector('.cart__indicator');
    
    // Limpiar el carrito
    cartList.innerHTML = '';

    let total = 0;
    let itemCount = 0; 

    // Mostrar artículos en el carrito
    cart.forEach(item => 
    {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart__item');
        cartItem.innerHTML = `
            ${item.name}
            $${item.price.toFixed(2)}
            <span class="cart__item-quantity">x${item.quantity}</span>
            <button class="cart__remove-item" data-id="${item.id}">Eliminar</button>
        `;
        cartList.appendChild(cartItem);
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    // Actualizar el total
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Actualizar el indicador de cantidad
    if (itemCount > 0) 
    {
        cartIndicator.textContent = itemCount;
        cartIndicator.style.display = 'inline-block';  // Mostrar el indicador
    } 
    else 
    {
        cartIndicator.style.display = 'none';  // Ocultar el indicador si no hay artículos
    }

    // Habilitar/deshabilitar botones
    if (cart.length > 0) 
    {
        checkoutButton.disabled = false;
        clearButton.disabled = false;
    } 
    else 
    {
        checkoutButton.disabled = true;
        clearButton.disabled = true;
    }

    return total;
}

// Función para agregar al carrito
document.querySelectorAll('.product__add-to-cart').forEach(button => 
{
    button.addEventListener('click', (event) => 
    {
        const productId = parseInt(event.target.dataset.id);
        const product = products.find(p => p.id === productId);

        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) 
        {
            existingItem.quantity += 1;
        } 
        else 
        {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    });
});

// Función para eliminar artículo del carrito
document.querySelector('.cart__items').addEventListener('click', (event) => 
{
    if (event.target.classList.contains('cart__remove-item')) 
    {
        const productId = parseInt(event.target.dataset.id);
        const product = cart.find(item => item.id === productId);
        
        // Eliminar un producto o eliminarlo si la cantidad es 1
        if (product.quantity > 1) 
        {
            product.quantity -= 1;
        } 
        else 
        {
            cart = cart.filter(item => item.id !== productId);
        }

        updateCart();
    }
});

// Función para vaciar el carrito
document.querySelector('.cart__clear').addEventListener('click', () => 
{
    cart = [];
    updateCart();
});

// Función para confirmar compra
document.querySelector('.cart__checkout').addEventListener('click', () => 
{
    if (cart.length > 0) 
    {
        alert('Compra confirmada.');
        alert(`El total de la compra es de $${updateCart()}.`);
        cart = [];
        updateCart();
        document.querySelector('.cart').classList.remove('cart--visible');
    } 
    else 
    {
        alert('El carrito está vacío');
    }
});

// Función para mostrar/ocultar el carrito
document.querySelector('.header__cart-toggle').addEventListener('click', () => 
{
    document.querySelector('.cart').classList.add('cart--visible');
});

document.querySelector('.cart__close').addEventListener('click', () => 
{
    document.querySelector('.cart').classList.remove('cart--visible');
});
