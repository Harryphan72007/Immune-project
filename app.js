// Shared script for BIOLAQA site
document.addEventListener('DOMContentLoaded',function(){
  // Active nav link
  try{
    const links = document.querySelectorAll('.nav a');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a=>{
      const href = a.getAttribute('href');
      if(href === path) a.classList.add('active');
    });
  }catch(e){/* ignore */}

  // Cart badge logic
  const cartBtn = document.getElementById('cart-btn');
  const cartBadge = document.getElementById('cart-badge');
  if(cartBtn && cartBadge){
    let count = 0;
    const updateBadge = ()=>{
      if(count>0){cartBadge.style.display='inline-block';cartBadge.textContent=count}
      else cartBadge.style.display='none';
    };
    updateBadge();
    cartBtn.addEventListener('click',()=>{
      count++;
      updateBadge();
    });
  }

  // Buy button behavior: increments cart
  const buy = document.getElementById('buy-now');
  if(buy && cartBtn){
    buy.addEventListener('click',()=>cartBtn.click());
  }

  // Digital activation form
  const codeForm = document.getElementById('code-form');
  const codeInput = document.getElementById('code-input');
  const codeMsg = document.getElementById('code-message');
  if(codeForm && codeInput && codeMsg){
    const valid = ['BIO2026','BIOLAQA','CODE123'];
    document.getElementById('activate-btn').addEventListener('click',()=>{
      const v = (codeInput.value||'').trim().toUpperCase();
      if(!v){codeMsg.style.color='crimson';codeMsg.textContent='Vui lòng nhập mã.';return}
      if(valid.includes(v)){
        codeMsg.style.color='green';codeMsg.textContent='Kích hoạt thành công! Cảm ơn bạn.';
      } else {codeMsg.style.color='crimson';codeMsg.textContent='Mã không hợp lệ.'}
    });
  }
});
