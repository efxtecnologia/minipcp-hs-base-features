const MainView = require("./views/main.js"),
      ChangePasswordAction = require("./actions/change-password.js");

function ChangePassword(components) {
    const mainView = MainView(components),
          changePasswordAction = ChangePasswordAction(components, mainView);

    function controller(context, req, callback) {
        callback({
            name: "changePassword",
            description: "Alteração de senha de usuário",
            views: [mainView.render()]
        });
    }

    return {
        group: "Usuário",
        id: "change-password",
        title: "Alteração de senha",
        group_order: 1,
        controller,
        actions: [changePasswordAction],
    };
}

module.exports = ChangePassword;
