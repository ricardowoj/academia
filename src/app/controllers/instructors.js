const moment = require('moment')
const Instructor = require('../models/Instructor')

module.exports = {

    index(req, res){

        Instructor.all(function(instructors) {
            return res.render("instructors/index", { instructors })
        })

    },

    getCreate(req, res){

        return res.render("instructors/create")

    },

    postCreate(req, res){

        const keys = Object.keys(req.body)

        for(key of keys){

            if (req.body[key] == "") {
                
                return res.send('Preencha todos os campos!')
                
            }

        }

        Instructor.create(req.body, function(instructor) {

            return res.redirect(`/instructors/${instructor.id}`)

       })

    },

    showCreate(req, res){

        Instructor.find(req.params.id, function(instructor) {

            if(!instructor) return res.send("Instructor not found")

            instructor.birth = moment().diff(instructor.birth, 'years', false)
            instructor.services = instructor.services.split(",")
            instructor.created_at = moment(instructor.created_at).format('DD/MM/YYYY')

            return res.render("instructors/show", { instructor })

        })
    },

    editCreate(req, res){

        Instructor.find(req.params.id, function(instructor) {

            if(!instructor) return res.send("Instructor not found")

            return res.render("instructors/edit", { instructor })

        })

    },

    putCreate(req, res){

        const keys = Object.keys(req.body)

        Instructor.update(req.body, function() {

            return res.redirect(`/instructors/${req.body.id}`)

        })

    },

    delete(req, res){

        Instructor.delete(req.body.id, function() {

            return res.redirect(`/instructors`)

        })
        
    }

}
 
