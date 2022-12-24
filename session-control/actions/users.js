const { tableRowData, dropFeedbackMessage } = require("../logic/helpers"),
      { fetchMethods } = require("../../../common/resources.js"),
      { GET, POST } = fetchMethods;

async function connectedUsers(components) {
    const { db } = components,
          trData = row => tableRowData(components, row),
    sql = (
        "select logon, nome, pid, client_addr, minha_sessao from " +
            "view_controle_de_usuarios where minha_sessao <> 'S' order by logon"),
          data = await db.query(sql);
    return data.rows.map(trData);
}

function UsersAction(components, view) {

    async function handler(context, req, callback) {
        callback(
            { view: view.body(await connectedUsers(components)) }
        );
    }

    async function _connectedUsers() {
        return connectedUsers(components);
    }

    return {
        id: "session-control-users",
        method: GET,
        connectedUsers: _connectedUsers,
        handler,
    };
}

function DropUsersAction(components, view) {
    const { db } = components;

    async function dropUser(input) {
        const data = await db.query(
            `select tablename, schemaname from view_controle_de_usuarios where pid = ${ input.value }`
        );
        const user = data.rows[0];
        if ( user ) {
            await db.query(`drop table if exists ${ user.schemaname }.${ user.tablename }`);
        }
    }

    async function dropUsers(req) {
        const inputs = req.body.sessionDropUserInputs || [],
              counter = { count: 0 };
        for (const input of inputs) {
            if ( input.checked ) {
                await dropUser(input);
                counter.count += 1;
            }
        }
        return counter;
    }

    async function handler(context, req, callback) {
        const counter = await dropUsers(req);

        callback({
            view: view.body(await connectedUsers(components)),
            dropUsersMessage: dropFeedbackMessage(counter.count)
        });
    }

    return {
        id: "session-control-users-drop",
        method: POST,
        handler: handler,
    };
}

module.exports = {
    UsersAction,
    DropUsersAction,
};
