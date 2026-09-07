const v=document.getElementById('hero-video');v.muted=true;
function play(){v.play().catch(()=>{});}
if(v.canPlayType('application/vnd.apple.mpegurl')){v.src='./hero.m3u8';v.addEventListener('loadedmetadata',play);}
else if(window.Hls&&Hls.isSupported()){const hls=new Hls({maxBufferLength:24,backBufferLength:24});hls.loadSource('./hero.m3u8');hls.attachMedia(v);hls.on(Hls.Events.MANIFEST_PARSED,play);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)v.pause();else play();});

// The live Sezar page turns the location cards into a horizontal slider below 1280px.
// This standalone snapshot has no Vue/Swiper hydration, so reproduce that behavior here.
const layoutFix=document.createElement('style');
layoutFix.textContent=`
@media (max-width:1279.98px){
  .ProjectLocation_1SCwj{overflow:hidden!important;}
  .ProjectLocation_1SCwj .bottom_Joopm{
    display:flex!important;
    flex-direction:row!important;
    gap:16px!important;
    overflow-x:auto!important;
    overflow-y:hidden!important;
    scroll-snap-type:x mandatory!important;
    scroll-behavior:smooth!important;
    -webkit-overflow-scrolling:touch!important;
    scrollbar-width:none!important;
    padding:0 28px 0 28px!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm::-webkit-scrollbar{display:none!important;}
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM{
    flex:0 0 calc(100vw - 56px)!important;
    width:calc(100vw - 56px)!important;
    max-width:720px!important;
    min-width:0!important;
    aspect-ratio:364/488!important;
    max-height:none!important;
    scroll-snap-align:start!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._full_kt01R{
    grid-column:auto!important;
    grid-row:auto!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._full_kt01R .text_ilQVK .textWrapper_oJzVW{
    min-width:0!important;
    max-width:calc(100% - 32px)!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj,
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj._imgLeft_4yX3q,
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj._imgRight_cd9Zn{
    display:flex!important;
    flex-direction:column-reverse!important;
    justify-content:space-between!important;
    align-items:stretch!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj .image_KKg3d{
    width:100%!important;
    max-width:none!important;
    height:52%!important;
    aspect-ratio:auto!important;
    flex:0 0 52%!important;
    border-radius:16px!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj .image_KKg3d img{
    width:100%!important;
    height:100%!important;
    object-fit:cover!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj .text_ilQVK,
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj._imgRight_cd9Zn .text_ilQVK,
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj._imgLeft_4yX3q .text_ilQVK{
    height:48%!important;
    padding:24px 16px 16px!important;
    display:block!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj .text_ilQVK .textWrapper_oJzVW{
    margin:0!important;
    width:100%!important;
  }
  .ProjectLocation_1SCwj .location-pagination-demo{
    display:flex!important;
    justify-content:center!important;
    gap:14px!important;
    margin:40px auto 0!important;
    padding:0 28px!important;
  }
  .ProjectLocation_1SCwj .location-pagination-demo button{
    display:block!important;
    width:42px!important;
    height:3px!important;
    border:0!important;
    border-radius:2px!important;
    padding:0!important;
    background:#393939!important;
    cursor:pointer!important;
  }
  .ProjectLocation_1SCwj .location-pagination-demo button.active{
    background:#f3f3f3!important;
  }
}
@media (min-width:1280px){
  .ProjectLocation_1SCwj .location-pagination-demo{display:none!important;}
}
`;
document.head.appendChild(layoutFix);

const locationTrack=document.querySelector('.ProjectLocation_1SCwj .bottom_Joopm');
if(locationTrack){
  const cards=[...locationTrack.querySelectorAll('.card_b0HlM')];
  if(cards.length>1){
    const pagination=document.createElement('div');
    pagination.className='location-pagination-demo';
    const dots=cards.map((card,i)=>{
      const b=document.createElement('button');
      b.type='button';
      b.setAttribute('aria-label',`Слайд ${i+1}`);
      if(i===0)b.classList.add('active');
      b.addEventListener('click',()=>card.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'}));
      pagination.appendChild(b);
      return b;
    });
    locationTrack.insertAdjacentElement('afterend',pagination);
    let ticking=false;
    const updatePagination=()=>{
      ticking=false;
      if(window.innerWidth>=1280)return;
      const trackLeft=locationTrack.getBoundingClientRect().left;
      let active=0,min=Infinity;
      cards.forEach((card,i)=>{const d=Math.abs(card.getBoundingClientRect().left-trackLeft);if(d<min){min=d;active=i;}});
      dots.forEach((d,i)=>d.classList.toggle('active',i===active));
    };
    locationTrack.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updatePagination);}},{passive:true});
    window.addEventListener('resize',updatePagination,{passive:true});
  }
}

// Interactive iframe block is temporarily disabled.
const interactiveTour=document.getElementById('interactive-tour');
if(interactiveTour){interactiveTour.replaceWith(document.createComment(' interactive-tour iframe temporarily disabled '));}
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();window.open('https://sezar-group.ru/projects/sezar-budushee','_blank','noopener');}));
