const DEFAULT_PRODUCTS=[{id:1,name:"Fone Bluetooth Premium",price:129.9,cost:45,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",category:"Eletrônicos"},{id:2,name:"Relógio Minimalista Aço",price:189.9,cost:70,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",category:"Acessórios"},{id:3,name:"Luminária LED Moderna",price:99.9,cost:32,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",category:"Casa"},{id:4,name:"Mochila Urbana Impermeável",price:159.9,cost:58,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",category:"Acessórios"}];
const store={get products(){return JSON.parse(localStorage.getItem("thom_products")||"null")||DEFAULT_PRODUCTS},set products(v){localStorage.setItem("thom_products",JSON.stringify(v))},get cart(){return JSON.parse(localStorage.getItem("thom_cart")||"[]")},set cart(v){localStorage.setItem("thom_cart",JSON.stringify(v))}};
let cart=store.cart;
const $=s=>document.querySelector(s);
const brl=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function save(){store.products=products;store.cart=cart;render()}
let products=store.products;
function render(){
 const q=($("#search")?.value||"").toLowerCase();const cat=$("#category")?.value||"";
 const cats=[...new Set(products.map(p=>p.category).filter(Boolean))];
 if($("#category")){$("#category").innerHTML='<option value="">Todas as categorias</option>'+cats.map(c=>`<option ${c===cat?"selected":""}>${c}</option>`).join("")}
 const list=products.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(!cat||p.category===cat));
 $("#grid").innerHTML=list.map(p=>`<article class="card"><img src="${p.image||"https://placehold.co/800x600?text=Produto"}" alt=""><div class="card-body"><span class="tag">${p.category||"Geral"}</span><h3>${p.name}</h3><div class="price">${brl(p.price)}</div><button onclick="addToCart(${p.id})">Adicionar ao carrinho</button></div></article>`).join("")||"<p>Nenhum produto encontrado.</p>";
 $("#cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
 $("#cartItems").innerHTML=cart.map(i=>{const p=products.find(x=>x.id===i.id);return p?`<div class="cart-item"><img src="${p.image}"><div><strong>${p.name}</strong><br><small>${i.qty} × ${brl(p.price)}</small></div><button onclick="removeFromCart(${p.id})">×</button></div>`:""}).join("");
 $("#cartTotal").textContent=brl(cart.reduce((s,i)=>{const p=products.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0)},0));
 $("#adminList").innerHTML=products.map(p=>`<div class="admin-item"><div><strong>${p.name}</strong><br><small>${p.category||"Geral"} · custo ${brl(p.cost||0)}</small></div><div><strong>${brl(p.price)}</strong> <button onclick="deleteProduct(${p.id})">Excluir</button></div></div>`).join("");
}
window.addToCart=id=>{const i=cart.find(x=>x.id===id);i?i.qty++:cart.push({id,qty:1});save();$("#cart").classList.add("open")};
window.removeFromCart=id=>{cart=cart.filter(x=>x.id!==id);save()};
window.deleteProduct=id=>{products=products.filter(p=>p.id!==id);cart=cart.filter(c=>c.id!==id);save()};
$("#openCart").onclick=()=>$("#cart").classList.add("open");
$("#closeCart").onclick=()=>$("#cart").classList.remove("open");
$("#search").oninput=render;$("#category").onchange=render;
$("#productForm").onsubmit=e=>{e.preventDefault();products.push({id:Date.now(),name:$("#pName").value,price:+$("#pPrice").value,cost:+$("#pCost").value||0,image:$("#pImage").value,category:$("#pCategory").value||"Geral"});e.target.reset();save()};
$("#checkout").onclick=()=>{if(!cart.length)return alert("Carrinho vazio.");const lines=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `• ${p.name} — ${i.qty}x — ${brl(p.price*i.qty)}`}).join("\n");const total=cart.reduce((s,i)=>{const p=products.find(x=>x.id===i.id);return s+p.price*i.qty},0);const msg=`Olá! Quero comprar:\n${lines}\n\nTotal: ${brl(total)}`;open(`https://wa.me/?text=${encodeURIComponent(msg)}`)};
$("#year").textContent=new Date().getFullYear();render();