let contents = document.getElementById('contents');
let related = document.getElementById('related');
let header = document.querySelector('#header .ytd-rich-grid-renderer');

const addListeners = function(){
    header.style.display = "none";
    contents.style.setProperty('display', 'none', 'important');
    related.style.display = "none";
}

const removeListeners = function(){
    header.style.display = "flex";
    contents.style.display = "flex";
    related.style.display = "block";
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.command === 'init'){
        addListeners();
    }
    else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

window.onload = function (){
    chrome.storage.sync.get('hide', function(data){
        if(data.hide){
            addListeners();
        }
        else{
            removeListeners();
        }
    });
}