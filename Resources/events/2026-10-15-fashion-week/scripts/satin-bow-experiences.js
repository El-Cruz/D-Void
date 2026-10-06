(function(){'use strict';
var section=document.getElementById('girls-night');
if(!section)return;
var reduced=matchMedia('(prefers-reduced-motion: reduce)'),observer,frame=0;
var cards=Array.from(section.querySelectorAll('.fw-experience')),animations=new Set();
var pictures=Array.from(section.querySelectorAll('.fw-experience-photo img,.fw-spots-art img'));
function update(){frame=0;if(reduced.matches||document.hidden)return;
pictures.forEach(function(img){var rect=img.closest('.fw-experience').getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){var progress=(innerHeight/2-(rect.top+rect.height/2))/innerHeight;img.style.setProperty('--photo-shift',Math.max(-10,Math.min(10,progress*16)).toFixed(2)+'px')}})}
function scroll(){if(!frame&&!reduced.matches&&!document.hidden)frame=requestAnimationFrame(update)}
function reset(){if(frame)cancelAnimationFrame(frame);frame=0;animations.forEach(function(a){a.cancel()});animations.clear();pictures.forEach(function(img){img.style.removeProperty('--photo-shift')});if(!reduced.matches)scroll()}
if('IntersectionObserver' in window){observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(!entry.isIntersecting)return;observer.unobserve(entry.target);if(reduced.matches||document.hidden||!entry.target.animate)return;var a=entry.target.animate([{opacity:.8,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:550,easing:'cubic-bezier(.16,1,.3,1)'});animations.add(a);a.onfinish=a.oncancel=function(){animations.delete(a)}})},{threshold:.12});cards.forEach(function(card){observer.observe(card)})}
window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll,{passive:true});reduced.addEventListener('change',reset);document.addEventListener('visibilitychange',reset);window.addEventListener('pagehide',reset);scroll();
})();
