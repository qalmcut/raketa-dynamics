/* ==========================================================================
   RAKETA DYNAMICS — GLOBAL CART CONTROLLER (Syncs across all pages)
   ========================================================================== */

let raketaCart = JSON.parse(localStorage.getItem('raketa_cart') || '[]');

function updateCartUI() {
    const counter = document.getElementById('cart-counter');
    if (counter) counter.innerText = raketaCart.length;

    const container = document.getElementById('cart-items');
    const totalElem = document.getElementById('cart-total');
    if (!container) return;

    if (raketaCart.length === 0) {
        container.innerHTML = '<p class="cart-empty-msg" style="color: #a0a5a0; font-family: \'Share Tech Mono\', monospace; padding: 20px 0;">Your cart is currently empty.</p>';
        if (totalElem) totalElem.innerText = '£0.00';
        return;
    }

    let total = 0;
    container.innerHTML = raketaCart.map((item, idx) => {
        total += item.price;
        return `
            <div class="cart-item-row">
                <div>
                    <h4>${item.name}</h4>
                    <span class="cart-item-meta">${item.line} — £${item.price.toFixed(2)}</span>
                </div>
                <button class="cart-remove-btn" onclick="removeFromCart(${idx})">REMOVE</button>
            </div>
        `;
    }).join('');

    if (totalElem) totalElem.innerText = `£${total.toFixed(2)}`;
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
        drawer.classList.toggle('is-open');
        backdrop.classList.toggle('is-open');
    }
}

function addToCart(name, price, line) {
    raketaCart.push({ name, price, line });
    localStorage.setItem('raketa_cart', JSON.stringify(raketaCart));
    updateCartUI();
    toggleCart();
}

function removeFromCart(idx) {
    raketaCart.splice(idx, 1);
    localStorage.setItem('raketa_cart', JSON.stringify(raketaCart));
    updateCartUI();
}

document.addEventListener('DOMContentLoaded', updateCartUI);
