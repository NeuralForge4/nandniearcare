const slides=[
 {p:'Hearing Care',a:'HEARING',b:'TESTS',d:'Full audiometry, tympanometry and hearing aid fitting, with results explained the same day.',c:['#0d8a85','#0c3b4a'],i:'images/ear-1.jpg'},
 {p:'Child ENT',a:'PEDIATRIC',b:'EAR CARE',d:'Gentle infection care, grommets and newborn hearing screening in a child-friendly space.',c:['#c98a10','#4a2f06'],i:'images/ear-3.jpg'},
 {p:'Cochlear Implants',a:'COCHLEAR',b:'IMPLANTS',d:'Assessment, surgery and rehabilitation for severe hearing loss, with long-term mapping support.',c:['#4a6fa5','#17294a'],i:'images/ear-2.jpg'},
 {p:'Balance Clinic',a:'VERTIGO',b:'& BALANCE',d:'Find the cause of dizziness and treat it with positional manoeuvres, therapy and medicine.',c:['#7a4aa5','#2a1748'],i:'images/ear-6.jpg'},
 {p:'Ear Surgery',a:'MICROSCOPIC',b:'EAR SURGERY',d:'Eardrum repair, mastoid and ossicle surgery with microscopes and day-care options.',c:['#2f9e6b','#0f3a2a'],i:'images/ear-4.jpg'}
];
const bgOf=s=>`linear-gradient(135deg,${s.c[0]}aa,${s.c[1]}ee),url(${s.i}) center/cover`;
const g=c=>`linear-gradient(135deg,${c[0]},${c[1]})`;
let order=slides.map((_,i)=>i),busy=false,front='bgA';
const $=id=>document.getElementById(id);
function paint(first){
  const s=slides[order[0]],nx=front==='bgA'?'bgB':'bgA';
  const T=()=>{$('hPlace').textContent=s.p;$('hT1').textContent=s.a;$('hT2').textContent=s.b;$('hDesc').textContent=s.d;$('hn').textContent=order[0]+1;$('fi').src=s.i;$('fi').alt=s.p;if(!first)gsap.fromTo('#fi',{opacity:0,scale:1.08},{opacity:1,scale:1,duration:.8})};
  $(nx).style.background=bgOf(s);
  if(first){$(front).style.background=bgOf(s);T();return}
  gsap.set(nx,{zIndex:2,clipPath:'circle(0% at 100% 100%)'});gsap.set(front,{zIndex:1});
  gsap.to(nx,{clipPath:'circle(150% at 100% 100%)',duration:1,ease:'sine.inOut',onComplete:()=>{front=nx}});
  gsap.to('.hbody > *',{opacity:0,y:-14,duration:.25,stagger:.03,onComplete:()=>{T();gsap.fromTo('.hbody > *',{opacity:0,y:30},{opacity:1,y:0,duration:.6,stagger:.08,ease:'sine.out'})}});
}
function rail(){
  $('rail').innerHTML=order.slice(1,5).map(i=>`<div class="mini" style="background:linear-gradient(#0000 30%,#000b),url(${slides[i].i}) center/cover"><small>${slides[i].p}</small>${slides[i].a} ${slides[i].b}</div>`).join('');
  gsap.from('#rail .mini',{x:80,opacity:0,duration:.7,stagger:.08,ease:'sine.inOut'});
  gsap.to('#pg',{width:((order[0]+1)/slides.length*100)+'%',duration:.6});
}
function go(d){
  if(busy)return;busy=true;
  d>0?order.push(order.shift()):order.unshift(order.pop());
  paint();rail();setTimeout(()=>busy=false,1000);reset();
}
let timer;function reset(){clearInterval(timer);timer=setInterval(()=>go(1),5500)}
$('next').onclick=()=>go(1);$('prev').onclick=()=>go(-1);
paint(true);rail();

// services
const ico='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17c0 2 1.5 4 4 4s4-2 4-5c0-2-1-3-2-4s-2-2-2-3c0-2-1.500-4-4-4S4 6 4 9"/></svg>';
const sv=[['Hearing tests & aids','Digital audiometry and custom hearing aid fitting.'],['Ear infection care','Fast relief for pain, discharge and blocked ears.'],['Cochlear implants','Surgery and rehab for severe hearing loss.'],['Tinnitus treatment','Sound therapy and counselling for ringing in the ears.'],['Vertigo clinic','Diagnosis and treatment of dizziness.'],['Ear surgery','Eardrum and middle-ear surgery, day-care available.']];
$('svcs').innerHTML=sv.map(s=>`<div class="svc">${ico}<h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');

// counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,n=+el.dataset.n,o={v:0};
  gsap.to(o,{v:n,duration:1.8,ease:'power2.out',onUpdate:()=>el.textContent=Math.round(o.v).toLocaleString('en-IN')+(el.dataset.s||'')})}),{threshold:.6});
document.querySelectorAll('[data-n]').forEach(e=>io.observe(e));

addEventListener('scroll',()=>$('nav').classList.toggle('solid',scrollY>60),{passive:true});

// glass loader
const o={v:0};
gsap.to(o,{v:100,duration:1,ease:'power1.inOut',onUpdate:()=>{$('lb').style.width=o.v+'%';$('lp').textContent=Math.round(o.v)+'%'},
 onComplete:()=>{gsap.to('#loader',{opacity:0,scale:1.08,duration:.7,onComplete:()=>{$('loader').style.display='none';reset()}});
  gsap.from('.hbody > *',{opacity:0,y:30,duration:.8,stagger:.1,delay:.2})}});

// scroll loader
(function(){const sp=$('sp'),up=$('up'),n=$('upn'),rg=up.querySelector('.rg'),C=125.7;
 function f(){const m=document.documentElement.scrollHeight-innerHeight,p=m>0?Math.min(scrollY/m,1):0;
  sp.style.transform='scaleX('+p+')';rg.style.strokeDashoffset=C*(1-p);n.textContent=Math.round(p*100);up.classList.toggle('show',scrollY>250)}
 addEventListener('scroll',f,{passive:true});addEventListener('resize',f);f();
 up.onclick=()=>scrollTo({top:0,behavior:'smooth'});})();

// chat assistant (FAQ based - edit KB to change answers)
(function(){
 const KB=[
  {q:'Opening hours',k:['hour','timing','open','close','when','sunday','holiday'],a:'We are open <b>every day, 8 am – 8 pm</b>. Ear emergencies are seen without an appointment.'},
  {q:'Services',k:['service','treat','offer','facility','what do'],a:'Our main services:<ul><li>Hearing tests &amp; hearing aids</li><li>Ear infection care</li><li>Cochlear implants</li><li>Tinnitus treatment</li><li>Vertigo &amp; balance clinic</li><li>Ear surgery</li></ul>See <a href="#services">Services</a>.'},
  {q:'Book appointment',k:['book','appoint','schedule','consult'],a:'Book by phone at <a href="tel:+910000000000">+91 00000 00000</a>, on <a href="https://wa.me/910000000000">WhatsApp</a>, or from the <a href="#contact">Contact</a> section. Walk-ins are welcome.'},
  {q:'Our doctors',k:['doctor','surgeon','specialist','audiologist'],a:'Our specialists:<ul><li><b>Dr. Anjali Srivastava</b> – ENT &amp; Ear Surgeon</li><li><b>Dr. Rohit Mishra</b> – Cochlear Implant Specialist</li><li><b>Dr. Neha Kapoor</b> – Audiologist &amp; Speech Therapist</li></ul>See <a href="#doctors">Doctors</a>.'},
  {q:'Insurance',k:['insur','cashless','cghs','ayushman','claim','tpa','mediclaim'],a:'We offer cashless treatment with Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, CGHS and Ayushman Bharat. Our desk handles the paperwork. Please carry your policy card and ID.'},
  {q:'Cost / estimate',k:['cost','price','fee','charge','rate','how much','estimate','expens'],a:'You get a <b>written estimate before any treatment</b>, so there are no surprise charges at discharge. Call us for the fee of a specific test or surgery.'},
  {q:'Emergency',k:['emergency','urgent','bleed','sudden','severe','ear pain','earache'],a:'For sudden ear pain, bleeding, discharge or sudden hearing loss, <b>come in right away</b>. No appointment is needed. Call <a href="tel:+910000000000">+91 00000 00000</a> if you are on the way.'},
  {q:'Hearing test',k:['hearing test','audiometry','audiogram','test'],a:'A hearing test takes about 30–45 minutes. You wear headphones and respond to soft tones and words in a quiet room. It is painless, and the doctor explains your results the same day.'},
  {q:'Hearing aids',k:['hearing aid','aid','device','bte','amplif'],a:'We fit digital hearing aids after a full hearing test. Settings are tuned to your hearing, and free follow-up tuning is included. Ask us about trying a device before you decide.'},
  {q:'Cochlear implants',k:['cochlear','implant','bionic'],a:'A cochlear implant helps people with severe hearing loss who get little benefit from hearing aids. Our team does the assessment, surgery and long-term mapping. Book a consultation with <b>Dr. Rohit Mishra</b> to check if you are a candidate.'},
  {q:'Ear wax & cleaning',k:['wax','clean','cotton','bud','blocked','block'],a:'Please avoid cotton buds and sharp objects, as they can push wax deeper or harm the eardrum. Our doctors remove wax safely under direct vision, often in a single short visit.'},
  {q:'Children',k:['child','kid','baby','newborn','pediatric','paediatric','daughter'],a:'Yes, we treat children. We offer newborn hearing screening, infection care and grommet surgery in a child-friendly space.'},
  {q:'Location',k:['where','locat','address','map','direction','reach','lucknow'],a:'We are in Lucknow, Uttar Pradesh. Open the map in the <a href="#contact">Contact</a> section and tap "Open in Google Maps" for directions.'},
  {q:'Certificates',k:['certif','accredit','nabh','iso','quality','licen'],a:'We hold NABH accreditation and ISO 9001:2015 quality certification. Our audiology lab is calibrated to national norms, and all surgeons and audiologists are registered. See <a href="#certificates">Certificates</a>.'},
  {q:'Signs of hearing loss',k:['sign','symptom','hearing loss','deaf','cannot hear','repeat','mumbl'],a:'Common signs: asking people to repeat themselves, turning the TV up, trouble in noisy places, or feeling others mumble. A simple hearing test shows what is happening. This chat cannot diagnose, so please see a doctor.'},
  {q:'Tinnitus',k:['tinnitus','ringing','buzz','hissing'],a:'Tinnitus is ringing, buzzing or hissing in the ears. It has several causes, including hearing loss and noise exposure. We check your hearing, look for a cause, and offer sound therapy and counselling.'},
  {q:'Vertigo & dizziness',k:['vertigo','dizz','spinning','balance','unsteady'],a:'Our balance clinic finds the cause of dizziness with examination and computer-based tests. Many cases improve with simple repositioning manoeuvres, therapy or medicine. Sudden severe dizziness with weakness or speech trouble needs emergency care.'},
  {q:'Ear surgery',k:['surgery','operation','surgical','mastoid','eardrum','tympanoplasty','daycare','day-care'],a:'We perform eardrum repair, mastoid and middle-ear surgery with operating microscopes. Many procedures are day-care. You get a written estimate and clear instructions before surgery.'},
  {q:'Ear infection',k:['infection','otitis','swimmer','itch','pus','discharge'],a:'Signs include pain, discharge, itching, fever or reduced hearing. Please do not put drops or oil in the ear without advice, especially if the eardrum may be torn. Come in so we can examine the ear.'},
  {q:'What to bring',k:['bring','carry','document','prepare','previous report'],a:'Please bring a photo ID, your insurance card (if any), earlier reports or scans, and a list of your medicines. For children, bring the vaccination or health card.'},
  {q:'Waiting time',k:['wait','queue','crowd','rush'],a:'With an appointment, waiting is usually short. Walk-ins are welcome, and emergencies are seen first. Calling ahead helps us give you a time slot.'},
  {q:'Payment options',k:['pay','upi','card','cash','emi'],a:'Please confirm accepted payment modes with our front desk when you call. Cashless insurance is available with the insurers listed under Insurance.'},
  {q:'Online consultation',k:['online','video','tele','remote','phone consult'],a:'Please call <a href="tel:+910000000000">+91 00000 00000</a> or message us on <a href="https://wa.me/910000000000">WhatsApp</a> to ask about phone or video follow-ups. Ear examination and hearing tests need an in-person visit.'},
  {q:'Facilities',k:['park','lift','wheelchair','access','pharmacy','lab'],a:'Please call us to confirm parking, wheelchair access and in-house pharmacy or lab facilities before your visit.'},
  {q:'Our experience',k:['experience','years','patients','how many','success','surger'],a:'We have <b>18 years</b> of experience, have treated over <b>45,000 patients</b> and performed over <b>9,000 ear surgeries</b>. About 96% of our patients recommend us.'},
  {q:'Why choose us',k:['why','different','best','special','choose'],a:'We focus only on ears, hearing and balance. You get same-day tests and consultation, a written price estimate before treatment, and follow-up care after every treatment. See <a href="#why">Why we are different</a>.'},
  {q:'Patient reviews',k:['review','feedback','rating','testimonial'],a:'Read what patients say in the <a href="#reviews">Reviews</a> section.'},
  {q:'Languages',k:['language','hindi','english','urdu','speak'],a:'Our team speaks Hindi and English. Please tell us at booking if you need another language.'},
  {q:'After treatment',k:['follow','recovery','after surgery','review call','tuning'],a:'Every treatment includes follow-up. This covers device tuning for hearing aid users, review calls and check-ups after surgery, and clear care instructions to take home.'},
  {q:'Ear pressure & water',k:['flight','plane','pressure','popping','water','swim'],a:'Ear blockage or pain after a flight, cold or swimming is common. Gentle swallowing or chewing can help. If pain, reduced hearing or discharge lasts more than a day or two, please get checked.'},
  {q:'Protect your hearing',k:['prevent','protect','loud','headphone','earphone','noise'],a:'Keep earphone volume below 60% and take listening breaks. Avoid long exposure to loud noise, and get a hearing check once a year after age 50, or sooner if you notice changes.'},
  {q:'Second opinion',k:['second opinion','opinion'],a:'Yes, we welcome second opinions. Bring your earlier reports and scans, and our specialists will review your case.'}
 ];
 const hi={k:['hi','hello','hey','namaste','good'],a:'Hello! I can help with timings, services, doctors, insurance and booking. Tap a question below.'};
 const $m=$('cbm'),$q=$('cbq'),$i=$('cbi'),box=$('cb'),btn=$('cbBtn');let opened=false,open=false;
 function add(t,w,html){const d=document.createElement('div');d.className='m '+w;html?d.innerHTML=t:d.textContent=t;$m.appendChild(d);$m.scrollTop=$m.scrollHeight;return d}
 function reply(html){const d=document.createElement('div');d.className='m b dots';d.innerHTML='<i></i><i></i><i></i>';$m.appendChild(d);$m.scrollTop=$m.scrollHeight;
  setTimeout(()=>{d.className='m b';d.innerHTML=html;$m.scrollTop=$m.scrollHeight},650)}
 function ask(t){t=t.trim();if(!t)return;add(t,'u');const s=t.toLowerCase();let best=null,sc=0;
  KB.forEach(e=>{const c=e.k.filter(w=>s.includes(w)).reduce((a,w)=>a+w.length,0);if(c>sc){sc=c;best=e}});
  if(!best&&hi.k.some(w=>s.split(/\W+/).includes(w)))return reply(hi.a);
  reply(best?best.a:'I am not sure about that one. Try a question below, or call us at <a href="tel:+910000000000">+91 00000 00000</a> and our team will help.')}
 const mo=document.createElement('button');mo.className='mo';mo.textContent='More questions';mo.onclick=()=>{const a=$q.classList.toggle('all');mo.textContent=a?'Fewer questions':'More questions'};$q.appendChild(mo);
 KB.forEach((e,n)=>{const b=document.createElement('button');b.textContent=e.q;if(n>=12)b.className='x';b.onclick=()=>ask(e.q);$q.appendChild(b)});
 $('cbs').onclick=()=>{ask($i.value);$i.value=''};$i.onkeydown=e=>{if(e.key==='Enter'){ask($i.value);$i.value=''}};
 $m.onclick=e=>{if(e.target.tagName==='A'&&e.target.getAttribute('href').startsWith('#'))toggle(false)};
 function toggle(v){open=v;btn.setAttribute('aria-expanded',v);
  if(v){box.style.display='flex';gsap.fromTo(box,{opacity:0,y:24,scale:.94},{opacity:1,y:0,scale:1,duration:.35,ease:'back.out(1.4)'});
   if(!opened){opened=true;setTimeout(()=>reply('Hi, I am the Nandani Ear Care assistant. Ask me about <b>timings, services, doctors, insurance</b> or booking.'),200)}
   setTimeout(()=>$i.focus(),350)}
  else gsap.to(box,{opacity:0,y:20,duration:.25,onComplete:()=>box.style.display='none'})}
 btn.onclick=()=>toggle(!open);$('cbX').onclick=()=>toggle(false);
})();

// scroll animations
(function(){
 if(!window.ScrollTrigger||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 gsap.registerPlugin(ScrollTrigger);
 const rise=(sel,o={})=>{const els=gsap.utils.toArray(sel);if(!els.length)return;
  gsap.set(els,Object.assign({opacity:0,y:60},o.from||{}));
  ScrollTrigger.batch(els,{start:'top 90%',once:true,onEnter:b=>{b.forEach(e=>e.classList.add('in'));
   gsap.to(b,Object.assign({opacity:1,y:0,x:0,scale:1,duration:.9,stagger:.14,ease:'power3.out',overwrite:true},o.to||{}))}})};
 rise('section h2');rise('section .lead');
 rise('.stat');rise('.chip',{from:{y:24,scale:.9}});rise('.cert',{from:{y:0,x:-40}});
 rise('.svc',{from:{y:70,scale:.92}});rise('.tc',{from:{y:70,scale:.94}});
 rise('.doc',{from:{y:90,scale:.92},to:{duration:1,stagger:.2}});
 rise('.why > div',{from:{y:0,x:-80}});rise('.rev',{from:{y:60,x:0,scale:.94}});
 rise('.cbox a',{from:{y:0,x:-50}});rise('.map',{from:{y:70,scale:.96}});
 rise('footer .wrap',{from:{y:40}});
 // photos zoom gently while scrolling
 gsap.utils.toArray('.doc img,.tc img').forEach(i=>{
  gsap.fromTo(i,{scale:1.18},{scale:1,ease:'none',scrollTrigger:{trigger:i,start:'top bottom',end:'bottom 35%',scrub:true}})});
 // hero content drifts up and fades as you leave the hero
 gsap.to('.hbody',{y:-90,opacity:.15,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom 20%',scrub:true}});
 addEventListener('load',()=>ScrollTrigger.refresh());
})();
