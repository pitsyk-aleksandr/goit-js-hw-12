import{S as E,a as w,i as u}from"./assets/vendor-MjawMu3A.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&t(f)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();let q=new E(".gallery a",{captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.8,widthRatio:.85,heightRatio:.95,doubleTapZoom:1.2,focus:!0,scrollZoom:!1,maxZoom:2,disableRightClick:!0});function y(r){const o=r.map(t=>`
        <li class="gallery-item">
          <a href="${t.largeImageURL}" class="gallery-link">
            <img
              src="${t.webformatURL}"
              alt="${t.tags}"
              class="gallery-image"
            />
            <div class="image-info">
              <div class="info">
                <p class="info-label">Likes</p>
                <p class="info-count">${t.likes}</p>
              </div>
              <div class="info">
                <p class="info-label">Views</p>
                <p class="info-count">${t.views}</p>
              </div>
              <div class="info">
                <p class="info-label">Comments</p>
                <p class="info-count">${t.comments}</p>
              </div>
              <div class="info">
                <p class="info-label">Downloads</p>
                <p class="info-count">${t.downloads}</p>
              </div>
            </div>
          </a>
        </li>`).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",o),q.refresh()}function M(){const r=document.querySelector(".gallery");r.innerHTML=""}function g(){document.querySelector(".loader-thumb").classList.add("visible")}function d(){document.querySelector(".loader-thumb").classList.remove("visible")}function h(){document.querySelector(".btn-loadmore").classList.add("visible")}function b(){document.querySelector(".btn-loadmore").classList.remove("visible")}async function L(r,o){const t={params:{key:"53949044-97be2f3ebdad7466ae66aa0c3",q:r,order:"latest",image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}};return(await w.get("https://pixabay.com/api/",t)).data}let c="",p=0,l=0,m=0,C=15;const a={timeout:3e3,closeOnEscape:!0,position:"topRight",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",titleColor:"#ffffff",titleSize:"16",messageColor:"#ffffff",messageSize:"16",maxWidth:"432"},n={form:document.querySelector(".form"),inputSearch:document.querySelector(".input-search"),btnSearch:document.querySelector(".btn-search"),btnLoadMore:document.querySelector(".btn-loadmore"),listImages:document.querySelector(".gallery")};n.form.addEventListener("submit",R);n.btnLoadMore.addEventListener("click",O);async function R(r){if(r.preventDefault(),c=n.inputSearch.value.trim(),n.inputSearch.value=c,c===""){a.title="ERROR ",a.message="Enter the image type",u.show(a);return}M(),b(),g(),l=1;let o;try{o=await L(c,l)}catch{d(),S(),n.form.reset();return}p=o.totalHits,m=Math.ceil(p/C);const i=o.hits;if(d(),i.length===0){a.title="",a.message="Sorry, there are no images matching your search query. Please try again!",u.show(a),n.form.reset();return}y(i),m>1?h():v(),n.form.reset()}async function O(r){b(),g(),l=l+1;let o;try{o=await L(c,l)}catch{d(),S();return}const i=o.hits;d(),y(i),l<m?h():v();const t=document.querySelector(".gallery-item"),e=Number(t.getBoundingClientRect().height);scrollBy(0,e*2)}function v(){a.title="",a.message="We're sorry, but you've reached the end of search results.",u.show(a)}function S(){a.title="",a.message="Sorry, error accessing resource",u.show(a)}
//# sourceMappingURL=index.js.map
