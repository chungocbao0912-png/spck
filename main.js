const products = [
  {
    id:1,
    name:"Sofa gỗ cao cấp",
    price:5500000,
    material:"Gỗ sồi",
    desc:"Sofa thiết kế hiện đại, bền chắc.",
    img:"https://images.unsplash.com/photo-1582582494700-5dd7b6c03d7b"
  },
  {
    id:2,
    name:"Bàn ăn gia đình",
    price:3200000,
    material:"Gỗ tự nhiên",
    desc:"Phù hợp cho gia đình 4–6 người.",
    img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  }
];

function renderProducts(){
  const list=document.getElementById("productList");
  list.innerHTML="";
  products.forEach(p=>{
    list.innerHTML+=`
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString()} đ</p>
        <a href="product.html?id=${p.id}">Xem chi tiết</a>
      </div>`;
  });
}

function renderDetail(){
  const id=new URLSearchParams(location.search).get("id");
  const p=products.find(x=>x.id==id);
  detail.innerHTML=`
    <img src="${p.img}">
    <div>
      <h2>${p.name}</h2>
      <p><b>Giá:</b> ${p.price.toLocaleString()} đ</p>
      <p><b>Chất liệu:</b> ${p.material}</p>
      <p>${p.desc}</p>
      <button onclick="addCart(${p.id})">Thêm vào giỏ</button>
    </div>`;
}

function addCart(id){
  let cart=JSON.parse(localStorage.getItem("cart")||"[]");
  cart.push(products.find(p=>p.id===id));
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Đã thêm vào giỏ");
}

function renderCart(){
  let cart=JSON.parse(localStorage.getItem("cart")||"[]");
  let sum=0;
  cartList.innerHTML="";
  cart.forEach(p=>{
    sum+=p.price;
    cartList.innerHTML+=`<p>${p.name} - ${p.price.toLocaleString()} đ</p>`;
  });
  total.innerText="Tổng tiền: "+sum.toLocaleString()+" đ";
}
