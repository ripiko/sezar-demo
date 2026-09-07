const v=document.getElementById('hero-video');v.muted=true;
function play(){v.play().catch(()=>{});}
if(v.canPlayType('application/vnd.apple.mpegurl')){v.src='./hero.m3u8';v.addEventListener('loadedmetadata',play);}
else if(window.Hls&&Hls.isSupported()){const hls=new Hls({maxBufferLength:24,backBufferLength:24});hls.loadSource('./hero.m3u8');hls.attachMedia(v);hls.on(Hls.Events.MANIFEST_PARSED,play);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)v.pause();else play();});

// Static snapshot fallback: the original Vue page turns this block into a slider
// below 1280px. In the standalone demo there is no hydration, so keep a stable grid.
const layoutFix=document.createElement('style');
layoutFix.textContent=`
@media (min-width:768px) and (max-width:1279.98px){
  .ProjectLocation_1SCwj .bottom_Joopm{
    display:grid!important;
    grid-template-columns:repeat(4,minmax(0,1fr))!important;
    grid-auto-flow:dense!important;
    gap:16px!important;
    padding:0 16px!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._full_kt01R{
    grid-column:span 2!important;
    grid-row:span 2!important;
    width:100%!important;
    min-width:0!important;
    max-height:none!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj{
    grid-column:span 2!important;
    grid-row:span 1!important;
    width:100%!important;
    min-width:0!important;
    max-height:none!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._part_U7CJj .image_KKg3d{
    max-width:none!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._full_kt01R .text_ilQVK .textWrapper_oJzVW{
    min-width:0!important;
  }
}
@media (max-width:767.98px){
  .ProjectLocation_1SCwj .bottom_Joopm{
    display:flex!important;
    flex-direction:column!important;
    gap:16px!important;
    padding:0 16px!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM{
    width:100%!important;
    min-width:0!important;
  }
  .ProjectLocation_1SCwj .bottom_Joopm .card_b0HlM._full_kt01R .text_ilQVK .textWrapper_oJzVW{
    min-width:0!important;
  }
}
`;
document.head.appendChild(layoutFix);

// Interactive iframe block is temporarily disabled.
const interactiveTour=document.getElementById('interactive-tour');
if(interactiveTour){interactiveTour.replaceWith(document.createComment(' interactive-tour iframe temporarily disabled '));}
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();window.open('https://sezar-group.ru/projects/sezar-budushee','_blank','noopener');}));
