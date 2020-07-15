const mysqlx = require("@mysql/xdevapi");

mysqlx
  .getSession({ user: "root", password: "root", host: "localhost" })
  .then((session) => {
    const db = session.getSchema("db");

    db.createCollection("pages", {
      reuseExisting: true,
    }).then((pagesCollection) => {
      const opPromise = pagesCollection
        .add({
          uri: "/",
          name: "index",
          title: "Hello",
          mimeType: "text/html",
          content: "<html><body>Hello</body></html>",
        })
        .execute();

      opPromise
        .then((p) => {
          console.log(p);
          session.close();
        })
        .catch((err) => console.error(err));
    });
  })
  .catch((err) => console.error(err));
