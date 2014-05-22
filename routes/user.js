var id;	
var no;
var nowDate;
var str;
var target;

var userProp = require('./userProp');
var userWF = require('./userWF');
var common = require('./common');

nowDate = common.dateChange(new Date());


/*
 * GET users listing.
 */
exports.list = function(req, res){

if(req.query.id=="new"){

userProp.new(res,nowDate);

}else{

id = req.query.id;
str = req.query.str;

if (str > 0){

		target = req.query.target;

		switch(target){

			case 'wf':

				userWF.sqldel(res,nowDate,id,str);

				break;
			case 'pj':

				userWF.pjedit(res,nowDate,id,str);

				break;

			default:
			break;
		}

}else{
	
		userProp.view(res,nowDate,id,str);
	
}

}

};




