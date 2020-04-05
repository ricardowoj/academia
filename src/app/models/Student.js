const moment = require('moment')
const db = require('../../config/db')

module.exports = {

    all(callback) {

        db.query(`SELECT * FROM students`, function(err, results){
            if(err) throw `Database error! ${err}`
            callback(results.rows)

        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                email,
                birth,
                gender,
                activities,
                zip,
                city,
                state,
                neighborhood,
                street,
                complement,
                created_at,
                number,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            moment(data.birth).format('YYYY-MM-DD'),
            data.gender,
            data.activities,
            data.zip,
            data.city,
            data.state,
            data.neighborhood,
            data.street,
            data.complement,
            moment().format('YYYY-MM-DD'),
            data.number,
            data.instructor
        ] 

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query(`
        SELECT students.*, instructors.name AS instructor_name FROM students 
        LEFT JOIN instructors ON (students.instructor_id = instructors.id)
        WHERE students.id = $1`, 
        [id], function(err, results) {
            callback(results.rows[0])
        })
    },

    update(data, callback) {

        const query = `
            UPDATE students SET
                avatar_url=($1),
                name=($2),
                email=($3),
                birth=($4),
                gender=($5),
                activities=($6),
                zip=($7),
                city=($8),
                state=($9),
                neighborhood=($10),
                street=($11),
                number=($12),
                complement=($13),
                instructor_id=($14)
            WHERE id = $15
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.birth,
            data.gender,
            data.activities,
            data.zip,
            data.city,
            data.state,
            data.neighborhood,
            data.street, 
            data.number,
            data.complement,
            data.instructor,
            data.id
        ] 

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`
            callback()
        })

    },

    delete(id, callback) {
        db.query(`DELETE FROM students 
        WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error! ${err}`
            return callback()
        })
    },

    instructorsSelectOptions(callback) {
        db.query(`SELECT name, id FROM instructors`, function(err, results){
            if(err) throw `Database Error! ${err}`
            callback(results.rows)
        } )
    }
}