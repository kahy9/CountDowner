(()=>{new URLSearchParams(window.location.search);const e=new Date,t=(e.getMonth(),e.getFullYear());let a,n="";if("e"===location.href.split("/")[3]&&(n=location.href.split("/")[4]),"c"===location.href.split("/")[3]&&(a=location.href.split("/")[4]),""!==n)switch(n){case"christmas-eve":const e=new Date(`12/24/${t} 19:00`).getTime();location.href=`../?d=${e}&n=🎄 Christmas ${t} 🎄`;break;case"christmas":const a=new Date(`12/25/${t} 8:00`).getTime();location.href=`../?d=${a}&n=🎄 Christmas ${t} 🎄`;break;case"nwyr":const n=new Date(`1/1/${t+1} 0:00`).getTime();location.href=`../?d=${n}&n= Year ${t+1} `}else""!==a?fetch(`/api/get?code=${a}`,{}).then((e=>e.json())).then((e=>location.href=e.result)):location.href="../"})();