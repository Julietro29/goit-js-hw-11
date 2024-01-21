import{S as m,i as c}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const h="41921784-0571e350d6104826bc1422cb3",p=document.getElementById("search-form"),l=document.getElementById("search-input"),d=document.getElementById("loader"),u=document.getElementById("gallery");let f;function g(){d.style.display="block"}function a(){d.style.display="none"}function y(){u.innerHTML=""}function L(){l.value=""}function b(){f=new m(".image-card a")}function E(e){const o=`https://pixabay.com/api/?key=${h}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true`;g(),y(),L(),fetch(o).then(n=>n.json()).then(n=>{a(),n.hits.length>0?(I(n.hits),f.refresh()):w()}).catch(n=>{console.error("Error fetching images:",n),a(),$("An error occurred while fetching images. Please try again.")})}function I(e){e.forEach(o=>{const n=v(o);u.appendChild(n)})}function v(e){const o=document.createElement("div");return o.className="image-card",o.innerHTML=`
    <a href="${e.largeImageURL}" data-lightbox="gallery">
      <img src="${e.webformatURL}" alt="${e.tags}">
    </a>
    <div class="image-details">
      <p>Likes: ${e.likes}</p>
      <p>Views: ${e.views}</p>
      <p>Comments: ${e.comments}</p>
      <p>Downloads: ${e.downloads}</p>
    </div>
  `,o}function w(){c.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"})}function $(e){c.error({title:"Error",message:e})}p.addEventListener("submit",function(e){e.preventDefault();const o=l.value.trim();o!==""&&E(o)});document.addEventListener("DOMContentLoaded",b);
//# sourceMappingURL=commonHelpers.js.map
