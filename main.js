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
    $nameBtnSort = document.getElementById('sorting-name'),
    $ageBtnSort = document.getElementById('sorting-birth'),
    $facultyBtnSort = document.getElementById('sorting-faculty'),
    $educationBtnSort = document.getElementById('sorting-start-ed')


// rendering of new Student to table
function renderTable(arrStudents) {

    document.querySelectorAll('.table-li').forEach(element => {
        element.remove()
    });

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
// console.log(studentsList[studentsList.length - 1].age);


// This func check if 4/4 parametrs(Filter Inputs) are True
// initially all of them are True => cose we have no specific filters
function filterStudentTable(name, facult, startEduc, endEduc) {

    return copyStList.filter(student => {

        let nameMatch = student.fullname.toLowerCase()
        let facultMatch = student._facult.toLowerCase()
        let startMatch = student._study
        let endMatch = student.finishEducation

        nameMatch = name ? nameMatch.includes(name.toLowerCase()) : true
        facultMatch = facult ? facultMatch.includes(facult.toLowerCase()) : true
        startMatch = startEduc ? startMatch >= startEduc : true
        endMatch = endEduc ? endMatch <= endEduc : true

        return nameMatch && facultMatch && startMatch && endMatch
    })
}

// here we check every symbol that was input to Filter-Form
// and send them to 'filterStudentTable(..,..,..,..)'
// which filters out unnecessary

let filterInputs = $filterForm.querySelectorAll('input')
filterInputs.forEach(input => {

    input.addEventListener('input', () => {

        const filterName = document.getElementById('filter-name').value
        const filterFacult = document.getElementById('filter-faculty').value
        const filterStart = document.getElementById('filter-start-ed').value
        const filterFinish = document.getElementById('filter-finish-ed').value

        renderTable(filterStudentTable(filterName, filterFacult, filterStart, filterFinish))
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
    renderTable(sortStudentTable(copyStList, 'fullname', sortVector))
    sortVector = !sortVector
})
$ageBtnSort.addEventListener('click', () => {
    renderTable(sortStudentTable(copyStList, 'age', sortVector))
    sortVector = !sortVector
})
$facultyBtnSort.addEventListener('click', () => {
    renderTable(sortStudentTable(copyStList, '_facult', sortVector))
    sortVector = !sortVector
})
$educationBtnSort.addEventListener('click', () => {
    renderTable(sortStudentTable(copyStList, '_study', sortVector))
    sortVector = !sortVector
})
