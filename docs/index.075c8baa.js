class e{apiKey="0ehYarwpgNomTKildjqjlFIPwp5yikde";async getHeadlines(e="home"){let t={home:`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${this.apiKey}`,business:`https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${this.apiKey}`,sports:`https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=${this.apiKey}`,politics:`https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=${this.apiKey}`};try{let s=await fetch(t[e]);return(await s.json()).results||[]}catch(e){return console.error("Error fetching news:",e),[]}}async searchHeadlines(e){return(await this.getHeadlines("home")).filter(t=>t.title.toLowerCase().includes(e.toLowerCase()))}}class t{display(e){let t=document.querySelector(".main");t.innerHTML="",e.forEach(e=>{let s=document.createElement("a");if(s.classList.add("headline"),s.href=e.url,s.target="_blank",e.multimedia&&e.multimedia.length>0){let t=document.createElement("img");t.src=e.multimedia[0].url,s.appendChild(t)}let i=document.createElement("h2");i.textContent=e.title,s.appendChild(i),t.appendChild(s)})}}(async()=>{let s=new e,i=new t,a=document.getElementById("search-input"),l=document.getElementById("search-button"),n=document.getElementById("no-results-text"),o="home",c=await s.getHeadlines(o);i.display(c),document.querySelectorAll(".category").forEach(e=>{e.addEventListener("click",async()=>{o=e.getAttribute("data-category"),c=await s.getHeadlines(o),i.display(c)})}),l.addEventListener("click",async()=>{let e=a.value.trim();if(a.value="",e){let t=await s.searchHeadlines(e);t.length>0?(n.style.display="none",i.display(t)):(n.style.display="block",setTimeout(()=>n.style.display="none",2e3))}else n.style.display="block",setTimeout(()=>n.style.display="none",2e3)}),document.getElementById("hamburger").addEventListener("click",()=>{document.querySelector(".category-bar").classList.toggle("active")})})();
//# sourceMappingURL=index.075c8baa.js.map
