
//
//Please sorry for English and Russian maybe to
//

var ami = "parser.js";//system.args[0];//code name

var system = require('system');
var args = system.args;
var sysuser=system.args[1];
var page = require("webpage").create();
var execFile = require("child_process").execFile;
var fs = require("fs");
var home_dir= fs.workingDirectory;
var report=new Date()+ami+" ";
var err_index="";
var arrary_posts=[];
var page_namber=1;

//var site_adress='http://post-factum.net';

//*************Site for parse
var site_adress='http://teplomonster.ru';
//*************Site for parse

/* phantom.onError = function(msg, trace) {
  console.log("phantom.onError"); 
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  //phantom.exit(1);
}; */

//Поехали
console.log("Phantomjs.^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
console.log("Phantomjs. Hello I am "+ami);
console.log("Phantomjs.Hello!");

setTimeout(exit_by_timeout, 8200000);//Extra EXIT 

function exit_by_timeout(){
	err_index = String(Math.random()).slice(9);
	fs.write(err_index+".w","   ERROR!!! - Exit by timeout", 'w');
	console.log("Phantomjs.ERROR!!! - Exit by timeout");
	console.log("Phantomjs.Exit.");
	console.log("-------------------------");
	phantom.exit();
}
var continue_parse = true;
	
LetsGo();

function LetsGo(){
	page.viewportSize = { width: 1920, height: 1080 };
	//set user agent
	var useragent = [];
	useragent.push('Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.4 (Change: )');
	useragent.push('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
	useragent.push('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
	useragent.push('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
	useragent.push('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
	useragent.push('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
	useragent.push('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36');
	useragent.push('Mozilla/5.0 (X11; U; Linux; fr-FR) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.4');
	useragent.push('Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6');
	useragent.push('Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14');
	useragent.push('Opera/9.80 (X11; Linux x86_64; U; fr) Presto/2.9.168 Version/11.50');
	useragent.push('Mozilla/5.0 (Unknown; Linux i686) AppleWebKit/534.34 (KHTML, like Gecko) Safari/534.34');
	page.settings.userAgent = useragent[Math.floor(Math.random() * useragent.length)];
	console.log ("Phantomjs.UserAgent set to = "+page.settings.userAgent);
	
	Parser();
	
	function Parser(){
		console.log ("Phantomjs.Start reading page");
		var page_adress=site_adress;
		if (page_namber>1) page_adress=site_adress+"/page/"+page_namber+"/";//Первая страница без индекса
		console.log ("Phantomjs.page_adress = "+page_adress);
			page.open(page_adress, function (status) {
			if(status !== "success") {
				console.log ("Phantomjs.Cant to load page");
				setTimeout(full_screen_exit_err, 5000);
			} 
			else {
				console.log ("Phantomjs.Page Load. Good.");
				setTimeout(GetPosts, 3000);
			}
		});
	}
	
	function GetPosts(){
		//var is_that_empty_page=page.evaluate(function(){
			//	return document.getElementsByClassName('jumbotron')[0].innerText;
		//});
		var numbers_posts_on_the_page=page.evaluate(function(){
				return document.getElementsByClassName('col-md-6 box masonry-brick').length;
		});	
		console.log ("Phantomjs.numbers_posts_on_the_page="+numbers_posts_on_the_page);
		if (numbers_posts_on_the_page===0){// <------Заглушка, убрать || page_namber>3// тест парсятся не все страницы
			console.log ("Phantomjs.No posts in that page found, perhaps that is last-empty page.");
			continue_parse=false;
			setTimeout(ParsingControl, 3000);
		} else{
			
			for (var i=0; i<numbers_posts_on_the_page; i++){//не меньше или равно так как тагс считаются с нуля, а length с единицы 
				var line=page.evaluate(function(i){
					var element=document.getElementsByClassName('col-md-6 box masonry-brick')[i];
					var ahref_post=element.getElementsByClassName("post-box-img")[0].getElementsByTagName("a")[0].href;
					var ahref_image=element.getElementsByClassName("post-box-img")[0].getElementsByTagName("img")[0].src;
					var post_title=element.getElementsByClassName("post-box-details")[0].getElementsByTagName("a")[0].innerText;
					var post_overview=element.getElementsByClassName("post-box-details")[0].getElementsByTagName("p")[0].innerText;
					
					var line=ahref_post+"*"+ahref_image+"["+post_title+"]"+post_overview;
					return line;
				},i);
				console.log ("Phantomjs.i="+(i+1));//добавил единичку чтоб не путаться
				//console.log ("Phantomjs.line="+line);
				/*
				Симолы "* [ ]" - не могут быть использованы в тексте или ссылках 
				иначе правильно распарсить не получится
				*/
				if(line){
					arrary_posts.push(line);
					var ahref_post=line.substring(0,line.indexOf("*"));//от начала до
					var ahref_image=line.substring(line.indexOf("*")+1,line.indexOf("["));//между
					var post_title=line.substring(line.indexOf("[")+1,line.indexOf("]"));//между
					var post_overview=line.substring(line.lastIndexOf("]")+1);//с конца и до
					/* console.log ("Phantomjs.ahref_post="+ahref_post);
					console.log ("Phantomjs.ahref_image="+ahref_image);
					console.log ("Phantomjs.post_title="+post_title);
					console.log ("Phantomjs.post_overview="+post_overview);  */
				} 
				else {//если пустой пост
					console.log ("Phantomjs. EMPTY line="+line);
					var ahref_post="NO DATA FAUND";
					var ahref_image="http://teplomonster.ru/wp-content/themes/wix/images/no-image.png";
					var post_title="NO DATA FAUND";
					var post_overview="NO DATA FAUND";
					var line=ahref_post+"*"+ahref_image+"["+post_title+"]"+post_overview;
					console.log ("Phantomjs.ahref_post="+ahref_post);
					console.log ("Phantomjs.ahref_image="+ahref_image);
					console.log ("Phantomjs.post_title="+post_title);
					console.log ("Phantomjs.post_overview="+post_overview); 
					console.log ("Phantomjs.line="+line);
					arrary_posts.push(line);
				}	
			}
			setTimeout(ParsingControl, 3000);// Тайм на парсинг одной страницы
		}	
	}
	
	function ParsingControl(){
		console.log ("Phantomjs.ParsingControl");
		if (continue_parse){
			console.log ("Phantomjs.Continue parse");
			//page.close();

			page_namber++;
			setTimeout(Parser, 3000);
		}
		else{
			console.log ("Phantomjs.Parse Complit");
			setTimeout(PageBilder, 3000);
		}
	}
	
	function PageBilder(){
		console.log ("Phantomjs.PageBilder");
		var file_name="Parse"+site_adress.substring(site_adress.lastIndexOf("/")+1)+".html";
		console.log ("Phantomjs.file_name="+file_name);
		var the_number_of_posts=arrary_posts.length;
		console.log ("Phantomjs.the_number_of_posts="+the_number_of_posts);
		
		//Page head
		fs.write(file_name,"<!DOCTYPE html>\n", 'w');// Создаем файл Write
		fs.write(file_name,"<html>\n", 'a');
		fs.write(file_name,"<head>\n", 'a');
		fs.write(file_name,'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n', 'a');
		fs.write(file_name,"<title>ParserName</title>\n", 'a');
		fs.write(file_name,"</head>\n", 'a');
				
		//Page body
		fs.write(file_name,"<body>\n", 'a');
		fs.write(file_name,"<h1>ParserNameHere</h1>\n", 'a');
		fs.write(file_name,"<p>Number of parsing pages: "+(page_namber-1)+"<br>"+//Последнию страница не всчет так как она пустая
							"Number of parsing posts:"+the_number_of_posts+".</p>\n", 'a');
							
		fs.write(file_name,"<table border=1 align='center' cellpadding=15>\n", 'a');// Начинаем таблицу						
		
		//По идеи тут бы конечно же цикл, но Phantomjs не будет ждать пока он кончится, или всё таки... 
		//О Ждет for  а while то же будет?
		
		for (var l=the_number_of_posts; l>0; l--){//От последнего к первому
			//console.log ("Phantomjs.Bild Tabble");
			line = arrary_posts[l-1];//Массив начинается с нулевого индекса
			console.log ("Phantomjs.l="+l);
			var ahref_post=line.substring(0,line.indexOf("*"));//от начала до
			var ahref_image=line.substring(line.indexOf("*")+1,line.indexOf("["));//между
			var post_title=line.substring(line.indexOf("[")+1,line.indexOf("]"));//между
			var post_overview=line.substring(line.lastIndexOf("]")+1);//с конца и до
			
			/* console.log ("Phantomjs.ahref_post="+ahref_post);
			console.log ("Phantomjs.ahref_image="+ahref_image);
			console.log ("Phantomjs.ahref_image="+post_title);
			console.log ("Phantomjs.post_overview="+post_overview); */
			
			fs.write(file_name,"<tr>\n", 'a'); // Добавляем новую строку
						
				fs.write(file_name,"<td>\n", 'a'); // Начинаем столбец
				fs.write(file_name,"<a href="+ahref_post+">"+"<img src="+ahref_image+' width="200" height="222"></a>\n', 'a');
				fs.write(file_name,"</td>\n", 'a'); // Закрываем столбец
				
				fs.write(file_name,"<td>\n", 'a'); // Начинаем столбец
				fs.write(file_name,"<a href="+ahref_post+">"+post_title+"</a>\n", 'a');
				fs.write(file_name,"</td>\n", 'a'); // Закрываем столбец
				
				fs.write(file_name,"<td>\n", 'a'); // Начинаем столбец
				fs.write(file_name,"<a href="+ahref_post+">"+post_overview+"</a>\n", 'a');
				fs.write(file_name,"</td>\n", 'a'); // Закрываем столбец
			
			fs.write(file_name,"</tr>\n", 'a'); //Close строку
		}
			fs.write(file_name,"</table>\n", 'a');// Закрываем таблицу		
			// Close Page Tags
			fs.write(file_name,"</body>\n", 'a');
			fs.write(file_name,"</html>\n", 'a');
			full_screen_exit();
			
	}// END function PageBilder()
}// END function LetsGo()

function full_screen_exit(){
	page.render("Parser.jpg");
	console.log("                         ")
	console.log("              *     *    ")
	console.log ("            *V*   *V*  ")
	console.log("            *^*****^*   ") 
	console.log("           *_(O)_(O)_*   ") 
	console.log("          ** ...V... **   ") 
	console.log("          *************   ") 
	console.log("          *************   ") 
	console.log("           ***********   ") 
	console.log("            ***   ***   ")
	console.log("*******************************************");
    console.log("Phantomjs. Done ... THANKS VERY BIG TO ALL!!! DONE;)");
	console.log("*******************************************");
	console.log("Phantomjs.Exit.");
    console.log("-------------------------");
	setTimeout(exit, 10000);
};

function exit(){
	phantom.exit();
};
