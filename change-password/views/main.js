const card = require("../../../logic/views/cards.js"),
      { form } = require("../../../logic/views/form.js"),
      { button, buttonsContainer } = require("../../../logic/views/button.js"),
      { fetchMethods } = require("../../../common/resources.js"),
      { POST } = fetchMethods;

function MainView(components) {

    const id = "change-password.main",
          formId =  `${ id }.change-password-form`,
          currentPasswordId = `${ id }.current-password`,
          newPasswordId = `${ id }.new-password`,
          newPasswordConfirmationId = `${ id }.new-password-confirmation`,
          newPasswordPostId = `${ id }.new-password-post`;

    const actions = [
        {
            elementId: newPasswordPostId,
            type: "perform",
            event: "onclick",
            args: {
                steps: [
                    { type: "gatherChildren", gather: { from: formId, into: "changePasswordData" } },
                    { type: "fetch", method: POST, from: "change-password", into: "changePasswordStatus", withBody: ["changePasswordData"] },
                    { type: "alert", message: { from: "changePasswordStatus.statusMessage" }},
                    {
                        type: "setInputValues",
                        setInputValues: {
                            contentKeys: [
                                "changePasswordStatus.currentPassword",
                                "changePasswordStatus.newPassword",
                                "changePasswordStatus.newPasswordConfirmation",
                            ],
                            inputIds: [
                                currentPasswordId,
                                newPasswordId,
                                newPasswordConfirmationId,
                            ]
                        }
                    },
                ]
            }
        }
    ];

    function hiccup() {
        return card({
            title: "Alteração de senha",
            subtitle: "Caso não saiba a sua senha atual, solicite ao usuário administrador que faça a alteração ou entre em contato com o suporte técnico",
            body: form(
                formId,
                [
                    { id: currentPasswordId, type: "password", caption: "Senha atual" },
                    { id: newPasswordId, type: "password", caption: "Nova senha" },
                    { id: newPasswordConfirmationId, type: "password", caption: "Confirmação da nova senha (digite novamente)" }
                ],
            ),
            footer: buttonsContainer(
                [button(
                    "Alterar senha",
                    ["uk-button-primary", "uk-margin-small-right"],
                    { id: newPasswordPostId },
                    "unlock"
                )]
            ),
        });
    }

    function render() {
        return {
            actions,
            hiccup: hiccup(),
        };
    }

    return {
        ids: {
            id,
            formId,
            currentPasswordId,
            newPasswordId,
            newPasswordConfirmationId,
            newPasswordPostId,
        },
        render,
    };
}

module.exports = MainView;
