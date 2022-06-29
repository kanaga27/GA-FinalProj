// let addNewTask = document.querySelector('#addNewTask');
// let formAddTask = document.querySelector('#formAddTask');
// let addInputName = document.querySelector('#addInputName');
// let addInputDescription = document.querySelector('#addInputDescription');
// let addInputAssignedTo = document.querySelector('#addInputAssignedTo');
// let addInputDueDate = document.querySelector('#addInputDueDate');
// let addInputStatus = document.querySelector('#addInputStatus');
// let addSubmitBtn = document.querySelector('#addSubmitBtn');
// let addResetBtn = document.querySelector('#addResetBtn');
// let addCloseModal = document.querySelector('#addCloseModal');


var today = new Date();

var tasks = [];

function getCurrentDate() {
    // var today = new Date();
    var curdate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return curdate;
}

function getCurrentTime() {

    var curtime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return curtime;
}

function formOnLoad() {
    document.getElementById("myDate").innerHTML = "Current Date: " + getCurrentDate();
    document.getElementById("myTime").innerHTML = "Time: " + getCurrentTime();

    //define default for Calender
    // $('.datepicker').datepicker({
    //     format: 'dd/mm/yyyy',
    //     startDate: '-5d'
    // });
    $(function () {
        var selectedDates = [];
        datePicker = $('[id*=addInputDueDate]').datepicker({
            startDate: new Date(),
            minDate: 0,
            multidate: true,
            format: "dd/mm/yyyy",
            daysOfWeekHighlighted: "0,6",
            language: 'en',
            daysOfWeekDisabled: [0, 6]
        });
        datePicker.on('changeDate', function (e) {
            if (e.dates.length <= 1) {
                selectedDates = e.dates;
            } else {
                datePicker.data('datepicker').setDates(selectedDates);
                alert('You can only select 1 dates.');
            }
        });
    });

    var tmpTaskList = JSON.parse(localStorage.getItem("taskList") || "[]");
    alert(tmpTaskList.length);
    tmpTaskList.forEach(function (arrayItem) {
       //alert('loop');
        var cardItem = document.createElement('div');
        cardItem.setAttribute('class', 'row');
        cardItem.setAttribute('id', 'divCard'+arrayItem.id);

        cardItem.innerHTML = `        

            <div class="col-3 col-sm-3">
                <div class="card " style="margin: 15px; background-color: rgb(250, 235, 215);">
                    <div class="card-body">
                        <h5 class="card-title fs-4 pb-3">` + arrayItem.name + `</h5>
                        <p class="card-text pb-3">` + arrayItem.desc + `</p>
                        <p class="card-text"><span class="fw-bold pe-3">Assigned to :</span>` + arrayItem.assignTo + `</p>
                        <p class="card-text"><span class="fw-bold pe-3">Due Date :</span>` + arrayItem.due + `</p>
                        <p class="card-text pb-3"><span class="fw-bold pe-3">Status :</span>` + arrayItem.status + `
                        </p>
                        <div class="col d-flex justify-content-between align-items-center">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticEditBackdrop">Edit</button>
                        <button class="btn btn-secondary px-4" type="button" data-bs-toggle="modal"
                                >In Progress</button>
                            <button class="btn btn-danger delete" type="button" id="deleteCardButton`+ arrayItem.id+`" onclick="deleteCard(`+ arrayItem.id+`)">Delete</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        var cardHdr = document.getElementById('cardHdr');
        cardHdr.append(cardItem);
    }  );
}


function validateNewTask() {
    var tmpName = $("#addInputName").val();
    //alert(tmpName);
    var txtdescription = document.getElementById("addInputDescription").value;
    var assignto = document.getElementById("addInputAssignedTo").value;
    var duedate = document.getElementById("addInputDueDate").value;
    var status = document.getElementById("addInputStatus").value;
    // alert ('I am in validate task');
     if (tmpName == null  || tmpName == "") {
         alert("Name must be filled out");
         return false;
     }
     if (txtdescription == null || txtdescription == "") {
         alert("Description must be filled out");
         return false;
     }
     if (assignto == null || assignto == "") {
         alert("Task assign to field should not be empty");
         return false;
     }
     if (duedate == null || duedate == "") {
         alert("Enter the due date");
         return false;
     }
     if (status == null || status == "") {
         alert("Choose the status");
         return false;
     }
    //  localstorage
    var tmpCardId = localStorage.getItem("cardCount");
    if(tmpCardId == null){
        localStorage.setItem("cardCount", 0);
    }
    tmpCardId++;
    localStorage.setItem("cardCount", tmpCardId);
    //alert ("tmpCardId="+tmpCardId);
    var newTask = {
        name: tmpName,
        desc: txtdescription,
        assignTo: assignto,
        due: duedate,
        status: status,
        id: tmpCardId
    };

    //add new Task to TaskList
    tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.push(newTask);
   localStorage.setItem("taskList", JSON.stringify(tasks));
  
    //re-draw card layout


    preventDefault();

}
// deleteCard
function deleteCard(tmpId) {
    //alert ("In delete card" + tmpId);

    //Delete Card from View Layer
    $("#divCard"+ tmpId).remove();

    //Find the index of the To-Do-Task from Local Storage
    var tmpIdx = -1;

    var tmpTaskList = JSON.parse(localStorage.getItem("taskList") || "[]");
    //alert(tmpTaskList.length);
    tmpTaskList.forEach(function (arrayItem, index) {
        //alert("inside loop, idx="+index);
        if(arrayItem.id == tmpId){
            tmpIdx=index;
        }
    });
    //alert("outside loop, idx="+tmpIdx);

    //Remove the To-Do-Task from Data Layer aka LocalStorage
    tmpTaskList.splice(tmpIdx, 1);

    //Update LocalStorage
    localStorage.setItem("taskList", JSON.stringify(tmpTaskList));


}

function editCard(tmpId) {

    //pull current to-do-task from LocalStorage

    //prefill Model Dialog Elements
    //set editInputName from LocalStorage ArrayItem

}