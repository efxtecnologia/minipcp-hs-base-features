const card = require("../../../logic/views/cards.js"),
      { table, tBodyRows } = require("../../../logic/views/table.js"),
      { button, withClasses } = require("../../../logic/views/button.js"),
      { fetchMethods } = require("../../../common/resources.js"),
      { GET, POST } = fetchMethods;

function MainView(components) {
    const id = "session-control.main",
          tBodyId = "session-control.main.tbody",
          mainBodyId = "session-control.main.body",
          refreshButtonId = "session-control.main.refresh",
          dropButtonId = "session-control.main.drop";

    const actions = [
        {
            elementId: refreshButtonId,
            type: "perform",
            event: "onclick",
            args: {
                steps: [
                    { type: "fetch", method: GET, from: "session-control-users", into: "sessionData" },
                    { type: "setContent", setContent: { contentKeys: ["sessionData.view"], nodeIds: [mainBodyId] }},
                ]
            }
        },

        {
            elementId: dropButtonId,
            type: "perform",
            event: "onclick",
            args: {
                steps: [
                    { type: "gatherChildren", gather: { from: tBodyId, into: "sessionDropUserInputs" } },
                    { type: "fetch", method: POST, from: "session-control-users-drop", into: "sessionData", withBody: ["sessionDropUserInputs"] },
                    { type: "setContent", setContent: { contentKeys: ["sessionData.view"], nodeIds: [mainBodyId] }},
                    { type: "alert", message: { from: "sessionData.dropUsersMessage" }},
                ]
            }
        }
    ];

    function body(rows) {
        return table(
            ["Logon de usuário", "Nome", "Endereço IP", "Remover"],
            rows || [],
            {
                classes: ["uk-table", "uk-table-hover", "uk-table-striped"],
                tBodyId,
            }
        );
    }

    function hiccup(rows) {
        return card({
            title: "Controle de Sessões",
            subtitle: ["div",
                       ["div", "Inspeção e exclusão de sessões de usuários conectados ao MiniPCP para desktop."],
                       ["div",
                        ["span",
                         "Marque o checkbox das sessões que quer remover e depois clique no botão ",
                         ["strong", "REMOVER"]]]],
            bodyOptions: { id: mainBodyId },
            body: body(rows),
            footer: ["div", { class: ["uk-margin", "uk-align-right"]},
                     button(
                         "Atualizar",
                         withClasses(["uk-button-primary", "uk-margin-small-right"]),
                         { id: refreshButtonId },
                         "refresh"
                     ),
                     button(
                         "Remover",
                         withClasses(["uk-button-danger"]),
                         { id: dropButtonId },
                         "trash"
                     )]
        });
    }

    function render(rows) {
        return {
            id,
            actions,
            hiccup: hiccup(rows),
        };
    }

    return {
        body,
        render,
    };
}

module.exports = MainView;
