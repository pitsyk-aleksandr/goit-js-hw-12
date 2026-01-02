import{S as v,a as E,i as c}from"./assets/vendor-MjawMu3A.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();let w=new v(".gallery a",{captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.8,widthRatio:.85,heightRatio:.95,doubleTapZoom:1.2,focus:!0,scrollZoom:!1,maxZoom:2,disableRightClick:!0});function h(s){const e=s.map(r=>`
        <li class="gallery-item">
          <a href="${r.largeImageURL}" class="gallery-link">
            <img
              src="${r.webformatURL}"
              alt="${r.tags}"
              class="gallery-image"
            />
            <div class="image-info">
              <div class="info">
                <p class="info-label">Likes</p>
                <p class="info-count">${r.likes}</p>
              </div>
              <div class="info">
                <p class="info-label">Views</p>
                <p class="info-count">${r.views}</p>
              </div>
              <div class="info">
                <p class="info-label">Comments</p>
                <p class="info-count">${r.comments}</p>
              </div>
              <div class="info">
                <p class="info-label">Downloads</p>
                <p class="info-count">${r.downloads}</p>
              </div>
            </div>
          </a>
        </li>`).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",e),w.refresh()}function q(){const s=document.querySelector(".gallery");s.innerHTML=""}function y(){document.querySelector(".loader-thumb").classList.add("visible")}function d(){document.querySelector(".loader-thumb").classList.remove("visible")}function g(){document.querySelector(".btn-loadmore").classList.add("visible")}function b(){document.querySelector(".btn-loadmore").classList.remove("visible")}async function L(s,e){const r={params:{key:"53949044-97be2f3ebdad7466ae66aa0c3",q:s,order:"latest",image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}};return(await E.get("https://pixabay.com/api/",r)).data}let l="",p=0,n=0,m=0,M=15;const o={timeout:3e3,closeOnEscape:!0,position:"topRight",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",titleColor:"#ffffff",titleSize:"16",messageColor:"#ffffff",messageSize:"16",maxWidth:"432"},u={form:document.querySelector(".form"),inputSearch:document.querySelector(".input-search"),btnSearch:document.querySelector(".btn-search"),btnLoadMore:document.querySelector(".btn-loadmore"),listImages:document.querySelector(".gallery")};u.form.addEventListener("submit",C);u.btnLoadMore.addEventListener("click",O);function C(s){if(s.preventDefault(),l=u.inputSearch.value.trim(),u.inputSearch.value=l,l===""){o.title="ERROR ",o.message="Enter the image type",c.show(o);return}q(),b(),y(),n=1,L(l,n).then(e=>(p=e.totalHits,m=Math.ceil(p/M),e.hits)).then(e=>{if(d(),e.length===0){o.title="",o.message="Sorry, there are no images matching your search query. Please try again!",c.show(o);return}h(e),m>1?g():S()}).catch(e=>{d(),o.title="",o.message="Sorry, error accessing resource",c.show(o)}),u.form.reset()}function O(s){b(),y(),n=n+1,L(l,n).then(e=>e.hits).then(e=>{d(),h(e),n<m?g():S();const i=document.querySelector(".gallery-item"),r=Number(i.getBoundingClientRect().height);scrollBy(0,r*2)}).catch(e=>{d(),o.title="",o.message="Sorry, error accessing resource",c.show(o)})}function S(){o.title="",o.message="We're sorry, but you've reached the end of search results.",c.show(o)}
//# sourceMappingURL=index.js.map
