const $ = (s) => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let step = 0, index = 0, config = {friendName:'Bạn thân',photos:['/assets/images/friend1.jpg','/assets/images/friend2.jpg','/assets/images/friend3.jpg'],music:{}};
let soundOn = false, lastWish = '', letterTimer = null;
const trollLines = ['Đây là nhân vật khiến tao đau đầu mỗi ngày! 😂','Xinh thì có xinh, nhưng độ báo thì vô cực!','Bạn thân phiên bản giới hạn, không nhận đổi trả!','20/10 rồi, cho phép mày làm công chúa đúng một ngày!'];
const letterLines = ['Nãy giờ troll mày thế đủ rồi...','Thật ra tao chỉ muốn nói...','Cảm ơn vì đã trở thành bạn thân của tao.','Mong mày luôn vui vẻ, mạnh mẽ và hạnh phúc.','Dù đôi lúc hay trêu chọc nhau, tao vẫn luôn trân trọng tình bạn này.'];
async function api(url){const response = await fetch(url,{cache:'no-store'});if(!response.ok)throw Error('API lỗi '+response.status);return response.json();}
function animate(el, props){if(!reduced && window.gsap)gsap.fromTo(el,{opacity:0,y:24},{opacity:1,y:0,duration:.65,...props});}
function confettiPop(){if(!reduced && window.confetti)confetti({particleCount:95,spread:75,origin:{y:.65},colors:['#ffb1d2','#ffffff','#c2a2ff','#ffe5aa']});}
function musicForScene(){const audio=$('#music');const url=step===5?config.music?.emotional:config.music?.happy;if(!soundOn||!url){audio.pause();return;}if(!audio.src.endsWith(url)){audio.src=url;audio.load();}audio.play().catch(()=>{$('#sound').textContent='🔇 Nhạc không khả dụng';});}
function show(n){clearInterval(letterTimer);step=n;document.querySelectorAll('.scene').forEach((el,i)=>{el.classList.toggle('active',i===n);el.setAttribute('aria-hidden',String(i!==n));});window.scrollTo(0,0);animate($('.scene.active').querySelector('h1,h2,.letter'));musicForScene();if(n===5)startLetter();}
async function start(){const b=$('#begin');b.disabled=true;const lines=['Đang quét độ xinh đẹp... 🔍','Đang kiểm tra độ báo... 📊','Phát hiện bạn thân hệ bất ổn... 🚨','KẾT QUẢ: 100% BÁO THỦ 🤡'];for(const line of lines){$('#scan').textContent=line;await new Promise(r=>setTimeout(r,reduced?150:850));}confettiPop();show(1);}
function photoRender(){const src=config.photos[index];$('#photo').hidden=false;$('#photoFallback').hidden=true;$('#photo').src=src;$('#counter').textContent=`${index+1} / ${config.photos.length}`;}
function photoError(img,fallback){img.hidden=true;fallback.hidden=false;}
function troll(){const line=trollLines[Math.floor(Math.random()*trollLines.length)];$('#troll').textContent=line;const card=$('#polaroid');if(!reduced && window.gsap)gsap.fromTo(card,{rotation:-10},{rotation:5,duration:.18,yoyo:true,repeat:3});}
function startLetter(){const el=$('#letter');el.textContent='';let i=0;function next(){if(i>=letterLines.length){clearInterval(letterTimer);confettiPop();return;}el.textContent+=(i?'\n\n':'')+letterLines[i++];animate(el);}next();letterTimer=setInterval(next,reduced?250:1900);}
$('#begin').addEventListener('click',start);
document.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>{confettiPop();show(Math.min(step+1,5));}));
$('#prev').addEventListener('click',()=>{index=(index-1+config.photos.length)%config.photos.length;photoRender();});
$('#nextPhoto').addEventListener('click',()=>{index=(index+1)%config.photos.length;photoRender();});
$('#polaroid').addEventListener('click',troll);
$('#polaroid').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();troll();}});
$('#photo').addEventListener('error',()=>photoError($('#photo'),$('#photoFallback')));
$('#finalPhoto').addEventListener('error',()=>photoError($('#finalPhoto'),$('#finalFallback')));
$('#yes').addEventListener('click',()=>{$('#gameResult').textContent='Biết ngay mà! 🤣';confettiPop();setTimeout(()=>show(4),reduced?150:1000);});
const no=$('#no');let dodges=0;function dodge(){if(reduced)return;dodges++;no.style.transform=`translate(${Math.round((Math.random()-.5)*100)}px,${Math.round((Math.random()-.5)*60)}px)`;if(dodges>4)$('#gameResult').textContent='Thôi tha cho mày, có nút bỏ qua phía dưới 😌';}
no.addEventListener('pointerenter',dodge);no.addEventListener('click',()=>{$('#gameResult').textContent='Không cũng được, tình bạn vẫn nguyên vẹn 😎';setTimeout(()=>show(4),650);});
$('#skip').addEventListener('click',()=>show(4));
$('#getWish').addEventListener('click',async()=>{const btn=$('#getWish');btn.disabled=true;$('#wish').textContent='Đang mở hộp quà... ✨';try{let data=await api('/api/wishes/random');if(data.wish===lastWish){const all=await api('/api/wishes');data.wish=all.wishes.find(w=>w!==lastWish)||data.wish;}lastWish=data.wish;$('#wish').textContent=data.wish;animate($('#wish'));confettiPop();}catch(e){$('#wish').textContent='Mất kết nối rồi! Thử lại nhé 💗';}finally{btn.disabled=false;}});
$('#replay').addEventListener('click',()=>{$('#scan').textContent='';$('#begin').disabled=false;$('#gameResult').textContent='';show(0);});
$('#sound').addEventListener('click',()=>{soundOn=!soundOn;$('#sound').setAttribute('aria-pressed',String(soundOn));$('#sound').textContent=soundOn?'🔊 Tắt nhạc':'🔇 Bật nhạc';musicForScene();});
// Cấu hình ảnh và tên lấy từ index.html, không bị API ghi đè.
(() => {
  const settings = window.SURPRISE_SETTINGS || {};
  config = { ...config, ...settings };
  if (!Array.isArray(config.photos) || config.photos.length === 0) {
    config.photos = ['/assets/images/friend1.jpg'];
  }
  $('#friendName').textContent = config.friendName || 'Bạn thân';
  photoRender();
  $('#finalPhoto').src = config.photos[0];
})();
