jQuery(document).ready(function(){
	//Get Form
	var form = jQuery('#hijri-calendar');
	
	//Messages
	var formMessages = jQuery('#form-messages');

	//Set Browser Timezone
    var timezone = jstz.determine();
	jQuery(':hidden#timezone').val(timezone.name());
	
	//Form Event Handler
	 jQuery(form).submit(function(event) {
        //Stop the browser from submitting the form.
        event.preventDefault();
		
        var tz = jQuery(':hidden#timezone').val();
		console.log('Form Submitted, Local Time Zone: '+tz);
		
		//Serialize Data
		var formData = jQuery(form).serialize();
		
		//Submit With Ajax
		jQuery.ajax({
			type: 'POST',
			url: jQuery(form).attr('action'),
			data: formData
		}).done(function(response){
			//Make sure message is success
			jQuery(formMessages).removeClass('error');
			jQuery(formMessages).addClass('success');
			
			//Set Message Text
			jQuery(formMessages).text(response);

			
		}).fail(function(data){
			//Make sure message is error
			jQuery(formMessages).removeClass('success');
			jQuery(formMessages).addClass('error');
			
			//Set Message Text
			if(data.responseText !== ''){
				jQuery(formMessages).text(data.responseText);
			} else {
				jQuery(formMessages).text('An error occured');
			}
		});
	});
});