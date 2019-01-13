
//
//Please sorry for English and Russian maybe to
//



var page = require("webpage").create();
var fs = require("fs");

//init
var ami = "getBbalance";//system.args[0];//code name
var su=fs.read("su.u");
su=su.trim();
var total_balance=0;
var got_it=1;
var i=0;
var k=1;
var pause_after=500;
var ara=[];
var HowManyRepeatUnrecognize = 0;

	//+++++++++++++++++++Setings
	var LIST_file="AllD";// where get adreses
	var total_file="totalD.csv"; // where put recived data
	var log_file = "logD.log"; // 
	//-------------------Setings
	
//Поехали
console.log("Phantomjs.^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
console.log("Phantomjs. Hello I am "+ami);
console.log("Phantomjs.Hello!");
 
CreateAdrrAra();

function CreateAdrrAra(){
	
	if (!fs.isFile(LIST_file)){
		console.log("Phantomjs.ERROR. Can't finde "+LIST_file+"Exit"); 
		fs.write(su+".w", new Date()+"Can't finde "+LIST_file+" file use stat", 'w');
		phantom.exit();
	}
	
	if (!fs.isFile(log_file)){
		console.log("Phantomjs.total_file="+log_file+" dosent exits create him"); 
		fs.write(log_file,"", 'w');
	}
		
	if (!fs.isFile(total_file)){
		console.log("Phantomjs.total_file="+total_file+" dosent exits create him"); 
		fs.write(total_file,"", 'w');
	}
	
	var stream = fs.open(total_file, 'r');
	while(!stream.atEnd()) {
		var line = stream.readLine();
		if (line != ""){
			got_it++;
		}
	}
	stream.close();
	console.log("Phantomjs.We have a got_it="+got_it+" line in total_file="+total_file);
	
	if (got_it>1){
		total_balance=parseInt(line.substring(line.lastIndexOf(";")+1));
		console.log("Phantomjs.Parse total_balance from total_file="+total_file+" total_balance="+total_balance);
	}
	
	k=got_it;
	var stream = fs.open(LIST_file, 'r');
	while(!stream.atEnd()) {
		var line = stream.readLine();
		line=line.trim();
		if (line != ""){
			i++;
			ara[i]=line;
		}
	}
	stream.close();
	console.log('Phantomjs.i='+i);
	if (i!=0){
		setTimeout(GetBalanceFromBCI, 1000);
	}
	else{
		phantom.exit();
	}
}


function GetBalanceFromBCI(){
	var adr=ara[k];
	var page = require("webpage").create();
	
	var get_data="https://dogechain.info/api/v1/address/balance/"+adr; // <-------------- API
	
	//console.log (get_data);
	
	page.open(get_data, function (status) {
		//console.log("Phantomjs.openpg");
		if (status !== 'success') {
			console.log('Phantomjs.Unable to GET GetBalanceFromBCI !');
			console.log('Phantomjs.Cant Connect!');
			fs.write(log_file,'Phantomjs.Cant Connect!'+"\n", 'a');
			phantom.exit();
		} 
		else {//status=success
			pause_after--;
			if (pause_after<=0){
				pause_after=500;
				console.log("-----------------");
				console.log("Phantomjs. PAUSE after 500");
				console.log("-----------------");
				page.close();
				setTimeout(GetBalanceFromBCI, 150000);
			}
			else{
				
				//var bal=page.evaluate(function(){
					//return document.getElementsByTagName("BODY")[0].innerText;
				//});
				
				var json_data = page.plainText;
			//	console.log ("json_data="+json_data);
				json_data= JSON.parse(json_data);
			//	console.log ("json_data.final_balance="+json_data.balance);
				var bal = json_data.balance;
				bal=+bal;
				var se
				
				console.log('Phantomjs.'+"adr="+adr+' adrbal='+bal+" adreses="+i+" curentadress="+k+" totalBalance="+total_balance);
				if (bal==="Maximum concurrent requests for this endpoint reached. Please try again shortly."){
					console.log("-----------------");
					console.log("Phantomjs. bal="+bal);
					console.log("-----------------");
					console.log("Phantomjs. PAUSE");
					fs.write(log_file,'Phantomjs.'+"adr="+adr+' adrbal='+bal+" adreses="+i+" curentadress="+k+" totalBalance="+total_balance+"\n","a");
					page.close();
					setTimeout(GetBalanceFromBCI, 150000);
				} 
				else if(bal=="404 page not found"){
					console.log("-----------------");
					console.log("Phantomjs. bal="+bal);
					console.log("-----------------");
					fs.write(log_file,'Phantomjs.'+"adr="+adr+' adrbal='+bal+" adreses="+i+" curentadress="+k+" totalBalance="+total_balance+"\n","a");
					console.log("Phantomjs. PAUSE 300000");
					page.close();
					setTimeout(GetBalanceFromBCI, 150000);
				}
				
				else if(/[A-z]/.test(bal)){
					console.log("-----------------");
					console.log("Phantomjs. Unrecognize at k="+k+" Adr="+adr+" bal="+bal);
					console.log("Phantomjs. HowManyRepeatUnrecognize="+HowManyRepeatUnrecognize);
					console.log("-----------------");
					if(HowManyRepeatUnrecognize>=5){
						fs.write(log_file,"Phantomjs. Unrecognize at k="+k+" Adr="+adr+" bal="+bal+" totalBalance="+total_balance+"\n", 'a');
						console.log("Phantomjs. PAUSE 300000");
						k++;
fs.write(total_file,"Finde none zero balance at k="+k+" Adr="+adr+" balance="+balance+"\n", 'a');
						HowManyRepeatUnrecognize=0;
						page.close();
						setTimeout(GetBalanceFromBCI, 1500);
					}
					else  {
						HowManyRepeatUnrecognize++;
						setTimeout(GetBalanceFromBCI, 60000);
					}
				}
				else {
					fs.write(total_file,i+";"+k+";"+adr+";"+bal+";"+total_balance+"\n", 'a');
					balance=bal;
					//var balance=parseInt(bal);
					
					console.log("Phantomjs. balance  after parse bal="+balance);
					if (balance > 0  || balance === 0){
						if (balance!=0){
							//console.log("Phantomjs.k="+k+" Adr="+adr+" balance="+balance);
							fs.write(log_file,"Finde none zero balance at k="+k+" Adr="+adr+" balance="+balance+"\n", 'a');
						
							total_balance+=balance;
							console.log('Phantomjs.total_balance='+total_balance);
						}
						if (k>i){
							console.log('Phantomjs.total_balance='+total_balance);
							console.log('Phantomjs.--------------------');
							console.log('Phantomjs.DONE.Exit');
							phantom.exit();
						}
						else{
							k++;
							page.close();
							setTimeout(GetBalanceFromBCI, 3000);
						}
					}
					else{
						k++;
						console.log("Phantomjs. Unrecognize at k="+k+" Adr="+adr+" balance="+balance);
						fs.write(log_file,"Phantomjs. Unrecognize at k="+k+" Adr="+adr+" balance="+balance+"\n", 'a');
						page.close();
						setTimeout(GetBalanceFromBCI, 3000);
					}
				}	
			}	
		}	
	});
}	
