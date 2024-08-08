var KITS= {
	getXmlHttp:function(){
		  var xmlhttp;
		  try {
		    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		  } catch (e) {
		    try {
		      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		    } catch (E) {
		      xmlhttp = false;
		    }
		  }
		  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		    xmlhttp = new XMLHttpRequest();
		  }
		  return xmlhttp;
		},

	sendAjaxRequest:function(fields,callbackSuccess,callbackError) {
		var xmlhttp = this.getXmlHttp();
		xmlhttp.open('post', window.location, true);
		xmlhttp.onreadystatechange = function() {
		  if (xmlhttp.readyState == 4) {
		     if(xmlhttp.status == 200) {
	       		var results=xmlhttp.responseText;
	       		if (results=="OK")  {
	       			if (typeof(callbackSuccess)=="function") callbackSuccess();
	       			}
	       			else  {
	       				if (typeof(callbackError)=="function") callbackError(results);
	       			}
		         }
		  }
		};
		var params = '&ajax=';
		for (var field in fields) if(fields.hasOwnProperty(field)) params+='&'+field+'='+encodeURIComponent(fields[field]);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(params);		},

	sendForm:function(fields) {
		var formInner="";
		for (var field in fields) if(fields.hasOwnProperty(field)) formInner+='<input name="'+field+'" type="hidden" value="'+fields[field]+'">';
        var f=document.createElement('form');
		f.action="";
		f.method="POST";
		f.innerHTML=formInner;
		document.body.appendChild(f);
		f.style.display='none';
		f.submit();
		},

	addCart:function(id,count,ajax,callbackSuccess,callbackError) {		if (count==null) count=1;
		if (ajax==null && ajax!==true) ajax=false;
		var fields={'kits_cart_add':id,'count':count};
		if (ajax)  this.sendAjaxRequest(fields,callbackSuccess,callbackError);
			else this.sendForm(fields);
		},

	removeCart:function(id,count,ajax,callbackSuccess,callbackError) {
		if (count==null) count=1;
		if (ajax==null && ajax!==true) ajax=false;
		var fields={'kits_cart_remove':id,'count':count};
		if (ajax)  this.sendAjaxRequest(fields,callbackSuccess,callbackError);
			else this.sendForm(fields);
		},

	addCompare:function(id,ajax,callbackSuccess,callbackError) {
		if (ajax==null && ajax!==true) ajax=false;
		var fields={'kits_compare_add':id};
		if (ajax)  this.sendAjaxRequest(fields,callbackSuccess,callbackError);
			else this.sendForm(fields);
		},

	removeCompare:function(id,ajax,callbackSuccess,callbackError) {
		if (ajax==null && ajax!==true) ajax=false;
		var fields={'kits_compare_remove':id};
		if (ajax)  this.sendAjaxRequest(fields,callbackSuccess,callbackError);
			else this.sendForm(fields);
		},

	addWishlist:function(id,ajax,callbackSuccess,callbackError) {
		if (ajax==null && ajax!==true) ajax=false;
		var fields={'kits_wishlist_add':id};
		if (ajax)  this.sendAjaxRequest(fields,callbackSuccess,callbackError);
			else this.sendForm(fields);
		},

	removeWishlist:function(id,ajax,callbackSuccess,callbackError) {
		if (ajax==null && ajax!==true) ajax=false;
		var fields={'kits_wishlist_remove':id};
		if (ajax)  this.sendAjaxRequest(fields,callbackSuccess,callbackError);
			else this.sendForm(fields);
		},

	setActiveCurrency:function(currency,ajax,callbackSuccess,callbackError) {        if (ajax==null && ajax!==true) ajax=false;
		var fields={'kits_active_currency':currency};
		if (ajax)  this.sendAjaxRequest(fields,callbackSuccess,callbackError);
			else this.sendForm(fields);
		}

	}