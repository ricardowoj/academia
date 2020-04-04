const moment = require('moment')
const Student = require('../models/Student')

module.exports = {
    index(req, res){

        Student.all(function(students) {
            return res.render("students/index", { students })
        })

    },

    getCreate(req, res){

        return res.render("students/create")

    },

    postCreate(req, res){

        const keys = Object.keys(req.body)

        for(key of keys){

            if (req.body[key] == "") {

                return res.send('Preencha todos os campos!')

            }
        }
    
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

            return res.render("students/edit", { student })

        })

    },
    
    putCreate(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos!')
            }   
        }
        return
    },

    delete(req, res){
        return
    }
}
