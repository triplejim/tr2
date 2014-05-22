var id;	
var nowDate;
var name;
var dname;
var vi;
var sql;
var cn_str;
var strSQL;
var trArray = new Array;
var wfno;
var checkID; 
var holidayWorkDate;
var exchangedHoliday;
var shinyaZangyoTime;
var year;
var month; 
var day;
var date;
var kyushutsuStr;
var furikaeStr;
var yukyuStr;
var tokukyuStr;
var kekkinStr;
var shinyaStr;

nowDate = dateChange(new Date());

/*
 * GET users listing.
 */
exports.list = function(req, res){

if(req.query.id=="new"){

res.render('user',{title:'ユーザ追加',hrid:'',name:'',domainname:'',visible:0,view:3,msg:'編集中',nowDate:nowDate});

}else{

id = req.query.id;

	
sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Select HRID,Name,DomainName,Visible From M_社員マスタ";
strSQL =  strSQL + " Where HRID = '"+ id +"'";

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

sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Select WFNo,CheckID,HolidayWorkDate,ExchangedHoliday,ShinyaZangyoTime,Year,Month,Day From T_TimeReportWF";
strSQL =  strSQL + " Where HRID = '"+ id +"'"


kyushutsuStr="";
furikaeStr="";
yukyuStr="";
tokukyuStr="";
kekkinStr="";
shinyaStr="";


var query = sql.query(cn_str,strSQL,function(err,rst) {


for(var i=0;i<rst.length;i++){

	 wfno = rst[i]['WFNo'].replace(/\s+$/, "");
	 checkID = rst[i]['CheckID'];
	 holidayWorkDate = rst[i]['HolidayWorkDate'].replace(/\s+$/, "");
	 exchangedHoliday = rst[i]['ExchangedHoliday'].replace(/\s+$/, "");
	 shinyaZangyoTime = rst[i]['ShinyaZangyoTime']
	 year = rst[i]['Year'].replace(/\s+$/, "");
	 month = rst[i]['Month'].replace(/\s+$/, "");
	 day = rst[i]['Day'].replace(/\s+$/, "");
	
	date = year + "/" + month + "/" + day; 
	
	switch(checkID){
	
		case 1:
			kyushutsuStr += wfno + ";" + exchangedHoliday + ";" + date + ",";break;
					
		case 2:
			furikaeStr += wfno + ";" + holidayWorkDate + ";" + date + ",";break;		
		
		case 3:
			yukyuStr += wfno + ";" + date + ",";break;

		case 4:
			tokukyuStr += wfno + ";" + date + ",";break;

		case 5:
			kekkinStr += wfno + ";" + date + ",";break;
			
		case 6:

			shinyaStr += wfno + ";" + shinyaZangyoTime + ";" + date + ",";break;			
	}

};


kyushutsuStr = kyushutsuStr.substring(0,kyushutsuStr.length-1);
furikaeStr = furikaeStr.substring(0,furikaeStr.length-1);
yukyuStr = yukyuStr.substring(0,yukyuStr.length-1);
tokukyuStr = tokukyuStr.substring(0,tokukyuStr.length-1);
kekkinStr = kekkinStr.substring(0,kekkinStr.length-1);
shinyaStr = shinyaStr.substring(0,shinyaStr.length-1);


res.render('user',{title:name + 'さん',hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
kyushutsuStr:kyushutsuStr,
furikaeStr:furikaeStr,
yukyuStr:yukyuStr,
tokukyuStr:tokukyuStr,
kekkinStr:kekkinStr,
shinyaStr:shinyaStr
});

if (err) {
res.render('user', { title: 'ERROR' });
console.log(err);
}


});
	
});
};

};



exports.index = function(req, res){

if(req.body.cmd_edit=="編集"){

res.render('user',{title:name + 'さん',hrid:id,name:name,domainname:dname,visible:vi,view:2,msg:'編集中',nowDate:nowDate,
kyushutsuStr:kyushutsuStr,
furikaeStr:furikaeStr,
yukyuStr:yukyuStr,
tokukyuStr:tokukyuStr,
kekkinStr:kekkinStr,
shinyaStr:shinyaStr
});
}

if(req.body.cmd_update=="更新"){

name = req.body.txt_name;
dname = req.body.txt_domainname;
vi = req.body.cmb_visible;

if(name.length==0){

	res.render('user',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:2,msg:'社員名を入力してください',nowDate:nowDate});

}else if(dname.length==0){

	
	res.render('user',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:2,msg:'アカウントを入力してください',nowDate:nowDate});

}else{
sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Update M_社員マスタ Set Name='"+ name +"',DomainName= '"+ dname +"',visible = "+ vi +""
strSQL= strSQL + " Where HRID = '"+ id +"'"

console.log(strSQL);

sql.query(cn_str,strSQL);


res.render('user',{title:name + 'さん',hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'更新しました。',nowDate:nowDate,
kyushutsuStr:kyushutsuStr,
furikaeStr:furikaeStr,
yukyuStr:yukyuStr,
tokukyuStr:tokukyuStr,
kekkinStr:kekkinStr,
shinyaStr:shinyaStr
});
}
}

if(req.body.cmd_return=="戻る"){

res.redirect(302,"http://localhost:3000/users?id="+ id + "");

}

if(req.body.cmd_insert=="追加"){

id = req.body.txt_hrid;
name = req.body.txt_name;
dname = req.body.txt_domainname;
vi = req.body.cmb_visible;

if(id.length==0){

	res.render('user',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:3,msg:'社員番号を入力してください',nowDate:nowDate});

}else if(name.length==0){

	
	res.render('user',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:3,msg:'社員名を入力してください',nowDate:nowDate});

}else if(dname.length==0){

	
	res.render('user',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:3,msg:'アカウントを入力してください',nowDate:nowDate});

}else{

sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Insert into M_社員マスタ(HRID,Name,DomainName,Visible) Values('"+ id +"','"+ name +"','"+ dname +"',"+ vi +")";

console.log(strSQL);

sql.query(cn_str,strSQL);

res.render('user',{title:name + 'さん',hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'追加しました。',nowDate:nowDate,
kyushutsuStr:'',
furikaeStr:'',
yukyuStr:'',
tokukyuStr:'',
kekkinStr:'',
shinyaStr:''
});
}
}

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
	}

	
	return year + month;
	
	

};
