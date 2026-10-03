(function(){'use strict';
function initForm(root){
 var form=root.querySelector('[data-demo-form]');if(!form||form.dataset.initialized)return;form.dataset.initialized='true';
 var submit=form.querySelector('[type=submit]'),status=form.querySelector('[data-demo-status]'),fields=Array.from(form.querySelectorAll('input:not([type=radio])')),radios=Array.from(form.querySelectorAll('[name=company]')),count=form.querySelector('[name=amigas]'),box=root.querySelector('#bow-companions'),busy=false,closeTimer=0,slide=null,reduced=matchMedia('(prefers-reduced-motion: reduce)');
 submit.disabled=false;
 function error(input,msg){var e=root.querySelector('[data-error="'+input.name+'"]');if(e)e.textContent=msg;input.setAttribute('aria-invalid',msg?'true':'false');return !msg}
 function syncCompany(){
  var active=!!form.querySelector('[name=company][value=amigas]:checked');clearTimeout(closeTimer);if(slide)slide.cancel();count.disabled=!active;count.required=active;radios.forEach(function(r){error(r,'')});
  if(active){box.hidden=false;if(!reduced.matches&&box.animate)slide=box.animate([{height:'0px',paddingBlock:'0px',opacity:0},{height:box.getBoundingClientRect().height+'px',paddingBlock:'16px',opacity:1}],{duration:240,easing:'cubic-bezier(.16,1,.3,1)'});}else{error(count,'');if(!box.hidden&&!reduced.matches&&box.animate){slide=box.animate([{height:box.getBoundingClientRect().height+'px',paddingBlock:'16px',opacity:1},{height:'0px',paddingBlock:'0px',opacity:0}],{duration:160});closeTimer=setTimeout(function(){box.hidden=true},160)}else box.hidden=true}
 }
 radios.forEach(function(r){r.addEventListener('change',syncCompany)});syncCompany();
 form.addEventListener('submit',function(e){
  e.preventDefault();if(busy)return;var ok=true;
  fields.forEach(function(input){if(input.disabled){error(input,'');return}var value=input.value.trim(),msg=!value?'Completa este campo.':'';
   if(input.name==='celular'&&value&&value.replace(/\D/g,'').length<7)msg='Escribe un celular válido.';
   if(input.name==='amigas'&&value&&(!Number.isInteger(input.valueAsNumber)||input.valueAsNumber<1))msg='Escribe un número entero de amigas, mínimo 1.';
   ok=error(input,msg)&&ok;
  });
  var selected=form.querySelector('[name=company]:checked');radios.forEach(function(r){error(r,selected?'':'Elige cómo vienes.')});ok=!!selected&&ok;
  if(!ok){status.textContent='Revisa los campos marcados.';form.querySelector('[aria-invalid=true]:not(:disabled)').focus();return}
  busy=true;submit.disabled=true;status.textContent='';
  form.dispatchEvent(new CustomEvent('fw:preview',{bubbles:true,detail:{nombre:form.elements.nombre.value.trim(),apellido:form.elements.apellido.value.trim(),company:selected.value,amigas:selected.value==='amigas'?count.valueAsNumber:null}}));
 });
 form.addEventListener('fw:edit',function(){busy=false;submit.disabled=false;status.textContent=''});
}
function init(root){initForm(root);root.querySelectorAll('[data-smooth]').forEach(function(a){a.addEventListener('click',function(e){var target=root.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}})})}
window.FWShared={init:init};
})();
