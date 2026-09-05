const menu=document.getElementById('menu');
const nav=document.getElementById('nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

const langButtons=document.querySelectorAll('[data-set-lang]');
function setLanguage(lang){
  if(!['en','zh'].includes(lang)) lang='en';
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  document.body.dataset.lang=lang;
  document.querySelectorAll('[data-lang]').forEach(el=>{
    el.hidden=el.dataset.lang!==lang;
  });
  langButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.setLang===lang));
  const title=lang==='zh'?'谷博文 | 新疆大学':'Bowen Gu | Xinjiang University';
  document.title=title;
  localStorage.setItem('bg-lang',lang);
  const u=new URL(window.location.href); u.searchParams.set('lang',lang); history.replaceState({},'',u);
}
langButtons.forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.setLang)));
const queryLang=new URLSearchParams(location.search).get('lang');
setLanguage(queryLang || localStorage.getItem('bg-lang') || 'en');
