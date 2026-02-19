(() => {
  const $ = (s, el=document) => el.querySelector(s);
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav__link").forEach(a => {
    if ((a.getAttribute("href") || "").toLowerCase() === current) a.classList.add("is-active");
  });

  const cartBtn = $("#cart-btn");
  const badge = $("#cart-badge");
  const getCount = () => Number(sessionStorage.getItem("cartCount") || "0");
  const setCount = (n) => sessionStorage.setItem("cartCount", String(n));
  const render = () => {
    if (!badge) return;
    const n = getCount();
    if (n > 0) { badge.style.display = "grid"; badge.textContent = String(n); }
    else { badge.style.display = "none"; badge.textContent = "0"; }
  };
  render();
  cartBtn?.addEventListener("click", () => { setCount(getCount()+1); render(); });

  $("#buy-now")?.addEventListener("click", () => cartBtn?.click());

  const formatVND = (n) => new Intl.NumberFormat("vi-VN").format(n) + "đ";

  async function loadDB(){
    try{
      const r = await fetch("/api/db");
      if(!r.ok) throw new Error("bad");
      return await r.json();
    }catch{ return null; }
  }

  function initIndex(db){
    const team = $("#team-list");
    if (team && db.about?.team){
      team.innerHTML = db.about.team.map(name => {
        const initials = name.split(" ").filter(Boolean).slice(-2).map(w=>w[0]).join("").toUpperCase();
        return `<div class="person"><div class="avatar" aria-hidden="true">${initials}</div><div class="personName">${name}</div></div>`;
      }).join("");
    }
    const about = $("#about-text");
    if (about) about.textContent = db.about.text;
  }

  function initProduct(db){
    const img = $("#product-image");
    if (img && db.product?.image) img.src = db.product.image;
    const price = $("#product-price");
    if (price) price.textContent = formatVND(db.product.priceVND);
    const desc = $("#product-desc");
    if (desc) desc.textContent = db.product.shortDesc;
    const spec = $("#spec-table");
    if (spec && db.product?.specs){
      spec.innerHTML = Object.entries(db.product.specs).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");
    }
    const grid = $("#components-grid");
    if (grid && db.product?.components){
      grid.innerHTML = db.product.components.map(c => `
        <div class="tile">
          <div class="tileImg">${c.img ? `<img src="${c.img}" alt="${c.label}" style="max-width:100%;max-height:100%;border-radius:12px">` : "ẢNH SẢN PHẨM"}</div>
          <div class="tileLabel">${c.label}</div>
        </div>
      `).join("");
    }
  }

  function initContact(db){
    const p = $("#contact-phone"); if (p) p.textContent = db.contact.phone;
    const e = $("#contact-email"); if (e) e.textContent = db.contact.email;
    const fb = $("#contact-fb"); if (fb){ fb.href = db.contact.facebook; fb.textContent = db.contact.facebook; }
    const tt = $("#contact-tt"); if (tt){ tt.href = db.contact.tiktok; tt.textContent = db.contact.tiktok; }
  }

  function initFooter(db){
    const fp = $("#foot-phone"); if (fp) fp.textContent = db.contact.phone;
    const fe = $("#foot-email"); if (fe) fe.textContent = db.contact.email;
  }

  async function hydrate(){
    const db = await loadDB();
    if(!db) return;
    initFooter(db);
    if (current === "index.html") initIndex(db);
    if (current === "product.html") initProduct(db);
    if (current === "contact.html") initContact(db);
  }
  hydrate();

  $("#code-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = $("#code-input");
    const msg = $("#code-message");
    const code = (input?.value || "").trim();
    if(!msg) return;
    if(!code){ msg.textContent="Vui lòng nhập code."; msg.style.color="crimson"; return; }
    msg.textContent="Đang kiểm tra..."; msg.style.color="#111827";
    try{
      const r = await fetch("/api/activate", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ code })
      });
      const data = await r.json();
      if (data.ok){ msg.textContent="✅ Kích hoạt thành công!"; msg.style.color="green"; }
      else { msg.textContent="❌ Code không hợp lệ."; msg.style.color="crimson"; }
    }catch{
      msg.textContent="❌ Không kết nối được server."; msg.style.color="crimson";
    }
  });
})();