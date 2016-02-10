var fhome={
	mux:function(data)
	{
	  switch(data.task)
		{
		case 'init':
		fdb.createDb();
		break;
	  case 'refresh':
		//aggiorna dati db  
			
		break;
	  }
	
	}
	
}