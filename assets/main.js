const menu=document.getElementById('menu');
const nav=document.getElementById('nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

function langSpan(en,zh){return `<span data-lang="en">${en}</span><span data-lang="zh" hidden>${zh}</span>`;}
function renderNews(){document.getElementById('news-list').innerHTML=(window.NEWS||[]).map(n=>`<article><time>${n.date}</time><p data-lang="en">${n.enHtml}</p><p data-lang="zh" hidden>${n.zhHtml}</p></article>`).join('');}
function renderPub(p,kind){const label=p.label?`<div class="pub-label">${p.label}</div>`:'';const links=(p.links||[]).length?`<div class="pub-links">${p.links.map(x=>`<a href="${x.url}">${x.label} ↗</a>`).join('')}</div>`:'';const topics=(p.topics||[]).join(' ');return `<article data-year="${p.year}" data-kind="${kind}" data-topics="${topics}" data-selected="${p.label?1:0}"><div class="year">${p.year}</div><div>${label}<h3>${p.title}</h3><p>${p.authorsHtml}</p><p class="venue">${p.venueHtml}</p>${links}</div></article>`;}
let pubState={topic:'all',year:'all',query:''};
function renderPublications(){const d=window.PUBLICATIONS||{};['journals','conferences','chinese'].forEach(k=>{const el=document.getElementById('pub-'+k);if(el)el.innerHTML=(d[k]||[]).map(p=>renderPub(p,k)).join('');});initPublicationFilters();applyPublicationFilters();}
function initPublicationFilters(){const year=document.getElementById('pub-year');if(!year||year.dataset.ready)return;const years=[...new Set(Object.values(window.PUBLICATIONS||{}).flat().map(p=>p.year))].sort((a,b)=>Number(b)-Number(a));year.innerHTML=`<option value="all">All</option>`+years.map(y=>`<option value="${y}">${y}</option>`).join('');year.dataset.ready='1';document.querySelectorAll('[data-pub-filter]').forEach(b=>b.addEventListener('click',()=>{pubState.topic=b.dataset.pubFilter;document.querySelectorAll('[data-pub-filter]').forEach(x=>x.classList.toggle('active',x===b));applyPublicationFilters();}));year.addEventListener('change',()=>{pubState.year=year.value;applyPublicationFilters();});const search=document.getElementById('pub-search');search.addEventListener('input',()=>{pubState.query=search.value.trim().toLowerCase();applyPublicationFilters();});document.getElementById('pub-reset').addEventListener('click',()=>{pubState={topic:'all',year:'all',query:''};year.value='all';search.value='';document.querySelectorAll('[data-pub-filter]').forEach(b=>b.classList.toggle('active',b.dataset.pubFilter==='all'));applyPublicationFilters();});}
function applyPublicationFilters(){let shown=0,total=0;document.querySelectorAll('.pubs article').forEach(a=>{total++;const topicOk=pubState.topic==='all'||(pubState.topic==='selected'?a.dataset.selected==='1':a.dataset.topics.split(' ').includes(pubState.topic)||(pubState.topic==='ai'&&a.dataset.topics.split(' ').includes('6g')));const yearOk=pubState.year==='all'||a.dataset.year===pubState.year;const queryOk=!pubState.query||a.textContent.toLowerCase().includes(pubState.query);const ok=topicOk&&yearOk&&queryOk;a.hidden=!ok;if(ok)shown++;});['journals','conferences'].forEach(k=>{const list=document.getElementById('pub-'+k);const head=document.querySelector(`[data-pub-section="${k}"]`);const any=[...list.querySelectorAll('article')].some(a=>!a.hidden);if(head)head.hidden=!any;list.hidden=!any;});const details=document.getElementById('pub-chinese-details');if(details){const any=[...document.querySelectorAll('#pub-chinese article')].some(a=>!a.hidden);details.hidden=!any;}const count=document.getElementById('pub-result-count');if(count){const zh=document.body.dataset.lang==='zh';count.textContent=zh?`显示 ${shown} / ${total} 项成果`:`Showing ${shown} of ${total} publications`;}}
function renderProjects(){document.getElementById('projects-list').innerHTML=(window.PROJECTS||[]).map(p=>`<article><div class="date">${langSpan(p.dateEn,p.dateZh)}</div><div><p class="tag">${langSpan(p.tagEn,p.tagZh)}</p><h3>${langSpan(p.titleEn,p.titleZh)}</h3></div></article>`).join('');}
function renderService(){const s=window.SERVICE||{};const editorial=(s.editorial||[]).map(x=>`<li><span class="date-inline">${x.date}</span><em data-lang="en">${x.venue}</em><em data-lang="zh" hidden>${x.zhVenue}</em> · ${langSpan(x.roleEn,x.roleZh)}</li>`).join('');const conf=(s.conference||[]).map(x=>`<li><span class="date-inline">${x.date}</span>${x.venue} · ${x.role}</li>`).join('');const mem=(s.memberships||[]).map(x=>`<li>${langSpan(x.en,x.zh)}</li>`).join('');const honors=(s.honors||[]).map(x=>`<div><b>${x.date}</b>${langSpan(x.en,x.zh)}</div>`).join('');document.getElementById('service-content').innerHTML=`<div class="service-grid"><div class="service-block"><h3>${langSpan('Editorial Service','期刊青年编委')}</h3><ul class="service-list">${editorial}</ul></div><div class="service-block"><h3>${langSpan('Conference Service','会议服务')}</h3><ul class="service-list">${conf}</ul><h3 style="margin-top:28px">${langSpan('Professional Memberships','专业学会会员')}</h3><ul class="service-list">${mem}</ul></div></div><div class="reviewer"><h3>${langSpan('Reviewer Service','期刊审稿')}</h3><p data-lang="en">${s.reviewerEn||''}</p><p data-lang="zh" hidden>${s.reviewerZh||''}</p></div><div style="margin-top:45px" class="kicker">${langSpan('HONORS & AWARDS','奖励与荣誉')}</div><div class="honors">${honors}</div>`;}

function renderActivities(){
  const items=window.ACTIVITIES||[];
  const el=document.getElementById('activities-list');
  if(!el)return;
  let lastYear=null;
  el.innerHTML=items.map(a=>{
    const yearHead=a.year!==lastYear?`<div class="activity-year">${a.year}</div>`:'';
    lastYear=a.year;
    const roleClass=a.type&&a.type!=='conference'?' activity-role-featured':'';
    const talk=a.talkTitle?`<p class="activity-talk">${a.talkTitle}</p>`:'';
    const event=a.url?`<a href="${a.url}">${langSpan(a.eventEn,a.eventZh)} ↗</a>`:langSpan(a.eventEn,a.eventZh);
    return `${yearHead}<article><div class="activity-date">${a.date}</div><div class="activity-body"><div class="activity-place">${langSpan(a.cityEn,a.cityZh)}</div><h3>${event}</h3><span class="activity-role${roleClass}">${langSpan(a.roleEn,a.roleZh)}</span>${talk}</div></article>`;
  }).join('');
}
renderNews();renderPublications();renderProjects();renderService();renderActivities();

const langButtons=document.querySelectorAll('[data-set-lang]');
function setLanguage(lang){
  if(!['en','zh'].includes(lang)) lang='en';
  document.documentElement.lang=lang==='zh'?'zh-CN':'en'; document.body.dataset.lang=lang;
  document.querySelectorAll('[data-lang]').forEach(el=>{el.hidden=el.dataset.lang!==lang;});
  langButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.setLang===lang));
  document.title=lang==='zh'?'谷博文 | 新疆大学':'Bowen Gu | Xinjiang University';
  localStorage.setItem('bg-lang',lang); const u=new URL(window.location.href);u.searchParams.set('lang',lang);history.replaceState({},'',u);
  if(typeof applyPublicationFilters==='function') applyPublicationFilters();
}
langButtons.forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.setLang)));
const queryLang=new URLSearchParams(location.search).get('lang');setLanguage(queryLang||localStorage.getItem('bg-lang')||'en');
