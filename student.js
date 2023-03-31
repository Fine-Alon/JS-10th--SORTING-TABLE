export default
    class Student {

    constructor(name = 'name', surname = 'surname', birth = 'birth', study = 'study', facult = 'facult') {
        this._name = name
        this._surname = surname
        this._birth = birth
        this._facult = facult
        this._study = study
    }

    get fullname() {
        return this._name + ' ' + this._surname
    }

    get age() {
        var today = new Date();
        var birthDate = new Date(this._birth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        return age;
    }

}
