var id;
var nowDate;
var name;
var dname;
var vi;
var sql;
var cn_str;
var strSQL;


nowDate = dateChange(new Date());


id = req.query.id;


sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Select HRID,Name,DomainName,Visible From M_社員マスタ";
strSQL =  strSQL + " Where HRID = '"+ id +"'"

sql.query(cn_str,strSQL,function(err,rst) {

for(var i=0;i<rst.length;i++){

	name = rst[i]['Name'];
	dname = rst[i]['DomainName'];
	vi = rst[i]['Visible'];
	str = name + ";" + dname + ";" + vi;
	
};

if (err) {
res.render('user', { title: 'ERROR' });
console.log(err);
}

res.render('content1',{hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate});


});



function dateChange(dateStr){

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
	};

	
	return year + month;
	
	

}