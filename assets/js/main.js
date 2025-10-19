
document.addEventListener('DOMContentLoaded', () => {
  const quiz = document.getElementById('quiz');
  document.querySelectorAll('[data-open-quiz]').forEach(b=>b.addEventListener('click', ()=>quiz.classList.remove('hidden')));
  const closeQuiz = document.getElementById('closeQuiz');
  if (closeQuiz) closeQuiz.addEventListener('click', ()=>quiz.classList.add('hidden'));

  // Project modals
  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      const modal = document.getElementById('project-modal');
      const data = JSON.parse(document.getElementById('projects-data').textContent);
      const p = data[id];
      modal.querySelector('[data-p-title]').textContent = p.name;
      modal.querySelector('[data-p-meta]').textContent = `${p.area} • ${p.rooms} спальни • ${p.baths} санузла`;
      modal.querySelector('[data-p-price]').textContent = p.price;
      modal.querySelector('[data-p-desc]').textContent = p.desc;
      modal.querySelector('[data-p-term]').textContent = p.term;
      const img = card.querySelector('img');
      modal.querySelector('[data-p-img]').src = img ? img.src : '';
      modal.classList.remove('hidden');
    });
  });
  const closePM = document.getElementById('closeProjectModal');
  if (closePM) closePM.addEventListener('click', ()=>{
    document.getElementById('project-modal').classList.add('hidden');
  });

  // Quiz
  let step=0; const steps=[...document.querySelectorAll('.quiz-step')];
  const next=document.getElementById('quizNext'), prev=document.getElementById('quizPrev'), bar=document.getElementById('quizBar'), fin=document.getElementById('quizFinish');
  function render(){steps.forEach((s,i)=>s.classList.toggle('hidden',i!==step)); if(prev) prev.classList.toggle('invisible',step===0); if(next) next.classList.toggle('hidden',step===steps.length-1); if(fin) fin.classList.toggle('hidden',step!==steps.length-1); if(bar) bar.style.width=((step+1)/steps.length*100)+'%';}
  if (next) next.addEventListener('click',()=>{step=Math.min(step+1,steps.length-1);render();});
  if (prev) prev.addEventListener('click',()=>{step=Math.max(step-1,0);render();});
  render();
  if (fin) fin.addEventListener('click',()=>{
    const data={};
    document.querySelectorAll('[data-q],input[name]').forEach(el=>{
      if(el.name && (el.type==='radio'||el.type==='checkbox')){ if(el.checked) data[el.name]=el.value; }
      else if(el.hasAttribute('data-q') && el.value){ data[el.getAttribute('data-q')]=el.value; }
    });
    const msg=encodeURIComponent('Здравствуйте! Хочу расчёт каркасного дома.\n'+Object.entries(data).map(([k,v])=>'• '+k+': '+v).join('\n'));
    const phone=document.querySelector('[data-company-whatsapp]').getAttribute('data-company-whatsapp');
    window.open(`https://wa.me/${phone}?text=${msg}`,'_blank');
  });
});
