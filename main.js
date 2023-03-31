import Student from "./student.js";
let $table = document.getElementById('table')


const studentsList = [
    new Student('Michail', 'Babojko', new Date('1994,04,02'), 2010, 'godofprogramming'),
    new Student('Alexandr', 'Dudukalo', new Date('March 30, 1994'), 2011, 'curator'),
    new Student('Alon', 'Fine', new Date('June 20, 1997'), 2019, 'fullstack'),
    new Student('Judit', 'Fine', new Date('September 10, 2005'), 2023, 'rocketsince'),
    new Student('Ron', 'Green', new Date('January 20, 1992'), 2022, 'iosdev'),
    new Student('Glen', 'Stark', new Date('November 20, 1991'), 2015, 'disainer'),
    new Student('Rick', 'Briens', new Date('July 20, 1987'), 2010, 'androiddev'),
]

function renderTable(arrStudents) {

    arrStudents.forEach(element => {

        console.log(element);

        let $liForTable = document.createElement('li')
        let $tableName = document.createElement('span')
        let $tableAge = document.createElement('span')
        let $tableFaculty = document.createElement('span')
        let $tableEducation = document.createElement('span')

        $tableName.textContent = element.fullname
        $tableAge.textContent = element.age
        $tableFaculty.textContent = element._facult
        $tableEducation.textContent = element._study

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

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(Number(document.getElementById('st-stady').value.trim()));

    let copyStList = [...studentsList]

    copyStList.push(new Student(
        document.getElementById('st-name').value.trim(),
        (document.getElementById('st-surname').value).trim(),
        new Date(document.getElementById('st-dob').value),
        (document.getElementById('st-faculty').value).trim(),
        Number(document.getElementById('st-stady').value.trim()),
    ))
    studentsList = [...copyStList]

})
// console.log(studentsList[studentsList.length - 1].age);
