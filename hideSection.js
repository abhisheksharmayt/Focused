let checkBox = document.querySelector('#checkBox');

chrome.storage.sync.get('hide', function(data){
    checkBox.checked = data.hide;
});

checkBox.onchange = function(element){
    let value = this.checked;

    chrome.storage.sync.set({'hide' : value}, function(){
        console.log(`The value is ${value}`);
    });

    if(value){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "init", hide: value}, function(response){
                console.log(response.result);
            });
        });
    }
    else{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "remove", hide: value}, function(response){
                console.log(response.result);
            });
        });
    }
}