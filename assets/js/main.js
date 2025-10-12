
document.addEventListener('DOMContentLoaded', () => {
  const quiz = document.getElementById('quiz');
  document.querySelectorAll('[data-open-quiz]').forEach(b=>b.addEventListener('click', ()=>quiz.classList.remove('hidden')));
  document.getElementById('closeQuiz').addEventListener('click', ()=>quiz.classList.add('hidden'));
  let step=0; const steps=[...document.querySelectorAll('.quiz-step')];
  const next=document.getElementById('quizNext'), prev=document.getElementById('quizPrev'), bar=document.getElementById('quizBar'), fin=document.getElementById('quizFinish');
  function render(){steps.forEach((s,i)=>s.classList.toggle('hidden',i!==step)); prev.classList.toggle('invisible',step===0); next.classList.toggle('hidden',step===steps.length-1); fin.classList.toggle('hidden',step!==steps.length-1); bar.style.width=((step+1)/steps.length*100)+'%';}
  next.addEventListener('click',()=>{step=Math.min(step+1,steps.length-1);render();}); prev.addEventListener('click',()=>{step=Math.max(step-1,0);render();}); render();
  fin.addEventListener('click',()=>{
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
