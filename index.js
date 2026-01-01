import{S as f,a as u,i as l}from"./assets/vendor-MjawMu3A.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();let p=new f(".gallery a",{captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.6,widthRatio:.85,disableRightClick:!0});function m(s){const i=s.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}" class="gallery-link">
            <img
              src="${e.webformatURL}"
              alt="${e.tags}"
              class="gallery-image"
            />
            <div class="image-info">
              <div class="info">
                <p class="info-label">Likes</p>
                <p class="info-count">${e.likes}</p>
              </div>
              <div class="info">
                <p class="info-label">Views</p>
                <p class="info-count">${e.views}</p>
              </div>
              <div class="info">
                <p class="info-label">Comments</p>
                <p class="info-count">${e.comments}</p>
              </div>
              <div class="info">
                <p class="info-label">Downloads</p>
                <p class="info-count">${e.downloads}</p>
              </div>
            </div>
          </a>
        </li>`).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",i)}function d(){const s=document.querySelector(".gallery");s.innerHTML=""}function g(){document.querySelector(".loader-thumb").classList.add("visible")}function c(){document.querySelector(".loader-thumb").classList.remove("visible")}function y(s){const r={params:{key:"53949044-97be2f3ebdad7466ae66aa0c3",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:100}};return u.get("https://pixabay.com/api/",r).then(e=>e.data)}const a={form:document.querySelector(".form"),btnSearch:document.querySelector(".btn-search"),inputSearch:document.querySelector(".input-search"),listImages:document.querySelector(".gallery")};a.form.addEventListener("submit",h);function h(s){s.preventDefault();const i=a.inputSearch.value.trim();if(a.inputSearch.value=i,i===""){const r={timeout:3e3,closeOnEscape:!0,position:"topRight",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",iconUrl:"./img/error.svg",iconColor:"#ffffff",title:"ERROR ",titleColor:"#ffffff",titleSize:"16",message:"Enter the image type",messageColor:"#ffffff",messageSize:"16"};l.show(r);return}d(),g(),y(i).then(r=>r.hits).then(r=>{if(c(),r.length===0){const e={timeout:3e3,closeOnEscape:!0,position:"topRight",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",iconUrl:"./img/error.svg",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",messageSize:"16",messageLineHeight:"24",maxWidth:"432"};l.show(e);return}m(r),p.refresh()}).catch(r=>{c();const e={timeout:3e3,closeOnEscape:!0,position:"topRight",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",iconUrl:"./img/error.svg",message:"Sorry, error accessing resource",messageColor:"#ffffff",messageSize:"16",messageLineHeight:"24",maxWidth:"432"};l.show(e)}),a.form.reset()}
//# sourceMappingURL=index.js.map
