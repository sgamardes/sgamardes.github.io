var defile;// l'element a deplacer
var psinit = 80; // position horizontale de depart
var pscrnt = psinit;       
var sens = 0;
function textedefile() {
   if (!defile) defile = document.getElementById('defile');
   if (defile) {
   if (!sens) {
      if(pscrnt < ( - psinit)){
         sens = 1;
      } else {
         pscrnt--; // pixel par deplacement
      }
	} else {
      if(pscrnt > psinit){
         sens = 0;
      } else {
         pscrnt++; // pixel par deplacement
      }
	  }
      defile.style.left = pscrnt+"px";
   }
}
setInterval("textedefile()",20); // delai de deplacement 0.