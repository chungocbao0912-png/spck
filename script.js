const productsData = [
    // GHẾ
    { id: 1, name: "Ghế Sofa Velvet Grey", price: 5500000, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", category: "ghế", desc: "Nhung cao cấp êm ái cho phòng khách." },
    { id: 2, name: "Ghế Lounge Scandinavian", price: 3200000, img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800", category: "ghế", desc: "Gỗ sồi nhập khẩu từ Đan Mạch." },
    // BÀN
    { id: 3, name: "Bàn Trà Marble Gold", price: 4200000, img: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=800", category: "bàn", desc: "Mặt đá vân mây kết hợp chân đồng." },
    { id: 4, name: "Bàn Ăn Studio Wood", price: 8900000, img: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800", category: "bàn", desc: "Bàn ăn gỗ sồi nguyên khối lớn." },
    { id: 11, name: "Bàn Làm Việc Office", price: 2500000, img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800", category: "bàn", desc: "Thiết kế tối ưu cho sự tập trung." },
    // KỆ
    { id: 5, name: "Kệ Sách Tree Wall", price: 3100000, img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800", category: "kệ", desc: "Kệ treo tường hình cây độc đáo." },
    { id: 9, name: "Kệ Industrial Iron", price: 2800000, img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800", category: "kệ", desc: "Sắt sơn tĩnh điện và gỗ tự nhiên." },
    // TỦ
    { id: 7, name: "Tủ Quần Áo Luxury", price: 8500000, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800", category: "tủ", desc: "Tủ MDF cánh kính cực sang." },
    { id: 10, name: "Tủ Sideboard Vintage", price: 7200000, img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800", category: "tủ", desc: "Đựng đồ trang trí phòng khách." }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function init() {
    renderHeader();
    renderProducts(productsData);
    updateCartUI();
}

function renderHeader() {
    const user = localStorage.getItem('user');
    const header = document.getElementById('header-container');
    header.innerHTML = `
        <div class="top-bar"><span>MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC</span><span>1900 1234</span></div>
        <div class="header-main">
            <a href="index.html" class="logo">MINIMAL.</a>
            <div style="display:flex; align-items:center; gap:25px;">
                <span onclick="toggleCart(true)" style="cursor:pointer; font-weight:600;">🛒 Giỏ hàng (<span id="cart-count">0</span>)</span>
                ${user ? `<span>Chào, <strong>${user}</strong> | <a href="#" onclick="localStorage.clear(); location.reload();" style="color:red; text-decoration:none">Thoát</a></span>` 
                       : `<a href="login.html" style="text-decoration:none; color:#111; font-weight:600">ĐĂNG NHẬP</a>`}
            </div>
        </div>`;
}

function renderProducts(items) {
    const list = document.getElementById('product-list');
    list.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" onclick="openModal(${p.id})">
            <h4 style="margin:15px 0 5px; font-weight:500">${p.name}</h4>
            <p style="color:#c19a6b; font-weight:600">${p.price.toLocaleString()}đ</p>
            <button class="buy-btn" onclick="addToCart(${p.id})">MUA NGAY</button>
        </div>`).join('');
}

function openModal(id) {
    const p = productsData.find(i => i.id === id);
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalTitle').innerText = p.name;
    document.getElementById('modalPrice').innerText = p.price.toLocaleString() + "đ";
    document.getElementById('modalDesc').innerText = p.desc;
    document.getElementById('modalAddBtn').onclick = () => { addToCart(p.id); closeModal(); };
    document.getElementById('productModal').style.display = 'flex';
}

function closeModal() { document.getElementById('productModal').style.display = 'none'; }
function toggleCart(open) { document.getElementById('cartSidebar').classList.toggle('active', open); }

function addToCart(id) {
    if(!localStorage.getItem('user')) { location.href="login.html"; return; }
    const p = productsData.find(i => i.id === id);
    const exist = cart.find(i => i.id === id);
    if(exist) exist.quantity++; else cart.push({...p, quantity: 1});
    updateCartUI(); toggleCart(true);
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.quantity += delta;
        if(item.quantity <= 0) cart = cart.filter(i => i.id !== id);
        updateCartUI();
    }
}

function updateCartUI() {
    localStorage.setItem('cart', JSON.stringify(cart));
    let total = 0, count = 0;
    document.getElementById('cart-items-container').innerHTML = cart.map(item => {
        total += item.price * item.quantity; count += item.quantity;
        return `
        <div class="cart-item">
            <img src="${item.img}" style="width:65px; height:65px; object-fit:cover;">
            <div style="flex:1;">
                <p style="font-weight:600; font-size:12px;">${item.name}</p>
                <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <p style="font-size:12px;">${(item.price * item.quantity).toLocaleString()}đ</p>
        </div>`;
    }).join('');
    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total-price').innerText = total.toLocaleString() + "đ";
}

function filterCategory(cat) { renderProducts(cat === 'all' ? productsData : productsData.filter(p => p.category === cat)); }

init();