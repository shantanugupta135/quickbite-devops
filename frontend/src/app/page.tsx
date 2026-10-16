"use client";

import { useEffect, useMemo, useState } from "react";

type Product = { id:number; name:string; description:string; price:number; category:string; imageUrl:string; available:boolean };
type OrderItem = { id:number; productId:number; productName:string; quantity:number; unitPrice:number };
type Order = { id:number; customerName:string; phone:string; total:number; status:string; createdAt:string; items:OrderItem[] };
type CartLine = { product:Product; quantity:number };

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const money = (value:number) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);

export default function Home() {
  const [products,setProducts] = useState<Product[]>([]);
  const [orders,setOrders] = useState<Order[]>([]);
  const [cart,setCart] = useState<CartLine[]>([]);
  const [tab,setTab] = useState<"menu"|"orders"|"manage">("menu");
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState("");
  const [customerName,setCustomerName] = useState("");
  const [phone,setPhone] = useState("");
  const [editingId,setEditingId] = useState<number|null>(null);
  const [form,setForm] = useState({name:"",description:"",price:"",category:"Meals",imageUrl:"",available:true});

  async function loadProducts() {
    setLoading(true);
    try { const r=await fetch(`${API}/api/products`); if(!r.ok) throw new Error("API unavailable"); setProducts(await r.json()); }
    catch { setMessage("Cannot connect to backend. Start Spring Boot on port 8080."); }
    finally { setLoading(false); }
  }
  async function loadOrders() {
    try { const r=await fetch(`${API}/api/orders`); if(!r.ok) throw new Error(); setOrders(await r.json()); }
    catch { setMessage("Could not load orders. Check backend connection."); }
  }
  useEffect(()=>{ void loadProducts(); },[]);
  const total = useMemo(()=>cart.reduce((sum,line)=>sum+line.product.price*line.quantity,0),[cart]);
  function addToCart(product:Product) {
    setCart(old=>{ const found=old.find(x=>x.product.id===product.id); return found ? old.map(x=>x.product.id===product.id?{...x,quantity:x.quantity+1}:x) : [...old,{product,quantity:1}]; });
    setMessage(`${product.name} added to cart`);
  }
  function changeQty(id:number,delta:number) {
    setCart(old=>old.map(x=>x.product.id===id?{...x,quantity:x.quantity+delta}:x).filter(x=>x.quantity>0));
  }
  async function placeOrder(e:React.FormEvent) {
    e.preventDefault(); setMessage("");
    try {
      const r=await fetch(`${API}/api/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customerName,phone,items:cart.map(x=>({productId:x.product.id,quantity:x.quantity}))})});
      const data=await r.json(); if(!r.ok) throw new Error(data.message||"Could not place order");
      setMessage(`Order #${data.id} placed successfully!`); setCart([]); setCustomerName(""); setPhone(""); await loadOrders(); setTab("orders");
    } catch(err) { setMessage(err instanceof Error?err.message:"Something went wrong"); }
  }
  function startEdit(p:Product) {
    setEditingId(p.id); setForm({name:p.name,description:p.description||"",price:String(p.price),category:p.category,imageUrl:p.imageUrl||"",available:p.available}); setTab("manage");
  }
  async function saveProduct(e:React.FormEvent) {
    e.preventDefault();
    try {
      const r=await fetch(`${API}/api/products${editingId?`/${editingId}`:""}`,{method:editingId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,price:Number(form.price)})});
      if(!r.ok) { const d=await r.json(); throw new Error(d.message||"Could not save product"); }
      setMessage(editingId?"Menu item updated":"Menu item created"); setEditingId(null); setForm({name:"",description:"",price:"",category:"Meals",imageUrl:"",available:true}); await loadProducts();
    } catch(err) { setMessage(err instanceof Error?err.message:"Something went wrong"); }
  }
  async function deleteProduct(id:number) {
    if(!window.confirm("Delete this menu item?")) return;
    try { const r=await fetch(`${API}/api/products/${id}`,{method:"DELETE"}); if(!r.ok) throw new Error("Delete failed"); setProducts(p=>p.filter(x=>x.id!==id)); setMessage("Menu item deleted"); }
    catch { setMessage("Could not delete menu item"); }
  }

  return <main>
    <header className="topbar"><a className="brand" href="#"><span className="brandIcon">Q</span> quickbite<span className="dot">.</span></a><nav><button className={tab==="menu"?"nav active":"nav"} onClick={()=>setTab("menu")}>Explore menu</button><button className={tab==="orders"?"nav active":"nav"} onClick={()=>{setTab("orders");void loadOrders();}}>My orders</button><button className={tab==="manage"?"nav active":"nav"} onClick={()=>setTab("manage")}>Manage menu</button></nav><div className="cartPill">🛍 <span>{cart.reduce((s,x)=>s+x.quantity,0)} items</span></div></header>
    <section className="hero"><div className="heroText"><div className="eyebrow"><span className="liveDot"/> FRESH • FAST • DELICIOUS</div><h1>Good food.<br/><em>Good mood.</em></h1><p>Your cravings, delivered. Discover delicious favourites made fresh and ready to order.</p><button className="primary" onClick={()=>document.getElementById("menu")?.scrollIntoView({behavior:"smooth"})}>Explore the menu <span>↘</span></button><div className="heroStats"><div><b>20<span>+</span></b><small>Menu favourites</small></div><div><b>25<span> min</span></b><small>Average delivery</small></div><div><b>4.8<span>/5</span></b><small>Foodie rating</small></div></div></div><div className="heroVisual"><div className="sunburst">✳</div><div className="foodCircle"><span className="foodEmoji">🍔</span><span className="foodEmoji pizza">🍕</span><span className="foodEmoji fries">🍟</span><span className="foodEmoji drink">🥤</span><div className="foodLabel">MADE WITH LOVE<br/><b>served fresh daily</b></div></div><div className="floatingTag">✦ &nbsp;Your next favourite</div></div></section>
    {message&&<div className="notice" role="status"><span>{message}</span><button onClick={()=>setMessage("")}>×</button></div>}
    <section className="content" id="menu">
      <div className="sectionHeading"><div><div className="eyebrow">THE GOOD STUFF</div><h2>{tab==="menu"?"Find your flavour.":tab==="orders"?"Order history.":"Menu studio."}</h2><p>{tab==="menu"?"Handpicked favourites for every kind of craving.":"A simple view of your QuickBite activity."}</p></div>{tab==="menu"&&<span className="menuCount">{products.filter(p=>p.available).length} tasty choices <span>↗</span></span>}</div>
      {tab==="menu"&&<div className="layout"><div className="productGrid">{loading?<p>Loading menu…</p>:products.filter(p=>p.available).map((p,i)=><article className="productCard" key={p.id}><div className={`productArt art${i%6}`}><span className="artEmoji">{["🍔","🍕","🌯","🍟","🥤","🍰"][i%6]}</span><span className="category">{p.category}</span><button className="quickAdd" aria-label={`Add ${p.name}`} onClick={()=>addToCart(p)}>+</button></div><div className="productInfo"><div><h3>{p.name}</h3><p>{p.description}</p></div><div className="priceRow"><b>{money(p.price)}</b><button className="addButton" onClick={()=>addToCart(p)}>Add to order <span>+</span></button></div></div></article>)}</div><aside className="cartBox"><div className="cartTitle"><div><span className="eyebrow">YOUR SELECTION</span><h3>Your order <span>({cart.reduce((s,x)=>s+x.quantity,0)})</span></h3></div><span className="bagIcon">🛍</span></div>{cart.length===0?<div className="emptyCart"><span>🥡</span><b>Your cart is waiting</b><p>Add something delicious from the menu.</p></div>:<><div className="cartLines">{cart.map(x=><div className="cartLine" key={x.product.id}><div className="miniEmoji">🍽️</div><div className="lineDetails"><b>{x.product.name}</b><small>{money(x.product.price)} each</small><div className="qty"><button onClick={()=>changeQty(x.product.id,-1)}>−</button><span>{x.quantity}</span><button onClick={()=>changeQty(x.product.id,1)}>+</button></div></div><strong>{money(x.product.price*x.quantity)}</strong></div>)}</div><div className="totalLine"><span>Total</span><b>{money(total)}</b></div><form onSubmit={placeOrder} className="checkout"><label>Your name<input required value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="e.g. Aditi Sharma"/></label><label>Phone number<input required minLength={7} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your contact number"/></label><button className="primary full" type="submit">Place order <span>→</span></button><small>Demo checkout • No payment required</small></form></>}</aside></div>}
      {tab==="orders"&&<div className="ordersPanel">{orders.length===0?<div className="emptyCart"><span>🧾</span><b>No orders yet</b><p>Your placed orders will appear here.</p><button className="primary" onClick={()=>setTab("menu")}>Browse menu</button></div>:orders.slice().reverse().map(o=><article className="orderCard" key={o.id}><div className="orderTop"><div><span className="eyebrow">ORDER #{o.id}</span><h3>{o.customerName}</h3><small>{new Date(o.createdAt).toLocaleString()}</small></div><span className="status">{o.status}</span></div><div className="orderItems">{o.items.map(it=><span key={it.id}>{it.quantity} × {it.productName}</span>)}</div><div className="orderBottom"><span>Contact: {o.phone}</span><b>{money(o.total)}</b></div></article>)}</div>}
      {tab==="manage"&&<div className="manageLayout"><form className="manageForm" onSubmit={saveProduct}><span className="eyebrow">ADMIN DEMO</span><h3>{editingId?"Edit menu item":"Add a menu item"}</h3><label>Item name<input required maxLength={100} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Description<input value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><div className="formSplit"><label>Price (₹)<input type="number" required min="1" step="1" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></label><label>Category<input required value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></label></div><label className="checkLabel"><input type="checkbox" checked={form.available} onChange={e=>setForm({...form,available:e.target.checked})}/> Available to order</label><button className="primary full">{editingId?"Save changes":"Create menu item"}</button>{editingId&&<button type="button" className="secondary full" onClick={()=>{setEditingId(null);setForm({name:"",description:"",price:"",category:"Meals",imageUrl:"",available:true});}}>Cancel edit</button>}</form><div className="manageList"><h3>Current menu <span>{products.length} items</span></h3>{products.map(p=><div className="manageRow" key={p.id}><div><b>{p.name}</b><small>{p.category} · {money(p.price)} · {p.available?"Available":"Hidden"}</small></div><div className="rowActions"><button onClick={()=>startEdit(p)}>Edit</button><button className="deleteBtn" onClick={()=>void deleteProduct(p.id)}>Delete</button></div></div>)}</div></div>}
    </section>
    <footer><a className="brand" href="#"><span className="brandIcon">Q</span> quickbite<span className="dot">.</span></a><span>Made fresh for your DevOps capstone · ENSP461</span><span>Built to deliver better <b>✳</b></span></footer>
  </main>;
}
