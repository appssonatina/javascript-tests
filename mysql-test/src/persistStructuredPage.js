const mysqlx = require("@mysql/xdevapi");

const listPersonPage = {
  type: "page",
  uri: "/person/list",
  content: "<html><body><h1>Person List</h1></body></html>",
};

const detailsPersonPage = {
  type: "page",
  uri: "/person/details",
  content:
    "<html><body><h1>Person Details</h1><table><tr><th>Name</th>" +
    "<th>Age</th></tr><tr><td>Joe</td><td>24</td></tr>" +
    "</table></body></html>",
};

const listUsersPage = {
  type: "page",
  uri: "/user/list",
  content: [
    {
      type: "table",
      schema: {
        from: [
          {
            id: "person0",
            schema: "db",
            table: "person",
          },
          {
            id: "employee0",
            schema: "db",
            table: "employee",
          },
          {
            id: "company0",
            schema: "db",
            table: "company",
          },
        ],
        filter: {
          operator: "and",
          operands: [
            {
              operator: "equal",
              operands: ["person0.id", "employee0.person_id"],
            },
            {
              operator: "equal",
              operands: ["company0.id", "employee0.company_id"],
            },
          ],
        },
        fields: [
          {
            label: { pt: "Nome", en: "Name" },
            from: "person0",
            column: "name",
          },
          {
            label: "Empresa",
            from: "company0",
            column: "name",
          },
          {
            label: "Work since",
            from: "employee0",
            column: "contractBegin",
          },
        ],
        ordering: [{ record: "person0", column: "name", ordering: "asc" }],
      },
    },
  ],
};

// const listPersonPage = {
//   type: "page",
//   uri: "/person/list",
//   name: "person-list",
//   title: "Persons",
//   mimeType: "text/html",
//   template: "bootstrap-template",
//   content: [
//     {
//       type: "header",
//       content: "Persons",
//     },
//     {
//       type: "table",
//       schema: {
//         entity: "person",
//         fields: ["name", "age"],
//       },
//       hash: "859547abcbdf847345784dgbd",
//     },
//     {
//       type: "button",
//       href: "/person/create",
//       content: "Create person",
//       icon: "fa-plus",
//       hash: "859547abcbdf847345784dgbd",
//     },
//   ],
//   hash: "859547abcbdf847345784dgbd",
// };

const createPersonPage = {
  type: "page",
  uri: "/person/create",
  title: "Create person",
  mimeType: "text/html",
  content: [
    {
      type: "header",
      content: "Create person",
    },
    {
      type: "form",
      action: "create",
      schema: {
        entity: "person",
        fields: [
          {
            name: "name",
            type: "text",
            required: "true",
          },
          {
            name: "age",
            type: "number",
            required: false,
          },
        ],
      },
    },
  ],
  hash: "859547abcbdf847345784dgbd",
};

/** Insert pages to "pages" collection
 *
 * @param {Schema} dbSchema
 * @param {any} pages
 */
async function insertPages(dbSchema, pages) {
  const collection = dbSchema.getCollection("pages");
  const res = await collection.add(pages).execute();
  console.log(res);
}

mysqlx
  .getSession({ user: "root", password: "root", host: "localhost" })
  .then((session) => {
    try {
      const db = session.getSchema("db");

      insertPages(db, [listUsersPage]);
    } finally {
      session.close();
    }
  })
  .catch((err) => console.error(err));
