var mysql = require("mysql");
let pool;

// init from app.js
var init = function (settings) {
  pool = mysql.createPool({
    host: settings.DB_HOST,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_NAME,
  });
};

let asyncQuery = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

const getFcmJob = async function () {
  let sql = "SELECT * from fcm_job";
  let result = await asyncQuery(sql);
  return result;
};

const insert = async function (data) {
  let sql = `
  INSERT INTO fcm_job (identifier,deliverAt)
	VALUES ('${data.identifier}','${data.deliverAt}');
  `;
  let result = await asyncQuery(sql);
  return result;
};

module.exports = {
  init,
  getFcmJob,
  insert,
};
