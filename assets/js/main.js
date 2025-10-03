
document.addEventListener('DOMContentLoaded', () => {
  // Sticky CTA to open quiz
  const openQuizBtns = document.querySelectorAll('[data-open-quiz]');
  const quiz = document.getElementById('quiz');
  const closeQuiz = document.getElementById('closeQuiz');
  openQuizBtns.forEach(b => b.addEventListener('click', () => {
    quiz.classList.remove('hidden');
  }));
  if (closeQuiz) closeQuiz.addEventListener('click', () => quiz.classList.add('hidden'));

  // Simple multistep quiz
  let step = 0;
  const steps = Array.from(document.querySelectorAll('.quiz-step'));
  const nextBtn = document.getElementById('quizNext');
  const prevBtn = document.getElementById('quizPrev');
  const bar = document.getElementById('quizBar');
  const finish = document.getElementById('quizFinish');
  function render() {
    steps.forEach((s,i)=> s.classList.toggle('hidden', i !== step));
    prevBtn.classList.toggle('invisible', step===0);
    nextBtn.classList.toggle('hidden', step===steps.length-1);
    finish.classList.toggle('hidden', step!==steps.length-1);
    bar.style.width = ((step+1)/steps.length*100)+'%';
  }
  if (nextBtn) nextBtn.addEventListener('click', ()=>{ step=Math.min(step+1, steps.length-1); render(); });
  if (prevBtn) prevBtn.addEventListener('click', ()=>{ step=Math.max(step-1, 0); render(); });
  render();

  // Finish -> open WhatsApp or tel with compiled summary
  finish.addEventListener('click', ()=>{
     const data = {};
     document.querySelectorAll('[data-q]').forEach(el=>{
       if (el.type==='radio' || el.type==='checkbox'){
         if (el.checked) data[el.name] = el.value;
       } else if (el.value) data[el.getAttribute('data-q')] = el.value;
     });
     const msg = encodeURIComponent('Здравствуйте! Хочу расчёт каркасного дома.\n' + 
       Object.entries(data).map(([k,v])=> `• ${k}: ${v}`).join('\n'));
     const phone = document.querySelector('[data-company-whatsapp]').getAttribute('data-company-whatsapp') || '70000000000';
     window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  });

  // Simple form submit fallback -> mailto
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const phone = form.querySelector('input[name="phone"]').value;
      const msg = encodeURIComponent('Заявка на строительство каркасного дома. Телефон: ' + phone);
      const mail = form.getAttribute('data-mailto');
      window.location.href = `mailto:${mail}?subject=Заявка с сайта&body=${msg}`;
    });
  });

  // Smooth anchors on mobile header collapse
});
