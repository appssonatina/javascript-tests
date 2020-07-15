const mysqlx = require("@mysql/xdevapi");

mysqlx
  .getSession({ user: "root", password: "root", host: "localhost" })
  .then((session) => {
    const db = session.getSchema("db");

    const pagesCollection = db.getCollection("pages");

    pagesCollection
      .find()
      .execute()
      .then((pages) => {
        let p;
        while ((p = pages.fetchOne())) {
          console.log(`${p.uri} - ${p.name}`);
        }
      });

    session.close();
  })
  .catch((err) => console.error(err));
