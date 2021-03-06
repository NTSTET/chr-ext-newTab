//greeting para used in greeting management
const greeting = document.querySelector('.navbar-brand');

// search management
const searchForm = document.querySelector('.search-form');
const formSearch = document.querySelector('#form-search');
const subForm = document.querySelector('#submit');

formSearch.addEventListener('submit',e =>{
    e.preventDefault();//prevent default refreshing upon submission
    var searchKey = formSearch.key.value;

    var makeSearchKeyTemplate = 'https://www.google.com/search?q=' + searchKey; 
    var searchedWindow = window.open(makeSearchKeyTemplate, '_self');
    formSearch.reset();
});

// time and date management
const date_time = document.querySelector('.date-time');
const date_string = document.querySelector('.date-string');
const time_string = document.querySelector('.time-string');

//set inerval anonymous function
setInterval(function () {
    const current = new Date();
    var hour = current.getHours();
    var minute = current.getMinutes();
    var second = current.getSeconds();

    if(hour < 10){
        hour = '0'+ hour;
    }
    if(minute < 10){
        minute = '0' + minute;
    }
    if(second < 10){
        second = '0' + second;
    }
    time_string.innerHTML = hour + ':' + minute + ':' + second;

    const date = current.toDateString();
    date_string.innerHTML = date;

    //greeting management in every 1 sec inerval
    if(hour >= 5 && hour < 11){
        greeting.innerHTML = 'Good morning dear! 	&#128512;';
    }else if(hour >= 11 && hour < 12){
        greeting.innerHTML = 'Good noon dear! 	&#128512;';
    }else if(hour >= 12 && hour < 17){
        greeting.innerHTML = 'Good afternoon dear! 	&#128512;';
    }else if(hour >= 17 && hour < 21){
        greeting.innerHTML = 'Good evening dear! 	&#128512;';
    }else {
        greeting.innerHTML = 'Good night dear! 	&#128512;';
    }

}, 1000);

//togglar bar
//bookmarks bar
const addBM = document.querySelector('#bookmark');//bookmark button
const addForm = document.querySelector('.add');//form
const BMlist = document.querySelector('.BMlist');//ul
const closeBMform = document.querySelector('#close-BMform');
const msg = document.querySelector('#msg');

//Attach all bookmarks in localStorage
attachBMs(localStorage);//load all bookmarks from localStorage all at once
function attachBMs(localStorage) {
    for(let i = 0; len = localStorage.length, i < len; i++){
        const titleOfBM = localStorage.key(i);
        const urlOfBM = localStorage.getItem(titleOfBM);
        const Template = `
            <li class="d-flex justify-content-between">
                <a class="dropdown-item " href="${urlOfBM}">&#128279; ${titleOfBM} </a>
                <i class="far fa-trash-alt delete"></i>
            </li>
        `;
        BMlist.innerHTML+=Template;
    }
}
//Add bookmark start================================================================
function appendTodoHtml(title,url){
    const htmlTemplate = `
            <li class="d-flex justify-content-between">
                <a class="dropdown-item " href="${url}">&#128279; ${title} </a>
                <i class="far fa-trash-alt delete"></i>
            </li>
    `;
    BMlist.innerHTML+=htmlTemplate;
}

addBM.addEventListener('click',e =>{
    e.preventDefault();//prevent default refreshing upon submission
    addForm.style.display = 'block';//appear form
    closeBMform.style.display = 'block';//close button appears
    

    const title = addForm.title.value.trim();//trim leading and trailing spaces
    const url = addForm.url.value.trim();//trim leading and trailing spaces

    // localStorage.setItem(title,url);
    // console.log(Object.entries(localStorage));

    if(title.length && url.length){
        localStorage.setItem(title,url);//add to localStorage

        appendTodoHtml(title,url);
        addForm.reset();

        addForm.style.display = 'none';//disappear form
        closeBMform.style.display = 'none';//close button disappears
        //success msg appears
        msg.style.display = 'block';
        setTimeout(function() {
            //msg fades after 2 second
            msg.style.opacity = '0.5';
            setTimeout(function() {
                //msg disappears after total 4 second
                msg.style.display = 'none';
                msg.style.opacity = '1';
            }, 3000);
        }, 3000);
    }
});
//Add bookmark end===================================================================

//close-BM form starts here============================================================
closeBMform.addEventListener('click',() => {
    addForm.reset();//reset form first
    addForm.style.display = 'none';//disappear form
    closeBMform.style.display = 'none';//close button disappears
});
//close-BM form ends here=============================================================

//Delete bookmarks on clicking on trash icon==========================================
//we will use event delegation for deletion,if we don't do this, we will get in trouble 
//with newly added bookmarks
//we will add eventListener to whole ul, which will delegate
//if clicked on target trash icon just delete that 
BMlist.addEventListener('click',e => {
    // if(e.target.nodeName=='I'){//what if we have several I tag 
    //     console.log(e.target.parentElement);
    // }
    if(e.target.classList.contains('delete')){//fine, bcz delete class is specific to trash
        // Remove from localStorage
        //just hit trial to get the end of link icon
        const titleToRemove = e.target.previousElementSibling.textContent.substring(3).trim();
        localStorage.removeItem(titleToRemove);

        // Also remove from page
        e.target.parentElement.remove();
    }

});
//Delete bookmarks end====================================================================

