document.getElementById('add18').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		function: calculatePercentage,
		args: [18]
	  });
	});
  });
  
  document.getElementById('subtract18').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		function: calculatePercentage,
		args: [-18]
	  });
	});
  });
  
  function calculatePercentage(percentage) {
	const selection = window.getSelection().toString();
	const cleanedText = selection.replace(/,/g, ''); // Remove commas
	const number = parseFloat(cleanedText);
	if (isNaN(number)) {
	  alert("Selected text is not a number");
	  return;
	}
  
	const result = number + (number * (percentage / 100));
	alert(`Original: ${number.toLocaleString()}\n${percentage > 0 ? '+' : ''}${percentage}%: ${result.toLocaleString()}`);
  }
  