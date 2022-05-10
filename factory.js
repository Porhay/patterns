class Fulltime {
    constructor () {
        this.rate = '$1'
    }
}

class Parttime {
    constructor () {
        this.rate = '$2'
    }
}

class Temporary {
    constructor () {
        this.rate = '$3'
    }
}

class Contractor {
    constructor () {
        this.rate = '$4'
    }
}

class Employee {
    create (type) {
        let employee
        if (type === 'fulltime') {
            employee = new Fulltime()
        } else if (type === 'parttime') {
            employee = new Parttime()
        } else if (type === 'temporary') {
            employee = new Temporary()
        } else if (type === 'contractor') {
            employee = new Contractor()
        }
        employee.type = type
        employee.say = function () {
            console.log(`${this.type}: rate ${this.rate}/hour`)
        }
        return employee
    }
}


const factory = new Employee()

const fulltime = factory.create('fulltime')
const parttime = factory.create('parttime')
const temporary = factory.create('temporary')
const contractor = factory.create('contractor')

fulltime.say()
parttime.say()
temporary.say()
contractor.say()
