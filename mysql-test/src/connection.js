const mysqlx = require("@mysql/xdevapi");

mysqlx
  .getSession({ user: "root", password: "root", host: "localhost" })
  .then((session) => {
    const db = session.getSchema("db");

    const personTable = db.getTable("person");
    personTable
      .select("name", "age")
      .execute()
      .then((persons) => {
        let p;
        while ((p = persons.fetchOne())) {
          console.log(`Name ${p[0]}, Age: ${p[1]}`);
        }
      });

    session.close();
  })
  .catch((err) => console.error(err));
