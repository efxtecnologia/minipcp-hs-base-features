const MainView = require("./views/main.js"),
      { UsersAction, DropUsersAction } = require("./actions/users.js");

function SessionControl(components) {
    const { db, config } = components,
          mainView = MainView(components),
          usersAction = UsersAction(components, mainView),
          dropUsersAction = DropUsersAction(components, mainView);

    const actions = [
        usersAction,
        dropUsersAction,
    ];

    async function controller(context, req, callback) {
        callback({
            name: "sessionControl",
            description: "Controle de sessões de usuário",
            views: [mainView.render(await usersAction.connectedUsers())],
        });
    }

    return {
        group: "Admin",
        id: "session-control",
        title: "Controle de sessões de usuários",
        group_order: 1,
        allowedScopes: ["dev", "superadm", "admin"],
        controller,
        actions,
    };
}

module.exports = SessionControl;
