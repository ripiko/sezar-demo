const v=document.getElementById('hero-video');v.muted=true;
function play(){v.play().catch(()=>{});}
if(v.canPlayType('application/vnd.apple.mpegurl')){v.src='./hero.m3u8';v.addEventListener('loadedmetadata',play);}
else if(window.Hls&&Hls.isSupported()){const hls=new Hls({maxBufferLength:24,backBufferLength:24});hls.loadSource('./hero.m3u8');hls.attachMedia(v);hls.on(Hls.Events.MANIFEST_PARSED,play);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)v.pause();else play();});
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();window.open('https://sezar-group.ru/projects/sezar-budushee','_blank','noopener');}));
