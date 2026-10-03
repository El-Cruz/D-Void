(function(){'use strict';
var root=document.getElementById('fw-satin-bow');
if(!root)return;
var reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
var animations=new Map(),seen=new WeakSet(),inView=new WeakMap(),frame=0,pointer=null;
var bow=root.querySelector('.fw-hero-art'),bowImage=bow.querySelector('img'),still=root.querySelector('.fw-bow-still-wrap'),nav=root.querySelector('.fw-nav-link');
var decorators=[bow,still];
function visible(el){var b=el.getBoundingClientRect();return b.bottom>0&&b.top<innerHeight}
function animate(el,keys,options){
 if(reduced.matches||document.hidden||!el.animate||!visible(el))return null;
 var animation=el.animate(keys,Object.assign({duration:360,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'},options));
 animations.set(animation,el);
 function clean(){animations.delete(animation)}
 animation.addEventListener('finish',clean,{once:true});animation.addEventListener('cancel',clean,{once:true});return animation;
}
function stopAll(){animations.forEach(function(_,a){a.cancel()});animations.clear();resetPointer()}
function entrance(el,delay){return animate(el,[{opacity:.65,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{delay:delay||0})}
function reveal(section){
 if(seen.has(section)||document.hidden||reduced.matches)return;
 seen.add(section);
 // Cap stagger at 120ms; content remains present before, during and after.
 var items=section.querySelectorAll(':scope > .fw-kicker,:scope > h2,:scope > .fw-bow-concept-copy,:scope > .fw-grid,:scope > .fw-form-intro,:scope > .fw-form-card');
 Array.from(items).forEach(function(el,index){entrance(el,Math.min(index*40,120))});
 section.querySelectorAll('.fw-ui-rule').forEach(function(line){animate(line,[{opacity:.6,transform:'scaleX(.7)'},{opacity:1,transform:'scaleX(1)'}],{duration:420})});
 if(section.contains(still))animate(still.querySelector('img'),[{opacity:.55,transform:'translateY(12px) scale(.99)'},{opacity:1,transform:'none'}],{duration:480});
}
function sync(){
 if(reduced.matches){stopAll();return}
 animations.forEach(function(el,a){if(document.hidden||inView.get(el)===false||!visible(el)){a.pause()}else if(a.playState==='paused'){a.play()}});
 if(document.hidden)resetPointer();else root.querySelectorAll('.fw-section').forEach(function(s){if(visible(s))reveal(s)});
}
if('IntersectionObserver' in window){
 var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){inView.set(entry.target,entry.isIntersecting);if(entry.isIntersecting&&entry.target.matches('.fw-section'))reveal(entry.target)});sync()},{threshold:0});
 [bowImage,still.querySelector('img'),root.querySelector('.fw-hero-copy'),root.querySelector('.fw-css-ribbon')].concat(Array.from(root.querySelectorAll('.fw-section'))).forEach(function(el){observer.observe(el)});
 var activeObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting)nav.setAttribute('aria-current','location');else nav.removeAttribute('aria-current')})},{threshold:0,rootMargin:'-80px 0px 0px 0px'});
 activeObserver.observe(root.querySelector('#registro'));
}
function resetPointer(){if(frame)cancelAnimationFrame(frame);frame=0;pointer=null;decorators.forEach(function(el){el.style.removeProperty('transform')})}
function pointerMove(event){
 if(reduced.matches||!fine.matches||document.hidden||event.pointerType==='touch')return;
 pointer={x:event.clientX,y:event.clientY};if(frame)return;
 frame=requestAnimationFrame(function(){frame=0;if(!pointer)return;decorators.forEach(function(el){if(!visible(el))return;var x=(pointer.x/innerWidth-.5)*5,y=(pointer.y/innerHeight-.5)*4;el.style.transform='translate3d('+x.toFixed(2)+'px,'+y.toFixed(2)+'px,0)'})});
}
root.addEventListener('pointermove',pointerMove,{passive:true});root.addEventListener('pointerleave',resetPointer);
window.addEventListener('resize',resetPointer,{passive:true});window.addEventListener('scroll',function(){if(!visible(bow)&&!visible(still))resetPointer()},{passive:true});
fine.addEventListener('change',resetPointer);reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
window.addEventListener('pagehide',stopAll);
// Observe existing validation output; this does not submit or alter form state.
var form=root.querySelector('[data-demo-form]');
var validationObserver=new MutationObserver(function(records){var changed=new Set();records.forEach(function(record){if(record.type==='attributes'){var input=record.target;if(input.getAttribute('aria-invalid')==='true'){var message=root.querySelector('[data-error="'+input.name+'"]');if(message)changed.add(message)}}else{var el=record.target.nodeType===3?record.target.parentElement:record.target;if(el.matches('.fw-error')&&el.textContent.trim())changed.add(el)}});changed.forEach(function(el){animate(el,[{opacity:.6},{opacity:1}],{duration:180})})});
validationObserver.observe(form,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-invalid']});

var card=root.querySelector('.fw-hero-copy'),ribbon=root.querySelector('.fw-css-ribbon');
animate(card,[{opacity:.9,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:380});
root.querySelectorAll('.fw-age-tag,.fw-date-tag').forEach(function(tag,index){animate(tag,[{opacity:.65},{opacity:1}],{duration:260,delay:60+index*50})});
var ribbonEntry=animate(ribbon,[{opacity:.6,transform:'translateX(-4px)'},{opacity:1,transform:'none'}],{duration:380});
if(ribbonEntry)ribbonEntry.addEventListener('finish',function(){animate(ribbon,[{transform:'rotate(0deg)'},{transform:'rotate(.5deg)',offset:.3},{transform:'rotate(-.4deg)',offset:.6},{transform:'none'}],{duration:2200,easing:'ease-in-out'})},{once:true});

// One finite satin sequence, with an immediate, usable title and CTA.
var intro=animate(bowImage,[{opacity:.55,transform:'translateY(-8px) rotate(-1deg)'},{opacity:1,transform:'none'}],{duration:480});
if(intro)intro.addEventListener('finish',function(){animate(bowImage,[{transform:'rotate(0deg)'},{transform:'rotate(.7deg)',offset:.2},{transform:'rotate(-.6deg)',offset:.45},{transform:'rotate(.35deg)',offset:.7},{transform:'rotate(0deg)'}],{duration:3200,easing:'ease-in-out'})},{once:true});
[root.querySelector('.fw-title'),root.querySelector('.fw-meta'),root.querySelector('.fw-lede')].forEach(function(el,index){animate(el,[{opacity:.72},{opacity:1}],{duration:280,delay:index*35})});
root.querySelectorAll('.fw-section').forEach(function(s){if(visible(s))reveal(s)});
root.querySelectorAll('.fw-hero-copy .fw-ui-rule').forEach(function(line){animate(line,[{opacity:.6,transform:'scaleX(.7)'},{opacity:1,transform:'scaleX(1)'}],{duration:420})});
})();
