exports.dateChange = function(dateStr){

	var year;
	var month;
	var day;

	year = dateStr.getFullYear();
	month = dateStr.getMonth();
	day = dateStr.getDay();


	if(month<10){
	
		month = "0" + String(month);

	}else{

		month = String(month);
	}

	
	return year + month;
	
	

};