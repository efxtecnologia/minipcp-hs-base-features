const { checkBox } = require("../../../logic/views/form.js");

function tableRowData(components, row) {
    return [
        row.logon,
        row.nome || "",
        row.client_addr,
        row.minha_sessao === "S" ?
            "Minha Sessão" :
            checkBox(
                components,
                {
                    name: `session-control.main.${ row.pid }`,
                    value: row.pid,
                    caption: "Remover",
                },
            )
    ];
}

function dropFeedbackMessage(count) {
    return count > 0 ?
        `Sessões removidas com sucesso: ${ count }. Em até 15 segundos as exclusões serão efetivadas.` :
        "Nenhuma sessão foi excluída";
}

module.exports = {
    tableRowData,
    dropFeedbackMessage,
};
