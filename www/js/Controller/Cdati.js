var cdati={
	zero:null,
	alpha:null,
	numberUser:null,
	time:null,
	interval:null,
	init:function(){
		
		setInterval(function(){
			this.getAlpha();
		},1800000);
		setInterval(function(){ this.getNumberUser()},900000);
	  
		this.getAlpha();
		
	},
	getAlpha:function(){
		//Sostituire con una chiamata ajax al server per ottenere il parametro temporale di aggiornamento
		this.alpha=1000;
	},
	getNumberUser:function(){
		//sostituire con una chiamata ajax al server per ottenere il numero di utenti all'interno del sistema di riferimento
		this.numberUser=Math.floor((Math.random() * 8) + 3); //genera un numero casuale tra 3 e 10
	},
	setSys:function(sys){
		
		if( this.zero != sys)
			{ 
			this.zero=sys;
			this.getNumberUser();
		
		}
		this.time=this.numberUser*this.alpha;
		if (this.interval != null)
	   {clearInterval(this.interval);}
		this.interval= setInterval(function(){console.log("aggiorno i dati con periodo: "+cdati.time)},this.time);
	},
	

}