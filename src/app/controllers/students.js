const moment = require('moment')
const Student = require('../models/Student')

module.exports = {
    index(req, res){

        Student.all(function(students) {
            return res.render("students/index", { students })
        })

    },
 
    getCreate(req, res){

        Student.instructorsSelectOptions(function(options) {
            return res.render('students/create', {instructorOptions: options})
        })

    },

    postCreate(req, res){

        const keys = Object.keys(req.body)
    
        Student.create(req.body, function(student) {

            return res.redirect(`/students/${student.id}`)
        })

        return 
    },

    showCreate(req, res){
        
        Student.find(req.params.id, function(student) {

            if(!student) return res.send("Instructor not found")

            student.birth = moment().diff(student.birth, 'years', false)
            student.activities = student.activities.split(",")
            student.created_at = moment(student.created_at).format('DD/MM/YYYY')

            return res.render("students/show", { student })

        })
    },
 
    editCreate(req, res){
        
        Student.find(req.params.id, function(student) {

            if(!student) return res.send("Student not found")

            Student.instructorsSelectOptions(function(options) {
                return res.render("students/edit", { student, instructorOptions: options })
            })

        })

    },
    
    putCreate(req, res){

        const keys = Object.keys(req.body)

        Student.update(req.body, function() {

            return res.redirect(`/students/${req.body.id}`)

        })

    },

    delete(req, res){

        Student.delete(req.body.id, function() {

            return res.redirect(`/students`)

        })
    }
}
