import Student from "./student.js";

const SERVER_URL = 'http://localhost:3001';


// We can uncommenting this code if need add some Students to SREVER & Array
// ======================    start   =======================================

// let startArrForAddToServer = [
//     new Student('Александр', 'Иванов', new Date('1993,05,22'), 2021, 'Экономика'),
//     new Student('Michail', 'Babojko', new Date('1995,04,02'), 2010, 'godofprogramming'),
//     new Student('Alexandr', 'Dudukalo', new Date('March 30, 1994'), 2011, 'curator'),
//     new Student('Alon', 'Fine', new Date('June 20, 1997'), 2019, 'fullstack'),
//     new Student('Judit', 'Fine', new Date('September 10, 2005'), 2023, 'rocketsince'),
//     new Student('Ron', 'Green', new Date('January 20, 1992'), 2022, 'iosdev'),
//     new Student('Glen', 'Stark', new Date('November 20, 1991'), 2015, 'disainer'),
//     new Student('Rick', 'Briens', new Date('July 20, 1987'), 2010, 'androiddev'),
// ]

// for (const instance of startArrForAddToServer) {

//     serverAddObjStudent(instance);
// }
// =======================  finish  adding Students  ========================


let studentsList = [new Student('Александр', 'Иванов','Александр', new Date('1993,05,22'), 2021, 'Экономика')];

// important global variables
let $table = document.getElementById('table'),
    $form = document.getElementById('form'),
    copyStList = [...studentsList],
    $filterForm = document.getElementById('filterForm'),
    sortVector = true,
    sortProp = 'fullname',
    $nameBtnSort = document.getElementById('sorting-name'),
    $ageBtnSort = document.getElementById('sorting-birth'),
    $facultyBtnSort = document.getElementById('sorting-faculty'),
    $educationBtnSort = document.getElementById('sorting-start-ed'),
    filterInputs = $filterForm.querySelectorAll('input'),
    $filterName = document.getElementById('filter-name').value,
    $filterFaculty = document.getElementById('filter-faculty').value,
    $filterStart = document.getElementById('filter-start-ed').value,
    $filterFinish = document.getElementById('filter-finish-ed').value,
    checkServerArr = await serverGetObjStudent()


// below are functions for work with the server
async function serverAddObjStudent(instanceClassSt) {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: instanceClassSt._name,
            surname: instanceClassSt._surname,
            lastname: instanceClassSt._name,
            birthday: instanceClassSt._birth,
            studyStart: instanceClassSt._study,
            faculty: instanceClassSt._faculty
        })

    })

    let data = await response.json()

    return data
}

async function serverGetObjStudent() {

    const response = await fetch(SERVER_URL + '/api/students', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    let data = await response.json()

    return data
}

async function serverDeleteObjStudent(serverObjID) {
    let response = await fetch(`${SERVER_URL}/api/students/${serverObjID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    let data = await response.json()

    return data
}

// DELETE ALL obj's from server
async function deleteAllStudentsFromServer() {

    let server = await serverGetObjStudent()

    for (const el of server) {

        serverDeleteObjStudent(el.id)
    }
}

// this function will work if HTML form won't use initial browser validation settings
function validation(form) {

    let ifValid = true
    const inputs = form.querySelectorAll('input')

    for (const input of inputs) {
        removeError(input)

        if (input.dataset.text) {
            if (input.value == '') {
                error(input, 'type at least 3 letters')
                console.log(input.classList);
                ifValid = false

            }
        }
    }

    function removeError(input) {
        const parent = input.parentNode

        if (input.classList.contains('error-inp')) {
            input.classList.remove('error-inp')
            parent.querySelector('.form-label').remove()
        }
    }

    function error(input, text) {
        const $lable = document.createElement('label')
        const parent = input.parentNode

        input.classList.add('error-inp')
        $lable.textContent = text
        $lable.classList.add('form-label')
        parent.prepend($lable)

    }

    return ifValid
}

function $createDOMStudentEl(instanceStudent) {
    let $liForTable = document.createElement('li')
    let $tableName = document.createElement('span')
    let $tableAge = document.createElement('span')
    let $tablefaculty = document.createElement('span')
    let $tableEducation = document.createElement('span')
    let $tableBtnWrapper = document.createElement('div')
    let $tableDelBtn = document.createElement('button')

    $tableName.textContent = instanceStudent.fullname
    $tableAge.textContent = instanceStudent.age
    $tablefaculty.textContent = instanceStudent._faculty
    $tableEducation.textContent = instanceStudent.education
    $tableDelBtn.textContent = 'delete'

    $liForTable.classList.add('table-li')
    $tableName.classList.add('sorting__btn-1')
    $tableAge.classList.add('sorting__btn-2')
    $tablefaculty.classList.add('sorting__btn-3')
    $tableEducation.classList.add('sorting__btn-4')
    $tableBtnWrapper.classList.add('btn-wrapper')
    $tableDelBtn.classList.add("delete-btn")

    $tableDelBtn.addEventListener('click', () => {
        if (confirm('YOU DELETE STUDENT!!!')) {
            serverDeleteObjStudent(instanceStudent._id)
            $liForTable.remove()
        } else {
            alert('STUDENT STAYED :)')
        }
    })

    $tableBtnWrapper.append($tableDelBtn)
    $liForTable.append($tableName)
    $liForTable.append($tableAge)
    $liForTable.append($tablefaculty)
    $liForTable.append($tableEducation)
    $liForTable.append($tableBtnWrapper)

    return $liForTable
}

// rendering of new Student to table
function renderTable(arrStudents) {

    document.querySelectorAll('.table-li').forEach(element => {
        element.remove()
    });
    // filtering
    arrStudents = filterStudentTable(arrStudents)

    // sorting
    arrStudents = sortStudentTable(arrStudents, sortProp, sortVector)

    arrStudents.forEach(element => {
        let $studentDOM = $createDOMStudentEl(element)

        $table.append($studentDOM)
    });
}

// here we get all Obj's Students from Server
// convert them to INSTANCE of class Student.
// and push them to [] - studentsList.
// serverObjStudent.name,
// serverObjStudent.surname,
// new Date(serverObjStudent.birthday),
// Number(serverObjStudent.studyStart),
// serverObjStudent.faculty,
// serverObjStudent.id
if (checkServerArr) {
    for (const serverObjStudent of checkServerArr) {

        copyStList.push(new Student(

            serverObjStudent.name,
            serverObjStudent.surname,
            serverObjStudent.lastname,
            serverObjStudent.birthday,
            serverObjStudent.studyStart,
            serverObjStudent.faculty,
            serverObjStudent.id
        ))
    }
}
renderTable(copyStList)

// add new Student to (Copy of main Arr) then (Render table)
$form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (validation($form)) {

        let newStudent = new Student(
            document.getElementById('st-name').value.trim(),
            (document.getElementById('st-surname').value).trim(),
            new Date(document.getElementById('st-dob').value),
            Number(document.getElementById('st-stady').value.trim()),
            (document.getElementById('st-faculty').value).trim(),
        )

        // FOR ADD NEW STUDENT TO SERVER...
        serverAddObjStudent(newStudent)

        // FOR ADD NEW STUDENT TO ARRAY[]
        copyStList.push(newStudent)

        let inputs = $form.querySelectorAll('input')
        for (const input of inputs) {
            input.value = ''
        }
        renderTable(copyStList)
    }
})

// This func check if 4/4 parametrs(Filter Inputs) are True
// initially all of them are True => cose we have no specific filters
function filterStudentTable(arr) {
    let fiteredArray = [...arr]

    return fiteredArray.filter(student => {

        let nameMatch = student.fullname.toLowerCase()
        let facultMatch = student._faculty.toLowerCase()
        let startMatch = student._study
        let endMatch = student.finishEducation

        $filterName = document.getElementById('filter-name').value
        $filterFaculty = document.getElementById('filter-faculty').value
        $filterStart = document.getElementById('filter-start-ed').value
        $filterFinish = document.getElementById('filter-finish-ed').value

        nameMatch = $filterName ? nameMatch.includes($filterName.toLowerCase()) : true
        facultMatch = $filterFaculty ? facultMatch.includes($filterFaculty.toLowerCase()) : true
        startMatch = $filterStart ? startMatch >= $filterStart : true
        endMatch = $filterFinish ? endMatch <= $filterFinish : true

        return nameMatch && facultMatch && startMatch && endMatch
    })
}

// here we check every symbol that was input to Filter-Form
// and send them to 'filterStudentTable(..,..,..,..)'
// which filters out unnecessary
// let filterInputs = $filterForm.querySelectorAll('input')---------------------
filterInputs.forEach(inputField => {

    inputField.addEventListener('input', () => {

        // here we render table after every input(filter field)
        renderTable(copyStList)
    })
});

// this block of code responeble for sorting Table by clicking on Buttons
// at the top of the Table
function sortStudentTable(arr, prop, vector) {

    return arr.sort((a, b) => {

        if (vector ? a[prop] < b[prop] : a[prop] > b[prop]) { return -1 }

    })
}

// here are Buttons with their each with it's property like - 'fullname','_faculty'
// Property will go to an argument of function sortStudentTable(..,..,..,..)
// Property will be getting from (getter & attributs) of (class Student)
$nameBtnSort.addEventListener('click', () => {
    sortVector = !sortVector
    sortProp = 'fullname'
    renderTable(copyStList)
})
$ageBtnSort.addEventListener('click', () => {
    sortVector = !sortVector
    sortProp = 'age'
    renderTable(copyStList)
})
$facultyBtnSort.addEventListener('click', () => {
    sortVector = !sortVector
    sortProp = '_faculty'
    renderTable(copyStList)
})
$educationBtnSort.addEventListener('click', () => {
    sortVector = !sortVector
    sortProp = '_study'
    renderTable(copyStList)
})
