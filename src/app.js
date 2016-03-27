$(document).ready(function(){
	
	console.log('doc is loaded and ready');

	$('.option').on('click', function(event){ // Attach on click to side options
		console.log('clicked on  -->', this.textContent, event);
	});

	$('.domNode').on('click', function(event){ // Attach on click event to current node
		console.log('current focus on  -->', this, event);
	});


	


	var dragHandle = dragula({
	
	  isContainer: function (el) {
	    return false; // only elements in drake.containers will be taken into account
	  },
	  moves: function (el, source, handle, sibling) {
	    return true; // elements are always draggable by default
	  },
	  accepts: function (el, target, source, sibling) {
	    return true; // elements can be dropped in any of the `containers` by default
	  },
	  invalid: function (el, handle) {
	    return false; // don't prevent any drags from initiating by default
	  },
	  containers: [document.querySelector('.sideNav'), document.querySelector('.mainSec')],
	  direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
	  copy: false,                       // elements are moved by default, not copied
	  copySortSource: false,             // elements in copy-source containers can be reordered
	  revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
	  removeOnSpill: false,              // spilling will `.remove` the element, if this is true
	  mirrorContainer: document.body,    // set the element that gets mirror elements appended
	  ignoreInputTextSelection: true     // allows users to select input text, see details below
	});

	
	var self = this;
	self.timerCount = 30;
		
	$('#start').on('click', function(){
		console.log('click handler')
		self.intervalHandle = setInterval(function(){
							if(self.timerCount > 0){
								$('#timer').text('00:'+self.timerCount);
								self.timerCount--;
							}
						},1000);
	});

	$('#stop').on('click', function(){
		window.clearInterval(self.intervalHandle);	
		if(self.checkSolutions()){
			$('.result').css('background', 'green');
		}else{
			$('.result').css('background', 'red');
		}
	});

	self.checkSolutions = function(){
		var localScope = this;
		localScope.solArr = [];
		localScope.flag = "";
		localScope.returnVal = true;
		var domNode = $('.sideNav').children(); // Get children
		
		domNode.each(function(index, item){
			
			if(index === 0){
				localScope.flag = item.getAttribute('name').split('_')[0];
			}
			if(item.getAttribute('name').split('_')[0] !== localScope.flag){
				localScope.returnVal = false;
			}
		});	

		if(localScope.returnVal && domNode.length === 4){ // Four sets
			return true;
		}else{
			return false;
		}	

	}


});