exports.index = function(req, res){

var checkS;
var searchS;
var sql;
var cn_str;
var strSQL;

if (req.body.cmd_all=="全件表示"){

searchS = "";
sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="select HRID,Name,DomainName,Visible from M_社員マスタ"

if(req.body.visible=="vonly"){
	strSQL = strSQL + " Where Visible =0"
	checkS = 1
}else{
	checkS = 0
};

console.log(strSQL);

sql.query(cn_str,strSQL,function(err,rst) {

if (err) {
res.render('index', { title: 'ERROR' });
console.log(err);
}

res.render('index2',{ title: 'TIMEREPORT',
    rst: rst,radioS: checkS,textS: searchS
});
});

}else{

if (req.body.searchStr) {

searchS = req.body.searchStr
sql=require('node-sqlserver');
cn_str="Driver={SQL Server Native Client 11.0};Server={(local)\\SQLEXPRESS};Database={timereport};Trusted_Connection={Yes}";
strSQL="select HRID,Name,DomainName,Visible from M_社員マスタ";
strSQL = strSQL + " where (HRID like '%" + searchS + "%' or Name like '%" + searchS + "%' or DomainName like '%" + searchS +"%')";

if(req.body.visible=="vonly"){
	strSQL = strSQL + " and Visible =0"
	checkS = 1
}else{
	checkS = 0
};

console.log(strSQL);


sql.query(cn_str,strSQL,function(err,rst) {

if (err) {
res.render('index', { title: 'ERROR' });
console.log(err);
}
res.render('index2',{ title: 'TIMEREPORT',
    rst: rst,radioS: checkS,textS: searchS
});
});
}
else {
res.render('index', { title: 'TIMEREPORT' });
}
};
};
