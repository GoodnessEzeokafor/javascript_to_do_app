var data =(localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed:[]
}

renderTodoList();

// REMOVE AND COMPLETE SVG ICONS
var removeSBVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path class ='fill' d='M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z'/></svg>"; 
var completeSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path class='fill' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/></svg>" ;

// User clicks on the add button
// if there is any text inside the filed, add that text to the todo lIst
document.getElementById('add').addEventListener('click', function(){
    var value = document.getElementById('item').value;
    if(value){
        console.log(value);
        // call the addItemTodo function
        addItemTodo(value);
        document.getElementById('item').value = '';

        data.todo.push(value);  // push to the array
        dataObjectUpdated();
        console.log(data);
         
    } else{
        console.log('Please Add An Activity!!');
    }
});
function renderTodoList(){
    
}


function dataObjectUpdated(){
     localStorage.setItem('todoList', JSON.stringify(data));
}
// Remove Item Function
function removeItem(e){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }

    parent.removeChild(item);
    console.log("Removed Activity!!");

    dataObjectUpdated();
}


function completeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    value = item.innerText;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }

    console.log(data);

    var target = (id === 'todo') ? document.getElementById('completed') : target = document.getElementById('todo');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    dataObjectUpdated();
}




function addItemTodo(text){
    var list = document.getElementById('todo')

    var item = document.createElement('li');  // creates the list element
        item.innerHTML = text; // appends it to the DOM
    
    var buttons = document.createElement('div');
        buttons.classList.add('button'); 
    

    var remove = document.createElement('button'); // create a button element
        remove.classList.add('remove');
        remove.innerHTML = removeSBVG

        // Add click event for removing the items
        remove.addEventListener('click', removeItem);
    
    var complete = document.createElement('button');
        complete.classList.add('complete');
        complete.innerHTML = completeSVG;
    // Add click event for completing the item
    complete.addEventListener("click", completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]); 

    dataObjectUpdated();
}
