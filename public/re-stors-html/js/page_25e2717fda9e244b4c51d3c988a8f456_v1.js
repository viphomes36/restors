
; /* Start:"a:4:{s:4:"full";s:85:"/bitrix/components/bitrix/map.google.view/templates/.default/script.js?16643561971188";s:6:"source";s:70:"/bitrix/components/bitrix/map.google.view/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (!window.BX_GMapAddPlacemark)
{
	window.BX_GMapAddPlacemark = function(arPlacemark, map_id)
	{
		var map = GLOBAL_arMapObjects[map_id];
		
		if (null == map)
			return false;

		if(!arPlacemark.LAT || !arPlacemark.LON)
			return false;

		var obPlacemark = new google.maps.Marker({
			'position': new google.maps.LatLng(arPlacemark.LAT, arPlacemark.LON),
			'map': map
		});
		
		if (BX.type.isNotEmptyString(arPlacemark.TEXT))
		{
			obPlacemark.infowin = new google.maps.InfoWindow({
				content: arPlacemark.TEXT.replace(/\n/g, '<br />')
			});
			
			google.maps.event.addListener(obPlacemark, 'click', function() {
				if (null != window['__bx_google_infowin_opened_' + map_id])
					window['__bx_google_infowin_opened_' + map_id].close();

				this.infowin.open(this.map, this);
				window['__bx_google_infowin_opened_' + map_id] = this.infowin;
			});
		}
		
		return obPlacemark;
	}
}

if (null == window.BXWaitForMap_view)
{
	function BXWaitForMap_view(map_id)
	{
		if (null == window.GLOBAL_arMapObjects)
			return;
	
		if (window.GLOBAL_arMapObjects[map_id])
			window['BX_SetPlacemarks_' + map_id]();
		else
			setTimeout('BXWaitForMap_view(\'' + map_id + '\')', 300);
	}
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:112:"/bitrix/templates/restproperty_v2/components/bitrix/system.pagenavigation/pagination_new/script.js?1665386022776";s:6:"source";s:98:"/bitrix/templates/restproperty_v2/components/bitrix/system.pagenavigation/pagination_new/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/*$(function(){

	function goPage(inputP){
		var numberPage = inputP.val(),
			getValue = location.search,
			nextPageNumber = inputP.data('pagenext'),
			nextPage = 'PAGEN_'+nextPageNumber+'='+numberPage,
			reqGet;

		if(getValue.length != 0){
			if(/PAGEN_[0-9+]=[0-9+]/g.test(getValue)){
				reqGet = getValue.replace(/PAGEN_[0-9+]=[0-9+]/g, nextPage);
			}else{
				reqGet = getValue+'&'+nextPage;
			}
		}else{
			reqGet = '?'+nextPage;
		}

		if(numberPage){
			//location.search = '?PAGEN_1='+numberPage;
			location.search = reqGet;
		}
	}

	$('.input-page').on('change', function(){
		var _inputPage = $(this);
		goPage(_inputPage);
	})

	$('.input-page').on('keyup', function(){
		var _inputPage = $(this);
		if(keyCode == 13){
			goPage(_inputPage);
		}

	})
})*/

/* End */
;; /* /bitrix/components/bitrix/map.google.view/templates/.default/script.js?16643561971188*/
; /* /bitrix/templates/restproperty_v2/components/bitrix/system.pagenavigation/pagination_new/script.js?1665386022776*/
