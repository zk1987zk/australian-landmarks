var imageMap = {};

function addImage(imageSrc) {
	//console.log($("#imageBox").children()[loadedImages]);
	$("#imageBox").children()[loadedImages].src= imageSrc;
	loadedImages++;
	localStorage.imageSrc = imageSrc;
}

function findFirstWrongIndex(arr1, arr2) {

    for(var i = 0; i < arr1.length; ++i) {
        if(arr1[i] != arr2[i])
            return i; // this returns the index of the wrong image
    }

    return -1; // if returns -1 then they are equal
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

function checkOrder() {
	var order = [];
	var oldDate = 0;


	$.each($("#drop").children(), function(index, value) {
		console.log(Number(imageMap[value.src]));
		order.push(Number(imageMap[value.src]));
	});

	console.log(order);

	var correctOrder = order.slice(0);


	//check if the arrays are the same
	
	if (arraysEqual(order, correctOrder.sort()) == true && order.length == document.numerImages) {
		console.log("win");
		window.location.href = 'winning.html'
	} else {
		if(order.length < document.numerImages) {
			$("#infoDiv").html("All images not in box");
			$("#infoDiv2").html("All images not in box");
		} else {
			$("#infoDiv").html("Image number " + String(1 + findFirstWrongIndex(order, correctOrder)) + 
			" is in wrong position.")
			$("#infoDiv2").html("Image(s) is(are) in wrong position.")
		}
		
	}
	
	console.log(correctOrder);
}


function getDataFromTrove(searchTerm, level) {
	var trove_key = "jsk1qqntnrj7qbvf";
	var imageSrc  = "";
	var potentialImages = [];
	var url = "http://api.trove.nla.gov.au/result?key=" + trove_key + 
		"&encoding=json&zone=picture&sortby=relevance&q=" + searchTerm + "&s=0&n=25&callback=?";
	
	
	
	console.log(url);
	console.log("starting level "+level);
	
	
	$.getJSON(url, function(data) {
		//console.log(data);

		$.each(data.response.zone[0].records.work, function(index, value){
			if(value.identifier != undefined && value.identifier[1] != undefined 
				&& value.identifier[1].value != undefined && value.issued != undefined) {

					var d = Number(value.issued);
					if (!d) {
						d = value.issued.split("-");
						d = Number(d[0]);
					}
					
					var imageDate = ["", ""];
					imageDate[0] = value.identifier[1].value;
					imageDate[1] = d; //value.issued;
					potentialImages.push(imageDate);
					console.log(value.identifier[1].value + " " + imageDate);
			}
		});
		// for loop that runs i < level
		for(var i = 0; i < level; i++){
			var randomImage = Math.floor(Math.random() * potentialImages.length);
			console.log(randomImage);
			imageSrc = potentialImages[randomImage];
			potentialImages.splice(randomImage, 1); 
			addImage(imageSrc[0]);

			imageMap[imageSrc[0]] = imageSrc[1];

			console.log(imageSrc[0] + ", " + imageSrc[1]);
		}
		
	});

}


var loadedImages = 0;
// One function to generate levels - replace calls to startHard etc with startLevel(4)
function startLevel(level){

	document.numerImages = level;
	var landMarks = ["Pyrmont%20Bridge","Australian%20Stockman's%20Hall", "Sydney%20Opera%20House","Sydney%20Harbour%20Bridge","Luna%20Park", "Uluru", "King%20George%20Square", "ANZAC%20Square", "Flinders%20Street"];
	var searchedItems = [];
	var searchTerm;
	var shouldSearch;

		searchTerm = landMarks[Math.floor(Math.random() * landMarks.length)];
		localStorage.searchTerm = searchTerm;
		console.log(searchTerm)
		
			// change to getDataFromTrove(searchTerm, level);
			getDataFromTrove(searchTerm, level);

			$("#nameDiv").html("<h3>" + decodeURI(searchTerm) + "</h3>");
			
	
}