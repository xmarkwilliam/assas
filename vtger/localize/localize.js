jQuery(function() {
	function getCountryFromCookie() { 
		var name = "_vtvcn" + "=";
          	var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
               
 		return false;
	}
	jQuery('[data-regional]').each(function() {
		var country = getCountryFromCookie();
		if (country) {
			var key = country.toLowerCase();
			var val  = jQuery(this).data(key);
            		if (val) jQuery(this).text(val);
        	}
	})

	jQuery('[data-regional-val]').each(function() { 
		var country = getCountryFromCookie();
		if (country) {
			var key = country.toLowerCase();
			var val = jQuery(this).data(key);
			if (val) jQuery(this).val(val);
		}
	})

	jQuery('[data-regional-url]').each(function() {
 		var country = getCountryFromCookie();
		if (country) {
			var key = country.toLowerCase();
            		var val = jQuery(this).data(key);
            		if (val) jQuery(this).attr('href',val);
        	}
        })
});
