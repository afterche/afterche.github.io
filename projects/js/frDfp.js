
//
//Please sorry for English and Russian maybe to
//


var system = require('system');
var args = system.args;
var sysuser=system.args[1];
var page = require("webpage").create();
var fs = require("fs");
var execFile = require("child_process").execFile;
var home_dir= fs.workingDirectory;

//init
var start_time=curent_time="";
var balance="";
var sbalance="";
var answer="";
var fname="captcha.png";
var captcha_id="";
var pc="";//page_content
var ip="";
var ps=p="";
var topCaptcha=leftCaptcha=0;
var ami = "frDfp.js";//system.args[0];//code name
var report=ami+" ";
var err_index="";
var iglobal=0;
var capcha_index= String(Math.random()).slice(9);
var	capcha_name=capcha_index+".png";
var	capcha_tipe="lin";// Set captcha tipe

//****************Play file
var stat_for_test = "stat.txt";
var write_stat_to = "stat_frDfp.txt";
var log_file = "log_frDfp.txt";
var manager_file="manager_frDfp.txt"
		
	


// 1.Login
// 2.Play

//Поехали
console.log("Phantomjs.^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
console.log("Phantomjs.Hello I am "+ami);
console.log("Phantomjs.Hello!");

console.log('Phantomjs.File with stat data for testing = '+stat_for_test);
console.log('Phantomjs.File for write stat data = ' + write_stat_to);
console.log('Phantomjs.File for log = '+log_file);

if(!fs.isFile(log_file)){
	console.log('Phantomjs.File for log not found create him = '+log_file);
	fs.write(log_file, 'Phantomjs.File for log not found creat him = '+log_file, 'w');
}

if(!fs.isFile(write_stat_to)){
	console.log('Phantomjs.File for log not found create him = '+write_stat_to);
	fs.write(log_file, 'Phantomjs.File write_stat_to not foun creat him = '+write_stat_to, 'w');
}

fs.write(manager_file, '', 'w');


phantom.clearCookies();
ChekAndAddCooki();

function ChekAndAddCooki(){
	var CookieJar = "cookiD.ck";
	if(fs.isFile(CookieJar)){
		Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
			phantom.addCookie(x);
			//console.log("Phantomjs."+x);
		});
	}	
	setTimeout (OpenPage, 10000)
}

function OpenPage (){
	console.log("Phantomjs.OpenPage");
	page.viewportSize = { width: 1920, height: 1080 };//без этого вместо капчи картинка с фиг пойми чем
	var useragent = [];
	useragent.push('Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.4 (Change: )');
	useragent.push('Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14');
	useragent.push('Opera/9.80 (X11; Linux x86_64; U; fr) Presto/2.9.168 Version/11.50');
	useragent.push('Mozilla/5.0 (Unknown; Linux i686) AppleWebKit/534.34 (KHTML, like Gecko) Safari/534.34');
	useragent.push('Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.4 (Change: )');
	useragent.push('Mozilla/5.0 (X11; U; Linux; fr-FR) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.4');
	useragent.push('Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6');
	useragent.push('Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14');
	useragent.push('Opera/9.80 (X11; Linux x86_64; U; fr) Presto/2.9.168 Version/11.50');
	useragent.push('Mozilla/5.0 (Unknown; Linux i686) AppleWebKit/534.34 (KHTML, like Gecko) Safari/534.34');
	page.settings.userAgent =useragent[Math.floor(Math.random() * useragent.length)];
	console.log(page.settings.userAgent);
	page.open("https://freedoge.co.in/", function(status) {
		if(status !== "success") {
			console.log ("Phantomjs.Cant to load page");
			phantom.exit();
		} else {
			//setTimeout(full_screen_exit, 10000);
			setTimeout(TestLoginAfterCookies, 10000);
		}
	});
}

function TestLoginAfterCookies(){
	console.log("Phantomjs.TestLoginAfterCookies");
	var chek=false;
    chek=page.evaluate(function(){
        var be=document.getElementById("balance").innerHTML;
		return be;
    });
	console.log("Phantomjs.Chek="+chek);
	if (!chek){
		console.log("Phantomjs.Cant Login whith cookies chek cookies file");
		homepage_login_button();//GoTo Inter data for LOGIN if new user or cookies not accepted	
	}
	else {
		console.log("Phantomjs.DONE to LOGIN with Cookis");
		setTimeout (SaveCookLogin, 10000);//GoTo Get free ROLL!!!
		
		//********** TO DO
		//lets_play
		//********** TO DO
		
	}
}

//---Inter data for LOGIN if new user or cookies not accepted
function homepage_login_button(){
    console.log("Phantomjs.homepage_login_button.");
    page.evaluate(function(){ 
        //нажать на кнопку LOGIN
       var hlbx1x1x1a = document.getElementsByClassName("login_menu_button")[0];
       var hlbx1x1x1e = document.createEvent("MouseEvents");
       hlbx1x1x1e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
       hlbx1x1x1a.dispatchEvent(hlbx1x1x1e);
   });
	console.log("Phantomjs.EnterLoginData.");
	ps="FRD userName";
	p="UserPasHere";
	usr=ps;//Login whith btc addres
	console.log("Phantomjs.usr="+usr);
	page.evaluate(function(ps,p){
        var eps=ps;
        var ep=p;
        document.getElementById("login_form_doge_address").value = eps;//<--------------------THIS
        document.getElementById("login_form_password").value = ep;
    },ps,p);
	setTimeout (select_captcha_type_solvemedia_login, 10000);
}
	
function select_captcha_type_solvemedia_login(){
    console.log("Phantomjs.Select_captcha_type_solvemedia.");
    page.evaluate(function(){ 
        document.getElementById("signup_page_captcha_types").value="solvemedia";
		document.getElementById("solvemedia_captcha").style.display = "block";
        document.getElementById("recaptcha_v2_captcha").style.display = "none";
       //document.getElementById("recaptcha_v1_captcha").style.display = "none";
    });
  setTimeout(GetCaptchaLogin, 10000);
  //setTimeout (full_screen_exit, 10000);
  
}

function GetCaptchaLogin(){
	page.clipRect = { left: 1095, top: 353, width: 295, height: 127};
	//page.clipRect = { left: 700, top: 173, width: 500, height: 500};
	//page.clipRect = {top: 435, left: 855, width: 101, height: 15};
	console.log("Phantomjs.Get  captcha.");
	capcha_index= String(Math.random()).slice(9);
	capcha_name=capcha_index+".png";
	capcha_tipe="lin";// Set captcha tipe
	capcha_name=capcha_tipe+capcha_name;
	page.render(capcha_name);
	start_time=new Date().getTime();
	send_file="Yes";
	setTimeout(file_put(capcha_name), 8000);
	setTimeout(CaptchaRrecognizeFileLogin, 10000);
}

 function CaptchaRrecognizeFileLogin(){
	if (send_file==="Yes"){
		curent_time=new Date().getTime();
		console.log("Phantomjs.Captcha_recognize.Time" ,curent_time-start_time);
		//setTimeout(full_screen_exit, 15000);
		if((curent_time-start_time)>210000){//время на ввод капчи ms
			console.log("Phantomjs.Captcha_recognize.No time left... Next steep");
			//setTimeout(solcap, 15000);
			console.log("Phantomjs.Answer from Operator not present. Goto OCR");
			console.log("-------------------------------------------------------");
			setTimeout(solcap, 5000);
		}
		else {
			console.log("Phantomjs.Captcha_recognize.Get File...");
			
			//Where is catalog with captcha
			get_file("/js/100sat/answer/"+capcha_tipe+capcha_index+".aw");
			//Where is catalog with captcha
			
			console.log("Phantomjs.Captcha_recognize.Waiting for an answer...");
			if(fs.isFile(capcha_tipe+capcha_index+".aw")){//если файлик есть
				answer = fs.read(capcha_tipe+capcha_index+".aw");
				console.log("Phantomjs.answer=",answer);
				if (answer=="False") {//есть ответ - не могу разгадать
					console.log("Phantomjs.Geting a False answer, Samsing wrong, Exit...");
					setTimeout (full_screen_exit,1000); 
				}
				else {//есть ответ положительный
					send_file==="No"
					console.log("Phantomjs.answer=",answer);
					EnterAnswerLogin();
				}
			}
			else {//нету файла
				setTimeout(CaptchaRrecognizeFileLogin, 15000);
			} 
		}
	}//send_file chek	
}

function EnterAnswerLogin(){
    console.log("Phantomjs.Inter Answer to the webpage = ",answer);
	
	//////////////////////////////////////
	//answer="Remove_this_if_a_captcha_not_empty";
	//////////////////////////////////////
	
	if (answer===""){
		console.log("Phantomjs.We get an EMPTY answer. Exit. answer = ",answer);
		console.log("Phantomjs.Exit.");
		console.log("-------------------------");
		phantom.exit();
	} 
	else {
		var aw=answer;
		page.evaluate(function(aw){ 
			document.getElementById("adcopy_response").value=aw;
			var bx1x1x1a = document.getElementById("login_button");
			var bx1x1x1e = document.createEvent("MouseEvents");
			bx1x1x1e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			bx1x1x1a.dispatchEvent(bx1x1x1e);
		},aw);
		setTimeout(TestLogin, 10000);
		//setTimeout(full_screen_exit, 15000);
	}
}

function TestLogin(){
	var chek=false;
    chek=page.evaluate(function(){
        var be=document.getElementById("balance").innerHTML;
		return be;
    });
	console.log("Phantomjs.Chek="+chek);
	if (!chek){
		var err_login="NOOOOOOOOOOOOOOOOOOOOOO";
		err_login=page.evaluate(function(){
			var be=document.getElementById("login_error").innerHTML;
			return be;
		});
		console.log("Phantomjs.Cant Login to the frb err_login="+err_login+" ip="+ip);
		fs.write("cantlogin.w",ami+" Cant Login to the frb err_login=", 'w');//*[@id="login_error"]
		full_screen_exit();
	}
	else {
		console.log("Phantomjs.DONE to LOGIN");
		setTimeout (SaveCookLogin, 10000);
	}
}

function SaveCookLogin(){
	console.log("Phantomjs.Save cookies");
	var CookieJar = "cookiD.ck";
	fs.write(CookieJar, JSON.stringify(phantom.cookies), "w");
	setTimeout (GoToMULTIPLYBTC, 10000);// 2.Play
}		

function file_put(pf){
    execFile("ncftpput", ["-uftp-userXXXX","-pXXXX","XXXX","/js/100sat/captcha",pf], null, function (err, stdout, stderr) {
        console.log("PUT: ",pf);
        console.log(stderr);
    })
}
 
function get_file(gf){
	    execFile("ncftpget", ["-uftp-XXX","-pXXX","-DD","XXX",home_dir,gf], null, function (err, stdout, stderr) {
        console.log("GET: ",gf);
        console.log(stderr);
    })
}

function full_screen_exit(){
	page.clipRect = {top: 0, left: 0, width: 1920, height: 1600};
	page.render("frD.png");
	setTimeout(exit, 5000);
}

function exit(){
	console.log('Phantomjs.File with stat data for testing = '+stat_for_test);
	console.log('Phantomjs.File for write stat data = ' + write_stat_to);
	console.log('Phantomjs.File for log='+log_file);
    console.log("Phantomjs.Exit.");
    console.log("-------------------------");
    phantom.exit();
 }

function solcap(){
	var page2 = require("webpage").create();
	page2.settings.userAgent = 'Mozilla/5.0 (Unknown; Linux i686) AppleWebKit/534.34 (KHTML, like Gecko) Safari/534.34';
	page2.open('http://www.newocr.com/', function (status) {
		if(status !== "success") {
			console.log ("Phantomjs.Cant to load page www.newocr.com");
			err_index = String(Math.random()).slice(9);
			fs.write(err_index+".w", "Phantomjs.Cant to load page www.newocr.com");

			page2.render("newocr.png");
			page2.close();
			console.log("Phantomjs.Go to the next ocr.");
			setTimeout(solcap2, 1000);
		} else {
			console.log ("Phantomjs.Page www.newocr.com Load. Good.");
			page2.uploadFile('input[name=userfile]', capcha_name);
			console.log ("Phantomjs.Press preview.");
			page2.evaluate(function(){
				var lbx1x1x1a1 = document.getElementById("preview");
				var lbx1x1x1e1 = document.createEvent("MouseEvents");
				lbx1x1x1e1.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				lbx1x1x1a1.dispatchEvent(lbx1x1x1e1);
			});
			setTimeout(ocr, 25000);
			console.log ("Phantomjs. Waiting FOR Prepare rezult ... ");
		}
	});
	
	function ocr (){
		console.log ("Phantomjs. Prepare rezult ... ");
		var pp=page2.evaluate(function(){
			return document.getElementById("thumbnail-container").getElementsByClassName("alert")[0].textContent;
		});
		if (pp){
			console.log ("Phantomjs."+pp);
			//page2.render("newocr"+err_index+".jpg");
			setTimeout(solcap2, 1000);
		}
		else if(!pp){
			console.log ("Phantomjs. Trying to recognaze...");
			page2.evaluate(function(){
				var lbx1x1x1a1 = document.getElementById("ocr");
				var lbx1x1x1e1 = document.createEvent("MouseEvents");
				lbx1x1x1e1.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				lbx1x1x1a1.dispatchEvent(lbx1x1x1e1);
			});	 
			setTimeout(ocransw, 20000);
		}
	}
	
	function ocransw(){
		console.log ("Phantomjs. Geting answer...");
		var pc=page2.evaluate(function(){
			return document.getElementById("ocr-result").textContent;
		});
		if (!pc){
			console.log ("Phantomjs. Empty or null answer try www.to-text.com");
			setTimeout(solcap2, 1000);
		}
		console.log ("Phantomjs. RAW Answer is = "+pc);
		answer=pc.replace(/\n/g, ' ');
		answer=answer.trim();
		console.log ("Phantomjs. Cultivated Answer is = "+answer);
		//page2.render("newocr"+err_index+".jpg");
		page2.close();
		setTimeout(EnterAnswerLogin, 1000);
	}
}

// 2.Play

function GoToMULTIPLYBTC (){
		console.log ("Phantomjs.Press MULTIPLY BTC.");
			page.evaluate(function(){
				var lbx1x1x1a1 = document.getElementsByClassName("double_your_doge_link")[0];
				var lbx1x1x1e1 = document.createEvent("MouseEvents");
				lbx1x1x1e1.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				lbx1x1x1a1.dispatchEvent(lbx1x1x1e1);
			});
		//setTimeout (full_screen_exit, 10000);
		setTimeout (LetsPlay, 10000);
}
	
function LetsPlay(){
	console.log ("Phantomjs. LetsPlay ... ");
	
	//------Go
	//init
	var count1=1;
	var count2=2;
	var start_time="";
	var log="";
	var res_bet=0;//результат розыгрыша (проиграл,выиграл)
	var stop=1;//остановить скрипт ввести в консоль stop=0;
	var i=25;//сколько раз будим играть
	var ilog=i-1;//Иначе не будут писаться в лог текущие значения 
	var cpt=0;
	var cptmax=500000;
	var balance="";
	var ct=0;
	var count_value="";
	var sbalance="";
	var fin="";
	var stat="";
	var log="";
	var j=10;//задержка между проверками счетчика, ms
	var hi_or_lo="BET HI";
	var this_game_total=0;
	var this_win=0;
	
	
	
	var bet_value=0.019;
	 
	 
	now();
	start_time = new Date();
	fbalance();
	sbalance=balance;
	//save_stat(i+";"+now()+";"+time()+";"+count_value+";"+balance+";"+res_bet+";"+bet_value+";"+this_game_total);
		
	//**********************
	//real_play_or_tester = "tester";// real_play or tester
	real_play_or_tester = "lets_play";// real_play or tester
	//**********************
	
	//TODO
	if (real_play_or_tester === "tester"){
		if(fs.isFile(stat_for_test)){
			var how_many_from_statfile_read=0;
			var stream = fs.open("stat_for_test", 'r');
			while(!stream.atEnd()) {
				var line = stream.readLine();
				if (line != ""){
					console.log('Phantomjs.line=' + line);
				
					line=line.substring(line.indexOf(";")+1);
					console.log('Phantomjs.line=' + line);
					
					line=line.substring(line.indexOf(";")+1);
					console.log('Phantomjs.line=' + line);
					
					console.log('Phantomjs.time=' + how_many_from_statfile_read);
					if (how_many_from_statfile_read>5000) exit();
					how_many_from_statfile_read++;
				}
			}
			stream.close();
		} else {
			console.log('Phantomjs.File for test='+stat_for_test+' not found, nothing to test.Chek it. Exit.');
			exit();
		}
	} 
		
	if (real_play_or_tester === "lets_play"){
		console.log('Phantomjs.**********************');
		console.log('Phantomjs.real_play_or_tester = ' + real_play_or_tester+' Runnig play mode Good Luck');
		console.log('Phantomjs.**********************');
		set_bet_play();
	}
	//set_bet_play(3000000);
	
	function Strategy(){
		
	}
	 
	function set_bet_play(){
		bet_value=0.018;
		
		if (this_game_total<=-150){
			
			exit();
		}
		
		/* if (this_game_total>=-50 && this_game_total<0){
			bet_value=(Math.random() * ((this_game_total*-1)*10 - 0.018) + 0.018).toFixed(8);
			if (bet_value<=0.018) bet_value=0.018;
			if(bet_value>=10) bet_value=(Math.random() * 10).toFixed(8);
			console.log('Phantomjs.Take bet value from this_game_total');
		} */
		var payout=''+1.1;
		var temp=Math.random();
		if(temp<=1 && this_game_total<0){
			if (this_game_total<-1){
				bet_value=((this_game_total*-1)*11).toFixed(8);
			} else{
				bet_value=((this_game_total*-1)*11).toFixed(8);
			}
			
			
			if (bet_value<=0.018) bet_value=0.018;
			console.log('Phantomjs.Take bet value from this_game_total');
			
		}
		
	/* 	var temp=Math.random();
		if(this_game_total>0  && temp<=0.0999){
			
			bet_value=(0.018+0.018*Math.random()).toFixed(8);
			console.log('Phantomjs.Increase bet value');
		}
		
		hi_or_lo="BET HI";
		var temp=Math.random();
		console.log('tempRandom='+temp);
		if(temp<=0.4999){
			console.log('tempRandom='+temp);
			hi_or_lo='BET LO';
		} */
		
		//set BET AMOUNT
		page.evaluate(function(bet_value){
			 document.getElementById('double_your_doge_stake').value=bet_value;
		},bet_value);
		
		//set PAYOUT
		var point = page.evaluate(function () {
			var element = document.getElementById('double_your_doge_payout_multiplier');
			var rect = element.getBoundingClientRect();
			return {
				x: rect.left + Math.floor(rect.width / 2),
				y: rect.top + Math.floor(rect.height / 2)
			};
		});
		point.x=Math.floor(point.x);
		point.y=Math.floor(point.y);
		page.sendEvent('click', point.x, point.y);
		page.sendEvent('keypress', payout);//set PAYOUT
		
		//BET HI		
		if (hi_or_lo==='BET HI'){
			console.log('Phantomjs.Set_bet_play. bet_amount=' + bet_value+' payout='+payout+' hi_or_low='+hi_or_lo);
			save_log('Phantomjs.Set_bet_play. bet_amount=' + bet_value+' payout='+payout+' hi_or_low='+hi_or_lo);
			page.evaluate(function(){
				  //нажать на кнопку 
				  var sbhx1x1x1a = document.getElementById('double_your_doge_bet_hi_button');
				  var sbhx1x1x1e = document.createEvent('MouseEvents');
				  sbhx1x1x1e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				  sbhx1x1x1a.dispatchEvent(sbhx1x1x1e);
			});
			count1=get_count();//так счетчик проверяю, наверное переписать можно)))
			setTimeout(chek_count, j);
		} 
		//BET LO
		else if (hi_or_lo==='BET LO'){
			console.log('Phantomjs.Set_bet_play. bet_amount=' + bet_value+' payout='+payout+' hi_or_low='+hi_or_lo);
			save_log('Phantomjs.Set_bet_play. bet_amount=' + bet_value+' payout='+payout+' hi_or_low='+hi_or_lo);
			page.evaluate(function(){
				  //нажать на кнопку 
				  var sbhx1x1x1a = document.getElementById('double_your_doge_bet_lo_button');
				  var sbhx1x1x1e = document.createEvent('MouseEvents');
				  sbhx1x1x1e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				  sbhx1x1x1a.dispatchEvent(sbhx1x1x1e);
			});
			count1=get_count();//так счетчик проверяю, наверное переписать можно)))
			setTimeout(chek_count, j);
		}
	}//end function 
	
	//Проверяем остановился ли счетчик   
	function chek_count(){
		count2=get_count();
		if (count1==count2) {//счетчик остановился
			result();
		}
		else if (count1!=count2 && cpt<cptmax){//ограничение кол-ва проверок счетчика
			count1=count2;
			setTimeout(chek_count, j);
		} 
	}
	
	//Return count value
	function get_count(){
		var ct=page.evaluate(function(){
			var cte =
				document.getElementById("multiplier_first_digit").innerHTML+
				document.getElementById("multiplier_second_digit").innerHTML+
				document.getElementById("multiplier_third_digit").innerHTML+
				document.getElementById("multiplier_fourth_digit").innerHTML+
				document.getElementById("multiplier_fifth_digit").innerHTML;
			return cte;
		});
		count_value=ct;
		return ct;
	}
	
	//Result
	function result(){
		console.log("Phantomjs.count_value="+count_value);
		
		res_bet=page.evaluate(function(){
			if ((document.getElementById('double_your_doge_bet_win').innerHTML) !=""){//1
				return 1;
			}
			else if ((document.getElementById('double_your_doge_bet_lose').innerHTML)!=""){//-1
				return -1;
			}
			else if ( document.getElementById('double_your_doge_bet_lose').innerHTML ==""  
			&& document.getElementById('double_your_doge_bet_win').innerHTML==""){//NULL
				return 0;
			}
		});//page.evaluate
		
		var res_text=page.evaluate(function(){
			return document.getElementById('double_your_doge_result').innerText;
		});
		
		var win_rules=page.evaluate(function(){
			return document.getElementsByClassName('manual_bet_element manual_bet_gt_lt_p text_shadow margin_top5')[0].innerText;
		});		
			
		
		if  (hi_or_lo==='BET HI'){ 
			if(count_value > 1364){
				res_bet_from_count = 1;
			}else if (count_value <= 1364){
				res_bet_from_count = -1;
			}
		}else if  (hi_or_lo==='BET LO' ){
			if(count_value < 8636){
				res_bet_from_count = 1;
			}if (count_value >= 8636){
				res_bet_from_count = -1;
			}		
		}
		else{
			console.log("Phantomjs.Cent recognize count value. Exit count_value"+count_value);
			save_log(i+";"+now()+";"+time()+";"+count_value+";"+balance+";"+res_bet + "Phantomjs.Cent recognize count value. Exit count_value"+count_value);
			exit();
		}
		
		//Сравниваем то что посчитали по счетчику и то что получили реально  
		if (res_bet_from_count != res_bet){
			var compare_rezult = " NOT OK"
			console.log("Phantomjs.count_value="+count_value+" res_bet="+res_bet+" res_bet_from_count="+res_bet_from_count+compare_rezult);
			console.log("Phantomjs.WARNING!!! compare_rezult ="+compare_rezult+" samsing wrong... EXIT" );
			save_log(i+";"+now()+";"+time()+";"+count_value+";"+balance+";"+res_bet + "Phantomjs.WARNING!!! compare_rezult ="+compare_rezult+" samsing wrong... EXIT");
			exit();
		}
		else {
			var compare_rezult="OK";
			
			console.log("Phantomjs.win_rules="+win_rules);
			console.log("Phantomjs.res_bet="+res_bet);
			console.log("Phantomjs.res_text="+res_text);
					
			save_log("Phantomjs.win_rules="+win_rules);
			save_log("Phantomjs.res_bet="+res_bet);
			save_log("Phantomjs.res_text="+res_text);
			
			if (res_bet_from_count===1){
				var temp=res_text.replace(/[^.0-9]/gim,'');//Удаляем из строки все кроме точек и цифр
				temp=parseFloat(temp);
				
				this_win=temp*res_bet_from_count;
				this_game_total=this_game_total+this_win;
				this_game_total=this_game_total.toFixed(8);
				this_game_total=parseFloat(this_game_total);
				
				console.log("Phantomjs.*****************This Game TOTAL");
				console.log("Phantomjs.temp="+temp);
				console.log("Phantomjs.this_win="+this_win);
				console.log("Phantomjs.this_game_total="+this_game_total);
				console.log("Phantomjs.**********************************");
				
				save_log("Phantomjs.*****************This Game TOTAL");
				save_log("Phantomjs.temp="+temp);
				save_log("Phantomjs.this_win="+this_win);
				save_log("Phantomjs.this_game_total="+this_game_total);
				save_log("Phantomjs.*********************************");
				
				save_manager('*this_win='+this_win+':bet_value='+bet_value+'*'+this_game_total);
				
								
			} else{
				var temp=res_text.replace(/[^.0-9]/gim,'');//Удаляем из строки все кроме точек и цифр
				temp=parseFloat(temp);
				
				this_win=temp*res_bet_from_count;
				this_game_total=this_game_total+this_win;
				this_game_total=this_game_total.toFixed(8);
				this_game_total=parseFloat(this_game_total);
				
				console.log("Phantomjs.*****************This Game TOTAL");
				console.log("Phantomjs.temp="+temp);
				console.log("Phantomjs.this_win="+this_win);
				console.log("Phantomjs.this_game_total="+this_game_total);
				console.log("Phantomjs.**********************************");
				
				save_log("Phantomjs.*****************This Game TOTAL");
				save_log("Phantomjs.temp="+temp);
				save_log("Phantomjs.this_win="+this_win);
				save_log("Phantomjs.this_game_total="+this_game_total);
				save_log("Phantomjs.*********************************");
				
				save_manager('*this_win='+this_win+':bet_value='+bet_value+'*'+this_game_total);
			}
			
			
			console.log("Phantomjs.count_value="+count_value+" res_bet="+res_bet+" res_bet_from_count="+res_bet_from_count+" compare_rezult="+compare_rezult);
			save_log("Phantomjs.count_value="+count_value+" res_bet="+res_bet+" res_bet_from_count="+res_bet_from_count+" compare_rezult="+compare_rezult);
				 if (res_bet==1){
				fbalance();
				ct++;
				i--;
				console.log("i="+i);
				next();//
			}
			else if(res_bet==-1){
				fbalance();
				//stat=balance+";;*"+"-1;";
				//save_stat(stat);
				ct--;
				i--;
				console.log("i="+i);
				next();
			}
			else if(res_bet==0){
				console.log("Phantomjs.result=WARNIG!!! Samthing Wrong in function ('result'). res_bet==0");
				save_log(i+";"+now()+";"+time()+";"+count_value+";"+balance+";"+res_bet +"Phantomjs.result=WARNIG!!! Samthing Wrong in function ('result') res_bet=0!!!.")
				exit();
			}
			else{
				console.log("Phantomjs.result=WARNIG!!! Samthing Wrong in function ('result').");
				save_log(i+";"+now()+";"+time()+";"+count_value+";"+balance+";"+res_bet +"Phantomjs.result=WARNIG!!! Samthing Wrong in function ('result').")
				exit();
			}
		}	
	}
	
	function next(){
			 if(i>0 && stop){
			 fbalance();
			 console.log("Phantomjs.balance="+balance);
			 console.log("Phantomjs.**************** NEXT PLAY");
			
			save_log("Phantomjs.balance="+balance);
			save_log("Phantomjs.**************** NEXT PLAY");
			 
			 save_stat(i+";"+now()+";"+time()+";"+count_value+";"+res_bet+";"+bet_value+";"+this_win+";"+this_game_total+";"+balance);
			// console.log(i+";"+now()+";"+time()+";"+count_value+";"+balance+";"+res_bet); 
			 setTimeout(set_bet_play(), 5000)
			  
		} 
		else if(i<=0 && this_game_total>0) {
			
			save_log("Phantomjs.NEW LETS Play");
			save_manager("Phantomjs.NEW LETS Play");
			console.log("Phantomjs.NEW LETS Play");
			save_stat(i+";"+now()+";"+time()+";"+count_value+";"+res_bet+";"+bet_value+";"+this_win+";"+this_game_total+";"+balance);
			LetsPlay();
		}
		else if(i<=0 && this_game_total<=0) {
			
			 fbalance();
			 console.log("Phantomjs.balance="+balance);
			 console.log("Phantomjs.**************** NEXT PLAY EXTRA");
			
			save_log("Phantomjs.balance="+balance);
			save_log("Phantomjs.**************** NEXT PLAY EXTRA");
			 
			save_stat(i+";"+now()+";"+time()+";"+count_value+";"+res_bet+";"+bet_value+";"+this_win+";"+this_game_total+";"+balance);
			// console.log(i+";"+now()+";"+time()+";"+count_value+";"+balance+";"+res_bet); 
			 setTimeout(set_bet_play, 500)
		}
		else {	
			fbalance();
			save_stat(i+";"+now()+";"+time()+";"+count_value+";"+res_bet+";"+bet_value+";"+this_win+";"+this_game_total+";"+balance);
			fin="j="+j+"\n"+
			"StartBalance="+sbalance+"\n"+
			"ct="+ct+"\n"+
			"Balance="+balance+"\n"+
			start_time+"<---start_time"+"\n"+
			new Date();
			log="Done   "+fin;
			save_log(log);   
			setTimeout(full_screen_exit, 1000);//<----------ОТЛАДОЧНЫЙ ВЫХОД
		}
	}
	
	function save_log(str_to_file){
	 str_to_file=str_to_file+"\n";
	 fs.write(log_file, str_to_file, 'a');
	}
	
	function save_manager(str_to_file){
	 str_to_file=str_to_file+"\n";
	 fs.write(manager_file, now()+';'+str_to_file, 'w');
	}
	
	function save_stat(stf){
	 stf=stf+"\n";
	 fs.write(write_stat_to, stf, 'a');
	}
		
		 
	 function  time(){
		 var t=new Date().getHours();
		 t+=":"+new Date().getMinutes();
		 t+=":"+new Date().getSeconds();
		 t+=":"+new Date().getMilliseconds();
		return t; 
	 }

	//Date
	function now(){
	 var d = new Date(); 
	 return d;
	}
	 
	function exit(){
	  now();
	  page.render('example.png');
	  console.log(fin);
	  console.log("Phantomjs.Exit.");
	  console.log("-------------------------");
	  phantom.exit();
	 //} 
	}
	 
	
	function fbalance(){
	 balance=page.evaluate(function(){
	  var be=document.getElementById("balance").innerHTML;
	  return be;
	 });
	}
}//END LetsPlay	

		   
function fbalance(){
    balance=page.evaluate(function(){
        var be=document.getElementById("balance").innerHTML;
        return be;
    });
}

function exit123(){
    if(ttt>=ttt2){
      fbalance();
      console.log("Phantomjs.Exit.");
      console.log("-------------------------");
      phantom.exit();
    }
    else {
      ttt++;
      console.log("Phantomjs.ttt=",ttt);
      phantom.clearCookies();
      setTimeout(login,5000);
    }
}

function now(){
    var d = new Date(); 
    console.log(d);
}

function page_reload(){
    page.reload();
    setTimeout(select_captcha_type_recaptcha_v1, 10000);
}
