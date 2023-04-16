export default
    class Student {

    constructor(name = 'name', surname = 'surname', lastname = 'lastname', birth = null, study = 'study', faculty = 'facult', id = null) {
        this._name = name
        this._surname = surname
        this._lastname = lastname
        this._birth = birth
        this._faculty = faculty
        this._study = study
        this._id = id
    }

    get fullname() {
        return this._name + ' ' + this._surname
    }

    get finishEducation() {
        return Number(this._study) + 4
    }

    get courseNumber() {
        let course; // will return as resoult
        let today = new Date(); //  current date
        let totalTime = today.getFullYear() - this._study;  // this._study - 2023 or every year that you want to have as start education
        let startMonth = 8 // start learnining (-1) cose .getMonth() return from 0 to 11 months
        let month = today.getMonth() // get current mounth number

        switch (true) {
            case (totalTime > 4):
                course = "finish";
                break;
            case (totalTime === 4 && month >= startMonth):
                course = "finish";
                break;
            case totalTime === 4:
                course = 4;
                break;
            case totalTime === 0 && (month != 6 && month != 7):
                course = 1;
                break;
            default:
                course = totalTime;
                break;
        }
        return course
    }

    get education() {
        if (this.courseNumber == 'finish') {
            return `${this._study} -  ${this.finishEducation}(${this.courseNumber})`
        } else {
            return `${this._study} -  ${this.finishEducation}(${this.courseNumber}course)`
        }
    }

    get age() {
        let today = new Date();
        let birthDate = new Date(this._birth);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${birthDate.getFullYear()}.${birthDate.getMonth()}.${birthDate.getDate()}(${age}y.o)`
    }

}

