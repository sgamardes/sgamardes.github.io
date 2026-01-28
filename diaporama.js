var defilement = false;
			var Fondu = function(classe_img){
				this.classe_img = classe_img;
				this.courant = 0;
				this.coeff = 100;
				this.collection = this.getImages();
				this.collection[0].style.zIndex = 100;
				this.total = this.collection.length - 1;
				this.encours = false;
			}
			Fondu.prototype.getImages = function(){
				var tmp = [];
				if(document.getElementsByClassName){
					tmp = document.getElementsByClassName(this.classe_img);
				}
				else{
					var i=0;
					while(document.getElementsByTagName('*')[i]){
						if(document.getElementsByTagName('*')[i].className.indexOf(this.classe_img)>-1){
							tmp.push(document.getElementsByTagName('*')[i]);
						}
						i++;
					}
				}
				var j=tmp.length;
				while(j--){
					if(tmp[j].filters){
						tmp[j].style.width = tmp[j].style.width || tmp[j].offsetWidth+'px';
						tmp[j].style.filter = 'alpha(opacity=100)';
						tmp[j].opaque = tmp[j].filters[0];
						this.coeff = 1;
					}
					else{
						tmp[j].opaque = tmp[j].style;
					}
				}
				return tmp;
			}
			Fondu.prototype.change = function(sens){
				var prevObj = this.collection[this.courant];
				if(this.encours){
					return false;
				}
				this.encours = true;
				if(sens){
					this.courant++;
					if(this.courant>this.total){
						this.courant = 0;
					}
				}
				else{
					this.courant--;
					if(this.courant<0){
						this.courant = this.total;
					}
				}
				var nextObj = this.collection[this.courant];
				nextObj.style.zIndex = 50;
				var tmpOp = 100;
				var that = this;
				var timer = setInterval(function(){
					if(tmpOp<0){
						clearInterval(timer);
						timer = null;
						prevObj.opaque.opacity = 0;
						nextObj.style.zIndex = 100;
						prevObj.style.zIndex = 0;
						prevObj.opaque.opacity = 100 / that.coeff;
						that.encours = false;
					}
					else{
						prevObj.opaque.opacity = tmpOp / that.coeff;
						tmpOp -= 5;
					}
				}, 25);
			}
			function defil(){
				var boutons = document.getElementsByTagName('input');
				if(defilement){
					clearInterval(defilement);
					defilement = false;
					boutons[1].value = 'Défilement automatique';
				}
				else{
					monFondu.change(true);
					defilement = setInterval(function(){monFondu.change(true);},2000);
					boutons[1].value = 'Stopper le défilement';
				}
				boutons[0].disabled = !boutons[0].disabled;
				boutons[2].disabled = !boutons[2].disabled;
			}