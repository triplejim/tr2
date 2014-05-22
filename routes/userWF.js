var title;
var id;
var nowDate;
var name;
var dname;
var vi;
var kyushutsuStr;
var furikaeStr;
var yukyuStr;
var tokukyuStr;
var kekkinStr;
var shinyaStr;
var sql;
var cn_str;
var strSQL;
var idx = 0;
var idxyear;
var idxmonth;
var pjstr;



exports.list = function(res,stitle,sid,snowDate,sname,sdname,svi,view,msg,tryear,trmonth,sidx){

var idno;
var wfno;
var checkID; 
var holidayWorkDate;
var exchangedHoliday;
var shinyaZangyoTime;
var year;
var month; 
var day;
var date;

var pjname;
var pjcode;
var clname;
var pjdate;
var pjtime;
var pjid;



	
title = stitle;
id = sid;
nowDate = snowDate;
name = sname;
dname = sdname;
vi = svi;
idx = sidx;
idxyear = tryear;
idxmonth = trmonth;

sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Select ID,WFNo,CheckID,HolidayWorkDate,ExchangedHoliday,ShinyaZangyoTime,Year,Month,Day From T_TimeReportWF";
strSQL =  strSQL + " Where HRID = '"+ id +"' and Year = '"+ idxyear +"' and Month = '"+ idxmonth +"'";


kyushutsuStr="";
furikaeStr="";
yukyuStr="";
tokukyuStr="";
kekkinStr="";
shinyaStr="";


sql.query(cn_str,strSQL,function(err,rst) {

console.log(strSQL);

for(var i=0;i<rst.length;i++){
	
    idno = rst[i]['ID'];
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
			kyushutsuStr += wfno + ";" + exchangedHoliday + ";" + date + ";" + idno + ",";break;
					
		case 2:
			furikaeStr += wfno + ";" + holidayWorkDate + ";" + date  + ";" + idno + ",";break;		
		
		case 3:
			yukyuStr += wfno + ";" + date  + ";" + idno + ",";break;

		case 4:
			tokukyuStr += wfno + ";" + date  + ";" + idno + ",";break;

		case 5:
			kekkinStr += wfno + ";" + date  + ";" + idno + ",";break;
			
		case 6:

			shinyaStr += wfno + ";" + shinyaZangyoTime + ";" + date  + ";" + idno + ",";break;			
	}

}


kyushutsuStr = kyushutsuStr.substring(0,kyushutsuStr.length-1);
furikaeStr = furikaeStr.substring(0,furikaeStr.length-1);
yukyuStr = yukyuStr.substring(0,yukyuStr.length-1);
tokukyuStr = tokukyuStr.substring(0,tokukyuStr.length-1);
kekkinStr = kekkinStr.substring(0,kekkinStr.length-1);
shinyaStr = shinyaStr.substring(0,shinyaStr.length-1);

strSQL = "Select T_TimeReportPJ.id,T_TimeReportPJ.Date, T_TimeReportPJ.HRID, T_TimeReportPJ.PJCode, T_TimeReportPJ.WorkTime, M_PJマスタ.CLName, M_PJマスタ.PJName";
strSQL += " FROM T_TimeReportPJ LEFT OUTER JOIN M_PJマスタ ON T_TimeReportPJ.PJCode = M_PJマスタ.PJCode";
strSQL += " where T_TimeReportPJ.HRID = '"+ id +"'";
strSQL += " and year(T_TimeReportPJ.Date)= '"+ idxyear +"' and month(T_TimeReportPJ.Date) = '"+ idxmonth +"'";
strSQL += " order by T_TimeReportPJ.PJCode";

sql.query(cn_str,strSQL,function(err,rst) {

console.log(strSQL);
pjstr="";

for(var i=0;i<rst.length;i++){
	
		pjdate = rst[i]['Date'];
		pjcode = rst[i]['PJCode'];
		pjname = rst[i]['PJName'];
		clname = rst[i]['CLName'];
		pjtime = rst[i]['WorkTime'];
		pjid = rst[i]['id'];
	
		pjstr += pjdate + ";" + pjcode + ";" + pjname + ";" + clname + ";" + pjtime + ";" + pjid  + ","
	
};



res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:view,msg:msg,nowDate:nowDate,
kyushutsuStr:kyushutsuStr,
furikaeStr:furikaeStr,
yukyuStr:yukyuStr,
tokukyuStr:tokukyuStr,
kekkinStr:kekkinStr,
shinyaStr:shinyaStr,
kyadd:1,
fradd:1,
ykadd:1,
tkadd:1,
kkadd:1,
syadd:1,
idx:idx,
idxyear:idxyear,
idxmonth:idxmonth,
pjstr:pjstr,
pjadd:1,
pjlist:''
});


if (err) {
res.render('user', { title: 'ERROR' });
console.log(err);
}

});

if (err) {
res.render('user', { title: 'ERROR' });
console.log(err);
}


});
	
};


exports.action = function(res,key){

switch(key){

	case 'kyadd':

		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:2,
		fradd:1,
		ykadd:1,
		tkadd:1,
		kkadd:1,
		syadd:1,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:1,
		pjlist:''
		});
	break;

	case 'fradd':

		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:1,
		fradd:2,
		ykadd:1,
		tkadd:1,
		kkadd:1,
		syadd:1,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:1,
		pjlist:''
		});
	break;


	case 'ykadd':


		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:1,
		fradd:1,
		ykadd:2,
		tkadd:1,
		kkadd:1,
		syadd:1,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:1,
		pjlist:''
		});
	break;


	case 'tkadd':

		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:1,
		fradd:1,
		ykadd:1,
		tkadd:2,
		kkadd:1,
		syadd:1,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:1,
		pjlist:''
		});
	break;


	case 'kkadd':

		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:1,
		fradd:1,
		ykadd:1,
		tkadd:1,
		kkadd:2,
		syadd:1,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:1,
		pjlist:''
		});
	break;


	case 'syadd':

		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:1,
		fradd:1,
		ykadd:1,
		tkadd:1,
		kkadd:1,
		syadd:2,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:1,
		pjlist:''
		});
	break;

	
	case 'pjadd':

		var pjlist ="";
	
		strSQL = "select PJCode,PJName,CLName";
		strSQL += " from M_PJマスタ";
		strSQL += " where visible=1";

		sql.query(cn_str,strSQL,function(err,rst) {
		console.log(strSQL);

		for(var i=0;i<rst.length;i++){

			pjlist += rst[i]['PJCode'] + " " + rst[i]['PJName']  + ";";

		};

		pjlist = pjlist.substring(0,pjlist.length -1);
		console.log(idx);
		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:1,
		fradd:1,
		ykadd:1,
		tkadd:1,
		kkadd:1,
		syadd:1,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:2,
		pjlist:pjlist
		});
		
		if (err) {
		res.render('user', { title: 'ERROR' });
		console.log(err);
		}

		});

	break;


	case 'cancel':


		res.render('userWF',{title:title,hrid:id,name:name,domainname:dname,visible:vi,view:1,msg:'',nowDate:nowDate,
		kyushutsuStr:kyushutsuStr,
		furikaeStr:furikaeStr,
		yukyuStr:yukyuStr,
		tokukyuStr:tokukyuStr,
		kekkinStr:kekkinStr,
		shinyaStr:shinyaStr,
		kyadd:1,
		fradd:1,
		ykadd:1,
		tkadd:1,
		kkadd:1,
		syadd:1,
		idx:idx,
		idxyear:idxyear,
		idxmonth:idxmonth,
		pjstr:pjstr,
		pjadd:1,
		pjlist:''
		});

	break;

	



		



	default:
	break;
}

};


exports.sql = function(req,res,key){

var wfmsg;

	sql=require('node-sqlserver');
	cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
	strSQL="Insert into T_TimeReportWF(HRID,WFNo,CheckID,HolidayWorkDate,ExchangedHoliday,ShinyaZangyoTime,Year,Month,Day)";

	switch(key){

		case 'kyinsert':

			var kyday = req.body.txt_kyday;
			var syear = kyday.substr(0,4);
			var smonth = kyday.substr(6,2).replace(/\//g,'');
			var sday = kyday.substr(9,2).replace(/\//g,'');
			var kywfno = req.body.txt_kywfno;
			var furikaeday = req.body.txt_furikaeday.replace(/\//g,'-');

			strSQL +=" values('"+ id +"','"+ kywfno +"',1,'','"+ furikaeday +"',0,'"+ syear +"','"+ smonth +"','"+ sday +"')";

		
		wfmsg = "休日出勤申請";
		break;

		case 'frinsert':
		
			var frday = req.body.txt_frday;
			var syear = frday.substr(0,4);
			var smonth = frday.substr(6,2).replace(/\//g,'');
			var sday = frday.substr(9,2).replace(/\//g,'');
			var frwfno = req.body.txt_frwfno;
			var kyushutsuday = req.body.txt_kyushutsuday.replace(/\//g,'-');
			
			strSQL +=" values('"+ id +"','"+ frwfno +"',2,'','"+ kyushutsuday +"',0,'"+ syear +"','"+ smonth +"','"+ sday +"')";

			wfmsg = "振替休日申請";
			break;

		
		case 'ykinsert':
		
			var ykday = req.body.txt_ykday;
			var syear = ykday.substr(0,4);
			var smonth = ykday.substr(6,2).replace(/\//g,'');
			var sday = ykday.substr(9,2).replace(/\//g,'');
			var ykwfno = req.body.txt_ykwfno;
			
			
			strSQL +=" values('"+ id +"','"+ ykwfno +"',3,'','',0,'"+ syear +"','"+ smonth +"','"+ sday +"')";

			wfmsg = "有給休暇申請";
			break;


		case 'tkinsert':
		
			var tkday = req.body.txt_tkday;
			var syear = tkday.substr(0,4);
			var smonth = tkday.substr(6,2).replace(/\//g,'');
			var sday = tkday.substr(9,2).replace(/\//g,'');
			var tkwfno = req.body.txt_tkwfno;
			
			strSQL +=" values('"+ id +"','"+ tkwfno +"',4,'','',0,'"+ syear +"','"+ smonth +"','"+ sday +"')";

			wfmsg = "特別休暇申請";
			break;

		case 'kkinsert':
		
			var kkday = req.body.txt_kkday;
			var syear = kkday.substr(0,4);
			var smonth = kkday.substr(6,2).replace(/\//g,'');
			var sday = kkday.substr(9,2).replace(/\//g,'');
			var kkwfno = req.body.txt_kkwfno;
			
			strSQL +=" values('"+ id +"','"+ kkwfno +"',5,'','',0,'"+ syear +"','"+ smonth +"','"+ sday +"')";

			wfmsg = "欠勤申請";
			break;


		case 'syinsert':
		
			var syday = req.body.txt_syday;
			var syear = syday.substr(0,4);
			var smonth = syday.substr(6,2).replace(/\//g,'');
			var sday = syday.substr(9,2).replace(/\//g,'');
			var sywfno = req.body.txt_sywfno;
			var shinyazikan = req.body.txt_shinyazikan;
			
			strSQL +=" values('"+ id +"','"+ sywfno +"',6,'','',"+ shinyazikan +",'"+ syear +"','"+ smonth +"','"+ sday +"')";

			wfmsg = "深夜残業申請";
			break;





		default:
		break;

		
	}

	sql.query(cn_str,strSQL);
	console.log(strSQL);


	this.list(res,name + 'さん',id,nowDate,name,dname,vi,1,wfmsg + 'を追加しました。',new Date().getFullYear(),new Date().getMonth(),idx);


};

exports.sqldel = function(res,ndate,uid,wno){

	sql=require('node-sqlserver');
	cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
	strSQL = "Delete From T_TimeReportWF Where ID = '"+ wno +"'"

	sql.query(cn_str,strSQL);
	console.log(strSQL);


	this.list(res,name + 'さん',id,nowDate,name,dname,vi,1,'申請番号' + wno + 'を削除しました。',new Date().getFullYear(),new Date().getMonth(),idx);

};


exports.pjedit = function(res,udate,uid,pno){


	

};

exports.pjsql = function(res,req,key){



	sql=require('node-sqlserver');
	cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";

	var pjdate;
	var pjcode;
	var pjworktime;
	var pjArray;

	var mcnt = new Date(idxyear,idxmonth,0).getDate();

	pjcode = req.body.cmb_pjdata;

	
	switch(key){

		
		case 'insert':

			pjworktime = req.body.txt_1 + "," + req.body.txt_2 + "," + req.body.txt_3 + "," + req.body.txt_4 + "," + req.body.txt_5
			 + "," + req.body.txt_6 + "," + req.body.txt_7 + "," + req.body.txt_8 + "," + req.body.txt_9 + "," + req.body.txt_10 + "," + req.body.txt_11
			 + "," + req.body.txt_12 + "," + req.body.txt_13 + "," + req.body.txt_14 + "," + req.body.txt_15 + "," + req.body.txt_16 + "," + req.body.txt_17
			 + "," + req.body.txt_18 + "," + req.body.txt_19 + "," + req.body.txt_20 + "," + req.body.txt_21 + "," + req.body.txt_22 + "," + req.body.txt_23
			 + "," + req.body.txt_24 + "," + req.body.txt_25 + "," + req.body.txt_26 + "," + req.body.txt_27 + "," + req.body.txt_28;
			
			if (mcnt == 30){

				pjworktime += req.body.txt_29 + "," + req.body.txt_30;

			}else if (mcnt==31){

				pjworktime += req.body.txt_29 + "," + req.body.txt_30 + "," + req.body.txt_31 + "," + req.body.txt_28;

			}

			pjArray = pjworktime.split(",");
			
			for (var i =1; i<mcnt; i++){
			
				pjdate = idxyear + "-" + idxmonth + "-" + i;
				
				if(pjArray[i-1]){
		
					strSQL="Insert into T_TimeReportPJ(Date,HRID,PJCode,WorkTime)";
					strSQL += " values('"+ pjdate +"','"+ id +"','"+ pjcode +"','"+ pjArray[i-1] +"')";

					sql.query(cn_str,strSQL);
					console.log(strSQL);
				}

			}

			this.list(res,name + 'さん',id,nowDate,name,dname,vi,1,pjcode + 'を追加しました。',new Date().getFullYear(),new Date().getMonth(),idx);

			//
			//strSQL += " values(

		break;

		
	}

};		

