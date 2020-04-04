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
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
            moment().format('YYYY-MM-DD')
        ] 

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query(`SELECT * FROM students 
        WHERE id = $1`, [id], function(err,results) {

            if(err) throw `Database error! ${err}`
            callback(results.rows[0])

        })
    }
}