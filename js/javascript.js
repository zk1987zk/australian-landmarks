	function sendImageBack(i) {
		//	alert("hello " + i);

		newImage.width = 180;
		newImage.height = 180;
		$("#imageBox").append(newImage);


	}

	function moveImage(i) {
		imagePath = i.src;
		if (imagePath.src != "") {
			

			newImage = new Image();
			newImage.src = imagePath;
			newImage.width = 100;
			newImage.height = 100;
			newImage.onclick = function() {
				sendImageBack(i.id);
			};



			$("#timelineBox").append(newImage);

		}
	}



	$(document).ready(function() {


		$(".draggable").draggable({
			cursor: "pointer",
			revert: "invalid"
		});
		$("#drop").droppable({
			accept: ".draggable",
			drop: function(event, ui) {
				console.log("drop");
				$(this).removeClass("border").removeClass("over");
				var dropped = ui.draggable;
				var droppedOn = $(this);
				$(dropped).detach().css({
					top: 0,
					left: 0
				}).appendTo(droppedOn);


			},
			over: function(event, elem) {
				$(this).addClass("over");
				console.log("over");
			},
			out: function(event, elem) {
				$(this).removeClass("over");
			}
		});
		$("#drop").sortable();

		$("#origin").droppable({
			accept: ".draggable",
			drop: function(event, ui) {
				console.log("drop");
				$(this).removeClass("border").removeClass("over");
				var dropped = ui.draggable;
				var droppedOn = $(this);
				$(dropped).detach().css({
					top: 0,
					left: 0
				}).appendTo(droppedOn);


			}
		});


	});



	function DisplayDate() {
		//put the current date into the webpage by click the button
		document.getElementById("demo").innerHTML = Date();
	}

	function validateForm() {
		//validate email address.
		var x = document.forms["yourcontact"]["email"].value;
		var atpos = x.indexOf("@");
		var dotpos = x.lastIndexOf(".");
		if (atpos < 4 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
			alert("Invalid information, Enter again please");
			return false;
		}
	}

	$("#droppable").droppable({
	activeCLass: 'ui-state-hover',
	hoverclass: 'ui-state-active',
	drop: function(event, ui) {
		$(this).addClass('ui-state-highlight').find('p').html('Dropped');
	},
	out: function(event, ui) {
		// doesn't work but something like this
		ui.draggable.mouseup(function() {
			var top = ui.draggable.data('orgTop');
			var left = ui.draggable.data('orgLeft');
			ui.position = {
				top: top,
				left: left
			};
		});
	}
	});



	