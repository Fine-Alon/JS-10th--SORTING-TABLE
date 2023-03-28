const studentsList = [
  { name: 'Alexandr', surname: 'Dudukalo', birth: new Date('March 30, 1994'), study: 2011, facult: 'curator' },
  { name: 'Alon', surname: 'Fine', birth: new Date('June 20, 1997'), study: 2019, facult: 'fullstack' },
  { name: 'Judit', surname: 'Fine', birth: new Date('September 10, 2005'), study: 2023, facult: 'rocketsince' },
  { name: 'Ron', surname: 'Green', birth: new Date('January 20, 1992'), study: 2022, facult: 'iosdev' },
  { name: 'Glen', surname: 'Stark', birth: new Date('November 20, 1991'), study: 2015, facult: 'disainer' },
  { name: 'Rick', surname: 'Briens', birth: new Date('July 20, 1987'), study: 2010, facult: 'androiddev' },
]

function renderTable(arrStudents) {




}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let $objStudents = {};

  $objStudents.name = (document.getElementById('st-name')).value
  $objStudents.surname = (document.getElementById('st-surname')).value
  $objStudents.birth = (document.getElementById('st-dob')).value
  $objStudents.study = (document.getElementById('st-stady')).value
  $objStudents.facult = (document.getElementById('st-faculty')).value

  console.log($objStudents);
  return {
    $objStudents
  }
})
