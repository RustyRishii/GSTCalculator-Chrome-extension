chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
	  id: "calculate",
	  title: "Calculate GST",
	  contexts: ["selection"]
	});
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "calculate") {
	  chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: calculatePercentage,
		args: [info.selectionText]
	  });
	}
  });
  
  function calculatePercentage(selectedText) {
	const cleanedText = selectedText.replace(/[$¤؋৻฿₡₤₧¢¥৲૱៛₢₥₨£֏৳௹₠₣₦₩₪₭₰₳₶₹₼₿₫₮₱₴₷₺₽﷼€₯₲₵₸₻₾,]/g, ''); //Remove currencies and commas
	const number = parseFloat(cleanedText);
	if (isNaN(number)) {
	  alert("Selected text is not a number");
	  return;
	}
	
    //5%
	const add5 = number + (number * 0.05);
	const sub5 = number - (number * 0.05);
  
	//18%
	const add18 = number + (number * 0.18);
	const sub18 = number - (number * 0.18);
  
	//28%
	const add28 = number + (number * 0.28);
	const sub28 = number - (number * 0.28);
  
	alert(`Price: ${number.toLocaleString()}
	  \n+5%: ${add5.toLocaleString()}\n-5%: ${sub5.toLocaleString()} 
	  \n+18%: ${add18.toLocaleString()}\n-18%: ${sub18.toLocaleString()} 
	  \n+28%: ${add28.toLocaleString()}\n-28%: ${sub28.toLocaleString()}`);
  }
  