(function(){'use strict';
var root=document.getElementById('fw-satin-bow'),card=root.querySelector('.fw-form-card'),panel=root.querySelector('#bow-form-panel'),opener=root.querySelector('.fw-invitation-open'),first=panel.querySelector('input'),fold=card.querySelector('.fw-invitation-fold');
var pass=root.querySelector('#bow-pass'),form=panel.querySelector('form'),announcement=root.querySelector('.fw-pass-announcement'),sequence=0,pendingReveal=null;
var reduced=matchMedia('(prefers-reduced-motion: reduce)'),animations=[],opened=false;
function cancel(){animations.forEach(function(a){a.cancel()});animations=[]}
function open(){
 sequence++;pendingReveal=null;cancel();pass.hidden=true;fold.hidden=false;form.dispatchEvent(new Event('fw:edit'));var fresh=!opened;opened=true;panel.hidden=false;opener.hidden=true;opener.setAttribute('aria-expanded','true');card.classList.remove('is-invitation-closed');card.classList.add('is-invitation-open');
 card.scrollIntoView({behavior:'auto',block:'start'});first.focus({preventScroll:true});
 if(fresh&&!reduced.matches&&card.animate){
  animations.push(fold.animate([{transform:'scaleY(.75)',opacity:.65},{transform:'scaleY(1)',opacity:1}],{duration:340,easing:'cubic-bezier(.16,1,.3,1)'}));
  animations.push(panel.animate([{transform:'translateY(-10px)',opacity:.5},{transform:'none',opacity:1}],{duration:340,easing:'cubic-bezier(.16,1,.3,1)'}));
 }
}
root.addEventListener('click',function(e){var trigger=e.target.closest('a[href="#registro"],.fw-invitation-open');if(!trigger)return;e.preventDefault();e.stopImmediatePropagation();open()},true);
form.addEventListener('fw:preview',function(e){
 var data=e.detail,token=++sequence;
 pass.querySelector('h3').textContent=data.nombre+' '+data.apellido;
 pass.querySelector('.fw-pass-company').textContent=data.company==='amigas'?'Tú + '+data.amigas+' amigas':'Acceso individual';
 function reveal(){if(token!==sequence)return;pendingReveal=null;panel.hidden=true;pass.hidden=false;fold.hidden=true;
  card.scrollIntoView({behavior:'auto',block:'start'});pass.querySelector('h3').focus({preventScroll:true});announcement.textContent='Vista previa de tu invitación disponible.';
  if(!reduced.matches&&pass.animate)animations.push(pass.animate([{opacity:.4,transform:'translateY(-12px) scaleY(.98)'},{opacity:1,transform:'none'}],{duration:520,easing:'cubic-bezier(.16,1,.3,1)'}));
 }
 pendingReveal=reveal;
 if(reduced.matches||!panel.animate){reveal();return}
 var fade=panel.animate([{opacity:1},{opacity:0}],{duration:180});animations.push(fade);fade.finished.then(reveal,function(){});
});
root.querySelector('.fw-edit').addEventListener('click',function(){fold.hidden=false;announcement.textContent='Puedes editar tus datos.';open()});
// Enhancement only after the opening handler is ready; failed JS leaves the real form visible.
if(location.hash==='#registro'){open()}else{panel.hidden=true;opener.hidden=false;card.classList.add('is-invitation-closed')}
reduced.addEventListener('change',function(){if(reduced.matches){var reveal=pendingReveal;cancel();if(reveal)reveal()}});document.addEventListener('visibilitychange',function(){if(document.hidden){var reveal=pendingReveal;cancel();if(reveal)reveal()}});window.addEventListener('pagehide',cancel);
})();
