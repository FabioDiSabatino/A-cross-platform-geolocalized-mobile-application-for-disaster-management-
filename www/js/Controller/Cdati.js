var cdati={
	zero:null,
	alpha:null,
	sysInfo:{numberUser:null,used:false},
	time:null,
	interval:null,
	init:function(){
		
		setInterval(function(){
			this.getAlpha();
		},1800000);
		setInterval(function(){ 
			
			cdati.getNumberUser();
		},60000);
	  
		this.getAlpha();
		
	},
	getAlpha:function(){
		//Sostituire con una chiamata ajax al server per ottenere il parametro temporale di aggiornamento
		this.alpha=1000;
	},
	getNumberUser:function(){
		//sostituire con una chiamata ajax al server per ottenere il numero di utenti all'interno del sistema di riferimento
		this.sysInfo.numberUser=Math.floor((Math.random() * 8) + 3); //genera un numero casuale tra 3 e 10
    this.sysInfo.used=false;
	
	},
	setSys:function(sys){
		//funzione richiamata ad ogni localizzazione
		if( this.zero != sys)
			{ 
			this.zero=sys;
			this.getNumberUser();
		
		
		}
		//se non ho già utilizzato il numero di utenti per calcolare periodo allora ricalcola
		if(!this.sysInfo.used)
		{
			this.time=this.sysInfo.numberUser*this.alpha;
		  if (this.interval != null)
	     {clearInterval(this.interval);
			 }
			this.sysInfo.used=true;
			console.log("aggiorno i dati con periodo: "+this.time);
		  this.interval= setInterval(function(){console.log("aggiornamento...")},this.time);
	  }
		
	},
	

}