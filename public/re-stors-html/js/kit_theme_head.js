/*!THIS IS AUTO GENERATED FILE !*/

/* GOALS */
function GOALS(args){
	if(typeof args=='undefined') args={};
	const logable=window.location.href.indexOf('.lo')>=0;
	this.ya=args['ya_counter'];
	this.ga=args['ga_counter'];
	this.gtype=args['gtype'] ? args['gtype'] : 'gtag';
	this.ytype=args['ytype'] ? args['ytype'] : 'ym';
	this.register_ga=args['register_ga']===false ? false : true;
	this.register_ya=args['register_ya']===false ? false : true;
	this.wpcf7=args['wpcf7'] || [];
	
	this.register=function(ev,args){
		if(typeof args=='undefined') args={};
		if(typeof args['yandex']=='undefined') args['yandex']=this.register_ya;
		if(typeof args['google']=='undefined') args['google']=this.register_ga;
		if(args['google']){
			this.registerGA(ev,args);
		}
		if(args['yandex']){
			this.registerYA(ev,args);
		}
	}
	this.registerGA=function(ev,args){
		try{
			if(this.gtype=='gaq'){
				this.ga.push(['_trackPageview', '/'+ev]);
			}else if(this.gtype=='ga'){
				this.ga('send','pageview','/'+ev.toString());
			}else{
				params={
					'event_category': (args['category'] ? args['category'] : 'pageview'),
					'event_action' : ev.toString(),
				};
				this.ga('event',ev.toString(),params);
			}
			this.log('GA sent: '+ev.toString());
		}catch(ex){ this.log('Error sending YA goal',ex); }
	}
	this.registerYA=function(ev,args){
		try{
			if(this.ytype=='old'){
				if(!this.ya) this.ya=this.getYaCounter();
				params=args['params'] || {};
				this.ya.reachGoal(ev,params);
			}else{
				if(!this.ya) this.ya=this.getYMCounter();
				ym(this.ya,'reachGoal',ev);
			}
			this.log('YA sent: '+ev.toString());
		}catch(ex){ this.log('Error sending YA goal',ex); }
	}
	this.getClientIDYA=function(){
		var client_id='';
		var client_id=this.getCookie('_ym_uid');
		if(client_id && client_id.trim()!=''){
			this.log('YA ClientID: '+client_id.toString());
		}
		return client_id;
	}
	this.log=function(txt,ex){
		if(!logable) return;
		if(txt) console.log(txt);
		if(ex) console.log('Exception: '+ex);
	}
	this.initWPCF7=function(){
		if(typeof this.wpcf7=='undefined') return false;
		(function(G){
			document.addEventListener('wpcf7mailsent', function(data){
				if(data.detail && G.wpcf7[data.detail.contactFormId] && G.wpcf7[data.detail.contactFormId].sent){
					var ev=G.wpcf7[data.detail.contactFormId].key ? G.wpcf7[data.detail.contactFormId].key : 'WPCF7_FORM_'+data.detail.contactFormId.toString();
					G.register(ev+'_SENT');
				}
			});
		})(this);
	}	
	this.getYMCounter=function(){
		var s=null;
		for(var i=0; i < document.getElementsByTagName('script').length; ++i){
			if(hasClass(document.getElementsByTagName('script')[i],'skip_ym_check')) continue;
			if(document.getElementsByTagName('script')[i].innerHTML.indexOf('ym(')>0){ s=document.getElementsByTagName('script')[i].innerHTML; break; }
		}
		if(s==null) return false;
		var num=s.toString().match(new RegExp('id\:([0-9]{1,})'));
		if(!num){
			num=s.toString().match(new RegExp('ym([^0-9\"]{1,})([0-9]{1,}),'));
			num[1]=num[2];
		}
		return num && num[1] ? num[1] : false;
	}
	this.getYaCounter=function(eid){
		var s=null;
		if(e(eid)===null || e(eid)===undefined){
			for(var i = 0; i < document.getElementsByTagName('script').length; i ++){
				if(hasClass(document.getElementsByTagName('script')[i],'skip_ym_check')) continue;
				if(document.getElementsByTagName('script')[i].innerHTML.indexOf('yaCounter') > 0){ s=document.getElementsByTagName('script')[i].innerHTML; break; }
			}
		}else{ s=e(eid).innerHTML; }
		if(s==null) return null;
		var pos = s.indexOf('yaCounter');
		var sim=s[pos];
		while(isNaN(sim)){ pos++; sim=s[pos]; }
		var num=sim;
		while(!isNaN(s[pos]) && s[pos]!=' ' && s[pos]!=' '){ pos++; num=num.toString()+s[pos].toString(); }
		num=num.replace(/ /g,'');
		num=num.replace(/=/g,'');
		return (window['yaCounter'+num]==undefined) ? null : window['yaCounter'+num];
	}
	this.init=function(){
		this.initWPCF7();
		this.goalFromCookie();
	}
}
GOALS.prototype.goalFromCookie=function(){
	var goal=this.getCookie('register_goal');
	if(goal && goal.trim()!=''){
		this.log('Goal from cookie: '+goal.toString());
		this.register(goal);
		this.saveCookie('register_goal','');
	}
}
GOALS.prototype.getExpDate=function(days,hours,minutes){
	var expDate=new Date( );
	if (typeof days=="number" && typeof hours=="number" && typeof hours=="number"){
		expDate.setDate(expDate.getDate() + parseInt(days));
		expDate.setHours(expDate.getHours() + parseInt(hours));
		expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
		return expDate.toGMTString();
	}
}
GOALS.prototype.getCookieVal=function(offset) {
	var endstr=document.cookie.indexOf(";",offset);
	if (endstr==-1){ endstr = document.cookie.length; }
	return unescape(document.cookie.substring(offset,endstr));
}
GOALS.prototype.getCookie=function(name){
	var arg=name + "=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while(i<clen){
		var j = i + alen;
		if(document.cookie.substring(i, j) == arg){	return this.getCookieVal(j);	}
		i=document.cookie.indexOf(" ", i) + 1;
		if(i == 0) break;
	}
	return "";
}
GOALS.prototype.saveCookie=function(name,value){
	this.setCookie(name, encodeURIComponent(value), this.getExpDate(365, 1, 1), '/');
}
GOALS.prototype.setCookie=function(name, value, expires, path, domain, secure){
	document.cookie=name + "=" + escape (value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}
GOALS.prototype.deleteCookie=function(name,path,domain){
	if (this.getCookie(name)) {
		document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

/* INIT */
goals=new GOALS({
	'ga_counter' : (typeof gtag!='undefined' ? gtag : null),
	//'ya_counter' : 57643036,
});
(function(G){
	window.addEventListener('load',function(){
		var it=setInterval((function(i){ return function(){	
			if(G.ga==null && typeof gtag!='undefined') G.ga=gtag;
			if(i>1000 || typeof gtag!='undefined'){ clearInterval(it); }
		}})(0),100);
		G.init();
		var els=document.body.querySelectorAll('.request_form.goal_block .button');
		for(var i=0;i<els.length;++i) els[i].addEventListener('click',function(){ G.register('REQUEST_FORM_CLICK'); });
		var object_contact=document.body.querySelector('.object .contact_agency.right_block .btn');
		if(object_contact) object_contact.addEventListener('click',function(){ G.register('OBJECT_CONTACT_CLICK'); });
		var offer_icon=document.body.querySelector('.top_actions .icon.offer');
		if(offer_icon) offer_icon.addEventListener('click',function(){ G.register('OFFER_CLICK'); });		
		var phs=document.body.querySelectorAll('.phones a[onclick*="openList"]');
		for(var i=0;i<phs.length;++i) phs[i].addEventListener('click',function(){ G.register('SHOW_PHONE_CLICK'); })
		//phones
	});
})(goals);
/* END GOALS */let tokens = {
    getPreTokenSecret: function (dataObject) {
        // в данный момент поддерживаются только простые типы в ключах и значениях
        if (typeof (dataObject) != 'object') {
            return false;
        }

        dataObject.userAgent = window.navigator.userAgent;
        let result = 0;

        for (let key in dataObject) {
            if (!dataObject.hasOwnProperty(key)) {
                continue;
            }

            let strKey = String(key);
            let strValue = String(dataObject[key]);
            let forCalculate = strKey + strValue;

            for (let char of forCalculate) {
                result += char.charCodeAt(0);
            }
        }
        return result;
    }
};
function kitGallery(params) {

    this.target=params.target;
    if (this.target==null) return false;
    this.inrow=params.inlinePreviewsInRow==null ? [[0,2],[500,3],[700,4],[800,5],[1000,6]] : params.inlinePreviewsInRow;
	this.inrow_fullscreen=params.fullscreenPreviewsInRow==null ? [[0,4],[500,5],[700,7],[800,8],[1000,10]] : params.fullscreenPreviewsInRow;
    this.pages=0;
    this.pages_fullscreen=0;
    this.active_page=0;
    this.active_page_fullscreen=0;
    this.big_proportions=params.bigProportions==null ? 2/1 : params.bigProportions;
    this.big_index=0;
    this.full_index=0;
    this.fullscreenThumbsWidth=params.fullscreenThumbsWidth==null ? 1200 : params.fullscreenThumbsWidth;
    this.preloader=null;
    this.stylesPath=params.stylesPath==null ? this.getDefaultStylesPath() : params.stylesPath;
    this.imgs=[];
    this.imagesCount=0;
	this.smallOpenBig=params.smallOpenBig===false ? false : true;
	this.drawInline=params.drawInline==null ? true : false;
	this.uniqClass=params.uniqId==null ? '' : ' '+params.uniqId;
	this.uniqRule=params.uniqId==null ? '' : '.'+params.uniqId;

    if (typeof LANG !== 'undefined') this.LANG=LANG;
    	else this.LANG={
    		"share":"Share",
    		"close":"Close",
    		"hide_list":"Hide list",
    		"show_list":"Show list"
    		};

    //load styles
    var link = document.createElement( "link" );
	link.href = this.stylesPath;
	link.type = "text/css";
	link.rel = "stylesheet";
	link.media = "all";
	document.getElementsByTagName( "head" )[0].appendChild( link );

	//prepare images
	if (params.images!=null) this.imgs=params.images;
		else {
			//get images from the target
			var images=this.target.getElementsByTagName('img');
			for (var i=0;i<images.length;i++) {
				var big=images[i].getAttribute('data-big');
				var real=images[i].getAttribute('data-real');
				var a=null;
				if (real==null) {
					//find href
					for (a=images[i];real==null && a!=null;a=a.parentNode) real=a.getAttribute('href');
					}
				if (real==null || real=="") real=images[i].src;
				this.imgs.push({"small":images[i].src,"big":big,"real":real,"title":images[i].getAttribute('title'),"alt":images[i].getAttribute('alt'),"a":a});
				}
			}
	//now normalize images array
	this.imagesCount=this.imgs.length;
	for (i=0;i<this.imagesCount;i++) {
		if (this.imgs[i].big=="") {
			if (this.imgs[i].real!="") this.imgs[i].big=this.imgs[i].real;
				else this.imgs[i].big=this.imgs[i].small;
			}
		if (this.imgs[i].real=="") {
			if (this.imgs[i].big!="") this.imgs[i].real=this.imgs[i].big;
				else this.imgs[i].real=this.imgs[i].small;
			}
		}

	this.init();

	}

/* TEST */
kitGallery.prototype.testFunc=function(param1) {
	this.paramT=param1;
	}
kitGallery.prototype.testFunc1=function(param1) {
	alert(this.param1+' - '+this.paramT);
	}
/* END TEST */

kitGallery.prototype.preload=function(src,callback) {
	if (callback==null) callback="";
	if (this.preloader==null) this.preloader=document.createElement('img');
	if (this.preloader.src!=src) {
		if (typeof(callback)=="function")  this.preloader.onload=function(){callback();};
		this.preloader.src=src;
		}
		else callback();
	}

kitGallery.prototype.getDefaultStylesPath=function() {
	var scripts=document.scripts;
	for (var i=0;i<scripts.length;i++) if (scripts[i].src.indexOf('/themes/')>=0 && scripts[i].src.indexOf('/languages/')==-1){
		var parts=scripts[i].src.split("/");
		parts[parts.length-2]="css";
		parts[parts.length-1]="kitgallery.css";
		return parts.join("/");
		}
	return "";
	}

kitGallery.prototype.init=function() {
	//inline gallery
	if (this.drawInline) {
		var inline="";
		inline+='<div class="kit_inline_gallery">';
		inline+='	<div id="img_resize_container"><div></div></div>';
		inline+='	<div class="thumbs unselectable">';
		inline+='		<div class="scroll_left"><svg aria-hidden="true" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></div>';
		inline+='		<div class="scroll_right"><svg aria-hidden="true" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></div>';
		inline+='		<div class="scroll"><ul>';
		for (var i=0;i<this.imagesCount;i++) inline+='<li><img src="'+this.imgs[i].small+'" '+(this.imgs[i].alt ? 'alt="'+this.imgs[i].alt+'"' : '')+'></li>';
		inline+='		</ul></div>';
		inline+='	</div>';
		inline+='</div>';
		this.target.innerHTML=inline;

		var images=this.target.querySelectorAll('.kit_inline_gallery .thumbs ul img');
		for (i=0;i<this.imagesCount;i++) {
			(function(kge){
			var index=i;
			images[index].addEventListener('click',function(){
				if(kge.smallOpenBig) kge.setFullImage(index);
				else kge.setBigImage(index);
				});
			}(this));
			}
		}
		 else {
		 	//change hrefs
		 	for (i=0;i<this.imagesCount;i++){
				(function(kge){
				var index=i;
				kge.imgs[index]['a'].addEventListener('click',function(evt){
					evt.preventDefault();
					if(kge.smallOpenBig) kge.setFullImage(index);
					else kge.setBigImage(index);
					});
				}(this));
				}
		 	}

	//fullscreen gallery
	var fullscreen="";
	fullscreen+='<div id="kgf_foto" class="unselectable" unselectable="on">';
	fullscreen+='		<div class="share">'+this.LANG['share']+':';
	fullscreen+='			<span class="email" onclick="shareEmail(document.title,document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src)"><svg aria-hidden="true" data-prefix="far" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg></span>';
	fullscreen+='			<span class="facebook" onclick="shareFacebook(document.title,document.title,document.querySelector(\'#kgf_foto img\').src,document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src)"><svg aria-hidden="true" data-prefix="fab" data-icon="facebook-f" class="svg-inline--fa fa-facebook-f fa-w-9" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512"><path fill="currentColor" d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path></svg></span>';
	fullscreen+='			<span class="vk" onclick="shareVk(document.title,document.title,document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src,document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src)"><svg aria-hidden="true" data-prefix="fab" data-icon="vk" class="svg-inline--fa fa-vk fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z"></path></svg></span>';
	fullscreen+='			<span class="twitter" onclick="shareTwitter(\'\',document.title,\'\',document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src)"><svg aria-hidden="true" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></span>';
	//fullscreen+='			<span class="gp" onclick="shareGooglePlus(document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src)"><svg aria-hidden="true" data-prefix="fab" data-icon="google-plus-g" class="svg-inline--fa fa-google-plus-g fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"></path></svg></span>';
	fullscreen+='			<span class="linkd" onclick="shareLinkdin(document.title,\'\',window.location,document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src)"><svg aria-hidden="true" data-prefix="fab" data-icon="linkedin-in" class="svg-inline--fa fa-linkedin-in fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0 85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1 54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z"></path></svg></span>';
	fullscreen+='			<span class="pin" onclick="sharePinterest(document.title,window.location,document.querySelector(\''+this.uniqRule+' #kgf_foto img\').src)"><svg aria-hidden="true" data-prefix="fab" data-icon="pinterest-p" class="svg-inline--fa fa-pinterest-p fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path></svg></span>';
	fullscreen+='		</div>';
	fullscreen+='		<div class="close">&times;</div>';
	fullscreen+='		<img src="" class="unselectable" unselectable="on">';
	fullscreen+='		<div class="prev" id="kgf_foto_prev"><svg aria-hidden="true" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></div>';
	fullscreen+='		<div class="next" id="kgf_foto_next"><svg aria-hidden="true" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></div>';
	fullscreen+='		<div class="loader" id="kgf_foto_loader"><svg aria-hidden="true" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg></div>';
	fullscreen+='	<div class="counter container">';
	fullscreen+='		<div><span class="current">1</span><span class="delim"></span><span class="total">' + this.imgs.length.toString() + '</span></div>';
	fullscreen+='	</div>';
	fullscreen+='	</div>';

	fullscreen+='	<div class="container" style="max-width:'+this.fullscreenThumbsWidth+'px">';
	fullscreen+='		<div class="thumber">'+this.LANG['hide_list']+'</div>';
	fullscreen+='		<div class="title"></div>';
	fullscreen+='	</div>';
	fullscreen+='	<div class="container thumbs unselectable" style="max-width:'+this.fullscreenThumbsWidth+'px">';
	fullscreen+='		<div class="prev"><svg aria-hidden="true" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></div>';
	fullscreen+='		<div class="next"><svg aria-hidden="true" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></div>';
	fullscreen+='		<div class="scroll"><ul>';
	for (var i=0;i<this.imagesCount;i++) fullscreen+='<li><img src="'+this.imgs[i].small+'"></li>';
	fullscreen+='		</ul></div>';
	fullscreen+='	</div>';
	var div=document.createElement('div');
	div.id="kit_fullscreen";
	div.className=this.uniqClass;
	div.innerHTML=fullscreen;
	document.body.appendChild(div);
	var images=document.querySelectorAll('#kit_fullscreen'+this.uniqRule+' .thumbs ul img');
	for (i=0;i<this.imagesCount;i++) {
		(function(kge){
			var index=i;
			images[index].addEventListener('click',function(){kge.setFullImage(index);});
			}(this));
		}

	//invoke methods and attach events
	this.setThumbs();
	this.setBigProportions();
	this.setBigImage(0);
	this.setThumbsFullscreen();
	(function(kge){
		if (kge.drawInline) {
    		document.querySelector('.kit_inline_gallery .thumbs .scroll_left').addEventListener('click',function(){kge.changePage(-1);});
			document.querySelector('.kit_inline_gallery .thumbs .scroll_right').addEventListener('click',function(){kge.changePage(1);});
			document.querySelector('#img_resize_container > div').addEventListener('click',function(){kge.setFullImage(kge.big_index);});
			}
		//console.log('#kit_fullscreen'+kge.uniqRule+' #kgf_foto_prev');
		document.querySelector('#kit_fullscreen'+kge.uniqRule+' #kgf_foto_prev').addEventListener('click',function(){kge.scrollFullImage(-1);});
		document.querySelector('#kit_fullscreen'+kge.uniqRule+' #kgf_foto_next').addEventListener('click',function(){kge.scrollFullImage(1);});
		document.querySelector('#kit_fullscreen'+kge.uniqRule+' .thumbs .prev').addEventListener('click',function(){kge.changePageFullscreen(-1);});
		document.querySelector('#kit_fullscreen'+kge.uniqRule+' .thumbs .next').addEventListener('click',function(){kge.changePageFullscreen(1);});
		document.querySelector('#kit_fullscreen'+kge.uniqRule+' .thumber').addEventListener('click',function(){kge.switchFullThumbs();});
		document.querySelector('#kit_fullscreen'+kge.uniqRule+' .close').addEventListener('click',function(){kge.hideFullscreen();});
		document.querySelector('#kit_fullscreen'+kge.uniqRule+' #kgf_foto img').src=kge.imgs[0].real;
		swipe(document.querySelector('#kit_fullscreen'+kge.uniqRule+' #kgf_foto img'),function(params){
			if (params['scroll']=="right") kge.scrollFullImage(-1);
				else if(params['scroll']=="left") kge.scrollFullImage(1);
			});

		window.addEventListener('resize',function(){kge.setThumbs();kge.setBigProportions();kge.recalcFullscreen();});
		window.addEventListener('keydown',function(e){
			if (document.querySelector('#kit_fullscreen'+kge.uniqRule+'').style.display=='block') {
				if(e.keyCode==37) kge.scrollFullImage(-1);
					else if(e.keyCode==39) kge.scrollFullImage(1);
					else if(e.keyCode==27) kge.hideFullscreen();
				}
			});
    }(this))
	}

/* inline methods */
kitGallery.prototype.getInrow=function()
{
	var c=this.target.querySelector('.kit_inline_gallery .thumbs');
	var w=c.clientWidth;
	var in_row=0;
	for (var i=0;i<this.inrow.length;i++) {
		if (this.inrow[i][0]<=w) in_row=this.inrow[i][1];
		}
	if (in_row==0) in_row=this.inrow[0][1];
	return in_row;
	}
kitGallery.prototype.setThumbs=function()
{
	if (!this.drawInline) return true;
	var ul=this.target.querySelector('.kit_inline_gallery .thumbs ul');
	var lis=ul.querySelectorAll('li');
	var in_row=this.getInrow();
	this.pages=Math.ceil(lis.length/in_row);
	ul.style.width=(this.pages*100).toString()+'%';
	for (var i=0;i<lis.length;i++) lis[i].style.width=(100/(in_row*this.pages)).toString()+'%';
	this.scrollPage();
	}
kitGallery.prototype.changePage=function(dir)
{
    if (dir!=1) dir=-1;
    this.active_page=this.active_page+dir;
    if (this.active_page<0) this.active_page=this.pages-1;
    	else if (this.active_page>=this.pages) this.active_page=0;
    this.scrollPage();
	}
kitGallery.prototype.scrollPage=function() {
    if (this.active_page>=this.pages) this.active_page=this.pages-1;
	var left=-this.active_page*100;
	this.target.querySelector('.kit_inline_gallery .thumbs ul').style.marginLeft=left.toString()+'%';
	}
kitGallery.prototype.setBigImage=function(index) {
	if (!this.drawInline) return true;
	if (index<0 || index>=this.imagesCount) return false;
	this.big_index=index;
	var images=this.target.querySelectorAll('.kit_inline_gallery .thumbs ul img');
	for (var i=0;i<images.length;i++) images[i].className=images[i].className.replace('active','');
	images[index].className=images[index].className+' active';

	var c=this.target.querySelector('#img_resize_container > div');
	c.style.opacity="0.5";
	(function(kge){
		kge.preload(kge.imgs[index].big,function(){
	        c.style.backgroundImage='url('+kge.imgs[index].big+')';
	        c.style.opacity="1";
			});
		}(this));
	}
kitGallery.prototype.setBigProportions=function() {
	if (!this.drawInline) return true;
	var c=this.target.querySelector('#img_resize_container > div');
	c.style.height=Math.round(c.clientWidth/this.big_proportions).toString()+'px';
	}

/* full screen methods */
kitGallery.prototype.getInrowFullscreen=function() {
	var c=document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumbs');
	var w=c.clientWidth;
	var in_row=0;
	for (var i=0;i<this.inrow_fullscreen.length;i++) {
		if (this.inrow_fullscreen[i][0]<=w) in_row=this.inrow_fullscreen[i][1];
		}
	if (in_row==0) in_row=this.inrow_fullscreen[0][1];
	return in_row;
	}
kitGallery.prototype.setThumbsFullscreen=function()
{
	var ul=document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumbs ul');
	var lis=ul.querySelectorAll('li');
	var in_row=this.getInrowFullscreen();
	this.pages_fullscreen=Math.ceil(lis.length/in_row);
	ul.style.width=(this.pages_fullscreen*100).toString()+'%';
	for (var i=0;i<lis.length;i++) lis[i].style.width=(100/(in_row*this.pages_fullscreen)).toString()+'%';
	this.scrollPageFullscreen();
	}
kitGallery.prototype.changePageFullscreen=function(dir)
{
    if (dir!=1) dir=-1;
    this.active_page_fullscreen=this.active_page_fullscreen+dir;
    if (this.active_page_fullscreen<0) this.active_page_fullscreen=this.pages_fullscreen-1;
    	else if (this.active_page_fullscreen>=this.pages_fullscreen) this.active_page_fullscreen=0;
    this.scrollPageFullscreen();
	}
kitGallery.prototype.scrollPageFullscreen=function() {
    if (this.active_page_fullscreen>=this.pages_fullscreen) this.active_page_fullscreen=this.pages_fullscreen-1;
	var left=-this.active_page_fullscreen*100;
	document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumbs ul').style.marginLeft=left.toString()+'%';
	}

kitGallery.prototype.recalcFullscreen=function() {
    if (document.querySelector('#kit_fullscreen'+this.uniqRule+'').style.display=="none") return false;
    document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumbs ul').className="transition_disabled";
    this.setThumbsFullscreen();

    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var full_img=document.querySelector('#kit_fullscreen'+this.uniqRule+' #kgf_foto img');
    var vmargin=20;
    var containers=document.querySelectorAll('#kit_fullscreen'+this.uniqRule+' .container');
	var cont_h = 0;
	for(var i = 0; i < containers.length; ++i) {
		cont_h += containers[i].clientHeight;
	}
    var share=document.querySelector('#kit_fullscreen'+this.uniqRule+' #kgf_foto .share');
    var maxheight=h-vmargin*2-20-cont_h-share.clientHeight;
    var dec=40;
	if(window.innerWidth <= 800 || window.innerHeight <= 600) {
    	maxheight = ((h - cont_h) * 0.9)/* - cont_h*/;
		dec = ((h - cont_h) - ((h - cont_h) * 0.9)) / 2;
	}
    full_img.style.maxHeight=maxheight.toString()+'px';
    //get real image sizes and center it vertically
    var margintop = Math.round((h - full_img.clientHeight - cont_h - share.clientHeight - dec)/2);
	if(window.innerWidth <= 800 || window.innerHeight <= 600) {
    	margintop = Math.round(((h - cont_h) - full_img.clientHeight) / 2);
	}
    if ((margintop<0 || maxheight<100)  && document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumbs').style.display!='none') this.switchFullThumbs();
    document.querySelector(''+this.uniqRule+' #kgf_foto').style.marginTop=margintop.toString()+'px';
    document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumbs ul').className="";
    //alert(margintop);
	}

kitGallery.prototype.setFullImage=function(index) {
    document.querySelector('#kit_fullscreen'+this.uniqRule+'').style.display='block';
    if (index<0 || index>=this.imagesCount) return false;
    this.full_index=index;
    var fimgs=document.querySelectorAll('#kit_fullscreen'+this.uniqRule+' .thumbs ul li img')
	for (var i=0;i<fimgs.length;i++) fimgs[i].className=fimgs[i].className.replace('active','');
	fimgs[index].className=fimgs[index].className+' active';

	var c=document.querySelector('#kit_fullscreen'+this.uniqRule+' #kgf_foto img');
	var loader=document.querySelector('#kit_fullscreen'+this.uniqRule+' #kgf_foto .loader');
	loader.style.display="block";
	(function(kge){
		kge.preload(kge.imgs[index].real,function(){
	        document.querySelector('#kit_fullscreen'+kge.uniqRule+' #kgf_foto img').src=kge.imgs[index].real;
	        document.querySelector('#kit_fullscreen'+kge.uniqRule+' .title').innerHTML=kge.imgs[index].title==null ? "" : kge.imgs[index].title;
	        loader.style.display="none";
	        kge.recalcFullscreen();	
			addClass(document.body, 'prevent_scroll');
			addClass(document.documentElement, 'prevent_scroll');
			var count = document.querySelector('#kit_fullscreen'+kge.uniqRule+' .counter .current');
			if(count) {
				count.innerHTML = (index + 1).toString();
				}
			});
		}(this));
	}

kitGallery.prototype.scrollFullImage=function(dir) {
	if (dir!=1) dir=-1;
	this.full_index+=dir;
	if (this.full_index<0) this.full_index=this.imagesCount-1;
		else if (this.full_index>=this.imagesCount) this.full_index=0;
	this.setFullImage(this.full_index);
	}

kitGallery.prototype.hideFullscreen=function() {
	document.querySelector('#kit_fullscreen'+this.uniqRule+'').style.display='none';
	removeClass(document.body, 'prevent_scroll');
	removeClass(document.documentElement, 'prevent_scroll');
	}
kitGallery.prototype.switchFullThumbs=function() {
	var thumbs=document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumbs');
	var thumber=document.querySelector('#kit_fullscreen'+this.uniqRule+' .thumber');
	if (thumbs.style.display=='none') {
		thumbs.style.display='block';
		thumber.innerHTML=this.LANG['hide_list'];
		thumber.className="thumber";
		}
		else {
			thumbs.style.display='none';
			thumber.innerHTML=this.LANG['show_list'];;
			thumber.className="thumber up";
			}
	this.recalcFullscreen();
	}

/* default share functions */

if (typeof shareEmail !=='function') {
	function shareEmail(subject,body) {
		mailto_link="mailto:?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
		ew=window.open(mailto_link, 'emailWindow');
		if (ew && ew.open && !ew.closed) ew.close();
		}
	}

if (typeof shareVk !=='function') {
	function shareVk(title,text,link,image) {
		if (image==null) image="";

		url  = 'http://vk.com/share.php?';
		url += 'url='          + encodeURIComponent(link);
		url += '&title='       + encodeURIComponent(title);
		url += '&description=' + encodeURIComponent(text);
		if (image!="") url += '&image='       + encodeURIComponent(image);
		url += '&noparse=true';
	    window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	}

if (typeof shareFacebook !=='function') {
	function shareFacebook(title,text,link,image) {
		if (image==null) image="";

		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(title);
		url += '&p[summary]='   + encodeURIComponent(text);
		url += '&p[url]='       + encodeURIComponent(link);
		if (image!="") url += '&p[images][0]=' + encodeURIComponent(image);

		window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	}

if (typeof shareTwitter !=='function') {
	function shareTwitter(title,text,link,image) {
		if (image==null) image="";
		if (image!="") link=image;

		url  = 'https://twitter.com/intent/tweet?';
		url += 'text='     + encodeURIComponent(text);
		url += '&url='       + encodeURIComponent(link);

		window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	}

if (typeof shareGooglePlus !=='function') {
	function shareGooglePlus(link) {
		url  = 'https://plus.google.com/share?url='+encodeURIComponent(link);
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	}

if (typeof shareLinkdin !=='function') {
	function shareLinkdin(title,text,link,image) {
		if (image==null) image="";

		url  = 'https://www.linkedin.com/shareArticle?mini=true';
		url += '&url='     + encodeURIComponent(image!="" ? image : link);
		url += '&title='   + encodeURIComponent(title);
		url += '&summary='       + encodeURIComponent(text);
		if (image!="") url += '&source=' + encodeURIComponent(link);

		window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	}

if (typeof sharePinterest !=='function') {
	function sharePinterest(title,link,image) {
		url  = 'https://pinterest.com/pin/create/button/?';
		url += 'url='     + encodeURIComponent(link);
		url += '&media='   + encodeURIComponent(image);
		url += '&description='       + encodeURIComponent(title);

		window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	}function e(eid) {return document.getElementById(eid)};
Number.prototype.toDeg = function () { return (this * 180) / Math.PI; }

function KIT(args){
	if(args==null) args={};
	this.initialize=args['init']===true ? true : false;
	this.e=function(eid){return document.getElementById(eid)}
	this.getParentTag=function(el,tag){
		if(tag==null) tag='form';
		for(var par=el;par!=null && par.tagName!=null && par.tagName.toLowerCase()!=tag;par=par.parentNode){}

		return par==null || par.tagName==null || par.tagName.toLowerCase()!=tag ? null : par;
	}
	this.getParentClass=function(el,cl,strict){
		if(strict==null) strict=false;
		if(cl==null) cl='popup';
		if(!strict)	for(var par=el;par!=null && par.className!=null && par.className.indexOf(cl)<0; par=par.parentNode){}
		else{
			for(var par=el;par!=null && par.className!=null; par=par.parentNode){
				var reg=par.className.match(RegExp('(^|\s| )'+cl+'( |\s|$)','i'));
				if(par.className==cl || reg!=null) break;
			}
		}
		return par==null || par.className==null ? null : par;
	}
	this.hasClass=function(elem,cl){
		if(elem==null || elem.className=='' || cl==null || cl.trim()=='') return false;
		var classes=elem.className ? elem.className.split(' ') : [];
		var res=false;
		for(var i=0;i<classes.length;++i) if(classes[i]==cl){ res=true; break; }
		return res;
	}
	this.addClass=function(elem,cl){
		if(!this.hasClass(elem,cl)) elem.className=elem.className+' '+cl;
	}
	this.removeClass=function (elem,cl){
		var classes=elem.className==null ? [] : elem.className.split(' ');
		var new_classes=[];
		for (var i=0;i<classes.length;i++) if (classes[i]!='' && classes[i]!=cl) new_classes.push(classes[i]);
		elem.className=new_classes.join(' ');
	}
	this.switchClass=function(elem,cl){
		if(!this.hasClass(elem,cl)) this.addClass(elem,cl);
		else this.removeClass(elem,cl);
	}
	this.getOwnChilds=function(el,by,name){
		var childs;
		if(by=='tag') childs=el.getElementsByTagName(name);
		else if(by=='class') childs=el.getElementsByClassName(name);
		var new_c=[];
		for(var i=0;i<childs.length;i++) if(childs[i].parentNode==el) new_c.push(childs[i]);
		return new_c;
	}
	this.getPosition=function(obj,pos){
		var x=0, y=0;
		while(obj){
			x+=obj.offsetLeft;
			y+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return (pos=='x' ? x : y);
	}
	this.getCoords=function(el){
		var box=el.getBoundingClientRect();
		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset,
		};
	}
	this.getClientSTop=function(){ return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop); }
	this.getClientSLeft=function(){ return self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft); }
	this.Show=function(el,display,visibility){
		if(visibility==null) visibility=false;
		if(typeof el==='string') el=e(el);
		if(el==null) return false;
		if (display==null) display="block";
		if(visibility) el.style.visibility='visible';
		else el.style.display=display;
	}
	this.Hide=function(el,visibility){
		if(typeof el==='string') el=e(el);
		if(el==null) return false;
		if (visibility==null) visibility=false;
		if(visibility) el.style.visibility='hidden';
		else el.style.display='none';
	}
	this.isNum=function(str){
		if(str===0) return true;
		if(str==null || !str) return false;
		str=str.toString();
		if(str.trim()=='') return false;
		var re= /^[-]?\d*\.?\d*$/;
		if (!str.match(re)) return false;
		return true;
	}
	this.smoothScroll=function(x,y,it,delay){
		if(it==null) it=20;
		if(delay==null) delay=1;
		cur_x=getClientSLeft();
		cur_y=getClientSTop();
		var dir_y=1;
		var dir_x=1;
		if(y>cur_y) dir_y=2;
		if(x>cur_x) dir_x=2;
		var i=setInterval(function(){
			if(cur_x>x && dir_x==1) cur_x-=it;
			else if(cur_x<x && dir_x==2) cur_x+=it;
			if(cur_y>y && dir_y==1) cur_y-=it;
			else if(cur_y<y && dir_y==2) cur_y+=it;
			window.scrollTo(cur_x,cur_y);
			if((dir_x==1 && cur_x<=x || dir_x==2 && cur_x>=x) && (dir_y==1 && cur_y<=y || dir_y==2 && cur_y>=y)){
				window.scrollTo(x,y);
				clearInterval(i);
			}
		},delay);
	}
	this.getExpDate=function(days,hours,minutes){
		var expDate=new Date( );
		if (typeof days=="number" && typeof hours=="number" && typeof hours=="number"){
			expDate.setDate(expDate.getDate() + parseInt(days));
			expDate.setHours(expDate.getHours() + parseInt(hours));
			expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
			return expDate.toGMTString();
		}
	}
	this.getCookieVal=function(offset) {
		var endstr=document.cookie.indexOf(";",offset);
		if (endstr==-1){ endstr = document.cookie.length; }
		return unescape(document.cookie.substring(offset,endstr));
	}
	this.getCookie=function(name){
		var arg=name + "=";
		var alen=arg.length;
		var clen=document.cookie.length;
		var i=0;
		while(i<clen){
			var j = i + alen;
			if(document.cookie.substring(i, j) == arg){	return getCookieVal(j);	}
			i=document.cookie.indexOf(" ", i) + 1;
			if(i == 0) break;
		}
		return "";
	}
	this.saveCookie=function(name,value){
		setCookie(name, encodeURIComponent(value), getExpDate(365, 1, 1), '/');
	}
	this.setCookie=function(name, value, expires, path, domain, secure){
		document.cookie=name + "=" + escape (value) +
			((expires) ? "; expires=" + expires : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
	}
	this.deleteCookie=function(name,path,domain){
		if (getCookie(name)) {
			document.cookie = name + "=" +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	}
	this.init=function(){
		if(this.initialize){
			for(var key in this) if(this.hasOwnProperty(key)){
				if(typeof this[key]==='function' && !window[key]) window[key]=this[key];
			}
		}
	}
	this.init();
}

if(!("nextElementSibling" in document.documentElement)){
    Object.defineProperty(Element.prototype, "nextElementSibling", {
        get: function(){
            var e = this.nextSibling;
            while(e && 1 !== e.nodeType)
                e = e.nextSibling;
            return e;
        }
    });
}
if(!("previosElementSibling" in document.documentElement)){
    Object.defineProperty(Element.prototype, "previosElementSibling", {
        get: function(){
            var e = this.nextSibling;
            while(e && 1 !== e.nodeType)
                e = e.nextSibling;
            return e;
        }
    });
}
if(!("dataset" in document.documentElement)){
	Object.defineProperty(Element.prototype, "dataset", {
		get: function(){
			var res={};
			var attrs=this.attributes;
			for(var i=0;i<attrs.length;++i){
				if(attrs[i].nodeName.substring(0,5)=='data-'){
					res[attrs[i].nodeName.replace('data-','')]=attrs[i].nodeValue;
				}
			}
			return res;
		}
	});
}
if(!("dataset" in SVGElement.prototype)){
	Object.defineProperty(SVGElement.prototype, "dataset", {
		get: function(){
			var res={};
			var attrs=this.attributes;
			for(var i=0;i<attrs.length;++i){
				if(attrs[i].nodeName.substring(0,5)=='data-'){
					res[attrs[i].nodeName.replace('data-','')]=attrs[i].nodeValue;
				}
			}
			return res;
		}
	});
}

function scrollUp() {
	if (!scroll(0,0)) window.scrollTo(0,0);
	}

function openList(el){
	var list=el.getElementsByClassName('list')[0];
	var op=el.className.indexOf('open')<0;
	el.className=!op ? el.className.replace('open','').trim() : el.className+' open';
	list.style.display=!op ? 'none' : 'block';
	if(list.getAttribute('data-initialized')!=1){
		list.addEventListener('mouseover',(function(el){ return function(){
			this.style.display='block';
			el.className=el.className.indexOf('open')<0 ? el.className+' open' : el.className;
		}})(el));
		list.addEventListener('mouseout',(function(el){ return function(){
			this.style.display='none';
			el.className=el.className.replace('open','').trim();
		}})(el));
	}
}

function openLanguageList(el) {
    var list = el.getElementsByClassName('list')[0];
    var is_opened = el.className.indexOf('open') < 0;
    el.className = !is_opened ? el.className.replace('open', '').trim() : el.className + ' open';
    list.style.display = !is_opened ? 'none' : 'block';

    if (list.getAttribute('data-initialized') != 1) {
        list.addEventListener('mouseleave', (function (el) {
            return function () {
                this.style.display = 'none';
                el.className = el.className.replace('open', '').trim();
            }
        })(el));
        list.setAttribute('data-initialized', 1);
    }

    var headRowHeight = el.closest('.row').clientHeight;
    var listHeight = list.clientHeight + headRowHeight;
    var windowHeight = window.innerHeight;
    var heightPercent = 0.9;

    if (listHeight > windowHeight * heightPercent) {
        list.style.display = 'none';
        el.className = el.className.replace('open', '').trim();

        var languagePopup = document.getElementById('languages_popup');
        if (document.getElementById('languages_popup') === null) {
            languagePopup = document.createElement('div');
            languagePopup.className = 'popup languages';
            languagePopup.id = 'languages_popup';
            languagePopup.innerHTML = '\
                <div class="popup_content">\
                <div class="close" onclick="closePopup(this);"></div>\
                    <div class="holder">'
                + '<ul class="popup_languges_list flags">' + list.innerHTML + '</ul>'
            '</div></div>';
            document.body.appendChild(languagePopup);

            window.addEventListener('resize', function (event) {
                checkLanguagePopupScroll(languagePopup);
            });
        }

        showPopup('languages_popup');

        checkLanguagePopupScroll(languagePopup);
    }
}

function checkLanguagePopupScroll(languagePopup) {
    var closeElement = languagePopup.querySelector('.close');
    var holderElement = languagePopup.querySelector('.holder');

    if (holderElement.scrollHeight <= holderElement.clientHeight) {
        closeElement.className = closeElement.className.replace('languages_scrolled', '').trim();
    } else {
        if (closeElement.className.indexOf('languages_scrolled') === -1) {
            closeElement.className = closeElement.className + ' languages_scrolled';
        }   
    }
}

function openRange(el){
	var container=el.parentNode;
	switchClass(container,'open');
}

function showHideMobileMenu(){
	var menu=e('mobile_menu');
	if (menu.className=='active') {
		menu.className='';
		//if (typeof restoreIosScroll==="function") restoreIosScroll();
		}
		else {
			menu.className='active';
			//if (typeof removeIosScroll==="function") removeIosScroll();
			}
}

function setMobileMenu() {
	var menu=document.querySelector('.header ul.main-menu');
	var mobile_menu=menu.cloneNode(true);
	var mobile_menu_holder=e('mobile_menu');
	mobile_menu_holder.appendChild(mobile_menu);
	}

function closeCookieWarning(){
	saveCookie('cookie_ok','yes');
	e('cookie_warning').style.display='none';
}

function showPopup(eid,goal,subject){
	if(e(eid)==null) return false;
	addClass(e(eid),'active');
	if(goal!=null && typeof registerGoal==='function') registerGoal(goal);
	if (subject==null) subject='';
	if (subject!=null) {
		var sbj=document.querySelector('#'+eid+' form input[name=subject]');
		if(sbj!=null) sbj.value=subject;
		}
	resetRecaptcha(document.querySelector('#'+eid+' form'));
}
function closePopup(el){
	if(typeof el==='object'){
		for(var pop=el;!hasClass(pop,'popup') || hasClass(pop,'popup_content');pop=pop.parentNode){}
		el=pop;
	}
		else if(typeof el==='string') el=e(el);
	if(el.getElementsByTagName('form')[0]!=null) el.getElementsByTagName('form')[0].reset();
	removeClass(el,'active');
}

function resetRecaptcha(f) {
	if (f==null) return false;
	var recaptcha=f.querySelector('.recaptcha2');
	if (recaptcha!=null) {
		var parts=recaptcha.id.split('_');
		widget_id='reCaptcha'+parts[parts.length-1];
		if (typeof grecaptcha !='undefined') grecaptcha.reset(eval(widget_id));
		}
	}

function contactBuilder(bid) {
	document.forms['contact_builder_form']['contact_builder'].value=bid;
	showPopup('contact_builder');
	}

function contactAgency(aid,oid) {
	if (oid==null) oid=0;
	document.forms['contact_agency_form']['contact_agency'].value=aid;
	document.forms['contact_agency_form']['object'].value=oid;
	showPopup('contact_agency');
	if(typeof goals!=='undefined') goals.register('AGENCY_CONTACT_CLICK');
	}

function contactAgent(aid,name,oid) {
	if (name==null) name='';
	document.forms['contact_agent_form']['contact_agent'].value=aid;
	if(typeof oid!='undefined'){
		document.forms['contact_agent_form']['object'].value=oid;
	}
	document.querySelector('#contact_agent .title').innerHTML=(name=='' ? '' : name+'<br>')+LANG['write_message'];
	showPopup('contact_agent');
	}

/* FORMS */
function trimLeft(str) {return str.replace(/^\s+/, '');}
function trimRight(str) {return str.replace(/\s+$/, '');}
function trimBoth(str) {return trimRight(trimLeft(str));}

function fieldEmpty(elem){
	rez=false;
	if(elem.type!='checkbox') { if (trimBoth(elem.value)=="") rez=true; }
	else{ if(!elem.checked) rez=true; }
	return rez;
}
function isValidPhone(field) {
	let val = field.value;
	if(trimBoth(val) == '') {
		return 1;
	}
	if(val.substring(0, 1) != '+') {
		return 2;
	}
	let par = field.closest('.country-phone-field');
	if(par) {
		let code = par.getAttribute('selected-code');
		if(!code) {
			return 2;
		}
		if(code.substring(0, 1) != '+') {
			code = '+' + code.toString();
		}
		if(val.substring(0, code.length) !== code) {
			return 2;
		}
		if(typeof phonecodes_data != 'undefined') {
			let has = 2;
			for(let i = 0; i < phonecodes_data.length; ++i) {
				if(phonecodes_data[i].p == code.substring(1)) {
					has = true;
					break;
				}
			}
			if(!has) {
				return 2;
			}
		}
	}
	return 0;
}
function validateForm(f){
	var rez=true;
	for (var i=0;i<f.length && rez==true;i++){
		let error = '';
        if (f[i].getAttribute('data-obligatory')==1) {
			if (fieldEmpty(f[i])) {
				error = LANG['fill_in_required'];
			} 
		} else if (f[i].getAttribute('data-obligatory')==2) {
			let valid = isValidPhone(f[i]);
			if (valid == 1) {
				error = LANG['specify_phone'];
			} else if (valid == 2) {
				error = LANG['phone_incorrect'];				
			}
		}
		if(error) {
			alert(error);
			f[i].focus();
			rez=false;
			break;
		}
	}
	return rez;
}

function formToAjaxObject(f) {
	var result={};
	for (var i=0;i<f.length;i++) {
		if (f[i].type=='checkbox') result[f[i].name]=f[i].checked ? f[i].value : '';
			else if (f[i].type=='radio') {
				if (f[i].checked) result[f[i].name]=f[i].value;
				}
			else result[f[i].name]=f[i].value;
		}
	return result;
	}

function grecaptchaReady(cb) {
	var it = setInterval((function(i) { return function() {
		let clear = ++i > 1000;
		if(typeof grecaptcha !== 'undefined') {
			grecaptcha.ready(cb);
			clear = true;
		}
		if(clear) {
			clearInterval(it);
		}
	}})(0), 100);
}
function formSubmit(submit_element,args) {
	if (args==null) args={};
	if (args['success_message']==null) args['success_message']=LANG['request_sent'];
    for (var f=submit_element;f.tagName.toLowerCase()!='form' && f!=null;f=f.parentNode);
	if (f==null) return false;

	var result_holder=f.getElementsByClassName('ajax_result')[0];
	var loader_holder=f.getElementsByClassName('ajax_loader')[0];

	Hide(result_holder);
	if (!validateForm(f)) return false;
	if (f['personal_data']!=null && !f['personal_data'].checked) {
		alert(LANG['confirm_personal_data']);
		return false;
		}
	addClass(submit_element,'hidden');
	Show(loader_holder);

	var ajax_data=formToAjaxObject(f);
	if (ajax_data.client_id==null) {
		if(typeof goals!='undefined') {
			var client_id=goals.getClientIDYA();
			if (client_id!='') {
				ajax_data.client_id=client_id;
			}
		}
	}
	let success = function() {
		result_holder.innerHTML=args['success_message'];
		f.reset();
		//Show(submit_element,(hasClass(submit_element,'inline-block') ? 'inline-block' : 'block'));
		removeClass(submit_element,'hidden');
		Hide(loader_holder);
		Show(result_holder);
		var success_goal = args['success_goal'];
		if(!success_goal) {
			success_goal = f.dataset.success_goal;
		}
		if(success_goal && typeof goals!='undefined') {
			goals.register(args['success_goal']);
		}
		if(typeof args['cb'] == 'function') {
			args['cb'](f);
		}
		resetRecaptcha(f);
	};
	let error = function(error) {
		result_holder.innerHTML='<span style="color:#f00">'+error+'</span>';
		//Show(submit_element,(hasClass(submit_element,'inline-block') ? 'inline-block' : 'block'));
		removeClass(submit_element,'hidden');
		Hide(loader_holder);
		Show(result_holder);
		resetRecaptcha(f);
	};
	if (typeof googleRecaptchaV3SiteKey !== 'undefined') {
		grecaptchaReady(function () {
			let r = f.querySelector('.google-recaptcha-v3-response');
			let a = f.querySelector('.google-recaptcha-v3-action');
    		grecaptcha.execute(googleRecaptchaV3SiteKey, {action: a.value}).then(function (token) {
    			r.value = token;
				ajax_data[r.name] = token;
				KITS.sendAjaxRequest(ajax_data, success, error);
			});
		});
		return;
	}
	
	KITS.sendAjaxRequest(ajax_data, success, error);
	}
/* END FORMS */

function likeThisPost(like_value,node) {
	var params = {'like_this_post':like_value};
	KITS.sendAjaxRequest(params,function(){},(function(like_value,node){ return function(results){
		var results=results.split("::");
		if (!window.isNum(results[0]) && results[0]!="") {
		alert(results[0]);
		} else {
			node.innerHTML=' '+results[0];
			if (results[1]!=null && results[1]!="" && isNum(results[1])) {
				e('post_top_'+(like_value==1 ? "dislike" : "like")).innerHTML=results[1];
			}
		}
	}}(like_value,node)));
}

function printPage() {
	if(typeof goals!='undefined') goals.register('PRINT_CLICK');
	var link = window.location.href;
	var title = document.getElementsByTagName("H1")[0].innerHTML;
	var content=document.getElementsByTagName("article")[0].innerHTML;
	//getting style
	var stylesheet = "";

    for( var i in document.styleSheets ){
        if( document.styleSheets[i].href && document.styleSheets[i].href.indexOf("style\.css")>=0 ) {
            stylesheet = document.styleSheets[i].href.replace('style.css','print.css');
            break;
        }
    }

	var newWin = window.open("about:blank", title);
	newWin.document.write('<html><head>');
    newWin.document.write('<link rel="stylesheet" type="text/css" media="all" href="'+stylesheet+'">');
	newWin.document.write('</head><body onafterprint="self.close()"></body></html>');
	newWin.document.body.innerHTML = '<h1>'+title+'</h1>'+content+ '<div class="source"><img class="qr" src="http://qrcoder.ru/code/?'+encodeURIComponent(link)+'&4&0"><br>' + link + '</div>'+ '<div class="center"><input class="print" type="button" value="'+LANG['print']+'" onclick="this.style.visibility = \'hidden\'; window.print();return false;"></div>';
	}

var star_status=0;
function changeStarStatus(st, el) {
	star_status=st;
	drawStatus(star_status, el);
	var f=el;
	do {f=f.parentNode;}while (f.nodeName.toLowerCase()!='form');
	f['rating'].value=st;
	}

function drawStatus(st,el) {
	while(el.getElementsByClassName('star').length==0) el = el.parentNode;
	for (var i=0;i<st;i++){
		removeClass(el.getElementsByClassName('star')[i],'empty');
	}
		//while(el.getElementsByClassName('star')[i].className.indexOf(' empty')!==-1){
		//	el.getElementsByClassName('star')[i].className = el.getElementsByClassName('star')[i].className.replace(' empty','');
		//}
	for (var i=st;i<el.getElementsByClassName('star').length;i++){
		addClass(el.getElementsByClassName('star')[i],'empty');
	}

	//el.getElementsByClassName('star')[i].className = el.getElementsByClassName('star')[i].className + ' empty';
}

/* agency languages block */
var language_flags=[];
function calcFlagsWidth() {
	return language_flags.length*20+(language_flags.length-1)*9+40;
	}
function getMaxFlags(width) {
	return Math.floor((width-40-40+9)/29);
	}
function alignSpokenLanguages() {
	var container=document.querySelector('.page_content.company .languages');
	if (!container) return false;
	var flags=container.querySelector('.flags');
	if (!flags) return false;
	var more=container.querySelector('.more');
	if (language_flags.length==0) language_flags=container.querySelectorAll('.flags img');
	//calculate widths
	var column_w=document.querySelector('.page_content').clientWidth;
	var preview=document.querySelector('.page_content .preview');
	var preview_w=preview==null ? 0 : preview.clientWidth+30;
	var icons_w=0;
	var popular=container.querySelector('.icon-popular');
	if (popular!=null) icons_w+=popular.clientWidth;
	var trusted=container.querySelector('.icon-trusted');
	if (trusted!=null) icons_w+=trusted.clientWidth;
	var caption_w=container.querySelector('.caption').clientWidth+10;
	var max_flags_width=column_w==(preview_w-30) ? column_w-icons_w-caption_w : column_w-preview_w-icons_w-caption_w;
    var max_flags=getMaxFlags(max_flags_width);
    //redraw flags
    if (max_flags<language_flags.length) addClass(more,'active');
    	else removeClass(more,'active');
    var flags_show='';
   	var flags_hidden='';
   	var img='';
   	for (var i=0;i<language_flags.length;i++) {
		img='<img src="'+language_flags[i].src+'" alt="'+language_flags[i].alt+'" width="'+language_flags[i].getAttribute('width')+'" height="'+language_flags[i].getAttribute('width')+'">';
		if (i<max_flags) flags_show+=img;
			else  flags_hidden+=img;
   		}
   	flags.innerHTML=flags_show;
   	flags.style.display=max_flags>0 ? 'inline-block' : 'none';
   	container.querySelector('.more .list').innerHTML=flags_hidden;
    return true;
	}

/* objects */
function setSortMode(sort,c,reload,el,ac) {
	if(typeof c=='undefined'){
		c='objects_sort';
	}
	saveCookie(c,sort);
	if(typeof ac=='undefined'){
		ac=c;
	}
	if(reload){
		window.location.href=window.location.href;
		window.location.reload();
		}else{
			setAjaxLoader(el);
			KITS.sendAjaxRequest({'ajax':2,'objects_sort':1,'key':ac},function(){},function(res){
				try{
					res=JSON.parse(res);
					}catch(ex){
						res={type:'error'};
					}
				if(res.type=='success'){
					if(!res.key){
						res.key=ac;
						}
					let cev=new CustomEvent('objects_sort_changed', {'detail':res});
					window.dispatchEvent(cev);
					}
				});
			}
	}

function setViewMode(mode,elem) {
	var antimode=mode=='list' ? 'grid' : 'list';
	//switch classes for ui
	addClass(elem,'active');
	removeClass(elem.parentNode.querySelector('.'+antimode),'active');
	//switch classes for the list
	var objects_lists=document.querySelectorAll('.objects-list.switchable');
	objects_lists.forEach(function(objects_list){
		removeClass(objects_list,antimode+'view');
		addClass(objects_list,mode+'view');
		});
	/*if (objects_list!=null) {
		removeClass(objects_list,antimode+'view');
		addClass(objects_list,mode+'view');
		}*/
	//save cookie
	saveCookie('objects_view',mode);
	}
function setViewModeDirect(mode,elem,c){
	var antimode=mode=='list' ? 'grid' : 'list';
	var par=getParentClass(elem,'objects_controls');
	if(!par){
		return;
	}
	par=par.parentNode;
	var objects_list=par.querySelector('.objects-list.switchable');
	if(!objects_list){
		return;
	}
	addClass(elem,'active');
	removeClass(elem.parentNode.querySelector('.'+antimode),'active');
	removeClass(objects_list,antimode+'view');
	addClass(objects_list,mode+'view');
	if(typeof c=='undefined'){
		c='objects_view';
	}
	saveCookie(c,mode);
}

function scrollObjectListGallery(oid,el,dir){
	var img=getParentClass(el,'image',true);
	if(img==null) return false;
	var image=img.querySelector('.thumb');
	if(image==null) return false;
	var index=img.getAttribute('data-index');
	if(index==null || index=='') index=0;
	index=parseInt(index);
	var imgs=img.getAttribute('data-images');
	if(imgs==null || imgs=='') return false;
	var imgs=imgs.split(',');
	var image_count=imgs.length;
	var loader=img.getElementsByClassName('circle_loader')[0];
	if(loader!=null) addClass(loader,'active');
	image_preloader=document.createElement("img");
	image_preloader.addEventListener('load',(function(i,l){ return function(){
		i.style.backgroundImage="url('"+this.src+"')";
		removeClass(l,'active');
	}})(image,loader));
	index+=dir;
	if (index<0) index=image_count-1;
	if (index>=image_count) index=0;
	img.setAttribute('data-index',index);
	image_preloader.src=imgs[index];
	}

function initObjectListGallery(oid,el,dir, type) {
	var img=getParentClass(el,'image',true);
	if(img==null) return false;
	if(typeof type =='undefined') {
		type = 'project';
	}
	var imgs=img.getAttribute('data-images');
	if(imgs==null) KITS.sendAjaxRequest({'get_object_gallery':oid, 'type' : type},function(){},(function(img){ return function(res){
					img.setAttribute('data-images',res);
					scrollObjectListGallery(oid,el,dir);
					}})(img));
		else scrollObjectListGallery(oid,el,dir);
	}

function hideObjectFromList(elem,id) {
	if(typeof goals!='undefined') goals.register('HIDE_OBJECT_CLICK');
	var item=getParentTag(elem,'li');
	if (item!==null) addClass(item,'hidden');
	var hidden=getCookie('hidden_objects').split('_');
	if (hidden.indexOf(id)<0) hidden.push(id);
	saveCookie('hidden_objects',hidden.join('_'));
	}

function emailObject(oid) {
	if (oid==null) oid=0;
	if(typeof goals!='undefined') goals.register('SEND_EMAIL_CLICK');
	document.forms['email_object_form']['email_object'].value=oid;
	showPopup('email_object');
	}

function setObjectsListThumbSlider() {
	var objects_lists=document.querySelectorAll('div.objects-list');
	for (var i=0;i<objects_lists.length;i++) {
		var lis=objects_lists[i].querySelectorAll("li[data-object]");
		for (var j=0;j<lis.length;j++) {
			var object_id=lis[j].getAttribute('data-object');
			var image=lis[j].querySelector('.image');
			var prev=lis[j].querySelector('.prev');
			if (!hasClass(prev,'hidden')) {
				swipe(image,(function (oid,elem){ return function(p){
					initObjectListGallery(oid,elem,(p['scroll']=='left' ? -1 : 1));
					}})(object_id,prev),100);
				}
			}
		}
	}

function projectOptionsUnfold(a) {
	div=getParentClass(a,'features');;
	if (!hasClass(div,'wrapped'))  {
		addClass(div,'wrapped');
		a.innerHTML=LANG['more'];
		}
		else {
			removeClass(div,'wrapped');
			a.innerHTML=LANG['less'];
			}
	}

function setPriceType(elem,price) {
	var container=getParentClass(elem,'price_info');
	if (container==null) return false;
	var tp=container.querySelector('.type > span');
	tp.innerHTML=elem.innerHTML;
	var pr=container.querySelector('.value > span');
	pr.innerHTML=price;
	}

/* COMPARE */
function add_to_compare(oid,el,txt){
	if(txt==null) txt=false;
	KITS.addCompare(oid,true,(function(el){
		return function(){
			if(typeof goals!='undefined') goals.register('OBJECT_TO_COMPARE');
			addClass(el,'active');
			if(el.title!='') el.title=LANG['remove_from_compare'];
			if(txt && el.getElementsByClassName('text')[0]!=null) el.getElementsByClassName('text')[0].innerHTML=LANG['remove_from_compare'];
			update_compare_count();
			updateCompareButtons(oid,'remove_from_compare',LANG['remove_from_compare']);
			var pl=el.querySelector('.page_link');
			var pl=el.querySelector('.page_link');
			if(pl){
				el.onmouseenter=function(){
					this.querySelector('.page_link').className='page_link active';
				}
				el.onmouseleave=function(){
					this.querySelector('.page_link').className='page_link';
				}
				if(pl.className.indexOf('active')==-1){
					pl.className=pl.className+' active';
				}
			}
		}
	})(el,txt));
	el.setAttribute('onclick','remove_from_compare('+oid.toString()+',this,'+txt+');');
}
function remove_from_compare(oid,el,txt){
	if(txt==null) txt=false;
	KITS.removeCompare(oid,true,(function(el){
		return function(){
			removeClass(el,'active');
			if(el.title!='') el.title=LANG['add_to_compare'];
			if(txt && el.getElementsByClassName('text')[0]!=null) el.getElementsByClassName('text')[0].innerHTML=LANG['add_to_compare'];
			if(typeof compare_page!='undefined' && compare_page===true) window.location=window.location.href;
			update_compare_count();
			updateCompareButtons(oid,'add_to_compare',LANG['add_to_compare']);
			var pl=el.querySelector('.page_link');
			if(pl){
				el.onmouseenter=null;
				el.onmouseleave=null;
				pl.className='page_link';
			}
		}
	})(el,txt));
	el.setAttribute('onclick','add_to_compare('+oid.toString()+',this,'+txt+');');
}

function update_compare_count(){
	var els=document.body.querySelectorAll('.compare_count');
	if(els.length>0){
		KITS.sendAjaxRequest({'get_compare_count':'1'},function(){},(function(els){ return function(res){
				for(var i=0;i<els.length;++i){
					els[i].innerHTML=res;
				}
		}})(els));
	}
}
function updateCompareButtons(oid,function_name,text){
	var els=document.body.querySelectorAll('*[data-compare-id="'+oid.toString()+'"]');
	if(els.length>0){
		for(var i=0;i<els.length;++i){
			var txt=els[i].getElementsByClassName('text')[0];
			if (txt!=null) txt.innerHTML=text;
			var onclick=els[i].getAttribute('onclick');
			var prts=onclick.split('(');
			prts[0]=function_name;
			els[i].setAttribute('onclick',prts.join('('));
			}
	}
}

/* WISHLIST */
function add_to_wishlist(oid,el,txt){
	if(txt==null) txt=false;
	KITS.addWishlist(oid,true,(function(el){
		return function(){
			if(typeof goals!='undefined') goals.register('OBJECT_TO_WISHLIST');
			addClass(el,'active');
			if(el.title!='') el.title=LANG['remove_from_wishlist'];
			if(txt && el.getElementsByClassName('text')[0]!=null) el.getElementsByClassName('text')[0].innerHTML=LANG['remove_from_wishlist'];
			update_wishlist_count();
			updateWishlistButtons(oid,'remove_from_wishlist',LANG['remove_from_wishlist']);
			var pl=el.querySelector('.page_link');
			if(pl){
				el.onmouseenter=function(){
					this.querySelector('.page_link').className='page_link active';
				}
				el.onmouseleave=function(){
					this.querySelector('.page_link').className='page_link';
				}
				if(pl.className.indexOf('active')==-1){
					pl.className=pl.className+' active';
				}
			}
		}
	})(el,txt));
	el.setAttribute('onclick','remove_from_wishlist('+oid.toString()+',this,'+txt+');');
}
function remove_from_wishlist(oid,el,txt){
	if(txt==null) txt=false;
	KITS.removeWishlist(oid,true,(function(el){
		return function(){
			removeClass(el,'active');
			if(el.title!='') el.title=LANG['add_to_wishlist'];
			if(txt && el.getElementsByClassName('text')[0]!=null) el.getElementsByClassName('text')[0].innerHTML=LANG['add_to_wishlist'];
			if(typeof wishlist_page!='undefined' && wishlist_page===true) window.location=window.location.href;
			update_wishlist_count();
			updateWishlistButtons(oid,'add_to_wishlist',LANG['add_to_wishlist']);
			var pl=el.querySelector('.page_link');
			if(pl){
				el.onmouseenter=null;
				el.onmouseleave=null;
				pl.className='page_link';
			}
		}
	})(el,txt));
	el.setAttribute('onclick','add_to_wishlist('+oid.toString()+',this,'+txt+');');
}

function update_wishlist_count(){
	var els=document.getElementsByClassName('wishlist_count');
	if(els.length>0){
		KITS.sendAjaxRequest({'get_wishlist_count':'1'},function(){},(function(els){ return function(res){
				for(var i=0;i<els.length;++i){
					els[i].innerHTML=res;
				}
		}})(els));
	}
}

function updateWishlistButtons(oid,function_name,text){
	var els=document.body.querySelectorAll('*[data-wishlist-id="'+oid.toString()+'"]');
	if(els.length>0){
		for(var i=0;i<els.length;++i){
			var txt=els[i].getElementsByClassName('text')[0];
			if (txt!=null) txt.innerHTML=text;
			var onclick=els[i].getAttribute('onclick');
			var prts=onclick.split('(');
			prts[0]=function_name;
			els[i].setAttribute('onclick',prts.join('('));
			}
	}
}
function initMobileParameters(){
	var block=document.body.querySelector('.object .aside .right_block.parameters');
	var cont=e('mobile_parameters');
	if(!block || !cont) return false;
	var mob=block.cloneNode(true);
	cont.appendChild(mob);
}
function initMobileSeller(){
	var block=document.body.querySelector('.object .aside .right_block.contact_agency');
	var cont=e('mobile_seller');
	if(!block || !cont) return false;
	var mob=block.cloneNode(true);
	cont.appendChild(mob);
}
function initProjectDetailPage(){
	if(!document.body.querySelector('.container.object')) return false;
	initMobileParameters();
	initMobileSeller();
}

function initializeTabs(container,n){
	if(n==null){
		n=0;
	}
	if(container==null){
		return false;
	}
	var tabs_holder=hasClass(container,'tabs') ? container : container.querySelector('.tabs');
	if(tabs_holder==null || tabs_holder.dataset.initialized==1 || !tabs_holder.querySelector('.navigation') || !tabs_holder.querySelector('.items')){
		return false;
	}
	var nav_tabs=tabs_holder.querySelectorAll('.navigation > li');
	var tabs=[];
	for(var i=0;i<nav_tabs.length;++i){
		var par=getParentClass(nav_tabs[i],'tabs');
		if(par===tabs_holder){
			tabs.push(nav_tabs[i]);
		}
	}
	var pre_boxes=tabs_holder.querySelectorAll('.items > .tab');
	var boxes=[];
	for(var i=0;i<pre_boxes.length;++i){
		var par=getParentClass(pre_boxes[i],'tabs');
		if(par===tabs_holder){
			boxes.push(pre_boxes[i]);
		}
	}
	if(tabs.length!=boxes.length){
		return false;
	}
	if(tabs[n]==null && n!=-1){
		n=0;
	}
	if(tabs[n]!=null){
		addClass(tabs[n],'active');
	}
	for(var i=0;i<tabs.length;++i) if(tabs[i].querySelector('a')!=null){
		tabs[i].querySelector('a').addEventListener('click',function(e){
			e.preventDefault();
		});
	}
	for(var i=0;i<tabs.length;++i){
		if(i!=n){
			boxes[i].style.display='none';
		}else{
			boxes[i].style.display='block';
		}
		tabs[i].addEventListener('click',(function(c,t,b){ return function(){
			if(hasClass(this,'active')){
				return false;
			}
			var sel=0;
			for(var i=0;i<t.length;++i){
				if(hasClass(t[i],'active')){
					removeClass(t[i],'active');
					b[i].style.display='none';
				}
				if(t[i]===this) sel=i;
			}
			addClass(t[sel],'active');
			b[sel].style.display='block';
		}})(container,tabs,boxes));
	}
	tabs_holder.dataset.initialized=1;
}
function setTab(container,n){
	if(n==null) n=0;
	if(container==null) return false;
	var tabs_holder=container.getElementsByClassName('tabs')[0];
	if(tabs_holder==null) return false;
	var tabs=tabs_holder.getElementsByTagName('li');
	for(var i=0;i<tabs.length;++i) if(i==n) tabs[i].click();
}
function hasNumber(str){
  return /\d/.test(str);
}
function hasLetter(str){
   return str.match(/[A-Za-z]{1,}/) ? true : false;
}
function passwordUnavailable(el,f,subm){
	if(subm){
		subm.disabled=true;
		addClass(subm,'disabled');
	}
	var expl=el.parentNode.querySelector('.explanation');
	if(expl) Show(expl,'inline-block');
	setPasswordComplexity(el,'low');
}
function passwordAvailable(el,f,subm){
	if(subm){
		subm.disabled=false;
		removeClass(subm,'disabled');
	}
	var expl=el.parentNode.querySelector('.explanation');
	if(expl) Hide(expl);
}
function setPasswordComplexity(el,code){
	var codes=['low','medium','strong'];
	var text_holder=el.parentNode.querySelector('.description .value');
	if(text_holder){
		for(var i=0;i<codes.length;++i) removeClass(text_holder,codes[i]);
		addClass(text_holder,code);
		if(typeof LANG['pass_'+code]!='undefined') text_holder.innerHTML=LANG['pass_'+code];
	}
}
function passwordIsStrong(str){
	if(str.length>30) return true;
	var res=true;
	if(!hasNumber(str)) res=false;
	if(!str.match(/[a-z]{1,}/) || !str.match(/[A-Z]{1,}/)) res=false;
	if(str.replace(/[A-Za-z0-9]{1,}/g,"")=="") return false;
	return res;
}
function passwordIsLow(str,f){
	var res=false;
	if(typeof f!='undefined'){
		if(f['email'] && f['email'].value==str){
			res=true;
		}
	}
	if(!hasNumber(str)){
		res=true;
	}
	if(!hasLetter(str)){
		res=true;
	}
	return res;
}
function checkPassComplexity(el){
	if(!el) return false;
	var f=el.form;

	if(!f) return false;
	var subm=f.querySelector('*[type="submit"]') ? f.querySelector('*[type="submit"]') : f.querySelector('a.btn');

	var min=parseInt(el.dataset.min_length);
	if(el.value=='' || el.value.length<min){
		passwordUnavailable(el,f,subm);
		return;
	}
	if(passwordIsLow(el.value,f)){
		passwordUnavailable(el,f,subm);
		return;
	}
	if(passwordIsStrong(el.value)){
		setPasswordComplexity(el,'strong');
	}else setPasswordComplexity(el,'medium');
	passwordAvailable(el,f,subm);
}
function initializePasswordFields(){
	var els=document.body.querySelectorAll('input[data-password]');
	for(var i=0;i<els.length;++i){
		checkPassComplexity(els[i]);
		els[i].addEventListener('input',function(){
			checkPassComplexity(this);
		});
	}
}
function authorizationForm(submit_element,args) {
	if (args==null) args={};
    for (var f=submit_element;f.tagName.toLowerCase()!='form' && f!=null;f=f.parentNode);
	if (f==null) return false;

	var result_holder=f.getElementsByClassName('ajax_result')[0];
	var loader_holder=f.getElementsByClassName('ajax_loader')[0];

	Hide(result_holder);
	if(!validateForm(f)) return false;

	addClass(submit_element,'hidden');
	Show(loader_holder);

	KITS.sendAjaxRequest(formToAjaxObject(f),function(){},function(data){
		try{
			data=JSON.parse(data);
			if(data['type']=='success'){
				if(typeof goals!='undefined') goals.register('SUCCESS_LOGIN');
				result_holder.innerHTML=data['message'];
				f.reset();
				if(data['redirect']) window.location.href=data['redirect'];
			}else{
				result_holder.innerHTML='<span style="color:#f00">'+data['message']+'</span>';
			}
			removeClass(submit_element,'hidden');
			Hide(loader_holder);
			Show(result_holder);
		}catch(ex){}

		removeClass(submit_element,'hidden');
		Hide(loader_holder);
		Show(result_holder);
	});
}
function logout(){
	var f=document.createElement('form');
	f.style.display='none';
	f.action='';
	f.method="POST";
	f.name="logout_form";
	f.innerHTML='<input type="hidden" name="user_logout" value="1">';
	document.body.appendChild(f);
	f.submit();
}
var GMAP={
	'mobile_width' : 800,
	'max_wait_google_iterator' : 1000,
	'wrapper_class' : 'gm_info',
	'close_file_url' : THEME_URL+"images/gm_info_close.png",
	'map_center' : [38.825914, 35.468551],
	'map_marker_url' : THEME_URL+'images/map_marker.png',
	'label_class' : 'gm_labels',
	'grid_size' : 50,
	'additional_left_offset' : (isRTL() ? 20 : -20),
	'additional_top_offset' : 57,
	'objects' : [],
	'markers' : [],
	'infoboxes' : [],
	'map' : null,
	'panorama' : null,
	'panorama_created' :false
}
function isRTL(){
	var parts=ALIAS_URL.split('/');
	var lang=parts[parts.length-1];
	if(lang.length!=2) return false;
	var rtl_langs=['fa','ar'];
	return rtl_langs.indexOf(lang.toLowerCase())>=0;
}
function initProjectsMapPage(objects){
	calculateBigMapHeight();
	googleMapReady(function(){initObjectsMap(objects,e('map'))});
	e('big_map').querySelector('.selector_show').addEventListener('click',openMapSelector);
	window.addEventListener('load',function(){
		checkMapSelector();
		mapSelectorArrowPosition();
		window.addEventListener('scroll',mapSelectorArrowPosition);
	});
	window.addEventListener('resize',function(){
		checkMapSelector();
		calculateBigMapHeight();
	});
}
function initSingleProjectMap(objects){
	googleMapReady(function(){initObjectsMap(objects,e('map'))});
}
function initProjectsMap(objects,eid){
	googleMapReady(function(){initObjectsMap(objects,e(eid))});
}
function googleMapReady(cb){
	if(typeof cb!='function') return;
	var it=setInterval((function(i,cb){ return function(){
		if(typeof google!='undefined' || ++i>GMAP.max_wait_google_iterator){
			clearInterval(it);
			if(typeof google!='undefined') cb.call();
		}
	}})(0,cb),100);
}
function mapSelectorArrowPosition(){
	if(getClientSTop()+getPosition(e('big_map'))+150>e('big_map').offsetHeight){
		addClass(e('big_map'),'selector_absolute');
	}else{
		removeClass(e('big_map'),'selector_absolute');
	}
}
function calculateBigMapHeight(){
	if(!e('big_map') || !e('big_map').querySelector('.selector')) return false;
	//var h=e('big_map').querySelector('.selector').clientHeight;
	var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var header=document.querySelector('.header');
	if (header!=null) h=h-header.clientHeight;
	e('big_map').style.height=h.toString()+'px';
}
function checkMapSelector(){
	if(window.innerWidth>GMAP.mobile_width){
		removeClass(e('big_map'),'active');
		removeClass(e('big_map'),'mobile');
	}
	else{
		addClass(e('big_map'),'mobile');
	}
}
function openMapSelector(ev){
	if(!ev || !ev.target) return false;
	if(!e('big_map') || !e('big_map').querySelector('.selector')) return false;
	if(hasClass(e('big_map'),'mobile')){
		switchClass(e('big_map'),'active');
	}else{
		removeClass(e('big_map'),'active');
	}
}
function getClusters(){
	return [{
        url: THEME_URL+'images/cluster.png',
        height: 73,
        width: 55,
        anchor: [18],
        textColor: '#333333',
        textSize: 15
	},{
        url: THEME_URL+'images/cluster2.png',
        height: 73,
        width: 55,
        anchor: [18],
        textColor: '#333333',
        textSize: 15
	},{
        url: THEME_URL+'images/cluster2.png',
        height: 73,
        width: 55,
        anchor: [18],
        textColor: '#333333',
        textSize: 15
	}];
}
function calculateOffset(html){
	if(!html) return [0,0];
	var buf=document.createElement('div');
	buf.className=GMAP.wrapper_class;
	buf.style.visibility='hidden';
	buf.style.position='absolute';
	buf.style.left='-1000000px';
	buf.style.top='-1000000px';
	buf.innerHTML=html;
	document.body.appendChild(buf);
	var l=buf.offsetWidth/2;
	var t=buf.offsetHeight;
	document.body.removeChild(buf);
	return [-l,-t];
}
function getSingleObject(obj,ind){
	//return false;
	if(obj.html){
		var info=obj.html;
		if(ind) info+='<div class="back" onclick="singleBackToList(this);" data-ind="'+ind.toString()+'"><i class="fa fa-angle-left"></i></div>';
	}else info='';
	var offset=calculateOffset(info);
	var options={
		content: info
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(offset[0], offset[1])
		,zIndex: null
		,boxClass: GMAP.wrapper_class
		,closeBoxMargin: "0px"
		,closeBoxURL: GMAP.close_file_url
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};
	return new InfoBox(options);
}
function singleBackToList(el){
	var ind=el.dataset.ind;
	if(!ind) return false;
	showInfobox(ind,ind);
}
function getMultipleObjects(objects,ind){
	/*var info='<ul><li><div class="objects">';
	for(var i=0;i<objects.length;++i){
		info+='<div class="object'+objects[i].class+'" onclick="showSingleObject(this);" data-id="'+objects[i].id.toString()+'" data-ind="'+ind.toString()+'">\
			<div class="image">\
				<img src="'+objects[i].img+'">\
			</div>\
			<div class="name">'+objects[i].name+'</div>\
		</div>';
		GMAP.objects[objects[i].id]=objects[i];
	}
	info+='</div></li></ul>';*/
	for(var i=0;i<objects.length;++i){
		GMAP.objects[objects[i].id]=objects[i];
	}
	var info='';
	var offset=calculateOffset(info);
	var options={
		content: info
		,disableAutoPan: false
		,maxWidth: 0
		,pixelOffset: new google.maps.Size(offset[0], offset[1])
		,zIndex: null
		,boxClass: GMAP.wrapper_class
		,closeBoxMargin: "0px"
		,closeBoxURL: GMAP.close_file_url
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};
	return new InfoBox(options);
}
function showSingleObject(el){
	var id=el.dataset.id;
	var ind=el.dataset.ind;
	var list_ind=el.dataset.list_index;
	if(!id || !ind) return;
	if(!GMAP.infoboxes[id]){
		var ib=getSingleObject(GMAP.objects[id],ind);
		GMAP.infoboxes[id]=ib;
	}
	showInfobox(ind,id,list_ind);
}
function initObjectsMap(objects,container){
	if(!container && !e(container)) return false;
	if(typeof objects!=='object') objects=[];
	if(typeof container==='string') container=e(container);

	GMAP.map=new google.maps.Map(container,{
		zoom: 4,
		center: new google.maps.LatLng(GMAP.map_center[0], GMAP.map_center[1]),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	var markersBounds=new google.maps.LatLngBounds();
	var cluster_style=getClusters();
	if(!objects || objects.length===0){
		markersBounds.extend(new google.maps.LatLng(GMAP.map_center[0], GMAP.map_center[1]));
		markersBounds.extend(new google.maps.LatLng(GMAP.map_center[0], GMAP.map_center[1]));
	}

	var i=0;
	var no_infobox=false;
	for(prop in objects) if(objects.hasOwnProperty(prop)){
		var list=objects[prop];
		var latlng=prop.split('_');
		if(!latlng[0] || !latlng[1]) continue;

		var marker_position=new google.maps.LatLng(latlng[0], latlng[1]);
		var marker = new MarkerWithLabel({
			position:marker_position,
			draggable: false,
			raiseOnDrag: true,
			map: GMAP.map,
			labelAnchor: new google.maps.Point(16, 59),
			labelClass: GMAP.label_class, // the CSS class for the label
			icon: GMAP.map_marker_url,
		});
	    marker['index']=i;
	    GMAP.markers.push(marker);
	    markersBounds.extend(marker_position);
		if(list.length==1){
			var iw=getSingleObject(list[0]);
			if(list[0].no_infobox){
				no_infobox=true;
			}else{
				no_infobox=false;
			}
		}else{
			var iw=getMultipleObjects(list,i);
		}

		if(!no_infobox){
			if(list.length==1){
				GMAP.infoboxes[list[0].id]=iw;
			}else{
				GMAP.infoboxes.push(iw);
			}
			var ind=list.length==1 ? list[0].id : GMAP.infoboxes.length-1;
			google.maps.event.addListener(GMAP.markers[i], "click",(function(iid,list,ind){ return function(ev){
				var multiple;
				if(list.length==1){
					multiple=false;
				}else{
					multiple=[];
					for(var j=0;j<list.length;++j) multiple.push(list[j].id);
				}
				showInfobox(this['index'],iid,false,multiple);
			}})(ind,list,i));
		}
		++i;
	}
	GMAP.map.setCenter(markersBounds.getCenter());
	if(typeof objects =="object" && objects.length!==0) GMAP.map.fitBounds(markersBounds);

	var cluster=new MarkerClusterer(GMAP.map, GMAP.markers,{gridSize: GMAP.grid_size, styles: cluster_style});
	GMAP.checkzoom=true;
	google.maps.event.addListener(GMAP.map, "bounds_changed", function(){
		var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var min_zoom=w>=1800 ? 7 : 6;
		if(GMAP.objects.length==0 && this.getZoom()>16 && GMAP.checkzoom===true){ this.setZoom(17); GMAP.checkzoom=false; }
		else if(this.getZoom()<min_zoom && GMAP.checkzoom===true){ this.setZoom(min_zoom); GMAP.checkzoom=false; }
	});
}
function loadObjectHTML(oid,m_ind,multiple,ind,cb){
	if(GMAP.infoboxes[oid].getContent()==''){
		if(multiple){
			KITS.sendAjaxRequest({'load_objects_data' : multiple.join(','),'oid':oid.toString(),'ind':ind.toString(),'ajax' : 2},function(){},function(data){
				if(data==''){
					return '';
				}
				GMAP.infoboxes[oid].setContent(data);
				cb.call();
			});
		}else{
			KITS.sendAjaxRequest({'load_object_data' : oid.toString(),'ajax' : 2},function(){},function(data){
				if(data==''){
					return '';
				}
				if(m_ind!==false) data+='<div class="back" onclick="singleBackToList(this);" data-ind="'+m_ind.toString()+'"><i class="fa fa-angle-left"></i></div>';
				GMAP.infoboxes[oid].setContent(data);
				cb.call();
			});
		}
	}else cb.call();
}
function showInfobox(m_ind,i_ind,multi_ind,multiple){
	if(typeof multi_ind=='undefined') multi_ind=false;
	if(typeof multiple=='undefined') multiple=false;
	loadObjectHTML(i_ind,multi_ind,multiple,m_ind,(function(m_ind,i_ind){ return function(){
		for(var i=0;i<GMAP.infoboxes.length;++i) if(GMAP.infoboxes[i]) GMAP.infoboxes[i].setMap(null);
		var buf=document.createElement('div');
		buf.className=GMAP.wrapper_class;
		buf.style.visibility='hidden';
		buf.style.position='absolute';
		buf.style.left='-1000000px';
		buf.style.top='-1000000px';
		buf.innerHTML=GMAP.infoboxes[i_ind].getContent();
		document.body.appendChild(buf);
		afterImagesLoaded(buf,function(){
			var left=-(buf.offsetWidth/2+GMAP.additional_left_offset);
			var top=-(buf.offsetHeight+GMAP.additional_top_offset);
			GMAP.infoboxes[i_ind].setOptions({
				pixelOffset: new google.maps.Size(left, top),
			});
			m_ind=parseInt(m_ind);
			i_ind=parseInt(i_ind);
			GMAP.infoboxes[i_ind].open(GMAP.map,GMAP.markers[m_ind]);
			document.body.removeChild(buf);
		});
	}})(m_ind,i_ind));
}
function afterImagesLoaded(cont,cb){
	if(!cont || !cb) return false;
	var imgs=cont.querySelectorAll('img');
	var images_counter=0;
	if(imgs.length==0) cb.call();
	else for(var i=0;i<imgs.length;++i){
		var imloader=new Image();
		imloader.addEventListener('load',(function(ttl){ return function(){
			if(++images_counter==ttl){
				cb.call();
			}
		}})(imgs.length));
		imloader.src=imgs[i].src;
	}
}


//p1 - panorama location, p2 - marker location
function panoramaFindAngle(p1,p2) {
   	var x=p2.lng-p1.lng();
   	var y=p2.lat-p1.lat();
   	var r=Math.sqrt(x*x+y*y);
   	var angle=0;
   	if (x>=0 && y>=0) angle=Math.asin(Math.abs(x)/r).toDeg();
   		else if (x>=0 && y<=0) angle=90+Math.asin(Math.abs(y)/r).toDeg();
   		else if (x<=0 && y<=0) angle=180+Math.asin(Math.abs(x)/r).toDeg();
   		else angle=270+Math.asin(Math.abs(y)/r).toDeg();
   	return angle;
   	}

function setObjectPanorama_OLD(tabs_container,lat,lng) {
	var panorama_container=tabs_container.querySelector('.panorama');
	//if (panorama_container==null) panorama_container=tabs_container;
	if (panorama_container==null) return false;
	var panorama = new google.maps.StreetViewPanorama(panorama_container,{'visible':true});

	var sv = new google.maps.StreetViewService();
	sv.getPanorama({location: {'lat':lat,'lng':lng}, radius: 50}, function(data, status) {
		if(status=="OK") {
			panorama.setPosition(data.location.latLng);
			var rotate=panoramaFindAngle(data.location.latLng,{'lat':lat,'lng':lng});
			panorama.setPov({heading:rotate,pitch:0});
			window.addEventListener('load',function(){initializeTabs(tabs_container);});
			panorama_container.setAttribute('data-date',LANG['panorama_date']+': '+data.imageDate);
			tabs_container.querySelectorAll('ul.navigation li')[1].addEventListener('click',function(){
				panorama.setPov({heading:rotate,pitch:0});
				setTimeout(function(){google.maps.event.trigger(panorama, 'resize')},200);
				});
			}
			else {
				var switcher=tabs_container.querySelector('.navigation_wrapper');
				if (switcher!=null) switcher.style.display='none';
				panorama_container.style.display='none';
				}
		});
	}

function setObjectPanorama(lat,lng) {
	GMAP.panorama = GMAP.map.getStreetView();
	GMAP.panorama.setPosition({'lat':lat,'lng':lng});
	//var rotate=panoramaFindAngle(GMAP.panorama.getPosition(),{'lat':lat,'lng':lng});
	//GMAP.panorama.setPov({heading:rotate,pitch:0});
	GMAP.panorama_created=true;
	}

function toggleObjectPanorama(status,lat,lng){
	if (status===null){
		status=true;
	}
	var holder=document.body.querySelector('#object_panorama');
	var obj_map=document.body.querySelector('.projects_map .map');
	if(!holder || !obj_map){
		return;
	}
	if(!status){
		var map=obj_map.dataset.index ? YMAPS_ITEMS[obj_map.dataset.index] : ag_yandex_map;
		if(!map){
			return;
		}
		addClass(holder,'hidden');
		removeClass(obj_map,'hidden');
		map.map.container.fitToViewport();
		return;
	}
	if(holder.querySelector('ymaps')){
		removeClass(holder,'hidden');
		addClass(obj_map,'hidden');
	}else{
		ymaps.ready(function(){
			if(typeof ymaps=='undefined'){
				return;
			}
			ymaps.panorama.locate([lat, lng]).then(
				function(panoramas){
					if(panoramas.length){
						removeClass(holder,'hidden');
						addClass(obj_map,'hidden');
						var player = new ymaps.panorama.Player('object_panorama', panoramas[0], {});
						player.events.add('destroy',function(){
							toggleObjectPanorama(false);
						});
					}else{
					}
				},
				function (err) {}
			);
		});
	}
}
function toggleObjectPanorama_GOOGLE(status,lat,lng) {
	if (GMAP.map==null) return false;
	if (status===null) status=true;
	if (status && !GMAP.panorama_created) setObjectPanorama(lat,lng)
	if (GMAP.panorama!==null) GMAP.panorama.setVisible(status);
	}

/* COMPARE */
function initializeCompareTable(){
	var tables=document.querySelectorAll('table.compare');
	if(tables==null || tables.length==0) return false;
	for (var k=0;k<tables.length;k++) {
		table=tables[k];
		table.setAttribute('data-position',1);
		if(table==null) return false;
		var thead=table.getElementsByTagName('thead')[0];
		var lefts=thead.getElementsByClassName('arrow_left');
		for(var i=0;i<lefts.length;++i) lefts[i].addEventListener('click',(function(t){
			return function(){ drawCompareTable(t,-1); }
		})(table));
		var rights=thead.getElementsByClassName('arrow_right');
		for(var i=0;i<rights.length;++i) rights[i].addEventListener('click',(function(t){
			return function(){ drawCompareTable(t,1); }
		})(table));
		drawCompareTable(table)
		window.addEventListener('resize',(function(t){ return function(){ drawCompareTable(t); }})(table));
	}
}
function drawCompareTable(cont,dir,count,sizes){
	if(cont==null) return false;
	if(dir==null) var dir=0;
	if(sizes==null) var sizes=[[1000,2],[600,1]];
	if(count==null) var count=3;
	for(var i=0;i<sizes.length;++i){
		if(Array.isArray(sizes[i])){
			if(window.innerWidth<=sizes[i][0]) count=sizes[i][1];
		}else if(window.innerWidth<=sizes[i]) --count;
	}
	var start=cont.getAttribute('data-position')==null ? 1 : parseInt(cont.getAttribute('data-position'));
	start+=parseInt(dir);
	var thead=cont.getElementsByTagName('thead')[0];
	var lngth=thead.getElementsByTagName('td').length==0 ? thead.getElementsByTagName('th').length : thead.getElementsByTagName('td').length;
	if(start<1) start=parseInt(lngth)-parseInt(count);
		else if((start+count)>lngth) start=1;
	var end=parseInt(start)+parseInt(count)-1;
	cont.setAttribute('data-position',start);
	var trs=cont.getElementsByTagName('tr');
	var w=count==1 ? 100 : 90/(count+1);
	var pinned=cont.getAttribute('data-pinned');
	if (pinned=='' || pinned==null || count==1) pinned=0
	var leftest=pinned>0 && pinned<start ? pinned : start;
	var rightest=pinned>0 && pinned>end ? pinned : end;

	var preleft=pinned>0 && pinned<start ? start : start-1;
	if (preleft==pinned) preleft--;
	if (preleft<1) preleft=lngth-1;

	for(var i=0;i<trs.length;++i){
		var tds=trs[i].getElementsByTagName('td').length==0 ? trs[i].getElementsByTagName('th') : trs[i].getElementsByTagName('td');
		for(var j=1;j<tds.length;++j){
			tds[j].style.width=w.toString()+'%';
			tds[j].style.display=(j>=start && j<=end) ? 'table-cell' : 'none';
			if (pinned>0) {
				if (j==pinned) tds[j].style.display='table-cell';
				if (pinned<start && j==start) tds[j].style.display='none';
				if (pinned>end && j==end) tds[j].style.display='none';
				}

			var right=tds[j].getElementsByClassName('arrow_right')[0];
			var left=tds[j].getElementsByClassName('arrow_left')[0];

			if(left!=null){
				if(leftest==j && lngth-1>count) left.style.display='block';
				else left.style.display='none';
			}
			if(right!=null){
				if(rightest==j && lngth-1>count) right.style.display='block';
				else right.style.display='none';
			}


		}
	}
}

function pinCompare(a,oid) {
	var th=getParentTag(a,'th');
	var table=getParentTag(th,'table');
	var pinned=table.getAttribute('data-pinned');
	var ths=table.querySelectorAll('th');
	if (pinned!='' && pinned!=null) {
		table.setAttribute('data-pinned','');
		ths[pinned].setAttribute('data-pinned','');
		removeClass(ths[pinned].querySelector('a.pin'),'active');
		}
	if (ths[pinned]!=th) {
		var new_pinned=0;
		for (var i=0;i<ths.length;i++) if (ths[i]==th) new_pinned=i;
		addClass(a,'active');
		th.setAttribute('data-pinned',1);
		table.setAttribute('data-pinned',new_pinned);
		}
	}
function switchMainSearch(el){
	if(!el) return false;
	var sf=getParentClass(el,'slider_wrapper');
	if(!sf) return false;
	switchClass(sf,'opened');
}
function mainSearchButtonClick(ev,el){
	if(!ev || !ev.target) return;
	if(hasClass(ev.target,'arrow')){
		if(!el) return false;
		var btn=getParentClass(el,'btn');
		if(!btn) return false;
		switchClass(btn,'opened');
	}else{
		if(typeof goals!='undefined') goals.register('MAIN_SEARCH_CLICK');
		var f=getParentTag(el,'form');
		if(f) f.submit();
	}
}
function changeMainFormAction(el,type){
	if(!el || !type) return false;
	var types={
		search : 'action',
		map : 'map_action',
	};
	if(!types[type]) return false;
	var f=getParentTag(el,'form');
	if(!f || !f.dataset[types[type]]) return false;
	saveCookie('main_search_type',type);
	f.action=f.dataset[types[type]];
	f.submit();
}
function fulltext(el,txt){
	var txt1=typeof LANG==='object' && LANG['show_full_text']!=null && LANG['show_full_text']!='' ? LANG['show_full_text'] : 'Open more';
	var txt2=typeof LANG==='object' && LANG['hide_text']!=null && LANG['hide_text']!='' ? LANG['hide_text'] : 'Hide';
	if(txt==null || !Array.isArray(txt)) txt=[txt1,txt2];
	else if(txt[0]==null || txt[0]=='') txt[0]=txt1;
	else if(txt[1]==null || txt[1]=='') txt[1]=txt2;
	var k=null;
	for(var i=0; i<document.getElementsByClassName('show_button').length; ++i) if(el===document.getElementsByClassName('show_btn')[i]){ k=i; break; }
	if(k==null) return;
	var op=el.getAttribute('data-opened')==1 ? true : false;
	el.innerHTML = op ? txt[0] : txt[1];
	el.className=op ? el.className.replace('opened','').trim() : el.className+' opened';
	document.getElementsByClassName('hidden_text')[k].style.display = op ? 'none' : 'block';
	el.setAttribute('data-opened',(op ? 0 : 1));
}
function initHiddenText(){
	var els=document.querySelectorAll('.hidden_text');
	for(var i=0;i<els.length;i++) if(els[i].dataset.initialized!=1){
		var div=document.createElement('div');
		div.className='show_button';
		var btn=document.createElement('a');
		btn.className='show_btn medium';
		btn.href='javascript:void(0);';
		var txt=null;
		if(els[i].getAttribute('data-text') && els[i].getAttribute('data-text')!='') txt=els[i].getAttribute('data-text').split(',');
		btn.addEventListener('click',(function(t){ return function(){fulltext(this,t);}})(txt),false);
		var txt1=typeof LANG==='object' && LANG['show_full_text']!=null && LANG['show_full_text']!='' ? LANG['show_full_text'] : 'Open more';
		btn.innerHTML=txt!=null && txt[0]!=null && txt[0]!='' ? txt[0] : txt1;
		div.appendChild(btn,true);
		if(els[i].nextSibling) els[i].parentNode.insertBefore(div,els[i].nextSibling);
		else els[i].parentNode.appendChild(div);
		els[i].setAttribute('data-initialized',1);
	}
}

function setCookieWarning() {
	var cw=e('cookie_warning');
	if (cw!=null) removeClass(cw,'hidden');
	}

var sticky_limit_y=0;
function setStickyMenu() {
	setStickyLimit();
    var sticky_menu=document.querySelector('.sticky_menu');
    var header=document.querySelector('.header');
    var clone=header.cloneNode(true);
    sticky_menu.appendChild(clone);
    window.addEventListener('scroll',function(){
        trackStickyLimit();
    	});
    window.addEventListener('resize',function(){
    	setStickyLimit();
    	trackStickyLimit();
    	});
    trackStickyLimit();
	}

function setStickyLimit() {
	var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var header=document.querySelector('.header');
	var menu=document.querySelector('.header .main-menu');
	var header_y=getPosition(header,'y');
	var menu_y=getPosition(menu,'y');
	if (w>900) sticky_limit_y=menu_y;
		else if (w<=500) sticky_limit_y=getPosition(document.querySelector('.header .mobile_menuer'),'y');
		else sticky_limit_y=header_y;
	}

function trackStickyLimit() {
	var sticky_menu=document.querySelector('.sticky_menu');
	var y=getClientSTop();
	if (y>=sticky_limit_y) removeClass(sticky_menu,'hidden');
        else addClass(sticky_menu,'hidden');
	}

var vert_scroll=0;
function removeIosScroll() {
	var wrapper=document.querySelector('.superwrapper');
	if (wrapper==null) return false;
	vert_scroll=getClientSTop();
	addClass(wrapper,'noscroll');
	}

function restoreIosScroll() {
	var wrapper=document.querySelector('.superwrapper');
	if (wrapper==null) return false;
	removeClass(wrapper,'noscroll');
	window.scroll(0, vert_scroll);
	}

/* OBJECTS SEARCH */
function closeAllRanges(exclude) {
	var ranges=document.querySelectorAll('.range_popup.open');
    for (var i=0;i<ranges.length;i++)  if (ranges[i]!=exclude) removeClass(ranges[i],'open');
	}

function initUiClosers() {
	document.addEventListener('click',function(){closeAllRanges();});
	var ranges=document.querySelectorAll('.range_popup');
	for (var i=0;i<ranges.length;i++) ranges[i].addEventListener('click',function(){
		var event = event || window.event;
		event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
		document.kit_ui.closeAllSelects();
		document.kit_ui.closeAllRegions();
		closeAllRanges(this);
		});
	for (var i=0;i<document.kit_ui.regions_lists.length;i++) document.kit_ui.regions_lists[i].input.addEventListener('click',function(){
		document.kit_ui.closeAllSelects();
		closeAllRanges();
		});
	for (var i=0;i<document.kit_ui.selects.length;i++) document.kit_ui.selects[i].container.addEventListener('click',function(){
		document.kit_ui.closeAllRegions();
		closeAllRanges();
		});
	}

function getActiveSearchTab() {
	var tabs=document.querySelectorAll('#objects_search_tabbed .stripe .navigation li');
	var active=0;
	var tab=tabs[0];
	for (var i=0;i<tabs.length;i++) if (hasClass(tabs[i],'active')) {
		tab=tabs[i];
		active=i;
		}
	return {'tab':tab,'index':active};
	}

function getActiveSearchForm() {
	var active_tab=getActiveSearchTab();
	var f=document.querySelectorAll('#objects_search_tabbed .items .tab')[active_tab.index].getElementsByTagName('form')[0];
	return f;
	}

function openAdvancedSearch() {
	var f=getActiveSearchForm();
	var open=false;
	if (f!=null) for (var i=0;i<f.length;i++){
		var is_advanced=getParentClass(f[i],'advanced',false);
		if (is_advanced && (f[i].type=='checkbox' && f[i].checked || f[i].type=='text' && f[i].value!='' || f[i].tagName.toLowerCase()=='select' && f[i].value!='')) open=true;
		}
	if (open) addClass(e('objects_search_tabbed'),'open')
	}

function searchSubmit(mode) {
	if (mode==null || mode!='map') mode='list';
    var f=getActiveSearchForm();
	if(f==null) return false;
	var action_url=f.getAttribute(mode=='map' ? 'data-map-action' : 'data-action');
	f.action=action_url;
	f.submit();
	}

function saveObjectsSearch(container) {
	var query=window.location.search;
	if (query=='' || query=='?') {
		alert(LANG['empty_search']);
		return false;
		}
	showPopup('save_search');
	var p=e('save_search');
	p.querySelector('input[name=name]').value=generateSearchName();
	Hide(p.getElementsByClassName('ajax_result')[0]);
	}

function generateSearchName() {
	var active_tab=getActiveSearchTab();
	var f=getActiveSearchForm();
	var parts=[];
	parts.push(active_tab.tab.innerHTML);
	if (f!=null) {
		for (var i=0;i<f.length;i++){
			//checkbox
			if (f[i].type=='checkbox' && f[i].checked) {
				var labels=f[i].parentNode.querySelectorAll('label[for='+f[i].id+']');
				var label='';
				for (var j=0;j<labels.length;j++) if (labels[j].innerText!='') label=labels[j].innerText;
				if (label!='') parts.push(label);
				}
			//input
			if (f[i].type=='text' && f[i].value!='' && f[i].placeholder!='') {
				var label=f[i].placeholder;
				var range=getParentClass(f[i],'range',false);
				if (range!=null) {
					var span=range.getElementsByTagName('span')[0];
					if (span!=null && span.innerText!='') label=span.innerText+' '+label;
					}
				parts.push(label+': '+f[i].value);
				}
			//select
			if (f[i].tagName.toLowerCase()=='select' && f[i].value!='' && f[i].getAttribute('placeholder')!='') {
				var label=f[i].getAttribute('placeholder');
				var values=[];
				for (var j=0;j<f[i].options.length;j++) if (f[i].options[j].selected) values.push(f[i].options[j].innerText);
				parts.push(label+': '+values.join(','));
				}
			}
		}
	return parts.join(', ');
	}

function saveSearchSubmit() {
	var p=e('save_search');
	var field=p.querySelector('input[name=name]');
	var result_holder=p.getElementsByClassName('ajax_result')[0];
	Hide(result_holder);
	if (fieldEmpty(field)) {alert(LANG['fill_in_required']);field.focus();return false;}
	var result=saved_searches.saveSearch(field.value);
	if (result) result_holder.innerHTML=LANG['search_saved'];
		else result_holder.innerHTML='<span class="red">'+LANG['search_save_error']+'</span>';
	Show(result_holder);
	}

function showPreviousSearches(container) {
	if (hasClass(container,'open')) removeClass(container,'open');
		else {
			var event = event || window.event;
			event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
			addClass(container,'open');
			var holder=container.querySelector('.holder');
			if (holder!=null) holder.innerHTML=saved_searches.drawSearches();
			}
	}

function closePreviousSearches(exclude) {
	var searches=document.querySelectorAll('.objects_search.tabbed .controls .searches');
	for (var i=0;i<searches.length;i++) if (searches[i]!=exclude) removeClass(searches[i],'open');
	}

/* SAVED SEARCHES OBJECT */
function savedSearches() {
	this.support_storage=(typeof(Storage) !== "undefined");
	this.save_key='savedsearches';
	this.searches=[];

	this.loadSearches=function(){
		var str='';
		if (this.support_storage) str=localStorage.getItem(this.save_key);
			else str=getCookie(this.save_key);
		if (str=='' || str==null) str='[]';
		this.searches=JSON.parse(str);
		}

	this.saveSearches=function() {
		var str=JSON.stringify(this.searches);
		if (this.support_storage) localStorage.setItem(this.save_key,str);
			else saveCookie(this.save_key,str);
		}

	this.drawSearches=function() {
		this.loadSearches();
		var html='';
		var base=window.location.href.replace(window.location.search,'');
		for (var i=0;i<this.searches.length;i++) {
			html+='<li><div class="name" onClick="window.location=\''+base+this.searches[i].query+'\'">'+this.searches[i].name+'</div><div class="delete" onClick="if (saved_searches.deleteSearch('+i+')) Hide(this.parentNode)"></div></li>';
			}
		if (html=='') html='<li class="gray">'+LANG['no_saved_searches']+'</li>';
		return '<ul>'+html+'</ul>';
		}

	this.saveSearch=function(name) {
		if (name==null) return false;
		this.loadSearches();
		this.searches.push({'name':name,'query':window.location.search});
		this.saveSearches();
		return true;
		}

	this.deleteSearch=function(index) {
		var event = event || window.event;
		event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
		if (index==null || index<0 || index>=this.searches.length) return false;
		this.searches.splice(index,1);
		this.saveSearches();
		return true;
		}
	}
var saved_searches=new savedSearches();

/* STATISTICS */
function compareCityStat(mode,holder,target_holder) {
	if (mode==null || holder==null || target_holder==null) return false;
	var compare=holder.querySelector('input[name=city_id]');
	var base=holder.querySelector('input[name=base_city]');
	if (compare==null || base==null || base.value=='') return false;
	if (compare.value=='') {
		alert(LANG['choose_compare_city']);
		return false;
		}
	KITS.sendAjaxRequest({'ajax':2,'numbeo_compare':mode,'city':base.value,'compare':compare.value},function(){},function(result){
        target_holder.innerHTML=result;
		});
	}
function showHideSearchOnMobile_OLD(el){
	var cont=getParentClass(el,'main-holder');
	if(!cont) return false;
	var sw=cont.querySelector('.objects_search');
	var mb=cont.querySelector('.mobile_search_button');
	if(!sw || !mb) return false;
	var show=true;
	if(window.innerWidth<=600){
		show=hasClass(sw,'hidden');
	}
	if(show){
		addClass(mb,'hidden');
		addClass(sw,'active');
		removeClass(sw,'hidden');
		removeClass(mb,'disabled');
	}else{
		addClass(sw,'hidden');
		addClass(mb,'disabled');
		removeClass(mb,'hidden');
		removeClass(sw,'active');
	}
	recalculateFiltersCount(el);
}
function showHideSearchOnMobile(el){
	var cont=getParentClass(el,'main-holder');
	if(!cont){
		return false;
	}
	var sw=cont.querySelector('.objects_search');
	var mb=cont.querySelector('#container_mobile_search_button');
	if(!sw || !mb){
		return false;
	}
	var show=true;
	if(window.innerWidth<=600){
		show=mb.style.display!='none';
	}
	if(show){
		Hide(mb);
		addClass(sw,'active');
		removeClass(sw,'hidden');
	}else{
		addClass(sw,'hidden');
		Show(mb);
		removeClass(sw,'active');
	}
	//recalculateFiltersCount(el);
}
function recalculateFiltersCount(el){
	var cont=getParentClass(el,'main-holder');
	var mode='active';
	var forms;
	if(mode=='active'){
		var tabs=cont.querySelectorAll('.tab');
		var msel=e('mobile_tab_switcher');
		var active_tab=null;
		if(msel){
			active_tab=tabs[msel.value];
		}else{
			for(var i=0;i<tabs.length;++i){
				if(tabs[i].style.display=='block'){
					active_tab=tabs[i];
					break;
				}
			}
		}
		if(active_tab) forms=active_tab.querySelectorAll('form');
	}else if(mode=='all'){
		forms=cont.querySelectorAll('.tab form');
	}
	var c=0;
	if(forms){
		for(var i=0;i<forms.length;++i){
			for(var j=0;j<forms[i].length;++j){
				if(fieldHasValue(forms[i][j])){
					++c;
				}
			}
		}
	}
	var counter=cont.querySelector('.mobile_search_button .counter');
	if(c==0){
		addClass(counter,'hidden');
	}else{
		removeClass(counter,'hidden');
	}
	counter.innerHTML=c==0 ? '' : c;

}
function fieldHasValue(el){
	var tag=el.tagName.toLowerCase();
	var res=false;
	if(tag=='select'){
		for(var i=0;i<el.options.length;++i){
			res=el.options[i].selected && el.options[i].value!='';
			if(res===true) break;
		}
	}else if(tag=='radio'){

	}else if(el.type=='checkbox'){
		res=el.checked;
	}else if(el.type=='hidden'){

	}else{
		res=el.value!='';
	}
	return res;
}
function ProjectSearchCalculator(args){
	if(typeof args=='undefined'){
		args={};
	}
	this.forms=[];
	this.cont=null;
	this.mobile_cont=null;

	this.recalculate=function(c,n,set){
		if(!this.forms[c]){
			return false;
		}
		if(typeof set=='undefined'){
			set=true;
		}
		var key=this.forms[c].fields.main[n] ? 'main' : 'advanced';
		if(this.forms[c].f[n] && this.forms[c].f[n].type=='hidden'){
			return;
		}
		var empty=this.isEmpty(this.forms[c].f[n]);
		if(empty && !this.forms[c].fields[key][n].empty){
			--this.forms[c].counters[key];
			this.forms[c].fields[key][n].empty=true;
		}else if(!empty && this.forms[c].fields[key][n].empty){
			++this.forms[c].counters[key];
			this.forms[c].fields[key][n].empty=false;
		}
		if(this.forms[c].counters[key]<0){
			this.forms[c].counters[key]=0;
		}
		if(set){
			this.setCount(c);
		}
	}
	this.isEmpty=function(field){
		if(typeof field=='undefined'){
			return true;
		}
		var res=false;
		if(field.type=='text'){
			res=field.value=='';
		}else if(field.type=='checkbox'){
			res=!field.checked;
		}else if(field.type=='radio'){
			res=field.value=='';
		}else if(field.tagName.toLowerCase()=='select'){
			var done=false;
			var val='';
			for(var j=0;j<document.kit_ui.selects.length;++j){
				if(document.kit_ui.selects[j].select===field){
					if(document.kit_ui.selects[j].multiple){
						res=document.kit_ui.selects[j].value.length==0;
					}else{
						res=document.kit_ui.selects[j].value=='';
					}
					done=true;
					break;
				}
			}
			if(!done){
				res=field.value=='';
			}
		}
		return res;
	}
	this.getActiveForm=function(){
		var res=null;
		for(var i=0;i<this.forms.length;++i){
			if(this.forms[i].cont.style.display=='block'){
				res=this.forms[i];
				break;
			}
		}
		return res;
	}
	this.setCount=function(c){
		if(typeof c!='undefined' && !this.forms[c]){
			return false;
		}
		var more_el=this.cont.querySelector('.more');
		var active_form=this.getActiveForm();
		if(!more_el || !active_form || (typeof c!='undefined' && this.forms[c]!=active_form)){
			return false;
		}
		var counter=more_el.querySelector('.counter');
		if(!counter){
			counter=document.createElement('span');
			counter.className='counter';
			more_el.appendChild(counter);
		}
		counter.innerHTML=active_form.counters.advanced;
		if(active_form.counters.advanced>0){
			addClass(counter,'active');
		}else{
			removeClass(counter,'active');
		}
		if(Object.keys(active_form.fields.advanced).length>0){//hide more_el if advanced empty
			more_el.removeAttribute("style");
		}else{
			more_el.style.visibility='hidden';
		}
		var mobile_el=this.mobile_cont.querySelector('.mobile_search_button');
		counter=mobile_el.querySelector('.counter');
		if(!counter){
			counter=document.createElement('span');
			counter.className='counter';
			mobile_el.appendChild(counter);
		}
		var msw=e('mobile_tab_switcher');
		if(msw){
			add=false;
			for(var j=0;j<document.kit_ui.selects.length;++j){
				if(document.kit_ui.selects[j].select===msw){
					if(document.kit_ui.selects[j].multiple){
						add=document.kit_ui.selects[j].value.length!=0;
					}else{
						add=document.kit_ui.selects[j].value!='';
					}
					done=true;
					break;
				}
			}
			if(!done){
				add=msw.value!='';
			}
			if(add){
				active_form.counters.main=active_form.counters.main+1;
			}
		}
		counter.innerHTML=active_form.counters.advanced+active_form.counters.main;
		if(active_form.counters.advanced+active_form.counters.main>0){
			addClass(counter,'active');
		}else{
			removeClass(counter,'active');
		}
	}
	this.init=function(){
		this.cont=document.body.querySelector('#objects_search_tabbed');
		this.mobile_cont=document.body.querySelector('#container_mobile_search_button');
		for(var i=0;i<args.forms.length;++i){
			var data={};
			data.f=args.forms[i];
			data.cont=data.f.closest('.tab');
			data.counters={
				'main' : 0,
				'advanced' : 0,
			};
			data.fields={
				'main' : {},
				'advanced' : {},
			};
			this.forms.push(data);
			(function(psc,c,f){
				for(var i=0;i<f.length;++i){
					if(typeof f[i].value!='undefined' && f[i].name){
						var par=f[i].closest('.advanced');
						var key=par ? 'advanced' : 'main';
						psc.forms[c].fields[key][f[i].name]={
							empty : true,
						};
						psc.recalculate(c,f[i].name,false);
						var action=f[i].type=='text' ? 'input' : 'change';
						f[i].addEventListener(action,function(){
							psc.recalculate(c,this.name);
						});
					}
				}
				psc.setCount(c);
			})(this,i,data.f);
		}
	}
}
var psc;
function initProjectsSearch(){
	var el=document.body.querySelector('#objects_search_tabbed');
	if(!el){
		return;
	}
	var forms=el.querySelectorAll('form');
	if(!forms || !forms.length){
		return;
	}
	psc=new ProjectSearchCalculator({
		'forms' : forms,
	});
	var it=setInterval((function(psc){ return function(){
		if(typeof document.kit_ui!=='undefined'){
			clearInterval(it);
			psc.init();
		}
	}})(psc),10);
}
function projectSearchTabChanged(){
	psc.setCount();
}
function initMobileSearch_OLD(){
	var elem=document.body.querySelector('#objects_search_tabbed');
	if(!elem){
		return;
	}
	var el=document.createElement('div');
	el.className='mobile_search_button';
	el.innerHTML='<div class="container"><div class="text">'+LANG['filters']+'<span class="counter"></span></div></div>';
	//elem.parentNode.insertBefore(el,elem);
	elem.parentNode.querySelector('#container_mobile_search_button').appendChild(el);
	el.addEventListener('click',function(){ showHideSearchOnMobile(this); });
	recalculateFiltersCount(elem);
	showHideSearchOnMobile(elem);

	var els=document.body.querySelectorAll('.objects_search form');
	for(var i=0;i<els.length;++i){
		for(var j=0;j<els[i].length;++j){
			els[i][j].addEventListener('change',(function(el){ return function(){
				recalculateFiltersCount(this);
			}})(els[i]));
		}
	}
	var controls=elem.querySelector('.controls');
	var div=document.createElement('div');
	div.className='mobile_btn';
	div.innerHTML='<a onclick="showHideSearchOnMobile(this);">'+LANG['hide_filters']+'</a>';
	controls.appendChild(div);
	/*window.addEventListener('resize',(function(els){ return function(){
		for(var i=0;i<els.length;++i){
			showHideSearchOnMobile(els[i],true);
		}
	})(els));*/
}
function initMobileSearch(){
	var elem=document.body.querySelector('#objects_search_tabbed');
	if(!elem){
		return;
	}
	var el=document.createElement('div');
	el.innerHTML='<div class="container"><div class="top">\
		<div><div class="text mobile_search_button"><a>'+LANG['filters']+'<span class="counter"></span></a></div></div>\
		<div class="right_btn"></div>\
		</div>\
		<div class="bottom controls"></div>\
	</div>';
	elem.parentNode.querySelector('#container_mobile_search_button').appendChild(el);
	var ss=elem.querySelector('.savesearch a');
	if(ss){
		el.querySelector('.right_btn').appendChild(ss.cloneNode(true));
	}else{
		Hide(el.querySelector('.right_btn'));
	}
	var somap=elem.querySelector('.ommap');
	if(somap){
		el.querySelector('.bottom').appendChild(somap.cloneNode(true));
	}else{
		Hide(el.querySelector('.bottom'));
	}
	el.querySelector('.mobile_search_button').addEventListener('click',function(){ showHideSearchOnMobile(this); });
	var controls=elem.querySelector('.controls');
	var div=document.createElement('div');
	div.className='mobile_btn';
	div.innerHTML='<a onclick="showHideSearchOnMobile(this);">'+LANG['hide_filters']+'</a>';
	controls.appendChild(div);
}
function fullCrosslink(el){
	if(!el) return false;
	var par=getParentClass(el,'crosslink_block');
	if(!par) return false;
	var items=par.querySelector('.items');
	if(!items) return false;
	if(hasClass(items,'show_all')){
		el.innerHTML=LANG['more'].charAt(0).toUpperCase() + LANG['more'].slice(1);
	}else{
		el.innerHTML=LANG['less'].charAt(0).toUpperCase() + LANG['less'].slice(1);
	}
	switchClass(items,'show_all');

}
function switchCrosslink(el){
	if(!el) return false;
	var par=getParentClass(el,'crosslink_block');
	if(!par) return false;
	addClass(par,'user_set');
	switchClass(par,'inactive');
}
function showHideCrosslinks(){
	var els=document.body.querySelectorAll('.crosslink_block');
	if(!els || !els.length) return;
	var show=window.innerWidth>800;
	for(var i=0;i<els.length;++i){
		if(!hasClass(els[i],'user_set')){
			if(show){
				removeClass(els[i],'inactive');
			}else{
				addClass(els[i],'inactive');
			}
		}
	}
}
function initCrosslinkBlocks(){
	var els=document.body.querySelectorAll('.crosslink_block');
	if(!els || !els.length) return;
	showHideCrosslinks();
	window.addEventListener('resize',showHideCrosslinks);
}
function complainObject(oid){
	document.forms['complain_object_form']['complain_object'].value=oid;
	showPopup('complain_object');
}

function createConfirmContainer(){
	var div=document.createElement('div');
	div.id='confirm_container';
	div.innerHTML='<div class="holder">\
	<div class="text"></div>\
	<div class="submit_group"><a class="btn green confirm">'+LANG['yes']+'</a><a class="btn gray decline">'+LANG['no']+'</a></div>\
	</div>';
	return div;
}
function Confirm(){
	this.container=null;
	this.apply_callback=null;
	this.decline_callback=null;
	//this.default_message=typeof LANG!='undefined' && LANG['r_u_sure'] ? LANG['r_u_sure'] : 'Are you sure?';
	this.init=function(){
		this.createConfirmContainer();
		this.addListeners();
	}
	this.createConfirmContainer=function(){
		if(document.body.querySelector('#confirm_container')) return;
		var div=document.createElement('div');
		div.id='confirm_container';
		div.innerHTML='<div class="holder">\
		<div class="title"></div>\
		<div class="text"></div>\
		<div class="submit_group"><a class="btn green apply">'+LANG['yes']+'</a><a class="btn grey decline">'+LANG['no']+'</a></div>\
		</div>';
		div.addEventListener('click',(function(c){ return function(){
			c.close();
		}})(this));
		div.querySelector('.holder').addEventListener('click',(function(c){ return function(ev){
			ev.stopPropagation();
		}})(this));
		document.body.appendChild(div);
		this.container=div;
	}
	this.addListeners=function(){
		if(!this.container) return;
		var btns=this.container.querySelectorAll('.apply');
		for(var i=0;i<btns.length;++i){
			btns[i].addEventListener('click',(function(c){ return function(){
				c.apply();
			}})(this));
		}
		var btns=this.container.querySelectorAll('.decline');
		for(var i=0;i<btns.length;++i){
			btns[i].addEventListener('click',(function(c){ return function(){
				c.decline();
			}})(this));
		}
	}
	this.confirm=function(t,m,acb,dcb){
		if(!m){
			this.container.querySelector('.text').addClass('hidden');
		}else{
			this.container.querySelector('.text').removeClass('hidden');
			this.container.querySelector('.text').innerHTML=m;
		}
		if(!t){
			this.container.querySelector('.title').addClass('hidden');
		}else{
			this.container.querySelector('.title').removeClass('hidden');
			this.container.querySelector('.title').innerHTML=t;
		}
		this.container.addClass('active');
		this.apply_callback=acb;
		this.decline_callback=dcb;
	}
	this.close=function(){
		this.container.removeClass('active');
		this.apply_callback=null;
		this.decline_callback=null;
	}
	this.apply=function(){
		if(typeof this.apply_callback==='function'){
			this.apply_callback.call();
		}
		this.close();
	}
	this.decline=function(){
		if(typeof this.decline_callback==='function'){
			this.decline_callback.call();
		}
		this.close();
	}
}
function customConfirm(title,mess,ycallback,ncallback){
	if(typeof custom_confirm=='undefined'){
		custom_confirm=new Confirm();
		custom_confirm.init();
	}
	custom_confirm.confirm(title,mess,ycallback,ncallback);
}
function Alert(){
	this.container=null;
	this.callback=null;
	this.init=function(){
		this.createContainer();
		this.addListeners();
	}
	this.createContainer=function(){
		if(document.body.querySelector('#alert_container')) return;
		var div=document.createElement('div');
		div.id='alert_container';
		div.innerHTML='<div class="holder">\
		<div class="title"></div>\
		<div class="text"></div>\
		<div class="submit_group"><a class="btn green apply">'+LANG['ok']+'</a></div>\
		</div>';
		div.addEventListener('click',(function(c){ return function(){
			c.close();
		}})(this));
		div.querySelector('.holder').addEventListener('click',(function(c){ return function(ev){
			ev.stopPropagation();
		}})(this));
		document.body.appendChild(div);
		this.container=div;
	}
	this.addListeners=function(){
		if(!this.container) return;
		var btns=this.container.querySelectorAll('.apply');
		for(var i=0;i<btns.length;++i){
			btns[i].addEventListener('click',(function(c){ return function(){
				c.apply();
			}})(this));
		}
	}
	this.alert=function(t,m,cb){
		if(!m){
			this.container.querySelector('.text').addClass('hidden');
		}else{
			this.container.querySelector('.text').removeClass('hidden');
			this.container.querySelector('.text').innerHTML=m;
		}
		if(!t){
			this.container.querySelector('.title').addClass('hidden');
		}else{
			this.container.querySelector('.title').removeClass('hidden');
			this.container.querySelector('.title').innerHTML=t;
		}
		this.container.addClass('active');
		this.callback=cb;
	}
	this.close=function(){
		this.container.removeClass('active');
		this.callback=null;
	}
	this.apply=function(){
		if(typeof this.callback==='function'){
			this.callback.call();
		}
		this.close();
	}
}
function customAlert(title,mess,callback){
	if(typeof custom_alert=='undefined'){
		custom_alert=new Alert();
		custom_alert.init();
	}
	custom_alert.alert(title,mess,callback);
}
function initTwoColumnsScroller(id,id1,id2,c,one_line){
	var cont=e(id);
	var sl1=e(id1);
	var sl2=e(id2);
	if(!cont || !sl1 || !sl2){
		return false;
	}
	if(typeof one_line=='undefined'){
		one_line=true;
	}
	if(one_line){
		var ol=document.createElement('div');
		ol.className='scroller_line one_line';
		ol.innerHTML=sl1.innerHTML;
		var its=ol.querySelector('.slides');
		if(its){
			var sits=sl2.querySelectorAll('.slides .item');
			for(var i=0;i<sits.length;++i){
				its.appendChild(sits[i].cloneNode(true));
			}
			cont.querySelector('.wrapper').appendChild(ol);
			var slider_inline=new kit_slider({
				'container': ol,
				'in_row' : c,
				//'offset' : '27px',
				'metrics' : 'px',
				'mobile' : [[1000,parseInt(c/(c/3))],[800,parseInt(c/(c/2))],[600,parseInt(c/(c/1.5))]],
			});
			swipe(ol,(function (obj){ return function(p){ obj.swipe(p);}})(slider_inline),100);
		}
	}
	var la=cont.querySelector('.arrow_left');
	var ra=cont.querySelector('.arrow_right');
	var slider_1=new kit_slider({
		'container': sl1,
		'in_row' : c,
		//'offset' : '27px',
		'metrics' : 'px',
		'mobile' : [[1000,parseInt(c/(c/3))],[800,parseInt(c/(c/2))],[600,parseInt(c/(c/1.5))]],
	});
	swipe(sl1,(function (obj){ return function(p){ obj.swipe(p);}})(slider_1),100);
	var slider_2=new kit_slider({
		'container': sl2,
		'in_row' : c,
		//'offset' : '27px',
		'metrics' : 'px',
		'mobile' : [[1000,parseInt(c/(c/3))],[800,parseInt(c/(c/2))],[600,parseInt(c/(c/1.5))]],
	});
	swipe(sl2,(function (obj){ return function(p){ obj.swipe(p);}})(slider_2),100);
	if(la){
		la.addEventListener('click',(function(s1,s2,si){ return function(){
			s1.slide(-1);
			s2.slide(-1);
			if(si){
				si.slide(-1);
			}
		}})(slider_1,slider_2,slider_inline));
	}
	if(ra){
		ra.addEventListener('click',(function(s1,s2,si){ return function(){
			s1.slide(1);
			s2.slide(1);
			if(si){
				si.slide(1);
			}
		}})(slider_1,slider_2,slider_inline));
	}
	window.addEventListener('load',(function(la,ra,s1,s2){ return function(){
		if(s1.pages==1 && s2.pages==1){
			if(la){
				addClass(la,'empty_class');
			}
			if(ra){
				addClass(ra,'empty_class');
			}
		}
	}})(la,ra,slider_1,slider_2));
	window.addEventListener('resize',(function(la,ra,s1,s2,si){ return function(){
		if(s1.pages==1 && s2.pages==1){
			if(la){
				addClass(la,'empty_class');
			}
			if(ra){
				addClass(ra,'empty_class');
			}
		}else{
			if(la){
				removeClass(la,'empty_class');
			}
			if(ra){
				removeClass(ra,'empty_class');
			}
		}
	}})(la,ra,slider_1,slider_2,slider_inline));
}
function initKitGallery() {
	if (typeof kitGallery==="undefined") return false;
	var gals=document.querySelectorAll('.kg_here');
	for (var i=0;i<gals.length;i++) {
		var kg=new kitGallery({
			"target":gals[i],
			"fullscreenPreviewsInRow":[[0,2],[500,4],[700,5],[800,7],[1000,10]],
			"fullscreenThumbsWidth":1600,
			"drawInline":false,
			'uniqId' : 'kg_' + i.toString(),
		});
	}
}
function hasSVGClass(elem,cl){
	if(elem==null || !elem.className=='' || !elem.className.baseVal || elem.className.baseVal=='' || cl==null || cl.trim()=='') return false;
	var classes=elem.className ? elem.className.split(' ') : [];
	var res=false;
	for(var i=0;i<classes.length;++i) if(classes[i]==cl){ res=true; break; }
	return res;
}
function addSVGClass(elem,cl){
	if(!hasSVGClass(elem,cl)) elem.className.baseVal=elem.className.baseVal+' '+cl;
}
function removeSVGClass(elem,cl){
	if(elem==null || elem.className==null || elem.className.baseVal==null) return false;
	var classes=elem.className.baseVal==null ? [] : elem.className.baseVal.split(' ');
	var new_classes=[];
	for (var i=0;i<classes.length;i++) if (classes[i]!='' && classes[i]!=cl) new_classes.push(classes[i]);
	elem.className.baseVal=new_classes.join(' ');
}
function switchSVGClass(elem,cl){
	if(hasSVGClass(elem,cl)) addSVGClass(elem,cl);
	else removeSVGClass(elem,cl);
}
function initSchemes(){
	var els=document.body.querySelectorAll('.main_image svg');
	if(!els || !els.length){
		return;
	}
	for(var i=0;i<els.length;++i){
		var ps=els[i].querySelectorAll('path');
		var cont=els[i].closest('.main_image');
		if(cont.querySelector('.back a:not(.initialized)')){
			cont.querySelector('.back a').addEventListener('click',setMainPreview);
			addClass(cont.querySelector('.back a'),'initialized');
		}
		for(var j=0;j<ps.length;++j){
			ps[j].addEventListener('touchstart',displaySchemeInfo);
			ps[j].addEventListener('mouseenter',displaySchemeInfo);
			ps[j].addEventListener('mouseleave',hideSchemeInfo);
			ps[j].addEventListener('click',schemeClicked);
		}
	}
}
scheme_current_el=null;
function createInfoHolder(cont){
	if(cont==null){
		return false;
	}
	if(cont.querySelector('.hint')==null){
		var div=document.createElement('div');
		div.className='hint';
		div.innerHTML='<div class="close" onclick="switchClass(this.parentNode,\'active\');"></div><div class="body"></div>';
		cont.appendChild(div);
	}else{
		div=cont.querySelector('.hint');
	}
	div.addEventListener('mouseleave',function(ev){
		removeSVGClass(cont.querySelector('svg path.active'),'active');
		removeClass(this,'active');
	});
	return true;
}
function displaySchemeInfo(){
	if(!this || !this.id){
		return false;
	}
	scheme_current_el=this;
	var cont=this.closest('.main_image');
	if(!createInfoHolder(cont)){
		return false;
	}
	if(typeof infobars=='undefined'){
		infobars={};
	}
	var id_obj=cont.querySelector('svg').dataset.id_object;
	var obj_type=cont.querySelector('svg').dataset.object_type;
	var sign=this.id.toString()+id_obj+obj_type.toString();
	if(typeof infobars[sign]=='undefined'){
		(function(el,id_obj,sign){
			KITS.sendAjaxRequest({'ajax':2,'load_scheme_infobar':el.id,'id_object':id_obj,'object_type':obj_type},function(){},function(res){
				try{
					r=JSON.parse(res);
					res=r;
				}catch(ex){}
				infobars[sign]=res;
				showInfobar(el,infobars[sign]);
			});
		})(this,id_obj,sign);
	}else{
		showInfobar(this,infobars[sign]);
	}
}
function showInfobar(el,data){
	if(!el || !data || window.innerWidth<800 || scheme_current_el!=el){
		return;
	}
	var html='';
	if(typeof data=='object'){
		html=data.html;
	}else{
		html=data;
	}
	if(html==''){
		return;
	}
	var cont=el.closest('.main_image');
	var cont_y=getPosition(cont);
	var cont_x=getPosition(cont,'x');
	var pos=getCoords(el);
	var hint=cont.querySelector('.hint');
	hint.style.top='-99999px';
	hint.querySelector('.body').innerHTML=html;
	var els=cont.querySelectorAll('path');
	for(var i=0;i<els.length;++i){
		removeSVGClass(els[i],'active');
	}
	addSVGClass(el,'active');
	removeClass(hint,'small');
	addClass(hint,'active');
	if(data.class){
		addClass(hint,data.class);
	}
	calculateHintPosition(hint,pos.top,pos.left,cont_y,cont_x,el.getBoundingClientRect().width,el.getBoundingClientRect().height,0);
}
function calculateHintPosition(hint,t,l,cpy,cpx,w,h,tri){
	if(hint==null){
		return 0;
	}
	if(!isNum(t) || !isNum(l) ||!isNum(cpy) || !isNum(cpx) || !isNum(tri)){
		return 0;
	}
	var otypes={
		'default':'to_top',
		'bottom':'to_bottom',
		'right':'to_right',
		'left':'to_left',
	};
	var otypes2={
		'default':'up',
		'bot':'bot',
	};
	for(var key in otypes) if(otypes.hasOwnProperty(key)){
		removeClass(hint,otypes[key]);
	}
	var otype=typeof type!=='undefined' &&  otypes[type] ? otypes[type] : otypes['default'];
	var otype2=typeof type2!=='undefined' && otypes2[type2] ? otypes2[type2] : otypes2['default'];
	if(h>=(hint.clientHeight*1.5)){
		h=h/2;
	}
	if(otype=='to_bottom'){
		hint.style.top=((t-cpy)+(hint.clientHeight-tri)).toString()+'px';
		hint.style.left=((l-cpx)+(w/2)).toString()+'px';
	}else if(otype=='to_right'){
		if(otype2=='up'){
			hint.style.top=((t-cpy)+(h-hint.clientHeight)).toString()+'px';
		}else if(otype2=='bot'){
			hint.style.top=(t-cpy).toString()+'px';
		}
		hint.style.left=((l-cpx)+(w+tri/2)).toString()+'px';
	}else if(otype=='to_left'){
		if(otype2=='up'){
			hint.style.top=((t-cpy)+(h-hint.clientHeight)).toString()+'px';
		}else if(otype2=='bot'){
			hint.style.top=(t-cpy).toString()+'px';
		}
		hint.style.left=((l-cpx)-(hint.clientWidth+tri)).toString()+'px';
	}else{
		hint.style.top=((t-cpy)-(hint.clientHeight)+tri).toString()+'px';
		hint.style.left=((l-cpx)+(w/2)).toString()+'px';
	}
	addClass(hint,otype);
}
function hideSchemeInfo(ev){
	if(typeof ev=='undefined' || !ev.relatedTarget || typeof ev.relatedTarget.className!=='string' || !hasClass(ev.relatedTarget,'hint')){
		var cont=this.closest('.main_image');
		removeSVGClass(this,'active');
		var hint=cont.querySelector('.hint');
		removeClass(hint,'active');
		hint.querySelector('.body').innerHTML='';
		scheme_current_el=null;
	}
}
function hideCurrentSchemeInfo(cont){
	if(!cont){
		return;
	}
	var p=cont.querySelector('path.active');
	if(p){
		removeSVGClass(p,'active');
	}
	var hint=cont.querySelector('.hint');
	removeClass(hint,'active');
	hint.querySelector('.body').innerHTML='';
}
function schemeClicked(){
	if(!this || !this.id){
		return false;
	}
	var cont=this.closest('.main_image');
	if(typeof schemes=='undefined'){
		schemes={};
	}
	var id_obj=cont.querySelector('svg').dataset.id_object;
	var obj_type=cont.querySelector('svg').dataset.object_type;
	var sign=this.id.toString()+id_obj+obj_type.toString();
	if(typeof schemes[sign]=='undefined'){
		(function(el,id_obj,sign){
			KITS.sendAjaxRequest({'ajax':2,'load_scheme':el.id,'id_object':id_obj,'object_type':obj_type},function(){},function(res){
				try{
					res=JSON.parse(res);
					schemes[sign]=res;
				}catch(ex){
					schemes[sign]={};
				}
				schemeAction(el,schemes[sign]);
			});
		})(this,id_obj,sign);
	}else{
		schemeAction(this,schemes[sign]);
	}
}
scheme_action_done=true;
function schemeLoading(el){
	scheme_action_done=false;
	var els=el.closest('svg').querySelectorAll('path');
	for(var i=0;i<els.length;++i){
		addSVGClass(els[i],'disabled');
	}
}
function schemeLoaded(el,enable){
	if(typeof enable=='undefined'){
		enable=true;
	}
	if(!scheme_image_loaded){
		return;
	}
	scheme_action_done=true;
	var els=el.closest('svg').querySelectorAll('path');
	if(enable){
		for(var i=0;i<els.length;++i){
			removeSVGClass(els[i],'disabled');
		}
	}
}
function schemeAction(el,s){
	if(!el || !s){
		return;
	}
	if(!scheme_action_done){
		return;
	}
	schemeLoading(el);
	var enable=true;
	if(s.html){
		changeObjectPreview(el,s.html);
	}else if(s.link){
		window.location.href=s.link;
		enable=false;
	}
	schemeLoaded(el,enable);
}
scheme_image_loaded=true;
function changeObjectPreview(el,html){
	var cont=el.closest('.main_image');
	if(!el || !html || !cont){
		return false;
	}
	hideCurrentSchemeInfo(cont);
	var buf=document.createElement('div');
	buf.innerHTML=html;
	var img=new Image();
	schemeLoading(el);
	scheme_image_loaded=false;
	img.addEventListener('load',(function(c,html){ return function(){
		if(typeof project_main_scheme=='undefined'){
			project_main_scheme=c.querySelector('.image').innerHTML;
		}
		c.querySelector('.image').innerHTML=html;
		addClass(c.querySelector('.back'),'active');
		initSchemes();
		scheme_image_loaded=true;
		schemeLoaded(el);
	}})(cont,html));
	img.src=buf.querySelector('svg image').getAttribute('xlink:href');
}
function setMainPreview(){
	if(!this){
		return;
	}
	var cont=this.closest('.main_image');
	removeClass(this.closest('.back'),'active');
	cont.querySelector('.image').innerHTML=project_main_scheme;
	initSchemes();
	schemeLoaded(cont.querySelector('svg'));
}
function pagenavigation(el,page,key){
	var li=getParentTag(el,'li');
	if(hasClass(li,'current')){
		return;
	}
	var pagenav=getParentClass(el,'pagination');
	if(!pagenav){
		return false;
	}
	if(pagenav.querySelector('.current')){
		var curr_li=pagenav.querySelector('.current');
		//curr_li.className='';
		removeClass(curr_li,'current');
	}
	var curr=parseInt(pagenav.dataset.page);
	if(curr==page){
		return false;
	}
	var max=parseInt(pagenav.dataset.max);
	if(page=='next'){
		page=curr+1;
	}else if(page=='prev'){
		page=curr-1;
	}
	if(page<=0 || page>max){
		return false;
	}
	pagenav.dataset.page=page;
	addClass(li,'current');
	setAjaxLoader(el);
	KITS.sendAjaxRequest({'ajax':2,'ajax_page':page,'key':key},function(){},function(res){
		try{
			res=JSON.parse(res);
		}catch(ex){
			res={type:'error'};
		}
		if(res.type=='success'){
			if(!res.key){
				res.key=key;
			}
			let cev=new CustomEvent('ajax_pagenav_done', {'detail':res});
			window.dispatchEvent(cev);
		}
	});
}
function ajaxPageNav(ev){
	if(!ev || !ev.detail || !ev.detail.key){
		return false;
	}
	if(ev.detail.key=='complex_flats'){
		if(ev.detail.html){
			redrawComplexFlatsList(ev.detail.html);
		}
	}else if(ev.detail.key=='complex_layouts'){
		if(ev.detail.html){
			redrawComplexLayoutsList(ev.detail.html);
		}
	}else if(ev.detail.key=='complex_agents_flats'){
		if(ev.detail.html){
			redrawComplexAgentsFlatsList(ev.detail.html);
		}
	}else if(ev.detail.key=='layouts_flats'){
		if(ev.detail.html){
			redrawLayoutFlatsList(ev.detail.html);
		}
	}else if(ev.detail.key=='reviews_list'){
		if(ev.detail.html){
			redrawReviewsList(ev.detail.html);
		}
	}else if(ev.detail.key=='hotoffers_list'){
		if(ev.detail.html){
			redrawHotOffersList(ev.detail.html);
		}
	}

}
function redrawComplexFlatsList(html){
	var cont=e('complex_flats_list');
	if(!cont || !html){
		return false;
	}
	setAjaxLoader(cont);
	cont.innerHTML=html;
	setAjaxLoader(cont,false);
}
function redrawComplexAgentsFlatsList(html){
	var cont=e('complex_agents_flats');
	if(!cont || !html){
		return false;
	}
	setAjaxLoader(cont);
	cont.innerHTML=html;
	setAjaxLoader(cont,false);
}
function redrawComplexLayoutsList(html){
	var cont=e('complex_layouts_list');
	if(!cont || !html){
		return false;
	}
	setAjaxLoader(cont);
	cont.innerHTML=html;
	setAjaxLoader(cont,false);
}
function redrawLayoutFlatsList(html){
	var cont=e('layout_flats_list');
	if(!cont || !html){
		return false;
	}
	setAjaxLoader(cont);
	cont.innerHTML=html;
	setAjaxLoader(cont,false);
}
function initTabs(){
	var els=document.querySelectorAll('.tabs.styled');
	for(var i=0;i<els.length;++i){
		initializeTabs(els[i],els[i].dataset.active_tab);
	}
}
function setAjaxLoader(el,enable){
	if(typeof enable=='undefined'){
		enable=true;
	}
	var cont=getParentClass(el,'ajax_container');
	if(!cont){
		return false;
	}
	if(enable){
		addClass(cont,'active');
	}else{
		removeClass(cont,'active');
	}
}
function ajaxFlatsSearch(el){
	var f=getParentTag(el,'form');
	var cont=e('complex_flats_list');
	setAjaxLoader(el);
	if(!f || !cont){
		return false;
	}
	if(!f['self_flats_changed']){
		var inp=document.createElement('input');
		inp.type='hidden';
		inp.name='self_flats_changed';
		inp.value=1;
		f.appendChild(inp);
	}
	KITS.sendAjaxRequest(formToAjaxObject(f),function(){},function(res){
		try{
			res=JSON.parse(res);
		}catch(ex){
			res={type:'error'};
		}
		setAjaxLoader(el,false);
		if(res.type=='success' && res.html){
			redrawComplexFlatsList(res.html);
		}
	});
}
function ajaxLayoutsSearch(el){
	var f=getParentTag(el,'form');
	var cont=e('complex_layouts_list');
	setAjaxLoader(el);
	if(!f || !cont){
		return false;
	}
	if(!f['layouts_changed']){
		var inp=document.createElement('input');
		inp.type='hidden';
		inp.name='layouts_changed';
		inp.value=1;
		f.appendChild(inp);
	}
	KITS.sendAjaxRequest(formToAjaxObject(f),function(){},function(res){
		try{
			res=JSON.parse(res);
		}catch(ex){
			res={type:'error'};
		}
		setAjaxLoader(el,false);
		if(res.type=='success' && res.html){
			redrawComplexLayoutsList(res.html);
		}
	});
}
function ajaxObjectsSort(ev){
	if(!ev || !ev.detail || !ev.detail.key){
		return false;
	}
	if(ev.detail.key=='complex_self_flats_sort'){
		if(ev.detail.html){
			redrawComplexFlatsList(ev.detail.html);
		}
	}else if(ev.detail.key=='complex_agents_flats_sort'){
		if(ev.detail.html){
			redrawComplexAgentsFlatsList(ev.detail.html);
		}
	}else if(ev.detail.key=='complex_layouts_sort'){
		if(ev.detail.html){
			redrawComplexLayoutsList(ev.detail.html);
		}
	}else if(ev.detail.key=='layouts_flats_sort'){
		if(ev.detail.html){
			redrawLayoutFlatsList(ev.detail.html);
		}
	}
}
window.addEventListener('ajax_pagenav_done',ajaxPageNav);
window.addEventListener('objects_sort_changed',ajaxObjectsSort);
function switchGallery(el,c){
	if(!el || hasClass(el,'active')){
		return;
	}
	var anti=c=='D2' ? 'D3' : 'D2';
	var cont=getParentClass(el,'switcher');
	var img=getParentClass(el,'main_image');
	if(!img || !cont){
		return;
	}
	var act=cont.querySelector('.active');
	if(act){
		removeClass(act,'active');
	}
	removeClass(img,anti);
	addClass(img,c);
	addClass(el,'active');
}
function floorChanged(el){
	if(!el){
		return;
	}

	KITS.sendAjaxRequest({floor_changed:el.value},function(){},function(res){
		try{
			res=JSON.parse(res);
		}catch(ex){
			res={type:'error'};
		}
		if(res.type=='success' && res.link){
			window.location.href=res.link;
		}
	});
}
function ajaxLayoutFlatsSearch(el){
	var f=getParentTag(el,'form');
	var cont=e('layout_flats_list');
	setAjaxLoader(el);
	if(!f || !cont){
		return false;
	}
	if(!f['layout_flats_changed']){
		var inp=document.createElement('input');
		inp.type='hidden';
		inp.name='layout_flats_changed';
		inp.value=1;
		f.appendChild(inp);
	}
	KITS.sendAjaxRequest(formToAjaxObject(f),function(){},function(res){
		try{
			res=JSON.parse(res);
		}catch(ex){
			res={type:'error'};
		}
		setAjaxLoader(el,false);
		if(res.type=='success' && res.html){
			redrawLayoutFlatsList(res.html);
		}
	});
}
function initAgenciesMap(){
	var cont=e('agencies_map');
	if(!cont){
		return false;
	}
	var ids=cont.dataset.agencies;
	if(!ids){
		return false;
	}
	KITS.sendAjaxRequest({get_agencies_map : ids},function(){},(function(el){ return function(res){
		try{
			res=JSON.parse(res);
		}catch(ex){
			res={type:'error'};
		}
		if(res.type=='success' && res.ymap!=''){
			cont.innerHTML=res.ymap;
			ymaps.ready((function(res){ return function(){
				var ind=initYMAP({
					container : res.cont,
					objects : res.objects,
					tri_height : 18,
					center : res.center,
					fit_height : false,
				});
				if(YMAPS_ITEMS[ind].error==''){
					YMAPS_ITEMS[ind].draw();
				}
			}})(res));
		}else{
			cont.style.display='none';
		}
	}})(cont));
}
function initAgenciesMap_GOOGLE(){
	var cont=e('agencies_map');
	if(!cont){
		return false;
	}
	var ids=cont.dataset.agencies;
	if(!ids){
		return false;
	}
	KITS.sendAjaxRequest({get_agencies_map : ids},function(){},(function(el){ return function(res){
		try{
			res=JSON.parse(res);
		}catch(ex){
			res={type:'error'};
		}
		if(res.type=='success'){
			initObjectsMap(res.objects,cont.querySelector('.map'));
		}else{
			cont.style.display='none';
		}
	}})(cont));
}
function complaintAgency(id,ph){
	document.forms['complaint_form']['send_complaint'].value=id;
	if(typeof ph!='undefined'){
		document.forms['complaint_form']['message'].setAttribute('placeholder',ph);
	}
	showPopup('complaint_form');
}
function leaveReview(st,id){
	let f=document.forms['reviews_form'];
	if(!f){
		return;
	}
	if(isNum(id)){
		f.review_about.value=id;
	}
	if(typeof st!=='undefined' && st!=''){
		e('reviews_form').querySelector('.subtitle').innerHTML=st;
	}
	showPopup('reviews_form');
}
function showAllReviews(el){
	if(!el){
		return false;
	}
	var par=getParentClass(el,'reviews_list');
	var new_text=el.dataset.text;
	el.dataset.text=el.innerHTML;
	el.innerHTML=new_text;
	switchClass(par,'show_all');
}
function redrawReviewsList(html){
	var cont=e('reviews_list');
	if(!cont || !html){
		return false;
	}
	setAjaxLoader(cont);
	cont.querySelector('.items').innerHTML=html;
	var items=cont.querySelectorAll('.items .review');
	var more_link=cont.querySelector('.more_link');
	if(items.length<2){
		Hide(more_link);
	}else{
		Show(more_link);
	}
	setAjaxLoader(cont,false);
}

function redrawHotOffersList(html){
	var cont=e('hotoffers_list');
	if(!cont || !html){
		return false;
	}
	setAjaxLoader(cont);
	cont.querySelector('#items_list').innerHTML=html;
	setAjaxLoader(cont,false);
	let y=getPosition(cont,'y');
	let header_height=document.querySelector('.sticky_menu').clientHeight;
	window.scrollTo(0,y-header_height-5);
}
function setYaClientId(){
	var ya_client_id = '';
	var intervalYaClientId = setInterval(function(){
		try {
			if (typeof goals!=='undefined' && typeof window['jivo_api'] !== "undefined" ) {
				ya_client_id=goals.getClientIDYA();
				if (ya_client_id) {
					if (window['jivo_api']) {
						window['jivo_api'].setUserToken(ya_client_id);
					}
					clearInterval(intervalYaClientId);
				}
			}
		} catch(err) {
		}
	}, 1000);
}
function processQueuedImages(images) {
	if(typeof images=='undefined' || !images.length) {
		return;
	}
	for(var i = 0; i < images.length; ++i) {
		var imgs = document.body.querySelectorAll('img[src="'+images[i][1]+'"]');
		var bgs = document.body.querySelectorAll('*[style*="background-image"]');
		var backgrounds = [];
		for(var j = 0; j < bgs.length; ++j) {
			var src=bgs[j].style.backgroundImage.replace('url(','');
			src=src.replace(')','');
			if(src[0]=='"') {
				src=src.substring(1);
			}
			if(src[src.length-1]=='"') {
				src=src.substring(0,src.length-1);
			}
			if(src == images[i][1]) {
				backgrounds.push(bgs[j]);
			}
		}
		if(imgs.length || backgrounds.length) {
			loadQueuedImage(images[i][0], images[i][2], imgs, backgrounds, images[i][1]);
		}
	}
}
function loadQueuedImage(img, size, images, bgs, full_url) {
	KITS.sendAjaxRequest({ load_queued_image : img, size : size }, function() {
		for(var i = 0; i < images.length; ++i) {
			images[i].src = full_url;
		}
		for(var i = 0; i < bgs.length; ++i) {
			bgs[i].style.backgroundImage = "url('"+full_url+"')";
		}
	}, function(err) {

	});
}
/*function filterPhoneInput(ev) {
	let available=[8, 9, 13, 16, 27, 32, 48, 57, 189];
	let s = String.fromCharCode(ev.keyCode);
	if(!isNum(s) && available.indexOf(ev.keyCode)==-1){
		ev.preventDefault();
	}
}*/
function filterPhoneInput() {
	let pattern = /[^0-9\-\(\)\+\s]/ig;
	this.value = this.value.replace(pattern, '');
}

function initPhoneInputs() {
	if(typeof intlTelInput == 'undefined') {
		return;	
	}
	let els = document.querySelectorAll('input[phonecodes]');
	let countries_map = {
		'en' : 'us',
	};
	let country = typeof countries_map[LANG_CODE] !== 'undefined' ? countries_map[LANG_CODE] : LANG_CODE;
	for(let i = 0; i < els.length; ++i) {
		intlTelInput(els[i], {
			utilsScript: "/vendor/phoneinput/js/utils.js",
			autoInsertDialCode : true,
			nationalMode : true,
			initialCountry : country,
			preferredCountries : ['ru','tr','us','gb'],
			separateDialCode : true,
		});
	}
}

(function(W) {
	function Human_Detector() {
		this.isHuman = function(){
			let is_human = false;
			is_human = !this.isBotByUA();
			return is_human;
		};

		this.isBotByUA = function(useragent) {
			if (useragent == null) {
				useragent = typeof navigator != 'undefined' ?  navigator.userAgent : '';
			}
			if (useragent=='') {
				return true;
			}
			let botsigns = ['bot', 'crawl', 'spider'/*, 'Chrome'*/];
			let re = new RegExp(botsigns.join('|'),'i');
			return re.test(useragent);
		}
	}
	W.HD = new Human_Detector();
})(window);

function anchorScroll() {
	// Проверяем якорь из url при загрузке страницы
	if (location.hash) {
		var target = document.querySelector('*[id="' + location.hash.slice(1) + '"]');
		if (target) {
			window.scrollTo({
				top: getOffsetTop(target) - getMenuHeight(),
				behavior: 'smooth'
			});
		}
	}

	// Добавляем слушатели кликов ко всем ссылкам с якорями
	var anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(function(link) {
		link.addEventListener('click', function(event) {
			event.preventDefault();
			// Получаем целевой элемент, к которому ведет ссылка-якорь
			var target = document.querySelector('*[id="' + this.getAttribute('href').slice(1) + '"]');
			if (target) {
				// Прокручиваем страницу к целевому элементу с учетом высоты закрепленной шапки
				window.scrollTo({
					top: getOffsetTop(target) - getMenuHeight(),
					behavior: 'smooth'
				});
			}
		});
	});
}

function getMenuHeight() {
	var stickyMenu = document.querySelector('.sticky_menu');
	var stickyMenuHeight = stickyMenu.offsetHeight;
	if (stickyMenu.classList.contains('hidden')) {
		stickyMenu.classList.remove('hidden');
		stickyMenuHeight = stickyMenu.offsetHeight;
		stickyMenu.classList.add('hidden');
	}
	return stickyMenuHeight;
}

function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}

function initGenerateDocsPrepare() {
    let links = document.querySelectorAll('.js-prepare-gen-doc');

    for (let link of links) {
        link.querySelector('.ldr').insertAdjacentHTML(
            'afterBegin',
            '<svg aria-hidden="true" data-prefix="fas" data-icon="spinner" class="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>'
        );

        link.addEventListener('click', function (event) {
            setTimeout(function () {
                let id = event.target.getAttribute('data-prepare');
                let dataForToken = {
                    action: 'generate',
                    object_id: id
                };
                let preTokenSecret = tokens.getPreTokenSecret(dataForToken);

                if (preTokenSecret) {
                    saveCookie('scrttkn', preTokenSecret);

                    let postData = new FormData();
                    postData.append('generate_token', '1');
                    postData.append('generate_token_data', 'action:generate;object_id:' + id);

                    let request = new XMLHttpRequest();

                    request.onload = function () {
                        let token = request.response;

                        saveCookie('scrttkn', token);
                        document.querySelectorAll('.js-prepare-gen-doc .list').forEach(function (list) {
                            if (list.parentElement.dataset.prepare == id) {
                                list.classList.remove('prepare-show-loader');
                            } else {
                                list.classList.add('prepare-show-loader');
                            }
                        });
                    }

                    request.open('POST', '/');
                    request.send(postData);
                }
            }, 200);
        });
    }
}

function initOpenListEvents() {
    document.addEventListener('click', function (event) {
        let listLink = event.target.closest(".js-list-for-show");
        let listLanguagesLink = event.target.closest(".js-list-languages-for-show");
        if (listLink) {
            closeAllLists(listLink);
            openList(listLink);
        } else if (listLanguagesLink) {
            closeAllLists(listLanguagesLink);
            openLanguageList(listLanguagesLink);
        } else {
            closeAllLists();
        }
    })
}

function closeAllLists(listForOpen) {
    document.querySelectorAll('.js-list-for-show, .js-list-languages-for-show').forEach(function (el) {
        if (el === listForOpen) {
            return;
        }
        el.classList.remove('open');
        let list = el.querySelector('.list');
        list.style.display = 'none';
        list.classList.add('prepare-show-loader');
    });
}

function loadRecaptchaScript() {
	KITS.sendAjaxRequest({'get_recaptcha_script':1},function(){},function(res){
		if(res) {
			let sc = document.createElement('script');
			sc.src = res;
			document.body.appendChild(sc);
		}
	});
}

function loadRecaptchaScript() {
    KITS.sendAjaxRequest({ 'get_recaptcha_script': 1 }, function () { }, function (res) {
        if (res) {
            let sc = document.createElement('script');
            sc.src = res;
            document.body.appendChild(sc);
        }
    });
}


function mobileShortcodesReplaceInit() {
    let targets = document.querySelectorAll('.js-mobile-target');

    targets.forEach(function (target) {
        let original = document.querySelector('[data-mobile_target_id="' + target.id + '"]');
        if (!original) {
            return;
        }
        let neworiginal = original.cloneNode(true);
        neworiginal.classList.add('mobile_version');
        target.after(neworiginal);

        target.remove();
    });

    let checkedElements = document.querySelectorAll('[data-mobile_target_id');

    recalcMobilereplaceElements(checkedElements);
    addEventListener('resize', function () {
        recalcMobilereplaceElements(checkedElements);
    });
}

function recalcMobilereplaceElements(checkedElements) {
    checkedElements.forEach(function (elem) {
        let elemResolution = parseInt(elem.dataset.resolution);
        if (elemResolution > 0) {
            if (window.innerWidth > elemResolution) {
                if (elem.classList.contains('mobile_version')) {
                    elem.classList.add('hidden');
                } else {
                    elem.classList.remove('hidden');
                }
            } else {
                if (elem.classList.contains('mobile_version')) {
                    elem.classList.remove('hidden');
                } else {
                    elem.classList.add('hidden');
                }
            }
        }
    });
}

/* ----------------------------  ONLOAD  ------------------------------------- */
window.addEventListener('DOMContentLoaded',function(){
	var kit=new KIT({init:true});
	setCookieWarning();
	setMobileMenu();
	setStickyMenu();
	setObjectsListThumbSlider();
	initProjectDetailPage();
	initializePasswordFields();
	initializeCompareTable();
	initHiddenText();
	initProjectsSearch();
	initMobileSearch();
	initCrosslinkBlocks();
	initKitGallery();
	initSchemes();
	initTabs();
	initAgenciesMap();
	if(typeof loadYaMapWithScroll == 'function') {
		loadYaMapWithScroll();
	}
	initPhoneInputs();
	initGenerateDocsPrepare();
    initOpenListEvents();
	loadRecaptchaScript();
	mobileShortcodesReplaceInit();
});
window.addEventListener('load',function(){
    initUiClosers();
	setTimeout(function() {
		anchorScroll();
	}, 300);
	});
window.jivo_onLoadCallback = function () {
	setYaClientId();
};
function kit_slider(args){
	if(!args) args={};
	if(typeof KIT==='function') KIT.call(this);
	this.container=args['container'];
	this.holder=null;
	this.items=[];
	this.bullets=null;
	this.metrics=args['metrics']=='px' ? 'px' : '%';
	this.infinity=args['infinity']===false ? false : true;
	this.after_init_class=args['after_init_class'] || 'initialized';
	this.active_class=args['active_class'] || 'active';
	this.disabled_class=args['disabled_class'] || 'disabled';
	this.empty_class=args['empty_class'] || 'empty_class';
	this.arrow_left=args['arrow_left'] || '.left_arrow';
	this.arrow_right=args['arrow_right'] || '.right_arrow';
	this.add_bullets=args['add_bullets']===true ? true : false;
	this.current=args['first'] || 1;
	this.adapt=args['adapt']===true ? true : false;
	this.is_mobile=!!('ontouchstart' in document.documentElement);
	this.desctop_drag=args['desctop_drag']===true && !this.is_mobile ? true : false;
	this.desctop_drag_cut=args['desctop_drag_cut']===true ? true : false;
	this.drag=args['drag']===false || !this.is_mobile ? false : true;
	this.drag_cut=args['drag_cut']===true ? true : false;
	this.drag_sens=args['drag_sens'] || 2;
	this.change_time=args['change_time'] || 0;
	this.mobile=args['mobile'] || [];
	this.in_row=args['in_row'] || 1;
	this.offset=args['offset']==null || this.in_row==1 ? 0 : args['offset'];
	this.timer=null;
	this.left_scroll=0;
	this.count=0;
	this.initialized=false;
	this.page=1;
	this.pages=0;
	this.bullets=[];
 	this.init=function(){
		if(typeof this.container==='string') this.container=document.body.querySelector(this.container);
		if(this.container==null) return false;
		this.holder=this.container.querySelector('.slides');
		if(this.holder==null) return false;
		this.items=this.holder.querySelectorAll('.item');
		if(this.items.length==0) return false;
		this.change_time=this.change_time>100 ? this.change_time : this.change_time*1000;
		this.count=this.items.length;
		if(!this.isNum(this.in_row) || this.in_row>this.count) this.in_row=1;

		if(typeof this.arrow_left==='string') this.arrows_left=this.container.querySelectorAll(this.arrow_left);
		if(typeof this.arrow_right==='string') this.arrows_right=this.container.querySelectorAll(this.arrow_right);

		if(!this.draw()) return false;


		if(this.arrows_left.length>0) for(var i=0;i<this.arrows_left.length;++i){
			this.arrows_left[i].addEventListener('click',(function(kss){ return function(){kss.slide(-1);}})(this));
			//if(this.items.length==1) this.arrows_left[i].style.display='none';
		}
		if(this.arrows_right.length>0) for(var i=0;i<this.arrows_right.length;++i){
			this.arrows_right[i].addEventListener('click',(function(kss){ return function(){kss.slide(1);}})(this));
			//if(this.items.length==1) this.arrows_right[i].style.display='none';
		}

		if(this.drag) this.addDrag();
		this.adaptHeight();
		window.addEventListener('resize',(function(kss){ return function(){ kss.adaptHeight(); }})(this));
		if(!this.isNum(this.current) || this.current>=this.count) this.current=1;

		this.reDraw();

		this.initialized=true;
	}
	this.draw=function(){
		var in_row=this.in_row;
		for(var i=0;i<this.mobile.length;++i){
			if(Array.isArray(this.mobile[i])){ if(this.mobile[i][0]>=window.innerWidth) in_row=this.mobile[i][1]; }
			else if(this.mobile[i]>=window.innerWidth){ --in_row; }
		}
		if(in_row<=0) in_row=1;
		this.show_count=in_row;
		// need to fix
		var c_width=this.container.clientWidth;
		var pad=getComputedStyle(this.container).padding.split(' ');
		if(pad[1]){
			pad[1]=Math.round(pad[1].replace('px',''));
			c_width-=(pad[1]*2);
		}
		//
		if(this.metrics=='px') this.holder.style.width=((c_width*this.items.length)/in_row).toString()+'px';
		else this.holder.style.width=((100*this.items.length)/in_row).toString()+'%';
		var offset=0;
		if(in_row>1){
			if(this.offset){
				if(Array.isArray(this.offset)){
					for(var i=0;i<this.offset.length;++i){
						if(Array.isArray(this.offset[i])) if(this.offset[i][0]>=window.innerWidth) offset=this.offset[i][1];
					}
				}else if(this.offset) offset=this.offset;
			}
			if(offset!==0){
				if(this.metrics=='px' && offset.indexOf('%')>=0){
					offset=Math.round(offset.replace('%',''));
					offset=offset/this.count;
					offset=this.holder.clientWidth*offset/100;
				}
				offset=offset.toString();
				offset=offset.replace('%','');
				offset=offset.replace('px','');
				offset=Math.round(offset);
			}
		}
		var w=0;
		if(this.metrics=='px'){
			w=Math.ceil(c_width/in_row);
			this.holder.style.width=(w*this.count).toString()+'px';
		}
		else if(this.metrics=='%'){
			offset=offset/this.count;
			w=100/this.count;
		}
		if(offset>0){ w-=offset; }
		//if(w==0) return false;
		for(var i=0;i<this.count;++i){
			this.items[i].style.width=w.toString()+this.metrics;
			this.items[i].style.marginRight=offset.toString()+this.metrics;
			this.addClass(this.items[i],this.after_init_class);
		}
		this.pages=Math.ceil(this.count/in_row);
		this.bullets=[];
		if(this.add_bullets){
			this.bullets_holder=this.container.querySelector('.bullets');
			this.bullets_holder.innerHTML='';
			if(this.bullets_holder && this.pages>1){
				for(var i=0;i<this.pages;++i){
					var bullet=document.createElement((this.bullets_holder.tagName.toLowerCase()=='ul' ? 'li' : 'div'));
					bullet.className='bullet';
					if(i==this.current-1) this.addClass(bullet,this.active_class);
					bullet.addEventListener('click',(function(kss,p){ return function(){ kss.setPage(p); }})(this,(i+1)));
					this.bullets_holder.appendChild(bullet);
					this.bullets.push(bullet);
				}
			}
		}
		if(this.pages==1){
			console.log(this.empty_class);
			if(this.bullets_holder) this.addClass(this.bullets_holder,this.empty_class);
			for(var i=0;i<this.arrows_left.length;++i) this.addClass(this.arrows_left[i],this.empty_class);
			for(var i=0;i<this.arrows_right.length;++i) this.addClass(this.arrows_right[i],this.empty_class);
		}
		this.set(this.current);
		return true;
	}
	this.reDraw=function(){
		window.addEventListener('resize',(function(kss){ return function(){
			if(kss.metrics=='px'){
				kss.draw();
			}
			else{
				for(var i=0;i<kss.mobile.length;++i){
					if(Array.isArray(kss.mobile[i])) if(kss.mobile[i][0]>=window.innerWidth) kss.draw();
					else if(kss.mobile[i]>=window.innerWidth) kss.draw();
				}
			}
		}})(this));
	}
	this.slide=function(dir){
		var pos=this.current+dir;
		if(pos<=0){ if(this.infinity){ pos=this.count-this.show_count+1; } else { return false; } }
		if(pos+(this.show_count-1)>this.count){ if(this.infinity){ pos=1; } else{ return false; } }
		if(!this.infinity){
			if(pos+1+(this.show_count-1)>this.count) this.addClass(this.arrow_right,this.disabled_class);
			else this.removeClass(this.arrow_right,this.disabled_class);
			if(pos-1<=0) this.addClass(this.arrow_left,this.disabled_class);
			else this.removeClass(this.arrow_left,this.disabled_class);
		}
		this.set(pos);
	}
	this.setPage=function(p){
		if(p>this.pages || p<=0) return false;
		var cur_page=Math.ceil(this.current/this.show_count);
		if(cur_page==p) return false;
		this.set((p-1)*this.show_count+1);
	}
	this.set=function(i){
		if(typeof this.container.dispatchEvent==='function'){
			var event=new CustomEvent("kit_slider_pre_change",{detail:{num:this.current,container:this.container}});
			this.container.dispatchEvent(event);
		}
		// need to fix
		var c_width=this.container.clientWidth;
		var pad=getComputedStyle(this.container).padding.split(' ');
		if(pad[1]){
			pad[1]=Math.round(pad[1].replace('px',''));
			c_width-=(pad[1]*2);
		}
		//
		if(this.metrics=='px') this.holder.style.marginLeft=(-(i-1)*c_width/this.show_count).toString()+'px';
		else this.holder.style.marginLeft=(-(i-1)*100/this.show_count).toString()+'%';
		if(this.bullets.length>0){
			var cur_page=Math.ceil(i/this.show_count);
			for (var j=0;j<this.bullets.length;j++) {				if (j==cur_page-1) this.addClass(this.bullets[j],this.active_class);
					else this.removeClass(this.bullets[j],this.active_class);
				}
		}
		this.current=i;
		this.adaptHeight();
		if(this.timer!=null) clearTimeout(this.timer);
		this.autoChange();
		this.page=Math.ceil(this.count/this.current);
		if(typeof this.container.dispatchEvent==='function'){
			var event=new CustomEvent("kit_slider_changed",{detail:{num:this.current,container:this.container,obj:this}});
			this.container.dispatchEvent(event);
		}
	}
	this.adaptHeight=function(){
		if(!this.adapt) return false;
		var cur_page=Math.ceil(this.current/this.show_count);
		var from=(cur_page-1)*this.show_count;
		var to=from+this.show_count-1;
		var max_height=0;
		for (var i=from;i<=to && i<this.items.length;i++)  if (this.items[i].offsetHeight>max_height) max_height=this.items[i].offsetHeight;
		this.holder.style.height=max_height.toString()+'px';
	}
	this.autoChange=function(){
		if(this.change_time==0) return false;
		if(this.timer!=null) clearTimeout(this.timer);
		this.timer=setTimeout((function(kss){ return function(){ kss.slide(1); }})(this),this.change_time);
	}
	/* FOR FUTURE, THIS IS'T WORK NOW */
	this.addDrag=function(){
		if(!this.desctop_drag) return false;
		this.holder.addEventListener('mousedown',(function(kss){return function(ev){
			if(ev.button==2) return false;
			var coords=kss.getCoords(this);
			var shiftX=ev.pageX-coords.left;
			var sliderCoords=kss.getCoords(kss.container);
			var start_scroll=kss.holder.style.marginLeft;
			document.addEventListener('mousemove',(function (kss,sX,sC,ss){ return kss.mmH=function(ev){
				var left=ev.pageX-sX-sC.left;
				if(left<0 && Math.abs(left)<kss.container.clientWidth*(kss.count-1)){
					if(kss.metrics=='px') kss.holder.style.marginLeft=left.toString()+'px';
					else kss.holder.style.marginLeft=(left/kss.container.clientWidth*100).toString()+'%';
				}
				kss.left_scroll=left;
				if(!kss.moving) document.addEventListener('mouseup',(function(kss,ss){ return kss.muH=function(){
					if(!kss.drag_cut){
						ss=ss.replace('%','');
						ss=ss.replace('px','');
						ss=kss.metrics=='px' ? parseFloat(ss,2)/kss.container.clientWidth : parseFloat(ss,2)/100;
						var curpx=kss.container.clientWidth*ss;
						var delta=curpx-kss.left_scroll;
						if(Math.abs(delta)>=kss.container.clientWidth/kss.drag_sens){
							if(delta>=0) kss.slide(1);
							else kss.slide(-1);
						}
						else kss.set(kss.current);
					}
					kss.moving=false;
					kss.left_scroll=0;
					document.removeEventListener('mousemove', kss.mmH);
					document.removeEventListener('mouseup',kss.muH);
					kss.mmH=null;
					kss.muH=null;
				}})(kss,ss));
				kss.dragstart=false;
				kss.moving=true;
			}}(kss,shiftX,sliderCoords,start_scroll)));
		}})(this));
		this.holder.addEventListener('dragstart',function(ev){ev.preventDefault();});
		this.holder.addEventListener('click',(function(kss){ return function(){
			document.removeEventListener('mousemove', kss.mmH);
			document.removeEventListener('mouseup',kss.muH);
			kss.mmH=null;
			kss.muH=null;
		}})(this));
		this.holder.addEventListener('dblclick',(function(kss){ return function(){
			document.removeEventListener('mousemove', kss.mmH);
			document.removeEventListener('mouseup',kss.muH);
			kss.mmH=null;
			kss.muH=null;
		}})(this));
	}
	this.swipe=function(params){
		if (params['scroll']=="right") this.slide(-1);
		else if(params['scroll']=="left") this.slide(1);
	}
	this.init();
}
if(Object.hasOwnProperty('create') || typeof KIT==='function'){
	kit_slider.prototype=Object.create(KIT.prototype);
	kit_slider.prototype.constructor=kit_slider;
}

var isMobile=('ontouchstart' in document.documentElement);

function swipe(el,callback,dx,width,fastscroll,prevent){
	//el - элемент
	// dx - изменение по x при свайпе (по умолчанию 100)
	// callback - callback функция, 1м параметром ей посылается массив параметров
	// width - если передано, то свайп будет считаться только при разрешениях меньше переданного значения
	// fastscroll (bool) - быстрый скролл, если палец не прошёл нужное расстояние, но был быстро поднят (по умолчанию true)
	if(!isMobile) return false;
	if(width!=null) if(window.innerWidth > width){
		el.touchstart=null;
		el.touchmove=null;
		el.touchend=null;
		return false;
	}
	if(fastscroll==null) fastscroll=true;
	if(dx==null) dx=100;
	if(prevent==null) prevent=false;
	var startPoint={};
	var nowPoint;
	var ldelay;
	var params=[];
	var swiping=false;
	el.addEventListener('touchstart', function(event){
		if(prevent) event.preventDefault();
		event.stopPropagation();
		startPoint.x=event.changedTouches[0].pageX;
		startPoint.y=event.changedTouches[0].pageY;
		ldelay=new Date();
	}, false);

	el.addEventListener('touchmove', function(event) {
		if(prevent) event.preventDefault();
		event.stopPropagation();
		var otk={};
		nowPoint=event.changedTouches[0];
		otk.x=nowPoint.pageX-startPoint.x;
		//alert(swiping);
		if(Math.abs(otk.x)>dx && !swiping){
			swiping=true;
			if(otk.x<0){ params['scroll']='left'; }
			if(otk.x>0){ params['scroll']='right'; }
			startPoint={x:nowPoint.pageX,y:nowPoint.pageY};
			if(params['scroll']==null) params['scroll']=false;
			callback(params);
			//setTimeout(function(){swiping=false;},100);
		}
	}, false);
	if(fastscroll) el.addEventListener('touchend', function(event){
		var pdelay=new Date();
		nowPoint=event.changedTouches[0];
		var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		if (xAbs > dx/5 && (pdelay.getTime()-ldelay.getTime())<dx && !swiping) {
			//swiping=true;
			if (nowPoint.pageX < startPoint.x){ params['scroll']='left'; }
			else{ params['scroll']='right'; }
			if(params['scroll']==null) params['scroll']=false;
			callback(params);
		}
		swiping=false;
	}, false);
	el.addEventListener('touchend', function(){ swiping=false; },false);
}function kit_fader(args) {	if(!args) args={};    this.container=args['container'];
	this.items=[];
	this.count=0;
	this.current=0;
	this.change_time=args['change_time'] || 0;
	this.timer=null;

	this.init=function(){
		if(typeof this.container==='string') this.container=document.body.querySelector(this.container);
		if(this.container==null) return false;
		this.items=this.container.querySelectorAll('.item');
		if(this.items.length==0) {			this.items=[];
            var lis=this.container.childNodes
            for (var i = 0; i < lis.length;i++) if (lis[i].nodeType==1) this.items.push(lis[i]);
            if(this.items.length==0) return false;
			}
		this.change_time=this.change_time>100 ? this.change_time : this.change_time*1000;
		this.count=this.items.length;
		this.setSlide(0);
		this.autoChange();
	}
	this.setSlide=function(num){        if (num<0) num=this.count-1;
        if (num>=this.count) num=0;
        if (num!=this.current)  this.items[this.current].className=this.items[this.current].className.replace('active','');
        if (this.items[num].className.indexOf('active')<0) this.items[num].className=this.items[num].className+' active';
        this.current=num;
		}
	this.next=function() {		this.setSlide(this.current+1);
		}
	this.previous=function() {
		this.setSlide(this.current-1);
		}
	this.autoChange=function(){
		if(this.change_time==0) return false;
		if(this.timer==null) this.timer=setInterval((function(kss){ return function(){ kss.next();}})(this),this.change_time);
	}

	this.init();
}