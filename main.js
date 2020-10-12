let name = document.getElementById('name'),
    surname = document.getElementById('surname'),
    age = document.getElementById('age'),
    address = document.getElementById('address'),
    skills = document.querySelectorAll('.form-check-input'),
    form = document.getElementById('form-group');

let selectedRow = null;

let usersArr = [];

function formSubmit() {
    let formData = readFormData();

    if (selectedRow === null) {
        insertNewRecord(formData.name, formData.surname, formData.age, formData.address, formData.skills);
    } else {
        updateData(formData);
    }
    resetForm();
}

function readFormData() {
    let arr = [];
    for (skill of skills) {
        if (skill.checked) {
            arr.push(skill.value);
        }
    }

    let nameValue = name.value;
    let surnameValue = surname.value;
    let ageValue = age.value;
    let addressValue = address.value;
    let skillsValue = arr;

    let formData = {
        name: nameValue,
        surname: surnameValue,
        age: ageValue,
        address: addressValue,
        skills: arr
    };

    usersArr.push(formData);
    localStorage.usersRecord = JSON.stringify(usersArr);

    return formData;
}

function resetForm() {
    name.value = null;
    surname.value = null;
    age.value = null;
    address.value = null;
}

function init() {
    if (!!(localStorage.getItem('usersRecord'))) {
        usersArr = JSON.parse(localStorage.getItem('usersRecord'));
        for (let i = 0; i < usersArr.length; i++) {
            insertNewRecord(usersArr[i].name, usersArr[i].surname, usersArr[i].age, usersArr[i].address, usersArr[i].skills);
        }
    } else {
        usersArr = [];
    }
    btnSubmit.addEventListener('click', formSubmit);
}

function insertNewRecord(nameValue, surnameValue, ageValue, addressValue, skillsValue) {

    table = document.getElementById('table').getElementsByTagName('tbody')[0];

    let newRow = table.insertRow(table.length);

    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = nameValue;

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = surnameValue;

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = ageValue;

    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = addressValue;

    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = skillsValue;

    let cell6 = newRow.insertCell(5);
    cell6.innerHTML =
        `<button class="btn btn-dark" id="btnEdit" onClick="editData(this)">Edit</button>
        <button class="btn btn-info" id="btnView" onClick="viewData(this)">View</button>
        <button class="btn btn-danger id="btnDelete" onClick="deleteData(this)">Delete</button>`;
}

function editData(td) {
    readonly('false');

    selectedRow = td.parentElement.parentElement;
    name.value = selectedRow.cells[0].innerHTML;
    surname.value = selectedRow.cells[1].innerHTML;
    age.value = selectedRow.cells[2].innerHTML;
    address.value = selectedRow.cells[3].innerHTML;

    let skillsValue = selectedRow.cells[4].textContent;

    let arraySkills = skillsValue.split(',');

    if (arraySkills.includes("HTML")) {
        skills[0].checked = "true";
    }
    if (arraySkills.includes("CSS")) {
        skills[1].checked = "true";
    }
    if (arraySkills.includes("JS")) {
        skills[2].checked = "true";
    }
}

function updateData(formData) {
    
        let updateFormData = JSON.parse(localStorage.getItem('usersRecord'));
        updateFormData.name = name.value;
        updateFormData.surname = surname.value;
        updateFormData.age = age.value;
        updateFormData.address = address.value;
        
        if(updateFormData.age == ''){
            alert('write your data');
        }else{
            localStorage.setItem('usersRecord', JSON.stringify(updateFormData));
        }
        
    
    let arr = [];
    for (skill of skills) {
        if (skill.checked) {
            arr.push(skill.value);
            selectedRow.cells[4].innerHTML = arr;
        }
    }

    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.surname;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.address;
    selectedRow.cells[4].innerHTML = formData.skills;
}

function viewData(td) {
    editData(td);
    readonly('true');
}

function deleteData(td) {

    if (confirm('Are you sure to delete this record?')) {
        let row = td.parentElement.parentElement;
        document.getElementById('table').deleteRow(row.rowIndex);

        usersArr = JSON.parse(localStorage.getItem('usersRecord'));
        usersArr.splice(td, 1);
        localStorage.setItem('usersRecord', JSON.stringify(usersArr));

        resetForm();
    }

    readonly('false');
}

function readonly(read) {
    if (read === 'true') {
        name.readOnly = true;
        surname.readOnly = true;
        age.readOnly = true;
        address.readOnly = true;
    } else {
        name.readOnly = false;
        surname.readOnly = false;
        age.readOnly = false;
        address.readOnly = false;
    }
}

init();
