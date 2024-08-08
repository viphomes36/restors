/*!THIS IS AUTO GENERATED FILE !*/

/* COMMON FUNCTIONS */
function hasClass(elem,classname) {
	return (elem.className.indexOf(classname)>=0);
	}

function addClass(elem,classname) {
	if(!hasClass(elem,classname)) elem.className=elem.className+' '+classname;
	}

function removeClass(elem,classname) {
	if(hasClass(elem,classname)) elem.className=elem.className.replace(' '+classname,'');
	}
function switchClass(elem,classname) {
	if(hasClass(elem,classname)) removeClass(elem,classname);
		else addClass(elem,classname);
	}
/* END COMMON FUNCTIONS */

/* SELECT */
function kitSelect(elem,params) {
	this.container=elem;
	this.select=null;
	this.selected=null;
	this.search=null;
	this.multiple=false;
	this.placeholder='';
	this.value='';
	this.options=[];
	this.close_button=null;
	this.apply_button=null;
	this.mobile_width=720;

	this.init();
	}

kitSelect.prototype.init=function(){
    this.select=this.findSelect();
    this.setPlaceholder();
    this.multiple=this.select.multiple;
    this.selected=this.container.getElementsByClassName('selected')[0];
    var options_holder=this.container.getElementsByClassName('options')[0];
    this.search=options_holder.getElementsByTagName('input')[0];
    this.options=options_holder.getElementsByTagName('li');
    this.close_button=options_holder.getElementsByClassName('close')[0];
    this.apply_button=options_holder.querySelector('.apply .button');
    this.updateFromSelect();
    this.sortable=this.select.getAttribute('data-sortable')=='1';

    (function(slct){
    	slct.container.addEventListener('click',function(){
    		var event = event || window.event;
			event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
    		});
    	slct.selected.addEventListener('click',function(){slct.clickSelect();},true);
    	if (slct.search!=null) slct.search.addEventListener('keyup',function(){slct.searchOptions();},true);
    	slct.select.addEventListener('input',function(){slct.updateFromSelect();},true);
    	for (var i=0;i<slct.options.length;i++) if (!hasClass(slct.options[i],'optgroup')){
    		(function(){
    		var index=i;
    		var opt=slct.options[index];
    		slct.options[index].addEventListener('click',function(){slct.setOption(opt);},true);
    		}());
    		}
    	if (slct.close_button!=null) slct.close_button.addEventListener('click',function(){slct.close();},false);
    	if (slct.apply_button!=null) slct.apply_button.addEventListener('click',function(){slct.close();},false);
    	}(this));
	}

kitSelect.prototype.close=function(actions){
	if (actions==null) actions=true;
	removeClass(this.container,'open');
	//mobile
	var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (actions && w<=this.mobile_width) {
        var sticky_menu=document.querySelector('.sticky_menu');
		if (sticky_menu) Show(sticky_menu);
		if (typeof restoreIosScroll==="function") restoreIosScroll();
		}
	}
kitSelect.prototype.open=function(){
	//sort items - selected first
	if (this.sortable) this.sortOptions();
	//show
	addClass(this.container,'open');
	if (this.search!=null) this.search.focus();
	//mobile
	var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (w<=this.mobile_width) {
		var sticky_menu=document.querySelector('.sticky_menu');
		if (sticky_menu) Hide(sticky_menu);
		if (typeof removeIosScroll==="function") removeIosScroll();
		}
	}
kitSelect.prototype.sortOptions=function(){
	var nodeList = this.container.getElementsByClassName('options')[0].getElementsByTagName('li');
	var itemsArray = [];
	var parent = nodeList[0].parentNode;
	var n=nodeList.length;
	var index=0
	for (var i = 0; i < n; i++) {
        index=nodeList.length!=n ? 0 : i;
		itemsArray.push(parent.removeChild(nodeList[index]));
		}
	itemsArray.sort(function(nodeA, nodeB) {
		var placeholderA = nodeA.className.indexOf('placeholder')>=0 ? 1 : 0;
		var placeholderB = nodeB.className.indexOf('placeholder')>=0 ? 1 : 0;
		var activeA = nodeA.className.indexOf('active')>=0 ? 1 : 0;
		var activeB = nodeB.className.indexOf('active')>=0 ? 1 : 0;
		var textA = nodeA.textContent;
		var textB = nodeB.textContent;
		if (placeholderA > placeholderB) return -1;
		if (placeholderA < placeholderB) return 1;
		if (activeA > activeB) return -1;
		if (activeA < activeB) return 1;
		if (textA<textB) return -1;
		if (textA>textB) return 1;
		return 0;
		})
		.forEach(function(node) {
			parent.appendChild(node)
			});
	setTimeout(function(){parent.scrollTop=0;},10);
	this.options=this.container.getElementsByClassName('options')[0].getElementsByTagName('li');
	}
kitSelect.prototype.clickSelect=function(){
  	document.kit_ui.closeAllSelects(this);
	if(this.select.disabled){
		return false;
	}
  	if (hasClass(this.container,'open')) this.close();
  		else this.open();
	}

kitSelect.prototype.findSelect=function(){
	for (var sel=this.container.previousSibling;sel!=null;sel=sel.previousSibling) {
		if (sel.nodeType==1 && sel.tagName.toLowerCase()=='select') return sel;
		}
	return null;
	}
kitSelect.prototype.setPlaceholder=function(){
	var placeholder=this.select.getAttribute('placeholder');
	if (placeholder==null) {
		placeholder='';
		if (this.select.options[0].value==='') placeholder=this.select.options[0].text;
		}
	this.placeholder=placeholder;
	}

kitSelect.prototype.setValue=function(val){
	this.value=val;
	this.update();
	}
kitSelect.prototype.addValue=function(val){
	if (this.value.indexOf(val)<0) {
		this.value.push(val);
		this.update();
		this.select.fireChange();
		}
	}
kitSelect.prototype.removeValue=function(val){
	var index=this.value.indexOf(val);
	if (index>=0) {
		this.value.splice(index, 1);
		this.update();
		this.select.fireChange();
		}
	}
kitSelect.prototype.update=function(){
	var i;
	if (this.multiple) /* for multiple */{
		//update fake select
		var captions=[];
		for (i=0;i<this.options.length;i++) {
			if (this.value.indexOf(this.options[i].getAttribute('data-value'))>=0) {
				captions.push(this.options[i].innerHTML);
				addClass(this.options[i],'active');
				}
				else removeClass(this.options[i],'active');
			}
	    this.selected.innerHTML=captions.length>0 ? captions.join(', ') : this.placeholder;
	    if (captions.length>0) removeClass(this.selected,'placeholder'); else addClass(this.selected,'placeholder');
	    //update real select
	    for (i=0;i<this.select.options.length;i++)  this.select.options[i].selected = this.value.indexOf(this.select.options[i].value)>=0;
		}
		else /* for single */{
			for (i=0;i<this.options.length;i++) {
				if (this.options[i].getAttribute('data-value')==this.value) {
					addClass(this.options[i],'active');
					this.selected.innerHTML=this.options[i].innerHTML;
					var old_value=this.select.value;
					this.select.value=this.value;
					if (old_value!=this.value) this.select.dispatchEvent(new Event('change', { 'bubbles': true }));
					if (hasClass(this.options[i],'placeholder')) addClass(this.selected,'placeholder'); else removeClass(this.selected,'placeholder');
					}
					else removeClass(this.options[i],'active');
				}
			}
	}
kitSelect.prototype.setOption=function(option){
	if (this.multiple) {
		if (hasClass(option,'active')) this.removeValue(option.getAttribute('data-value'));
			else this.addValue(option.getAttribute('data-value'));
		}
		else {
			this.setValue(option.getAttribute('data-value'));
			this.close();
			}
	}

kitSelect.prototype.updateFromSelect=function(){
	if (this.multiple) {
		var val=[];
		for (var i=0;i<this.select.options.length;i++)
			if (this.select.options[i].selected) val.push(this.select.options[i].value);
		this.setValue(val);
		}
		else this.setValue(this.select.value);
	}

kitSelect.prototype.searchOptions=function(){
	var srch=this.search.value.toLowerCase();
	for (var i=0;i<this.options.length;i++)
		if (this.options[i].innerHTML.toLowerCase().indexOf(srch)>=0) removeClass(this.options[i],'hidden');
			else addClass(this.options[i],'hidden');
	}
/* END SELECT */

/* FILE LOADER */
function kitFileLoader(elem,params) {
	this.container=elem;
	this.input=null;
	this.file=null;
	this.multiple=false;
	this.placeholder='';
	this.text_holder=null;
	this.size_holder=null;
	this.clear=null;

	this.init();
	}

kitFileLoader.prototype.init=function(){
    this.input=this.findInput();
    this.placeholder=this.input.getAttribute('placeholder');
    this.clear=this.container.getElementsByClassName('clear')[0];
    var label=this.container.getElementsByTagName('label')[0];
    this.text_holder=label.getElementsByClassName('value')[0];
    this.size_holder=label.getElementsByClassName('size')[0];
    this.update();

    (function(ldr){
    	ldr.clear.addEventListener('click',function(){ldr.reset();},true);
    	ldr.input.addEventListener('change',function(){ldr.update();},true);
    	}(this));
	}

kitFileLoader.prototype.findInput=function(){
	for (var inp=this.container.previousSibling;inp!=null;inp=inp.previousSibling) {
		if (inp.nodeType==1 && inp.tagName.toLowerCase()=='input') return inp;
		}
	return null;
	}

kitFileLoader.prototype.reset=function(){
	this.input.type='text';
	this.input.type='file';
    this.update();
	}

kitFileLoader.prototype.update=function(){
    var files_count=this.input.files.length;
    if (files_count<=0 || files_count==null) {
    	removeClass(this.container,'active');
    	this.text_holder.innerHTML=this.placeholder;
    	this.text_holder.title='';
    	this.size_holder.innerHTML='';
    	}
    	else {
    		addClass(this.container,'active');
    		this.text_holder.innerHTML=this.input.files[0].name;
    		this.text_holder.title=this.input.files[0].name;
    		this.size_holder.innerHTML=this.getFileSize(this.input.files[0].size);
    		}
	}

kitFileLoader.prototype.getFileSize=function(size){
    var fSExt = new Array('B', 'KB', 'MB', 'GB');
    fSize = size;
    var i=0;
    while(fSize>900){fSize/=1024;i++;}
    return ((Math.round(fSize*100)/100)+' '+fSExt[i]);
	}
/* END FILE LOADER */

function kitUI() {
	this.selects=[];
	this.fileloaders=[];
	}
kitUI.prototype.generateID=function() {
    return 'kitui-'+(Math.floor(Math.random() * Math.floor(999999999))).toString();
	}
kitUI.prototype.init=function(params) {
    if (params==null) params={};
    if (params['checkbox_selector']==null) params['checkbox_selector']='input[type="checkbox"]';
    if (params['radio_selector']==null) params['radio_selector']='input[type="radio"]';
    if (params['select_selector']==null) params['select_selector']='select';
    if (params['file_selector']==null) params['file_selector']='input[type="file"]';

    this.initCheckboxes(params['checkbox_selector']);
    this.initRadios(params['radio_selector']);
    this.addFakeSelects(params['select_selector']);
    this.initSelects();
    this.addFakeFileLoaders(params['file_selector']);
    this.initFileloaders();
	}
kitUI.prototype.initCheckboxes=function(selector) {
	var id,i;
	if (selector==null) selector='input[type="checkbox"]';
	var checkboxes=document.querySelectorAll(selector);
	for (i=0;i<checkboxes.length;i++) {
        addClass(checkboxes[i],'kitui-checkbox');
        c_id=checkboxes[i].id=='' ? this.generateID() : checkboxes[i].id;
        if (checkboxes[i].id=='') checkboxes[i].id=c_id;
        var label=document.createElement('label');
        label.setAttribute('for',c_id);
        checkboxes[i].parentNode.insertBefore(label,checkboxes[i].nextSibling);
		};
	}
kitUI.prototype.initRadios=function(selector) {
	var id,i;
	if (selector==null) selector='input[type="radio"]';
	var radios=document.querySelectorAll(selector);
	for (i=0;i<radios.length;i++) {
        addClass(radios[i],'kitui-radio');
        c_id=radios[i].id=='' ? this.generateID() : radios[i].id;
        if (radios[i].id=='') radios[i].id=c_id;
        var label=document.createElement('label');
        label.setAttribute('for',c_id);
        radios[i].parentNode.insertBefore(label,radios[i].nextSibling);
		};
	}

kitUI.prototype.addFakeSelects = function(selector) {
  if (selector == null) {
    selector = 'select';
  }
  
  const selects = document.querySelectorAll(selector);

  for (let i = 0; i < selects.length; i++) {
    const holder = document.createElement('div');
    holder.className = 'kitui-select';
    
    const placeholder = selects[i].getAttribute('placeholder') || '';
    const apply = selects[i].getAttribute('apply') || (typeof LANG['apply'] !== 'undefined' ? LANG['apply'] : 'Apply');
    
    const searchFrom = selects[i].getAttribute('data-search-from');
    const hasSearch = searchFrom == null || searchFrom <= 0 || selects[i].options.length > searchFrom;
    
    let html = '<div class="selected">' + placeholder + '</div>' +
               '<div class="options">' +
                 '<div class="close"></div>' +
                 '<div class="apply"><div class="button">' + apply + '</div></div>';
    
    if (hasSearch) {
      html += '<span><input type="text"></span>';
      holder.className += ' with-search';
    }
    
    html += '<ul>';
    
    let optgroup = '';

    for (let j = 0; j < selects[i].options.length; j++) {
      const parent = selects[i].options[j].parentNode;
      
      if (parent.tagName.toLowerCase() === 'optgroup' && parent.label !== optgroup) {
        optgroup = parent.label;
        html += '<li class="optgroup">' + optgroup + '</li>';
      } else if (parent.tagName.toLowerCase() === 'select') {
        optgroup = '';
      }
      
      const value = selects[i].options[j].value;
      const text = selects[i].options[j].dataset.html || selects[i].options[j].text;
      const isPlaceholder = j === 0 && value === '';

      html += '<li data-value="' + value + '"' + (isPlaceholder ? ' class="placeholder"' : '') + '>';
      html += (isPlaceholder && text === '') ? placeholder : text;
      html += '</li>';
    }
    
    html += '</ul></div>';
    
    holder.innerHTML = html;
    selects[i].parentNode.insertBefore(holder, selects[i].nextSibling);
    selects[i].style.display = 'none';
  }
};

kitUI.prototype.addFakeFileLoaders=function(selector) {
	var id,i,html,placeholder;
	if (selector==null) selector='input[type="file"]';
	var files=document.querySelectorAll(selector);
	for (i=0;i<files.length;i++) {
		id=files[i].id=='' ? this.generateID() : files[i].id;
		if (files[i].id=='') files[i].id=id;
        var holder=document.createElement('div');
        holder.className='kitui-filename';
        placeholder=files[i].getAttribute('placeholder');
        if (placeholder==null) placeholder='';
        html='<label for="'+id+'"><span class="value">'+placeholder+'</span><span class="size"></span></label>';
		html+='<div class="clear"></div>';
        holder.innerHTML=html;
        files[i].parentNode.insertBefore(holder,files[i].nextSibling);

        files[i].style.display='none';
		};
	}
kitUI.prototype.initSelects=function() {
	var selects=document.querySelectorAll('div.kitui-select');
	for (var i=0;i<selects.length;i++) {
		var slct=new kitSelect(selects[i]);
		this.selects.push(slct);
		};
	}
kitUI.prototype.initFileloaders=function() {
	var loaders=document.querySelectorAll('div.kitui-filename');
	for (var i=0;i<loaders.length;i++) {
		var ldr=new kitFileLoader(loaders[i]);
		this.fileloaders.push(ldr);
		};
	}
kitUI.prototype.setSelectValue=function(sel,val) {
	for (var i=0;i<this.selects.length;i++)  if (this.selects[i].select==sel) this.selects[i].setValue(val);
	}
kitUI.prototype.closeAllSelects=function(exclude) {
    for (var i=0;i<this.selects.length;i++)  if (this.selects[i]!=exclude) this.selects[i].close(false);
	}


HTMLSelectElement.prototype.setValue=function(val) {
	if (this.multiple) {
		for (i=0;i<this.options.length;i++)
			this.options[i].selected = val.indexOf(this.options[i].value)>=0;
		}
		else this.value=val;
	if (typeof document.kit_ui !="undefined") document.kit_ui.setSelectValue(this,val);
	this.fireChange();
	}

Element.prototype.fireChange=function(){
        if(typeof this.dispatchEvent==='function'){
            var event=new Event("change");
            this.dispatchEvent(event);
        }else if(typeof this.onchange==='function') this.onchange();
    }

window.addEventListener('DOMContentLoaded',function(){
	document.kit_ui=new kitUI();
	document.addEventListener('click',function(){document.kit_ui.closeAllSelects();});

	//add regions list support
	document.kit_ui.regions_lists=[];
	var regions_list=document.querySelectorAll('div.regions_select');
	for (var i=0;i<regions_list.length;i++) {
		var slct=new kitRegionsList(regions_list[i]);
		document.kit_ui.regions_lists.push(slct);
		};

	kitUI.prototype.closeAllRegions=function(exclude) {
	    for (var i=0;i<this.regions_lists.length;i++)  if (this.regions_lists[i]!=exclude) this.regions_lists[i].close();
		}

	document.addEventListener('click',function(){document.kit_ui.closeAllRegions();});

	//add numbeo cities list support
	document.kit_ui.numbeo_cities_lists=[];
	var numbeo_cities_list=document.querySelectorAll('div.numbeo_select');
	for (var i=0;i<numbeo_cities_list.length;i++) {
		var slct=new numbeoCitiesList(numbeo_cities_list[i]);
		document.kit_ui.numbeo_cities_lists.push(slct);
		};
	kitUI.prototype.closeAllNumbeo=function(exclude) {
	    for (var i=0;i<this.numbeo_cities_lists.length;i++)  if (this.numbeo_cities_lists[i]!=exclude) this.numbeo_cities_lists[i].close();
		}
	document.addEventListener('click',function(){document.kit_ui.closeAllNumbeo();});

});

/* REGIONS LIST */
function kitRegionsList(elem,params) {
	this.container=elem;
	this.input=null;
	this.region_input=null;
	this.district_input=null;
	this.region=null;
	this.district=null;
	this.selected='';
	this.options=[];
	this.options_holder=null;
	this.clear_button=null;

	this.init();
	}
kitRegionsList.prototype.init=function(){
    this.input=this.container.querySelector('input[type=text]');
    this.selected=this.input.value;
	var region_name=this.input.dataset.region_field ? this.input.dataset.region_field : 'prj_region';
	var district_name=this.input.dataset.district_field ? this.input.dataset.district_field : 'prj_district';
	var id_name=this.input.dataset.id_field ? this.input.dataset.id_field : 'prj_id';
    this.region_input=this.container.querySelector('input[name^='+region_name.toString()+']');
    this.district_input=this.container.querySelector('input[name='+district_name.toString()+']');
	this.id_input=this.container.querySelector('input[name='+id_name.toString()+']');
    this.options_holder=this.container.getElementsByClassName('options')[0];
    this.clear_button=this.container.getElementsByClassName('clear')[0];
    if (this.input.value!='') addClass(this.clear_button,'active');

    (function(slct){
    	slct.container.addEventListener('click',function(){
    		var event = event || window.event;
			event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
    		});
    	slct.input.addEventListener('click',function(){slct.updateList(true);},true);
    	slct.input.addEventListener('keyup',function(){slct.updateList(true);},true);
    	slct.clear_button.addEventListener('click',function(){slct.clear();},false);
    	}(this));
	}
kitRegionsList.prototype.close=function(){
	removeClass(this.container,'open');
	if (this.selected!='') this.input.value=this.selected;
	}
kitRegionsList.prototype.open=function(){
	addClass(this.container,'open');
	}
kitRegionsList.prototype.clear=function(){
	this.input.value='';
	this.region_input.value='';
	this.district_input.value='';
	if(this.id_input){
		this.id_input.value='';
	}
	this.selected='';
	removeClass(this.clear_button,'active');
	this.close();
	this.input.focus();
	}
kitRegionsList.prototype.updateList=function(empty){
	if (empty==null) empty=false;
	this.open();
	if (empty) this.options_holder.innerHTML='';
	var select=this;
	KITS.sendAjaxRequest({'ajax':2,'search_regions':select.input.value,'search_name':select.input.dataset.search_name},function(){},function(result){
		(function(slct){
			slct.options=[];
	        slct.options_holder.innerHTML=result;
	        slct.options=slct.options_holder.getElementsByTagName('li');
	        for (var i=0;i<slct.options.length;i++) {
	            var cur_region=slct.options[i].getAttribute('data-region');
	            var cur_district=slct.options[i].getAttribute('data-district');
	            if (cur_district==null) cur_district='';
	            if (slct.region_input.value!='' && cur_region==slct.region_input.value && cur_district==slct.district_input.value) addClass(slct.options[i],'active');
	            (function(){
		    		var index=i;
		    		var opt=slct.options[index];
		    		slct.options[index].addEventListener('click',function(){slct.setOption(opt);},true);
		    		}());
	        	}
        	}(select));
		});
	}
kitRegionsList.prototype.setOption=function(option) {
	var nm=option.getElementsByClassName('name')[0];
	if (nm==null) {
		this.input.focus();
		return false;
		}
	this.input.value=option.getElementsByClassName('name')[0].innerHTML;
	this.selected=this.input.value;
	this.region_input.value=option.getAttribute('data-region');
	this.district_input.value=option.getAttribute('data-district');
	if(this.id_input){
		this.id_input.value=option.getAttribute('data-id');
	}
	for (var i=0;i<this.options.length;i++) removeClass(this.options[i],'active');
	addClass(option,'active');
	addClass(this.clear_button,'active');
	this.close();
	}

/* NUMBEO CITIES LIST */
function numbeoCitiesList(elem,params) {
	this.container=elem;
	this.input=null;
	this.city_input=null;
	this.region=null;
	this.selected='';
	this.options=[];
	this.options_holder=null;
	this.clear_button=null;

	this.init();
	}
numbeoCitiesList.prototype.init=function(){
    this.input=this.container.querySelector('input[type=text]');
    this.selected=this.input.value;
    this.city_input=this.container.querySelector('input[name^=city_id]');
    this.options_holder=this.container.getElementsByClassName('options')[0];
    this.clear_button=this.container.getElementsByClassName('clear')[0];
    if (this.city_input.value!='') addClass(this.clear_button,'active');

    (function(slct){
    	slct.container.addEventListener('click',function(){
    		var event = event || window.event;
			event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
    		});
    	slct.input.addEventListener('click',function(){slct.updateList(true);},true);
    	slct.input.addEventListener('keyup',function(){slct.updateList(true);},true);
    	slct.clear_button.addEventListener('click',function(){slct.clear();},false);
    	}(this));
	}
numbeoCitiesList.prototype.close=function(){
	removeClass(this.container,'open');
	if (this.selected!='') this.input.value=this.selected;
	}
numbeoCitiesList.prototype.open=function(){
	addClass(this.container,'open');
	}
numbeoCitiesList.prototype.clear=function(){
	this.input.value='';
	this.city_input.value='';
	this.selected='';
	removeClass(this.clear_button,'active');
	this.close();
	this.input.focus();
	}
numbeoCitiesList.prototype.updateList=function(empty){
	if (empty==null) empty=false;
	if (this.input.value.length<3) {
		this.close();
		return false;
		}
	this.open();
	if (empty) this.options_holder.innerHTML='';
	var select=this;
	KITS.sendAjaxRequest({'ajax':2,'search_numbeo_city':select.input.value},function(){},function(result){
		(function(slct){
			slct.options=[];
	        slct.options_holder.innerHTML=result;
	        slct.options=slct.options_holder.getElementsByTagName('li');
	        for (var i=0;i<slct.options.length;i++) {
	            var cur_city=slct.options[i].getAttribute('data-city');
	            if (slct.city_input.value!='' && cur_city==slct.city_input.value) addClass(slct.options[i],'active');
	            (function(){
		    		var index=i;
		    		var opt=slct.options[index];
		    		slct.options[index].addEventListener('click',function(){slct.setOption(opt);},true);
		    		}());
	        	}
        	}(select));
		});
	}
numbeoCitiesList.prototype.setOption=function(option) {
	var nm=option.getElementsByClassName('name')[0];
	if (nm==null) {
		this.input.focus();
		return false;
		}
	this.input.value=option.getElementsByClassName('name')[0].innerHTML;
	this.selected=this.input.value;
	this.city_input.value=option.getAttribute('data-city');
	for (var i=0;i<this.options.length;i++) removeClass(this.options[i],'active');
	addClass(option,'active');
	addClass(this.clear_button,'active');
	this.close();
	}


window.addEventListener('DOMContentLoaded',function(){
	var params={
		//'checkbox_selector':'.checkbox1.switcher',
		//'radio_selector':'.radio1.type2',
		//'select_selector':'select[multiple]',
		//'file_selector':'input[type="file"].file',
	};
	document.kit_ui.init(params);
});var phonecodes_data=[{"cc":"au","p":"61","RU":"\u0410\u0432\u0441\u0442\u0440\u0430\u043b\u0438\u044f","EN":"Australia","AR":"\u0623\u0633\u062a\u0631\u0627\u0644\u064a\u0627"},{"cc":"at","p":"43","RU":"\u0410\u0432\u0441\u0442\u0440\u0438\u044f","EN":"Austria","AR":"\u0627\u0644\u0646\u0645\u0633\u0627"},{"cc":"az","p":"994","RU":"\u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043d","EN":"Azerbaijan","AR":"\u0623\u0630\u0631\u0628\u064a\u062c\u0627\u0646"},{"cc":"ax","p":"35818","RU":"\u0410\u043b\u0430\u043d\u0434\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"\u00c5land Islands","AR":"\u062c\u0632\u0631 \u0622\u0644\u0627\u0646\u062f"},{"cc":"al","p":"355","RU":"\u0410\u043b\u0431\u0430\u043d\u0438\u044f","EN":"Albania","AR":"\u0623\u0644\u0628\u0627\u0646\u064a\u0627"},{"cc":"dz","p":"213","RU":"\u0410\u043b\u0436\u0438\u0440","EN":"Algeria","AR":"\u0627\u0644\u062c\u0632\u0627\u0626\u0631"},{"cc":"ai","p":"1264","RU":"\u0410\u043d\u0433\u0438\u043b\u044c\u044f","EN":"Anguilla","AR":"\u0623\u0646\u063a\u064a\u0644\u0627"},{"cc":"ao","p":"244","RU":"\u0410\u043d\u0433\u043e\u043b\u0430","EN":"Angola","AR":"\u0623\u0646\u063a\u0648\u0644\u0627"},{"cc":"ad","p":"376","RU":"\u0410\u043d\u0434\u043e\u0440\u0440\u0430","EN":"Andorra","AR":"\u0623\u0646\u062f\u0648\u0631\u0627"},{"cc":"ag","p":"1268","RU":"\u0410\u043d\u0442\u0438\u0433\u0443\u0430 \u0438 \u0411\u0430\u0440\u0431\u0443\u0434\u0430","EN":"Antigua and Barbuda","AR":"\u0623\u0646\u062a\u064a\u063a\u0648\u0627 \u0648\u0628\u0631\u0628\u0648\u062f\u0627"},{"cc":"mo","p":"853","RU":"\u0410\u043e\u043c\u044b\u043d\u044c","EN":"Macau","AR":"\u0645\u0627\u0643\u0627\u0648"},{"cc":"ar","p":"54","RU":"\u0410\u0440\u0433\u0435\u043d\u0442\u0438\u043d\u0430","EN":"Argentina","AR":"\u0627\u0644\u0623\u0631\u062c\u0646\u062a\u064a\u0646"},{"cc":"am","p":"374","RU":"\u0410\u0440\u043c\u0435\u043d\u0438\u044f","EN":"Armenia","AR":"\u0623\u0631\u0645\u064a\u0646\u064a\u0627"},{"cc":"aw","p":"297","RU":"\u0410\u0440\u0443\u0431\u0430","EN":"Aruba","AR":"\u0623\u0631\u0648\u0628\u0627"},{"cc":"af","p":"93","RU":"\u0410\u0444\u0433\u0430\u043d\u0438\u0441\u0442\u0430\u043d","EN":"Afghanistan","AR":"\u0623\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646"},{"cc":"bs","p":"1242","RU":"\u0411\u0430\u0433\u0430\u043c\u0441\u043a\u0438\u0435 \u043e\u0441\u0442\u0440\u043e\u0432\u0430","EN":"Bahamas","AR":"\u0627\u0644\u0628\u0627\u0647\u0627\u0645\u0627"},{"cc":"bd","p":"880","RU":"\u0411\u0430\u043d\u0433\u043b\u0430\u0434\u0435\u0448","EN":"Bangladesh","AR":"\u0628\u0646\u063a\u0644\u0627\u062f\u064a\u0634"},{"cc":"bb","p":"1246","RU":"\u0411\u0430\u0440\u0431\u0430\u0434\u043e\u0441","EN":"Barbados","AR":"\u0628\u0631\u0628\u0627\u062f\u0648\u0633"},{"cc":"bh","p":"973","RU":"\u0411\u0430\u0445\u0440\u0435\u0439\u043d","EN":"Bahrain","AR":"\u0627\u0644\u0628\u062d\u0631\u064a\u0646"},{"cc":"by","p":"375","RU":"\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c","EN":"Belarus","AR":"\u0631\u0648\u0633\u064a\u0627 \u0627\u0644\u0628\u064a\u0636\u0627\u0621"},{"cc":"bz","p":"501","RU":"\u0411\u0435\u043b\u0438\u0437","EN":"Belize","AR":"\u0628\u0644\u064a\u0632"},{"cc":"be","p":"32","RU":"\u0411\u0435\u043b\u044c\u0433\u0438\u044f","EN":"Belgium","AR":"\u0628\u0644\u062c\u064a\u0643\u0627"},{"cc":"bj","p":"229","RU":"\u0411\u0435\u043d\u0438\u043d","EN":"Benin","AR":"\u0628\u0646\u064a\u0646"},{"cc":"bm","p":"1441","RU":"\u0411\u0435\u0440\u043c\u0443\u0434\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"Bermuda","AR":"\u0628\u0631\u0645\u0648\u062f\u0627"},{"cc":"bg","p":"359","RU":"\u0411\u043e\u043b\u0433\u0430\u0440\u0438\u044f","EN":"Bulgaria","AR":"\u0628\u0644\u063a\u0627\u0631\u064a\u0627"},{"cc":"bo","p":"591","RU":"\u0411\u043e\u043b\u0438\u0432\u0438\u044f","EN":"Bolivia","AR":"\u0628\u0648\u0644\u064a\u0641\u064a\u0627"},{"cc":"bq","p":"599","RU":"\u0411\u043e\u043d\u0430\u0439\u0440\u0435, \u0421\u0438\u043d\u0442-\u042d\u0441\u0442\u0430\u0442\u0438\u0443\u0441 \u0438 \u0421\u0430\u0431\u0430","EN":"Bonaire, Sint Eustatius and Saba","AR":"\u0628\u0648\u0646\u064a\u0631 \u0648\u0633\u064a\u0646\u062a \u0623\u0648\u0633\u062a\u0627\u062a\u064a\u0648\u0633 \u0648\u0633\u0627\u0628\u0627"},{"cc":"ba","p":"387","RU":"\u0411\u043e\u0441\u043d\u0438\u044f","EN":"Bosnia","AR":"\u0627\u0644\u0628\u0648\u0633\u0646\u0629"},{"cc":"bw","p":"267","RU":"\u0411\u043e\u0442\u0441\u0432\u0430\u043d\u0430","EN":"Botswana","AR":"\u0628\u0648\u062a\u0633\u0648\u0627\u0646\u0627"},{"cc":"br","p":"55","RU":"\u0411\u0440\u0430\u0437\u0438\u043b\u0438\u044f","EN":"Brazil","AR":"\u0627\u0644\u0628\u0631\u0627\u0632\u064a\u0644"},{"cc":"io","p":"246","RU":"\u0411\u0440\u0438\u0442\u0430\u043d\u0441\u043a\u0430\u044f \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u044f \u0432 \u0418\u043d\u0434\u0438\u0439\u0441\u043a\u043e\u043c \u043e\u043a\u0435\u0430\u043d\u0435","EN":"British Indian Ocean Territory","AR":"\u0625\u0642\u0644\u064a\u0645 \u0627\u0644\u0645\u062d\u064a\u0637 \u0627\u0644\u0647\u0646\u062f\u064a \u0627\u0644\u0628\u0631\u064a\u0637\u0627\u0646\u064a"},{"cc":"vg","p":"1284","RU":"\u0411\u0440\u0438\u0442\u0430\u043d\u0441\u043a\u0438\u0435 \u0412\u0438\u0440\u0433\u0438\u043d\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"British Virgin Islands","AR":"\u062c\u0632\u0631 \u0641\u064a\u0631\u062c\u0646 \u0627\u0644\u0628\u0631\u064a\u0637\u0627\u0646\u064a\u0629"},{"cc":"bn","p":"673","RU":"\u0411\u0440\u0443\u043d\u0435\u0439","EN":"Brunei","AR":"\u0628\u0631\u0648\u0646\u0627\u064a"},{"cc":"bf","p":"226","RU":"\u0411\u0443\u0440\u043a\u0438\u043d\u0430 \u0424\u0430\u0441\u043e","EN":"Burkina Faso","AR":"\u0628\u0648\u0631\u0643\u064a\u0646\u0627 \u0641\u0627\u0633\u0648"},{"cc":"bi","p":"257","RU":"\u0411\u0443\u0440\u0443\u043d\u0434\u0438","EN":"Burundi","AR":"\u0628\u0648\u0631\u0648\u0646\u062f\u064a"},{"cc":"bt","p":"975","RU":"\u0411\u0443\u0442\u0430\u043d","EN":"Butane","AR":"\u0627\u0644\u0628\u0648\u062a\u0627\u0646"},{"cc":"vu","p":"678","RU":"\u0412\u0430\u043d\u0443\u0430\u0442\u0443","EN":"Vanuatu","AR":"\u0641\u0627\u0646\u0648\u0627\u062a\u0648"},{"cc":"va","p":"379","RU":"\u0412\u0430\u0442\u0438\u043a\u0430\u043d","EN":"Vatican","AR":"\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0641\u0627\u062a\u064a\u0643\u0627\u0646"},{"cc":"gb","p":"44","RU":"\u0412\u0435\u043b\u0438\u043a\u043e\u0431\u0440\u0438\u0442\u0430\u043d\u0438\u044f","EN":"United Kingdom","AR":"\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629"},{"cc":"hu","p":"36","RU":"\u0412\u0435\u043d\u0433\u0440\u0438\u044f","EN":"Hungary","AR":"\u0647\u0646\u063a\u0627\u0631\u064a\u0627"},{"cc":"ve","p":"58","RU":"\u0412\u0435\u043d\u0435\u0441\u0443\u044d\u043b\u0430","EN":"Venezuela","AR":"\u0641\u0646\u0632\u0648\u064a\u0644\u0627"},{"cc":"vi","p":"1340","RU":"\u0412\u0438\u0440\u0433\u0438\u043d\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430 (\u0421\u0428\u0410)","EN":"Virgin Islands (US)","AR":"\u062c\u0632\u0631 \u0641\u064a\u0631\u062c\u0646 (\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629)"},{"cc":"um","p":"1","RU":"\u0412\u043d\u0435\u0448\u043d\u0438\u0435 \u043c\u0430\u043b\u044b\u0435 \u043e\u0441\u0442\u0440\u043e\u0432\u0430 (\u0421\u0428\u0410)","EN":"External small islands (USA)","AR":"\u0627\u0644\u062c\u0632\u0631 \u0627\u0644\u0635\u063a\u064a\u0631\u0629 \u0627\u0644\u062e\u0627\u0631\u062c\u064a\u0629 (\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629 \u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a\u0629)"},{"cc":"tl","p":"670","RU":"\u0412\u043e\u0441\u0442\u043e\u0447\u043d\u044b\u0439 \u0422\u0438\u043c\u043e\u0440","EN":"East Timor","AR":"\u062a\u064a\u0645\u0648\u0631 \u0627\u0644\u0634\u0631\u0642\u064a\u0629"},{"cc":"vn","p":"84","RU":"\u0412\u044c\u0435\u0442\u043d\u0430\u043c","EN":"Vietnam","AR":"\u0641\u064a\u062a\u0646\u0627\u0645"},{"cc":"ga","p":"241","RU":"\u0413\u0430\u0431\u043e\u043d","EN":"Gabon","AR":"\u0627\u0644\u063a\u0627\u0628\u0648\u0646"},{"cc":"ht","p":"509","RU":"\u0413\u0430\u0438\u0442\u0438","EN":"Haiti","AR":"\u0647\u0627\u064a\u062a\u064a"},{"cc":"gy","p":"592","RU":"\u0413\u0430\u0439\u0430\u043d\u0430","EN":"Guyana","AR":"\u063a\u064a\u0627\u0646\u0627"},{"cc":"gm","p":"220","RU":"\u0413\u0430\u043c\u0431\u0438\u044f","EN":"Gambia","AR":"\u063a\u0627\u0645\u0628\u064a\u0627"},{"cc":"gh","p":"233","RU":"\u0413\u0430\u043d\u0430","EN":"Ghana","AR":"\u063a\u0627\u0646\u0627"},{"cc":"gp","p":"590","RU":"\u0413\u0432\u0430\u0434\u0435\u043b\u0443\u043f\u0430","EN":"Guadeloupe","AR":"\u062c\u0648\u0627\u062f\u0644\u0648\u0628"},{"cc":"gt","p":"502","RU":"\u0413\u0432\u0430\u0442\u0435\u043c\u0430\u043b\u0430","EN":"Guatemala","AR":"\u063a\u0648\u0627\u062a\u064a\u0645\u0627\u0644\u0627"},{"cc":"gn","p":"224","RU":"\u0413\u0432\u0438\u043d\u0435\u044f","EN":"Guinea","AR":"\u063a\u064a\u0646\u064a\u0627"},{"cc":"gw","p":"245","RU":"\u0413\u0432\u0438\u043d\u0435\u044f-\u0411\u0438\u0441\u0430\u0443","EN":"Guinea-Bissau","AR":"\u063a\u064a\u0646\u064a\u0627 \u0628\u064a\u0633\u0627\u0648"},{"cc":"de","p":"49","RU":"\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f","EN":"Germany","AR":"\u0623\u0644\u0645\u0627\u0646\u064a\u0627"},{"cc":"gi","p":"350","RU":"\u0413\u0438\u0431\u0440\u0430\u043b\u0442\u0430\u0440","EN":"Gibraltar","AR":"\u062c\u0628\u0644 \u0637\u0627\u0631\u0642"},{"cc":"hn","p":"504","RU":"\u0413\u043e\u043d\u0434\u0443\u0440\u0430\u0441","EN":"Honduras","AR":"\u0647\u0646\u062f\u0648\u0631\u0627\u0633"},{"cc":"hk","p":"852","RU":"\u0413\u043e\u043d\u043a\u043e\u043d\u0433","EN":"Hong Kong","AR":"\u0647\u0648\u0646\u063a \u0643\u0648\u0646\u063a"},{"cc":"gd","p":"1473","RU":"\u0413\u0440\u0435\u043d\u0430\u0434\u0430","EN":"Grenada","AR":"\u063a\u0631\u064a\u0646\u0627\u062f\u0627"},{"cc":"gl","p":"299","RU":"\u0413\u0440\u0435\u043d\u043b\u0430\u043d\u0434\u0438\u044f","EN":"Greenland","AR":"\u063a\u0631\u064a\u0646\u0644\u0627\u0646\u062f"},{"cc":"gr","p":"30","RU":"\u0413\u0440\u0435\u0446\u0438\u044f","EN":"Greece","AR":"\u064a\u0648\u0646\u0627\u0646"},{"cc":"ge","p":"995","RU":"\u0413\u0440\u0443\u0437\u0438\u044f","EN":"Georgia","AR":"\u062c\u0648\u0631\u062c\u064a\u0627"},{"cc":"gu","p":"1671","RU":"\u0413\u0443\u0430\u043c","EN":"Guam","AR":"\u063a\u0648\u0627\u0645"},{"cc":"dk","p":"45","RU":"\u0414\u0430\u043d\u0438\u044f","EN":"Denmark","AR":"\u0627\u0644\u062f\u0646\u0645\u0627\u0631\u0643"},{"cc":"cd","p":"243","RU":"\u0414\u0435\u043c\u043e\u043a\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043d\u0433\u043e","EN":"Democratic Republic of the Congo","AR":"\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0627\u0644\u0643\u0648\u0646\u063a\u0648 \u0627\u0644\u062f\u064a\u0645\u0642\u0631\u0627\u0637\u064a\u0629"},{"cc":"dj","p":"253","RU":"\u0414\u0436\u0438\u0431\u0443\u0442\u0438","EN":"Djibouti","AR":"\u062c\u064a\u0628\u0648\u062a\u064a"},{"cc":"dm","p":"1767","RU":"\u0414\u043e\u043c\u0438\u043d\u0438\u043a\u0430","EN":"Dominica","AR":"\u062f\u0648\u0645\u064a\u0646\u064a\u0643\u0627"},{"cc":"do","p":"1809","RU":"\u0414\u043e\u043c\u0438\u043d\u0438\u043a\u0430\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430","EN":"Dominican Republic","AR":"\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0627\u0644\u062f\u0648\u0645\u064a\u0646\u064a\u0643\u0627\u0646"},{"cc":"eg","p":"20","RU":"\u0415\u0433\u0438\u043f\u0435\u0442","EN":"Egypt","AR":"\u0645\u0635\u0631"},{"cc":"zm","p":"260","RU":"\u0417\u0430\u043c\u0431\u0438\u044f","EN":"Zambia","AR":"\u0632\u0627\u0645\u0628\u064a\u0627"},{"cc":"zw","p":"263","RU":"\u0417\u0438\u043c\u0431\u0430\u0431\u0432\u0435","EN":"Zimbabwe","AR":"\u0632\u064a\u0645\u0628\u0627\u0628\u0648\u064a"},{"cc":"il","p":"972","RU":"\u0418\u0437\u0440\u0430\u0438\u043b\u044c","EN":"Israel","AR":"\u0625\u0633\u0631\u0627\u0626\u064a\u0644"},{"cc":"in","p":"91","RU":"\u0418\u043d\u0434\u0438\u044f","EN":"India","AR":"\u0627\u0644\u0647\u0646\u062f"},{"cc":"id","p":"62","RU":"\u0418\u043d\u0434\u043e\u043d\u0435\u0437\u0438\u044f","EN":"Indonesia","AR":"\u0623\u0646\u062f\u0648\u0646\u064a\u0633\u064a\u0627"},{"cc":"jo","p":"962","RU":"\u0418\u043e\u0440\u0434\u0430\u043d\u0438\u044f","EN":"Jordan","AR":"\u0627\u0644\u0623\u0631\u062f\u0646"},{"cc":"iq","p":"964","RU":"\u0418\u0440\u0430\u043a","EN":"Iraq","AR":"\u0627\u0644\u0639\u0631\u0627\u0642"},{"cc":"ir","p":"98","RU":"\u0418\u0440\u0430\u043d","EN":"Iran","AR":"\u0625\u064a\u0631\u0627\u0646"},{"cc":"ie","p":"353","RU":"\u0418\u0440\u043b\u0430\u043d\u0434\u0438\u044f","EN":"Ireland","AR":"\u0623\u064a\u0631\u0644\u0646\u062f\u0627"},{"cc":"is","p":"354","RU":"\u0418\u0441\u043b\u0430\u043d\u0434\u0438\u044f","EN":"Iceland","AR":"\u0623\u064a\u0633\u0644\u0646\u062f\u0627"},{"cc":"es","p":"34","RU":"\u0418\u0441\u043f\u0430\u043d\u0438\u044f","EN":"Spain","AR":"\u0625\u0633\u0628\u0627\u0646\u064a\u0627"},{"cc":"it","p":"39","RU":"\u0418\u0442\u0430\u043b\u0438\u044f","EN":"Italy","AR":"\u0625\u064a\u0637\u0627\u0644\u064a\u0627"},{"cc":"ye","p":"967","RU":"\u0419\u0435\u043c\u0435\u043d","EN":"Yemen","AR":"\u064a\u0645\u0646\u064a"},{"cc":"kz","p":"7","RU":"\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d","EN":"Kazakhstan","AR":"\u0643\u0627\u0632\u0627\u062e\u0633\u062a\u0627\u0646"},{"cc":"ky","p":"1345","RU":"\u041a\u0430\u0439\u043c\u0430\u043d\u043e\u0432\u044b \u041e\u0441\u0442\u0440\u043e\u0432\u0430","EN":"Cayman islands","AR":"\u062c\u0632\u0631 \u0643\u0627\u064a\u0645\u0627\u0646"},{"cc":"kh","p":"855","RU":"\u041a\u0430\u043c\u0431\u043e\u0434\u0436\u0430","EN":"Cambodia","AR":"\u0643\u0645\u0628\u0648\u062f\u064a\u0627"},{"cc":"cm","p":"237","RU":"\u041a\u0430\u043c\u0435\u0440\u0443\u043d","EN":"Cameroon","AR":"\u0627\u0644\u0643\u0627\u0645\u064a\u0631\u0648\u0646"},{"cc":"ca","p":"1","RU":"\u041a\u0430\u043d\u0430\u0434\u0430","EN":"Canada","AR":"\u0643\u0646\u062f\u0627"},{"cc":"qa","p":"974","RU":"\u041a\u0430\u0442\u0430\u0440","EN":"Qatar","AR":"\u0642\u0637\u0631"},{"cc":"ke","p":"254","RU":"\u041a\u0435\u043d\u0438\u044f","EN":"Kenya","AR":"\u0643\u064a\u0646\u064a\u0627"},{"cc":"cy","p":"357","RU":"\u041a\u0438\u043f\u0440","EN":"Cyprus","AR":"\u0642\u0628\u0631\u0635"},{"cc":"kg","p":"996","RU":"\u041a\u0438\u0440\u0433\u0438\u0437\u0438\u044f","EN":"Kyrgyzstan","AR":"\u0642\u0631\u063a\u064a\u0632\u0633\u062a\u0627\u0646"},{"cc":"ki","p":"686","RU":"\u041a\u0438\u0440\u0438\u0431\u0430\u0442\u0438","EN":"Kiribati","AR":"\u0643\u064a\u0631\u064a\u0628\u0627\u0633"},{"cc":"cn","p":"86","RU":"\u041a\u0438\u0442\u0430\u0439","EN":"China","AR":"\u0627\u0644\u0635\u064a\u0646"},{"cc":"cc","p":"61","RU":"\u041a\u043e\u043a\u043e\u0441\u043e\u0432\u044b\u0435 \u043e-\u0432\u0430","EN":"Cocos","AR":"\u0643\u0648\u0643\u0648\u0633"},{"cc":"co","p":"57","RU":"\u041a\u043e\u043b\u0443\u043c\u0431\u0438\u044f","EN":"Colombia","AR":"\u0643\u0648\u0644\u0648\u0645\u0628\u064a\u0627"},{"cc":"km","p":"269","RU":"\u041a\u043e\u043c\u043e\u0440\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"Comoros","AR":"\u062c\u0632\u0631 \u0627\u0644\u0642\u0645\u0631"},{"cc":"cg","p":"242","RU":"\u041a\u043e\u043d\u0433\u043e","EN":"Congo","AR":"\u0627\u0644\u0643\u0648\u0646\u063a\u0648"},{"cc":"kp","p":"850","RU":"\u041a\u043e\u0440\u0435\u0439\u0441\u043a\u0430\u044f \u041d\u0430\u0440\u043e\u0434\u043d\u043e-\u0414\u0435\u043c\u043e\u043a\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430","EN":"Korea, Democratic People's Republic of","AR":"\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0643\u0648\u0631\u064a\u0627 \u0627\u0644\u062f\u064a\u0645\u0642\u0631\u0627\u0637\u064a\u0629 \u0627\u0644\u0634\u0639\u0628\u064a\u0629"},{"cc":"cr","p":"506","RU":"\u041a\u043e\u0441\u0442\u0430-\u0420\u0438\u043a\u0430","EN":"Costa Rica","AR":"\u0643\u0648\u0633\u062a\u0627\u0631\u064a\u0643\u0627"},{"cc":"ci","p":"225","RU":"\u041a\u043e\u0442 \u0434\u2019\u0418\u0432\u0443\u0430\u0440","EN":"Cote d 'Ivoire","AR":"\u0643\u0648\u062a \u062f\u064a\u0641\u0648\u0627\u0631"},{"cc":"cu","p":"53","RU":"\u041a\u0443\u0431\u0430","EN":"Cuba","AR":"\u0643\u0648\u0628\u0627"},{"cc":"kw","p":"965","RU":"\u041a\u0443\u0432\u0435\u0439\u0442","EN":"Kuwait","AR":"\u0627\u0644\u0643\u0648\u064a\u062a"},{"cc":"cw","p":"599","RU":"\u041a\u044e\u0440\u0430\u0441\u0430\u043e","EN":"Cura\u00e7ao","AR":"\u0643\u0648\u0631\u0627\u0643\u0627\u0648"},{"cc":"la","p":"856","RU":"\u041b\u0430\u043e\u0441","EN":"Laos","AR":"\u0644\u0627\u0648\u0633"},{"cc":"lv","p":"371","RU":"\u041b\u0430\u0442\u0432\u0438\u044f","EN":"Latvia","AR":"\u0644\u0627\u062a\u0641\u064a\u0627"},{"cc":"ls","p":"266","RU":"\u041b\u0435\u0441\u043e\u0442\u043e","EN":"Lesotho","AR":"\u0644\u064a\u0633\u0648\u062a\u0648"},{"cc":"lr","p":"231","RU":"\u041b\u0438\u0431\u0435\u0440\u0438\u044f","EN":"Liberia","AR":"\u0644\u064a\u0628\u064a\u0631\u064a\u0627"},{"cc":"lb","p":"961","RU":"\u041b\u0438\u0432\u0430\u043d","EN":"Lebanon","AR":"\u0644\u0628\u0646\u0627\u0646"},{"cc":"ly","p":"218","RU":"\u041b\u0438\u0432\u0438\u044f","EN":"Libya","AR":"\u0644\u064a\u0628\u064a\u0627"},{"cc":"lt","p":"370","RU":"\u041b\u0438\u0442\u0432\u0430","EN":"Lithuania","AR":"\u0644\u064a\u062a\u0648\u0627\u0646\u064a\u0627"},{"cc":"li","p":"423","RU":"\u041b\u0438\u0445\u0442\u0435\u043d\u0448\u0442\u0435\u0439\u043d","EN":"Liechtenstein","AR":"\u0644\u064a\u062e\u062a\u0646\u0634\u062a\u0627\u064a\u0646"},{"cc":"lu","p":"352","RU":"\u041b\u044e\u043a\u0441\u0435\u043c\u0431\u0443\u0440\u0433","EN":"Luxembourg","AR":"\u0644\u0648\u0643\u0633\u0645\u0628\u0648\u0631\u063a"},{"cc":"mu","p":"230","RU":"\u041c\u0430\u0432\u0440\u0438\u043a\u0438\u0439","EN":"Mauritius","AR":"\u0645\u0648\u0631\u064a\u0634\u064a\u0648\u0633"},{"cc":"mr","p":"222","RU":"\u041c\u0430\u0432\u0440\u0438\u0442\u0430\u043d\u0438\u044f","EN":"Mauritania","AR":"\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627"},{"cc":"mg","p":"261","RU":"\u041c\u0430\u0434\u0430\u0433\u0430\u0441\u043a\u0430\u0440","EN":"Madagascar","AR":"\u0645\u062f\u063a\u0634\u0642\u0631"},{"cc":"yt","p":"262","RU":"\u041c\u0430\u0439\u043e\u0442\u0442\u0430","EN":"Mayotte","AR":"\u0645\u0627\u064a\u0648\u062a"},{"cc":"mk","p":"389","RU":"\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u044f","EN":"Macedonia","AR":"\u0645\u0642\u062f\u0648\u0646\u064a\u0627"},{"cc":"mw","p":"265","RU":"\u041c\u0430\u043b\u0430\u0432\u0438","EN":"Malawi","AR":"\u0645\u0627\u0644\u0627\u0648\u064a"},{"cc":"my","p":"60","RU":"\u041c\u0430\u043b\u0430\u0439\u0437\u0438\u044f","EN":"Malaysia","AR":"\u0645\u0627\u0644\u064a\u0632\u064a\u0627"},{"cc":"ml","p":"223","RU":"\u041c\u0430\u043b\u0438","EN":"Mali","AR":"\u0645\u0627\u0644\u064a"},{"cc":"mv","p":"960","RU":"\u041c\u0430\u043b\u044c\u0434\u0438\u0432\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"Maldives","AR":"\u062c\u0632\u0631 \u0627\u0644\u0645\u0627\u0644\u062f\u064a\u0641"},{"cc":"mt","p":"356","RU":"\u041c\u0430\u043b\u044c\u0442\u0430","EN":"Malta","AR":"\u0645\u0627\u0644\u0637\u0627"},{"cc":"ma","p":"212","RU":"\u041c\u0430\u0440\u043e\u043a\u043a\u043e","EN":"Morocco","AR":"\u0627\u0644\u0645\u063a\u0631\u0628"},{"cc":"mq","p":"596","RU":"\u041c\u0430\u0440\u0442\u0438\u043d\u0438\u043a\u0430","EN":"Martinique","AR":"\u0645\u0627\u0631\u062a\u064a\u0646\u064a\u0643"},{"cc":"mh","p":"692","RU":"\u041c\u0430\u0440\u0448\u0430\u043b\u043b\u043e\u0432\u044b \u043e-\u0432\u0430","EN":"Marshall Islands","AR":"\u062c\u0632\u0631 \u0645\u0627\u0631\u0634\u0627\u0644"},{"cc":"mx","p":"52","RU":"\u041c\u0435\u043a\u0441\u0438\u043a\u0430","EN":"Mexico","AR":"\u0627\u0644\u0645\u0643\u0633\u064a\u0643"},{"cc":"fm","p":"691","RU":"\u041c\u0438\u043a\u0440\u043e\u043d\u0435\u0437\u0438\u044f","EN":"Micronesia","AR":"\u0645\u064a\u0643\u0631\u0648\u0646\u064a\u0632\u064a\u0627"},{"cc":"mz","p":"258","RU":"\u041c\u043e\u0437\u0430\u043c\u0431\u0438\u043a","EN":"Mozambique","AR":"\u0645\u0648\u0632\u0645\u0628\u064a\u0642"},{"cc":"md","p":"373","RU":"\u041c\u043e\u043b\u0434\u0430\u0432\u0438\u044f","EN":"Moldova","AR":"\u0645\u0648\u0644\u062f\u0627\u0641\u064a\u0627"},{"cc":"mc","p":"377","RU":"\u041c\u043e\u043d\u0430\u043a\u043e","EN":"Monaco","AR":"\u0645\u0648\u0646\u0627\u0643\u0648"},{"cc":"mn","p":"976","RU":"\u041c\u043e\u043d\u0433\u043e\u043b\u0438\u044f","EN":"Mongolia","AR":"\u0645\u0646\u063a\u0648\u0644\u064a\u0627"},{"cc":"ms","p":"1664","RU":"\u041c\u043e\u043d\u0441\u0435\u0440\u0440\u0430\u0442","EN":"Montserrat","AR":"\u0645\u0648\u0646\u062a\u0633\u064a\u0631\u0627\u062a"},{"cc":"mm","p":"95","RU":"\u041c\u044c\u044f\u043d\u043c\u0430","EN":"Myanmar","AR":"\u0645\u064a\u0627\u0646\u0645\u0627\u0631"},{"cc":"na","p":"264","RU":"\u041d\u0430\u043c\u0438\u0431\u0438\u044f","EN":"Namibia","AR":"\u0646\u0627\u0645\u064a\u0628\u064a\u0627"},{"cc":"nr","p":"674","RU":"\u041d\u0430\u0443\u0440\u0443","EN":"Nauru","AR":"\u0646\u0627\u0648\u0631\u0648"},{"cc":"np","p":"977","RU":"\u041d\u0435\u043f\u0430\u043b","EN":"Nepal","AR":"\u0646\u064a\u0628\u0627\u0644"},{"cc":"ne","p":"227","RU":"\u041d\u0438\u0433\u0435\u0440","EN":"Niger","AR":"\u0627\u0644\u0646\u064a\u062c\u0631"},{"cc":"ng","p":"234","RU":"\u041d\u0438\u0433\u0435\u0440\u0438\u044f","EN":"Nigeria","AR":"\u0646\u064a\u062c\u064a\u0631\u064a\u0627"},{"cc":"nl","p":"31","RU":"\u041d\u0438\u0434\u0435\u0440\u043b\u0430\u043d\u0434\u044b","EN":"Netherlands","AR":"\u0647\u0648\u0644\u0646\u062f\u0627"},{"cc":"ni","p":"505","RU":"\u041d\u0438\u043a\u0430\u0440\u0430\u0433\u0443\u0430","EN":"Nicaragua","AR":"\u0646\u064a\u0643\u0627\u0631\u0627\u063a\u0648\u0627"},{"cc":"nu","p":"683","RU":"\u041d\u0438\u0443\u0435","EN":"Niue","AR":"\u0646\u064a\u0648\u064a"},{"cc":"nz","p":"64","RU":"\u041d\u043e\u0432\u0430\u044f \u0417\u0435\u043b\u0430\u043d\u0434\u0438\u044f","EN":"New Zealand","AR":"\u0646\u064a\u0648\u0632\u064a\u0644\u0646\u062f\u0627"},{"cc":"nc","p":"687","RU":"\u041d\u043e\u0432\u0430\u044f \u041a\u0430\u043b\u0435\u0434\u043e\u043d\u0438\u044f","EN":"New Caledonia","AR":"\u0643\u0627\u0644\u064a\u062f\u0648\u0646\u064a\u0627 \u0627\u0644\u062c\u062f\u064a\u062f\u0629"},{"cc":"no","p":"47","RU":"\u041d\u043e\u0440\u0432\u0435\u0433\u0438\u044f","EN":"Norway","AR":"\u0627\u0644\u0646\u0631\u0648\u064a\u062c"},{"cc":"AR","p":"971","RU":"\u041e\u0410\u042d","EN":"United Arab Emirates","AR":"\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629"},{"cc":"om","p":"968","RU":"\u041e\u043c\u0430\u043d","EN":"Oman","AR":"\u0639\u0645\u0627\u0646"},{"cc":"nf","p":"672","RU":"\u041e\u0441\u0442\u0440\u043e\u0432 \u041d\u043e\u0440\u0444\u043e\u043b\u043a","EN":"Norfolk Island","AR":"\u062c\u0632\u064a\u0631\u0629 \u0646\u0648\u0631\u0641\u0648\u0644\u0643"},{"cc":"cx","p":"61","RU":"\u041e\u0441\u0442\u0440\u043e\u0432 \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430","EN":"Christmas Island","AR":"\u062c\u0632\u064a\u0631\u0629 \u0627\u0644\u0643\u0631\u064a\u0633\u0645\u0627\u0633"},{"cc":"bl","p":"590","RU":"\u041e\u0441\u0442\u0440\u043e\u0432 \u0421\u0432\u044f\u0442\u043e\u0433\u043e \u0411\u0430\u0440\u0442\u043e\u043b\u043e\u043c\u0435\u044f","EN":"Saint Barth\u00e9lemy Island","AR":"\u062c\u0632\u064a\u0631\u0629 \u0633\u0627\u0646\u062a \u0628\u0627\u0631\u062a\u064a\u0644\u064a\u0645\u064a"},{"cc":"mf","p":"590","RU":"\u041e\u0441\u0442\u0440\u043e\u0432 \u0421\u0432\u044f\u0442\u043e\u0433\u043e \u041c\u0430\u0440\u0442\u0438\u043d\u0430","EN":"Saint Martin's Island","AR":"\u062c\u0632\u064a\u0631\u0629 \u0633\u0627\u0646\u062a \u0645\u0627\u0631\u062a\u0646"},{"cc":"sh","p":"290","RU":"\u041e\u0441\u0442\u0440\u043e\u0432 \u0421\u0432\u044f\u0442\u043e\u0439 \u0415\u043b\u0435\u043d\u044b","EN":"Saint Helena","AR":"\u0633\u0627\u0646\u062a \u0647\u064a\u0644\u0627\u0646\u0629"},{"cc":"cv","p":"238","RU":"\u041e\u0441\u0442\u0440\u043e\u0432\u0430 \u0417\u0435\u043b\u0435\u043d\u043e\u0433\u043e \u041c\u044b\u0441\u0430","EN":"Cape Verde","AR":"\u062c\u0632\u0631 \u0627\u0644\u0631\u0623\u0633 \u0627\u0644\u0623\u062e\u0636\u0631"},{"cc":"ck","p":"682","RU":"\u041e\u0441\u0442\u0440\u043e\u0432\u0430 \u041a\u0443\u043a\u0430","EN":"Cook Islands","AR":"\u062c\u0632\u0631 \u0643\u0648\u0643"},{"cc":"tc","p":"1649","RU":"\u041e\u0441\u0442\u0440\u043e\u0432\u0430 \u0422\u0451\u0440\u043a\u0441 \u0438 \u041a\u0430\u0439\u043a\u043e\u0441","EN":"Turks and Caicos Islands","AR":"\u062c\u0632\u0631 \u062a\u0631\u0643\u0633 \u0648\u0643\u0627\u064a\u0643\u0648\u0633"},{"cc":"wf","p":"681","RU":"\u041e\u0441\u0442\u0440\u043e\u0432\u0430 \u0423\u043e\u043b\u043b\u0438\u0441 \u0438 \u0424\u0443\u0442\u0443\u043d\u0430","EN":"Wallis and Futuna Islands","AR":"\u062c\u0632\u0631 \u0648\u0627\u0644\u064a\u0633 \u0648\u0641\u0648\u062a\u0648\u0646\u0627"},{"cc":"pk","p":"92","RU":"\u041f\u0430\u043a\u0438\u0441\u0442\u0430\u043d","EN":"Pakistan","AR":"\u0628\u0627\u0643\u0633\u062a\u0627\u0646"},{"cc":"pw","p":"680","RU":"\u041f\u0430\u043b\u0430\u0443","EN":"Palau","AR":"\u0628\u0627\u0644\u0627\u0648"},{"cc":"ps","p":"970","RU":"\u041f\u0430\u043b\u0435\u0441\u0442\u0438\u043d\u0441\u043a\u0438\u0435 \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u0438","EN":"Palestinian Territories","AR":"\u0627\u0644\u0623\u0631\u0627\u0636\u064a \u0627\u0644\u0641\u0644\u0633\u0637\u064a\u0646\u064a\u0629"},{"cc":"pa","p":"507","RU":"\u041f\u0430\u043d\u0430\u043c\u0430","EN":"Panama","AR":"\u0628\u0646\u0627\u0645\u0627"},{"cc":"pg","p":"675","RU":"\u041f\u0430\u043f\u0443\u0430 \u2013 \u041d\u043e\u0432\u0430\u044f \u0413\u0432\u0438\u043d\u0435\u044f","EN":"Papua New Guinea","AR":"\u0628\u0627\u0628\u0648\u0627 \u063a\u064a\u0646\u064a\u0627 \u0627\u0644\u062c\u062f\u064a\u062f\u0629"},{"cc":"py","p":"595","RU":"\u041f\u0430\u0440\u0430\u0433\u0432\u0430\u0439","EN":"Paraguay","AR":"\u0628\u0627\u0631\u0627\u063a\u0648\u0627\u064a"},{"cc":"pe","p":"51","RU":"\u041f\u0435\u0440\u0443","EN":"Peru","AR":"\u0628\u064a\u0631\u0648"},{"cc":"pn","p":"870","RU":"\u041f\u0438\u0442\u043a\u044d\u0440\u043d","EN":"Pitcairn","AR":"\u0628\u064a\u062a\u0643\u064a\u0631\u0646"},{"cc":"pl","p":"48","RU":"\u041f\u043e\u043b\u044c\u0448\u0430","EN":"Poland","AR":"\u0628\u0648\u0644\u0646\u062f\u0627"},{"cc":"pt","p":"351","RU":"\u041f\u043e\u0440\u0442\u0443\u0433\u0430\u043b\u0438\u044f","EN":"Portugal","AR":"\u0627\u0644\u0628\u0631\u062a\u063a\u0627\u0644"},{"cc":"pr","p":"1787","RU":"\u041f\u0443\u044d\u0440\u0442\u043e-\u0420\u0438\u043a\u043e","EN":"Puerto Rico","AR":"\u0628\u0648\u0631\u062a\u0648\u0631\u064a\u0643\u0648"},{"cc":"kr","p":"82","RU":"\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u0440\u0435\u044f","EN":"The Republic of Korea","AR":"\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0643\u0648\u0631\u064a\u0627"},{"cc":"re","p":"262","RU":"\u0420\u0435\u044e\u043d\u044c\u043e\u043d","EN":"Reunion","AR":"\u062c\u0645\u0639 \u0634\u0645\u0644"},{"cc":"ru","p":"7","RU":"\u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u0430\u044f \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u044f","EN":"Russian Federation","AR":"\u0627\u0644\u0627\u062a\u062d\u0627\u062f \u0627\u0644\u0631\u0648\u0633\u064a"},{"cc":"rw","p":"250","RU":"\u0420\u0443\u0430\u043d\u0434\u0430","EN":"Rwanda","AR":"\u0631\u0648\u0627\u0646\u062f\u0627"},{"cc":"ro","p":"40","RU":"\u0420\u0443\u043c\u044b\u043d\u0438\u044f","EN":"Romania","AR":"\u0631\u0648\u0645\u0627\u0646\u064a\u0627"},{"cc":"sv","p":"503","RU":"\u0421\u0430\u043b\u044c\u0432\u0430\u0434\u043e\u0440","EN":"Salvador","AR":"\u0627\u0644\u0633\u0644\u0641\u0627\u062f\u0648\u0631"},{"cc":"ws","p":"685","RU":"\u0421\u0430\u043c\u043e\u0430","EN":"Samoa","AR":"\u0633\u0627\u0645\u0648\u0627"},{"cc":"sm","p":"378","RU":"\u0421\u0430\u043d-\u041c\u0430\u0440\u0438\u043d\u043e","EN":"San marino","AR":"\u0633\u0627\u0646 \u0645\u0627\u0631\u064a\u0646\u0648"},{"cc":"st","p":"239","RU":"\u0421\u0430\u043d-\u0422\u043e\u043c\u0435 \u0438 \u041f\u0440\u0438\u043d\u0441\u0438\u043f\u0435","EN":"Sao Tome and Principe","AR":"\u0633\u0627\u0648 \u062a\u0648\u0645\u064a \u0648\u0628\u0631\u0646\u0633\u064a\u0628\u064a"},{"cc":"sa","p":"966","RU":"\u0421\u0430\u0443\u0434\u043e\u0432\u0441\u043a\u0430\u044f \u0410\u0440\u0430\u0432\u0438\u044f","EN":"Saudi Arabia","AR":"\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629"},{"cc":"sz","p":"268","RU":"\u0421\u0432\u0430\u0437\u0438\u043b\u0435\u043d\u0434","EN":"Swaziland","AR":"\u0633\u0648\u0627\u0632\u064a\u0644\u0627\u0646\u062f"},{"cc":"mp","p":"1670","RU":"\u0421\u0435\u0432\u0435\u0440\u043d\u044b\u0435 \u041c\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"Northern Mariana Islands","AR":"\u062c\u0632\u0631 \u0645\u0627\u0631\u064a\u0627\u0646\u0627 \u0627\u0644\u0634\u0645\u0627\u0644\u064a\u0629"},{"cc":"sc","p":"248","RU":"\u0421\u0435\u0439\u0448\u0435\u043b\u044b","EN":"Seychelles","AR":"\u0633\u064a\u0634\u064a\u0644"},{"cc":"pm","p":"508","RU":"\u0421\u0435\u043d-\u041f\u044c\u0435\u0440 \u0438 \u041c\u0438\u043a\u0435\u043b\u043e\u043d","EN":"Saint-Pierre and Miquelon","AR":"\u0633\u0627\u0646\u062a \u0628\u064a\u064a\u0631 \u0648\u0645\u064a\u0643\u0644\u0648\u0646"},{"cc":"sn","p":"221","RU":"\u0421\u0435\u043d\u0435\u0433\u0430\u043b","EN":"Senegal","AR":"\u0627\u0644\u0633\u0646\u063a\u0627\u0644"},{"cc":"vc","p":"1784","RU":"\u0421\u0435\u043d\u0442-\u0412\u0438\u043d\u0441\u0435\u043d\u0442 \u0438 \u0413\u0440\u0435\u043d\u0430\u0434\u0438\u043d\u044b","EN":"Saint Vincent and the Grenadines","AR":"\u0633\u0627\u0646\u062a \u0641\u0646\u0633\u0646\u062a \u0648\u062c\u0632\u0631 \u063a\u0631\u064a\u0646\u0627\u062f\u064a\u0646"},{"cc":"kn","p":"1869","RU":"\u0421\u0435\u043d\u0442-\u041a\u0438\u0442\u0441 \u0438 \u041d\u0435\u0432\u0438\u0441","EN":"Saint Kitts and Nevis","AR":"\u0633\u0627\u0646\u062a \u0643\u064a\u062a\u0633 \u0648\u0646\u064a\u0641\u064a\u0633"},{"cc":"lc","p":"1758","RU":"\u0421\u0435\u043d\u0442-\u041b\u044e\u0441\u0438\u044f","EN":"Saint Lucia","AR":"\u0633\u0627\u0646\u062a \u0644\u0648\u0633\u064a\u0627"},{"cc":"rs","p":"381","RU":"\u0421\u0435\u0440\u0431\u0438\u044f","EN":"Serbia","AR":"\u0635\u0631\u0628\u064a\u0627"},{"cc":"sg","p":"65","RU":"\u0421\u0438\u043d\u0433\u0430\u043f\u0443\u0440","EN":"Singapore","AR":"\u0633\u0646\u063a\u0627\u0641\u0648\u0631\u0629"},{"cc":"sx","p":"599","RU":"\u0421\u0438\u043d\u0442-\u041c\u0430\u0440\u0442\u0435\u043d","EN":"Sint-Marten","AR":"\u0633\u0627\u0646\u062a \u0645\u0627\u0631\u062a\u0646"},{"cc":"sy","p":"963","RU":"\u0421\u0438\u0440\u0438\u0439\u0441\u043a\u0430\u044f \u0410\u0440\u0430\u0431\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430","EN":"Syrian Arab Republic","AR":"\u0627\u0644\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0648\u0631\u064a\u0629"},{"cc":"sk","p":"421","RU":"\u0421\u043b\u043e\u0432\u0430\u043a\u0438\u044f","EN":"Slovakia","AR":"\u0633\u0644\u0648\u0641\u0627\u0643\u064a\u0627"},{"cc":"si","p":"386","RU":"\u0421\u043b\u043e\u0432\u0435\u043d\u0438\u044f","EN":"Slovenia","AR":"\u0633\u0644\u0648\u0641\u064a\u0646\u064a\u0627"},{"cc":"us","p":"1","RU":"\u0421\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u043d\u044b\u0435 \u0428\u0442\u0430\u0442\u044b","EN":"United States","AR":"\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629"},{"cc":"sb","p":"677","RU":"\u0421\u043e\u043b\u043e\u043c\u043e\u043d\u043e\u0432\u044b \u041e\u0441\u0442\u0440\u043e\u0432\u0430","EN":"Solomon islands","AR":"\u062c\u0632\u0631 \u0633\u0644\u064a\u0645\u0627\u0646"},{"cc":"so","p":"252","RU":"\u0421\u043e\u043c\u0430\u043b\u0438","EN":"Somalia","AR":"\u0627\u0644\u0635\u0648\u0645\u0627\u0644"},{"cc":"sd","p":"249","RU":"\u0421\u0443\u0434\u0430\u043d","EN":"Sudan","AR":"\u0633\u0648\u062f\u0627\u0646"},{"cc":"sr","p":"597","RU":"\u0421\u0443\u0440\u0438\u043d\u0430\u043c","EN":"Suriname","AR":"\u0633\u0648\u0631\u064a\u0646\u0627\u0645"},{"cc":"sl","p":"232","RU":"\u0421\u044c\u0435\u0440\u0440\u0430-\u041b\u0435\u043e\u043d\u0435","EN":"Sierra Leone","AR":"\u0633\u064a\u0631\u0627\u0644\u064a\u0648\u0646"},{"cc":"tj","p":"992","RU":"\u0422\u0430\u0434\u0436\u0438\u043a\u0438\u0441\u0442\u0430\u043d","EN":"Tajikistan","AR":"\u0637\u0627\u062c\u064a\u0643\u0633\u062a\u0627\u0646"},{"cc":"th","p":"66","RU":"\u0422\u0430\u0438\u043b\u0430\u043d\u0434","EN":"Thailand","AR":"\u062a\u0627\u064a\u0644\u0627\u0646\u062f"},{"cc":"tw","p":"886","RU":"\u0422\u0430\u0439\u0432\u0430\u043d\u044c","EN":"Taiwan","AR":"\u062a\u0627\u064a\u0648\u0627\u0646"},{"cc":"tz","p":"255","RU":"\u0422\u0430\u043d\u0437\u0430\u043d\u0438\u044f","EN":"Tanzania","AR":"\u062a\u0646\u0632\u0627\u0646\u064a\u0627"},{"cc":"tg","p":"228","RU":"\u0422\u043e\u0433\u043e","EN":"Togo","AR":"\u062a\u0648\u063a\u0648"},{"cc":"tk","p":"690","RU":"\u0422\u043e\u043a\u0435\u043b\u0430\u0443","EN":"Tokelau","AR":"\u062a\u0648\u0643\u064a\u0644\u0627\u0648"},{"cc":"to","p":"676","RU":"\u0422\u043e\u043d\u0433\u0430","EN":"Tonga","AR":"\u062a\u0648\u0646\u063a\u0627"},{"cc":"tt","p":"1868","RU":"\u0422\u0440\u0438\u043d\u0438\u0434\u0430\u0434 \u0438 \u0422\u043e\u0431\u0430\u0433\u043e","EN":"Trinidad and Tobago","AR":"\u062a\u0631\u064a\u0646\u064a\u062f\u0627\u062f \u0648\u062a\u0648\u0628\u0627\u063a\u0648"},{"cc":"tv","p":"688","RU":"\u0422\u0443\u0432\u0430\u043b\u0443","EN":"Tuvalu","AR":"\u062a\u0648\u0641\u0627\u0644\u0648"},{"cc":"tn","p":"216","RU":"\u0422\u0443\u043d\u0438\u0441","EN":"Tunisia","AR":"\u062a\u0648\u0646\u0633"},{"cc":"tm","p":"993","RU":"\u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d","EN":"Turkmenistan","AR":"\u062a\u0631\u0643\u0645\u0627\u0646\u0633\u062a\u0627\u0646"},{"cc":"tr","p":"90","RU":"\u0422\u0443\u0440\u0446\u0438\u044f","EN":"Turkey","AR":"\u062a\u0631\u0643\u064a\u0627"},{"cc":"ug","p":"256","RU":"\u0423\u0433\u0430\u043d\u0434\u0430","EN":"Uganda","AR":"\u0623\u0648\u063a\u0646\u062f\u0627"},{"cc":"uz","p":"998","RU":"\u0423\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u0430\u043d","EN":"Uzbekistan","AR":"\u0623\u0648\u0632\u0628\u0643\u0633\u062a\u0627\u0646"},{"cc":"ua","p":"380","RU":"\u0423\u043a\u0440\u0430\u0438\u043d\u0430","EN":"Ukraine","AR":"\u0623\u0648\u0643\u0631\u0627\u0646\u064a\u0627"},{"cc":"uy","p":"598","RU":"\u0423\u0440\u0443\u0433\u0432\u0430\u0439","EN":"Uruguay","AR":"\u0623\u0648\u0631\u0648\u063a\u0648\u0627\u064a"},{"cc":"fo","p":"298","RU":"\u0424\u0430\u0440\u0435\u0440\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"Faroe Islands","AR":"\u062c\u0632\u0631 \u0641\u0627\u0631\u0648"},{"cc":"fj","p":"679","RU":"\u0424\u0438\u0434\u0436\u0438","EN":"Fiji","AR":"\u0641\u064a\u062c\u064a"},{"cc":"ph","p":"63","RU":"\u0424\u0438\u043b\u0438\u043f\u043f\u0438\u043d\u044b","EN":"Philippines","AR":"\u0627\u0644\u0641\u0644\u0628\u064a\u0646"},{"cc":"fi","p":"358","RU":"\u0424\u0438\u043d\u043b\u044f\u043d\u0434\u0438\u044f","EN":"Finland","AR":"\u0641\u0646\u0644\u0646\u062f\u0627"},{"cc":"fk","p":"500","RU":"\u0424\u043e\u043b\u043a\u043b\u0435\u043d\u0434\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430","EN":"Falkland Islands","AR":"\u062c\u0632\u0631 \u0641\u0648\u0643\u0644\u0627\u0646\u062f"},{"cc":"fr","p":"33","RU":"\u0424\u0440\u0430\u043d\u0446\u0438\u044f","EN":"France","AR":"\u0641\u0631\u0646\u0633\u0627"},{"cc":"gf","p":"594","RU":"\u0424\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0430\u044f \u0413\u0432\u0438\u0430\u043d\u0430","EN":"French Guiana","AR":"\u063a\u064a\u0627\u0646\u0627 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629"},{"cc":"pf","p":"689","RU":"\u0424\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0430\u044f \u041f\u043e\u043b\u0438\u043d\u0435\u0437\u0438\u044f","EN":"French polynesia","AR":"\u0628\u0648\u0644\u064a\u0646\u064a\u0632\u064a\u0627 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629"},{"cc":"hr","p":"385","RU":"\u0425\u043e\u0440\u0432\u0430\u0442\u0438\u044f","EN":"Croatia","AR":"\u0643\u0631\u0648\u0627\u062a\u064a\u0627"},{"cc":"cf","p":"236","RU":"\u0426\u0410\u0420","EN":"CAR","AR":"CAR"},{"cc":"td","p":"235","RU":"\u0427\u0430\u0434","EN":"Chad","AR":"\u062a\u0634\u0627\u062f"},{"cc":"me","p":"382","RU":"\u0427\u0435\u0440\u043d\u043e\u0433\u043e\u0440\u0438\u044f","EN":"Montenegro","AR":"\u0627\u0644\u062c\u0628\u0644 \u0627\u0644\u0623\u0633\u0648\u062f"},{"cc":"cz","p":"420","RU":"\u0427\u0435\u0445\u0438\u044f","EN":"Czech Republic","AR":"\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0627\u0644\u062a\u0634\u064a\u0643"},{"cc":"cl","p":"56","RU":"\u0427\u0438\u043b\u0438","EN":"Chile","AR":"\u062a\u0634\u064a\u0644\u064a"},{"cc":"ch","p":"41","RU":"\u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u044f","EN":"Switzerland","AR":"\u0633\u0648\u064a\u0633\u0631\u0627"},{"cc":"se","p":"46","RU":"\u0428\u0432\u0435\u0446\u0438\u044f","EN":"Sweden","AR":"\u0627\u0644\u0633\u0648\u064a\u062f"},{"cc":"lk","p":"94","RU":"\u0428\u0440\u0438-\u041b\u0430\u043d\u043a\u0430","EN":"Sri Lanka","AR":"\u0633\u0631\u064a \u0644\u0627\u0646\u0643\u0627"},{"cc":"ec","p":"593","RU":"\u042d\u043a\u0432\u0430\u0434\u043e\u0440","EN":"Ecuador","AR":"\u0627\u0644\u0625\u0643\u0648\u0627\u062f\u0648\u0631"},{"cc":"gq","p":"240","RU":"\u042d\u043a\u0432\u0430\u0442\u043e\u0440\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u0413\u0432\u0438\u043d\u0435\u044f","EN":"Equatorial Guinea","AR":"\u063a\u064a\u0646\u064a\u0627 \u0627\u0644\u0627\u0633\u062a\u0648\u0627\u0626\u064a\u0629"},{"cc":"er","p":"291","RU":"\u042d\u0440\u0438\u0442\u0440\u0435\u044f","EN":"Eritrea","AR":"\u0625\u0631\u064a\u062a\u0631\u064a\u0627"},{"cc":"ee","p":"372","RU":"\u042d\u0441\u0442\u043e\u043d\u0438\u044f","EN":"Estonia","AR":"\u0627\u0633\u062a\u0648\u0646\u064a\u0627"},{"cc":"et","p":"251","RU":"\u042d\u0444\u0438\u043e\u043f\u0438\u044f","EN":"Ethiopia","AR":"\u0623\u062b\u064a\u0648\u0628\u064a\u0627"},{"cc":"za","p":"27","RU":"\u042e\u0410\u0420","EN":"South Africa","AR":"\u062c\u0646\u0648\u0628 \u0627\u0641\u0631\u064a\u0642\u064a\u0627"},{"cc":"ss","p":"211","RU":"\u042e\u0436\u043d\u044b\u0439 \u0421\u0443\u0434\u0430\u043d","EN":"South Sudan","AR":"\u062c\u0646\u0648\u0628 \u0627\u0644\u0633\u0648\u062f\u0627\u0646"},{"cc":"jm","p":"1876","RU":"\u042f\u043c\u0430\u0439\u043a\u0430","EN":"Jamaica","AR":"\u062c\u0627\u0645\u0627\u064a\u0643\u0627"},{"cc":"jp","p":"81","RU":"\u042f\u043f\u043e\u043d\u0438\u044f","EN":"Japan","AR":"\u0627\u0644\u064a\u0627\u0628\u0627\u0646"}];

var opened_phonecode={};
function initPhoneSelectors()
{
	var current_flag_block=document.querySelector('.current.flag');
	var lang="EN";
	if (current_flag_block!=null) {
		let current_lang=current_flag_block.className.replace('current flag ','');
		current_lang=current_lang.toUpperCase();
		if (current_lang!='' && (current_lang=="RU" || current_lang=="EN" || current_lang=="AR")) lang=current_lang;
	}
	/*if (typeof(CURRENT_LANG)=="undefined" || CURRENT_LANG==null || CURRENT_LANG!="RU" && CURRENT_LANG!="EN" && CURRENT_LANG!="AE") lang="EN";
	else lang=CURRENT_LANG;*/
	//sort data according to current language
	phonecodes_data.sort(function(a,b){
		if (a[lang]<b[lang]) return -1;
		else if (a[lang]>b[lang]) return 1;
		else return 0;
	});
	//prepare html code
	var options="";
	var country=ADDRESS_CODE.toLowerCase();
	var current_phone_code='';
	var current_flag_class='';
	for (var i=0;i<phonecodes_data.length;i++) {
		options+='<div onClick="setPhoneCode(this)" data-code="'+phonecodes_data[i]['p']+'" data-country="'+phonecodes_data[i][lang]+'"><span class="flag f-'+phonecodes_data[i]['cc']+'"></span> '+phonecodes_data[i][lang]+' <span class="code">+'+phonecodes_data[i]['p']+'</span></div>';
		if (country!='' && country===phonecodes_data[i]['cc']) {
			current_phone_code='+'+phonecodes_data[i]['p'];
			current_flag_class=' f-'+phonecodes_data[i]['cc'];
			}
		}

	options='<div class="country-phone-options">'+options+'</div>';
	var selector='<div class="country-phone-selector"><div class="search"><input type="text" value="" onKeyUp="phoneCodeSearch(this)"></div>'+options+'</div>';

	//get all inputs with attribute
	var phone_fields=document.querySelectorAll('input[phonecodes]');
	//var phone_fields=document.querySelectorAll('input[name="phone"]');
	for (i=0;i<phone_fields.length;i++) {
		drawPhoneSelector(phone_fields[i],selector, current_phone_code, current_flag_class);
		}
	}

function drawPhoneSelector(phone_field, selector, current_phone_code, current_flag_class) {
	var phonefield=phone_field.cloneNode();
	//phonefield.value = current_phone_code;
	phonefield.setAttribute('value',current_phone_code);
	phonefield.addEventListener('keyup',phoneCodeFind);
	phonefield.addEventListener('input', filterPhoneInput);
	phonefield.addEventListener('change', filterPhoneInput);
	
	var field=document.createElement('div');
	field.className='country-phone-field';
	field.innerHTML='<div class="country-phone-input"><div class="selected" onClick="phoneCodeSelect(this)">&nbsp;<span class="flag'+current_flag_class+'"></span></div></div>'+selector;
	field.querySelector('.country-phone-input').appendChild(phonefield);
	//replace
	var parent=phone_field.parentNode;
	parent.insertBefore(field,phone_field);
	field.setAttribute('selected-code',current_phone_code);
	parent.removeChild(phone_field);
	
	var form_phonefield=getParentTag(phonefield,'form');
	form_phonefield.addEventListener('reset',(function(f,pc,fc){ return function(){
		resetPhoneCode(f,pc,fc);
	}})(field,current_phone_code,current_flag_class));
}

function resetPhoneCode(field, current_phone_code, current_flag_class) {
	field.setAttribute('selected-code',current_phone_code);
	field.querySelector('.country-phone-input .selected span.flag').className='flag'+current_flag_class;
	
}
function phoneCodeSelect(d) {
	
	var c=d.parentNode.parentNode;
	closeAllPhoneCode(c);
	var drop=c.querySelector('.country-phone-selector');
	if (drop.style.display=='block') drop.style.display='none';
		else {
			drop.style.display='block';
			var srch=c.querySelector('.country-phone-selector .search input');
			srch.value='';
			phoneCodeSearch(srch);
			srch.focus();
			}
	}
function setPhoneCode(o) {
	var phone_code='+'+o.getAttribute('data-code');
	var class_name=o.querySelector('span.flag').className;
	var c=o.parentNode.parentNode.parentNode;
	var prev_code=c.getAttribute('selected-code');
	c.setAttribute('selected-code',phone_code);
	c.querySelector('.selected span').className=class_name;
	//set value
	var input=c.querySelector('.country-phone-input input');
	if (prev_code!='' && input.value.indexOf(prev_code)==0) input.value=input.value.replace(prev_code,phone_code);
		else input.value=phone_code+input.value;
	input.focus();
	//hide list
	c.querySelector('.country-phone-selector').style.display='none';
	}

function phoneCodeSearch(s) {
	var srch=s.value.toLowerCase();
	var options=s.parentNode.parentNode.querySelectorAll('.country-phone-options div');
	for (var i=0;i<options.length;i++)
		if (srch!='' && options[i].getAttribute('data-country').toLowerCase().indexOf(srch)<0) options[i].style.display='none';
			else options[i].style.display='block';
	}

function phoneCodeFind(e)
{
	var f=e.target || e.srcElement;
	var c=f.parentNode.parentNode;
	var srch=f.value;
	if (srch.substr(0,1)!="+") {
        c.querySelector('.selected span').className='flag';
        return false;
		}
    for (var i=srch.length-1;i>0;i--) {
    	var code=srch.substr(1,i);
    	for (var j=phonecodes_data.length-1;j>=0;j--) if (phonecodes_data[j]['p']==code) {
    		c.querySelector('.selected span').className='flag f-'+phonecodes_data[j]['cc'];
    		c.setAttribute('selected-code','+'+code);
    		return true;
    		}
    	}


	c.querySelector('.selected span').className='flag';
	return false;
	}
function closeAllPhoneCode(exclude)
{
	let phonecodes_data=document.querySelectorAll('.country-phone-field');
    for (var i=0;i<phonecodes_data.length;i++)  if (phonecodes_data[i]!=exclude) {
		const withinBoundariesSelector = event.composedPath().includes(phonecodes_data[i]);
		if ( ! withinBoundariesSelector ) {
			phonecodes_data[i].querySelector('.country-phone-selector').style.display = 'none';
			}
		}
	}	
window.addEventListener('load',function(){
	initPhoneSelectors();
	document.addEventListener('click',function(){
		closeAllPhoneCode();
	});
});