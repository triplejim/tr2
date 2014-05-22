var id;
var nowDate;
var name;
var dname;
var vi;
var sql;
var cn_str;
var strSQL;

var userWF = require('./userWF');


exports.new = function(res,nDate){


res.render('userProp',{title:'ユーザ追加',hrid:'',name:'',domainname:'',visible:0,view:3,msg:'編集中',nowDate:nDate});

};


exports.view = function(res,nDate,uid,str){

id = uid;
nowDate = nDate


sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Select HRID,Name,DomainName,Visible From M_社員マスタ";
strSQL =  strSQL + " Where HRID = '"+ id +"'";

sql.query(cn_str,strSQL,function(err,rst) {

for(var i=0;i<rst.length;i++){

	name = rst[i]['Name'];
	dname = rst[i]['DomainName'];
	vi = rst[i]['Visible'];
	
	if(str=='foo'){
		userWF.list(res,name + 'さん',id,nowDate,name,dname,vi,1,'',new Date().getFullYear(),new Date().getMonth(),0);

	}else{
		var arr = str.split('年');
		var y = arr[0];
		var arr2 = arr[1].split('月');
		var m = arr2[0];
		var i = arr2[1];
		console.log(i);
		userWF.list(res,name + 'さん',id,nowDate,name,dname,vi,1,'',y,m,i);}


}
console.log(strSQL);

if (err) {
res.render('user', { title: 'ERROR' });
console.log(err);
}


});

};

exports.edit = function(req, res){


if(req.body.cmd_edit=="編集"){


	userWF.list(res,name + 'さん',id,nowDate,name,dname,vi,2,'編集中',new Date().getFullYear(),new Date().getMonth(),0);
}

if(req.body.cmd_update=="更新"){

name = req.body.txt_name;
dname = req.body.txt_domainname;
vi = req.body.cmb_visible;

if(name.length===0){
	
	userWF.list(res,name + 'さん',id,nowDate,name,dname,vi,2,'社員名を入力してください',new Date().getFullYear(),new Date().getMonth(),0);

}else if(dname.length===0){

	userWF.list(res,name + 'さん',id,nowDate,name,dname,vi,2,'アカウントを入力してください',new Date().getFullYear(),new Date().getMonth(),0);


}else{

sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Update M_社員マスタ Set Name='"+ name +"',DomainName= '"+ dname +"',visible = "+ vi +"";
strSQL= strSQL + " Where HRID = '"+ id +"'";

console.log(strSQL);

sql.query(cn_str,strSQL);

	userWF.list(res,name + 'さん',id,nowDate,name,dname,vi,2,'更新しました。',new Date().getFullYear(),new Date().getMonth(),0);



}
}

if(req.body.cmd_return=="戻る"){

res.redirect(302,"http://localhost:3000/users?id="+ id +  "&str=foo");

}

if(req.body.cmd_insert=="追加"){


var nDate;
var common = require('./common');

id = req.body.txt_hrid;
name = req.body.txt_name;
dname = req.body.txt_domainname;
vi = req.body.cmb_visible;
nDate = common.dateChange(new Date());


if(id.length===0){

	res.render('userProp',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:3,msg:'社員番号を入力してください',nowDate:nDate});

}else if(name.length===0){

	
	res.render('userProp',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:3,msg:'社員名を入力してください',nowDate:nDate});

}else if(dname.length===0){

	
	res.render('userProp',{title:'ユーザ追加',hrid:id,name:name,domainname:dname,visible:vi,view:3,msg:'アカウントを入力してください',nowDate:nDate});

}else{

sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="Insert into M_社員マスタ(HRID,Name,DomainName,Visible) Values('"+ id +"','"+ name +"','"+ dname +"',"+ vi +")";

console.log(strSQL);

sql.query(cn_str,strSQL);

userWF.list(res,name + 'さん',id,nDate,name,dname,vi,1,'追加しました。',new Date().getFullYear(),new Date().getMonth(),0);

}

}


if(req.body.cmd_kyadd=="追加"){

	//console.log(res);
	userWF.action(res,'kyadd');
	
}

if(req.body.cmd_fradd=="追加"){

	//console.log(res);
	userWF.action(res,'fradd');
}

if(req.body.cmd_ykadd=="追加"){

	//console.log(res);
	userWF.action(res,'ykadd');
}

if(req.body.cmd_tkadd=="追加"){

	//console.log(res);
	userWF.action(res,'tkadd');
}

if(req.body.cmd_kkadd=="追加"){

	//console.log(res);
	userWF.action(res,'kkadd');
}

if(req.body.cmd_syadd=="追加"){

	//console.log(res);
	userWF.action(res,'syadd');
}

if(req.body.cmd_kyinsert=="更新"){

	userWF.sql(req,res,'kyinsert');

}

if(req.body.cmd_frinsert=="更新"){

	userWF.sql(req,res,'frinsert');

}

if(req.body.cmd_ykinsert=="更新"){

	userWF.sql(req,res,'ykinsert');

}

if(req.body.cmd_tkinsert=="更新"){

	userWF.sql(req,res,'tkinsert');

}

if(req.body.cmd_kkinsert=="更新"){

	userWF.sql(req,res,'kkinsert');

}

if(req.body.cmd_syinsert=="更新"){

	userWF.sql(req,res,'syinsert');

}


if(req.body.cmd_cancel=="キャンセル"){

	userWF.action(res,'cancel');
}


if(req.body.cmd_pjadd=="追加"){

	userWF.action(res,'pjadd');
}


if(req.body.cmd_pjcancel=="キャンセル"){

	userWF.action(res,'cancel');

}

if(req.body.cmd_pjinsert=="更新"){

	userWF.pjsql(res,req,'insert');
}

};

