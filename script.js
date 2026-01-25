const productsData = [
    { id: 1, name: "Ghế Sofa Velvet Grey", price: 5500000, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", desc: "Sofa vải nhung cao cấp, mang lại cảm giác êm ái và sang trọng." },
    { id: 2, name: "Bàn Trà Gỗ Sồi", price: 2200000, img: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=800&q=80", desc: "Bàn trà được làm từ gỗ sồi tự nhiên, thiết kế tối giản." },
    { id: 3, name: "Kệ Sách Gỗ Tự Nhiên", price: 3400000, img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80", desc: "Kệ sách nhiều tầng, chắc chắn, phù hợp trang trí phòng làm việc." }
];

let cart = [];

function init() {
    const list = document.getElementById('product-list');
    if(!list) return;
    list.innerHTML = productsData.map(p => `
        <div class="product-card">
            <img src="${p.img}" onclick="openModal(${p.id})">
            <h3 onclick="openModal(${p.id})">${p.name}</h3>
            <p>${p.price.toLocaleString()}đ</p>
            <button class="add-btn" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
        </div>
    `).join('');
}

// Modal Logic
function openModal(id) {
    const p = productsData.find(i => i.id === id);
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalTitle').innerText = p.name;
    document.getElementById('modalPrice').innerText = p.price.toLocaleString() + "đ";
    document.getElementById('modalDesc').innerText = p.desc;
    document.getElementById('modalAddBtn').onclick = () => { addToCart(p.id); closeModal(); };
    document.getElementById('productModal').style.display = 'block';
}

function closeModal() { document.getElementById('productModal').style.display = 'none'; }

// Cart Logic
function addToCart(id) {
    const p = productsData.find(item => item.id === id);
    cart.push(p);
    updateCartUI();
    toggleCart(true);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    let total = 0;
    list.innerHTML = cart.map((item, idx) => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()}đ</p>
                    <small onclick="removeFromCart(${idx})" style="color:red; cursor:pointer">Xóa</small>
                </div>
            </div>`;
    }).join('');
    document.getElementById('cart-total').innerText = total.toLocaleString() + "đ";
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

function toggleCart(show = null) {
    const s = document.getElementById('cartSidebar');
    if(show === true) s.classList.add('active');
    else if(show === false) s.classList.remove('active');
    else s.classList.toggle('active');
}

window.onclick = function(event) {
    let modal = document.getElementById('productModal');
    if (event.target == modal) closeModal();
}

init();