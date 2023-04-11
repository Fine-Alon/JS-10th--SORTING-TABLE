import Student from "./student.js";

const studentsList = [
    new Student('Michail', 'Babojko', new Date('1995,04,02'), 2010, 'godofprogramming'),
    new Student('Alexandr', 'Dudukalo', new Date('March 30, 1994'), 2011, 'curator'),
    new Student('Alon', 'Fine', new Date('June 20, 1997'), 2019, 'fullstack'),
    new Student('Judit', 'Fine', new Date('September 10, 2005'), 2023, 'rocketsince'),
    new Student('Ron', 'Green', new Date('January 20, 1992'), 2022, 'iosdev'),
    new Student('Glen', 'Stark', new Date('November 20, 1991'), 2015, 'disainer'),
    new Student('Rick', 'Briens', new Date('July 20, 1987'), 2010, 'androiddev'),
]

// important global variables
let $table = document.getElementById('table'),
    copyStList = [...studentsList],
    $filterForm = document.getElementById('filterForm'),
    sortVector = true,
    sortProp = 'fullname',
    $nameBtnSort = document.getElementById('sorting-name'),
    $ageBtnSort = document.getElementById('sorting-birth'),
    $facultyBtnSort = document.getElementById('sorting-faculty'),
    $educationBtnSort = document.getElementById('sorting-start-ed'),
    filterInputs = $filterForm.querySelectorAll('input'),
    $filterName = '',
    $filterFacult = '',
    $filterStart = '',
    $filterFinish = ''


// rendering of new Student to table
function renderTable(arrStudents) {

    document.querySelectorAll('.table-li').forEach(element => {
        element.remove()
    });

    // filter the arr by global var's (inputs values)
    arrStudents = filterStudentTable(arrStudents)

    // sort this filtered arr
    arrStudents = sortStudentTable(arrStudents, sortProp, sortVector)

    arrStudents.forEach(element => {
        let $liForTable = document.createElement('li')
        let $tableName = document.createElement('span')
        let $tableAge = document.createElement('span')
        let $tableFaculty = document.createElement('span')
        let $tableEducation = document.createElement('span')

        $tableName.textContent = element.fullname
        $tableAge.textContent = element.age
        $tableFaculty.textContent = element._facult
        $tableEducation.textContent = element.education

        $liForTable.classList.add('table-li')
        $tableName.classList.add('sorting__btn-1')
        $tableAge.classList.add('sorting__btn-2')
        $tableFaculty.classList.add('sorting__btn-3')
        $tableEducation.classList.add('sorting__btn-4')

        $liForTable.append($tableName)
        $liForTable.append($tableAge)
        $liForTable.append($tableFaculty)
        $liForTable.append($tableEducation)
        $table.append($liForTable)
    });
}
renderTable(studentsList)

// add new Student to (Copy of main Arr) then (Render table)
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();

    copyStList.push(new Student(
        document.getElementById('st-name').value.trim(),
        (document.getElementById('st-surname').value).trim(),
        new Date(document.getElementById('st-dob').value),
        Number(document.getElementById('st-stady').value.trim()),
        (document.getElementById('st-faculty').value).trim(),
    ))
    renderTable(copyStList)
})


// This func check if 4/4 parametrs(Filter Inputs) are True
// initially all of them are True => cose we have no specific filters
function filterStudentTable(arr) {
    let fiteredArray = [...arr]

    return fiteredArray.filter(student => {

        let nameMatch = student.fullname.toLowerCase()
        let facultMatch = student._facult.toLowerCase()
        let startMatch = student._study
        let endMatch = student.finishEducation

        $filterName = document.getElementById('filter-name').value
        $filterFacult = document.getElementById('filter-faculty').value
        $filterStart = document.getElementById('filter-start-ed').value
        $filterFinish = document.getElementById('filter-finish-ed').value

        nameMatch = $filterName ? nameMatch.includes($filterName.toLowerCase()) : true
        facultMatch = $filterFacult ? facultMatch.includes($filterFacult.toLowerCase()) : true
        startMatch = $filterStart ? startMatch >= $filterStart : true
        endMatch = $filterFinish ? endMatch <= $filterFinish : true

        return nameMatch && facultMatch && startMatch && endMatch
    })
}

// here we check every symbol that was input to Filter-Form
// and send them to 'filterStudentTable(..,..,..,..)'
// which filters out unnecessary
filterInputs.forEach(input => {

    input.addEventListener('input', () => {

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

// here are Buttons with their each with it's property like - 'fullname','_facult'
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
    sortProp = '_facult'
    renderTable(copyStList)
})
$educationBtnSort.addEventListener('click', () => {
    sortVector = !sortVector
    sortProp = '_study'
    renderTable(copyStList)
})
