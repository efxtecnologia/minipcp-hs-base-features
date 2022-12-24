const passwordErrors = {
    fieldsDontMatch: "ERRO: A confirmação da nova senha está diferente da nova senha",
    isEmpty: "ERRO: A senha não pode ficar em branco",
    notLongEnough: "ERRO: A nova senha deve ter pelo menos 3 caracteres",
    invalidCurrentPassword: "ERRO: Senha atual inválida",
};

const successfulChange = "Senha alterada com sucesso";

function inputById(ids, inputs, id) {
    return inputs.filter(i => i.id === ids[id])[0] || {};
}

function passwordFieldsMatch(newPassword, newPasswordConfirmation) {
    return newPassword === newPasswordConfirmation;
}

function isEmpty(x) {
    return x === "";
}

function isLongEnough(newPassword) {
    return newPassword.length >= 3;
}

function validPassword({ ids }, inputs) {
    const currentPassword = inputById(ids, inputs, "currentPasswordId").value ?? "",
          newPassword = inputById(ids, inputs, "newPasswordId").value ?? "",
          newPasswordConfirmation = inputById(ids, inputs, "newPasswordConfirmationId").value ?? "",
          passwords = { currentPassword, newPassword, newPasswordConfirmation };

    if ( ! passwordFieldsMatch(newPassword, newPasswordConfirmation) ) {
        return { ...passwords, error: passwordErrors.fieldsDontMatch };
    }

    if (  isEmpty(newPassword) ) {
        return { ...passwords, error: passwordErrors.isEmpty };
    }

    if ( ! isLongEnough(newPassword) ) {
        return { ...passwords, error: passwordErrors.notLongEnough };
    }

    return passwords;
}

const cleanPasswords = { currentPassword: "", newPassword: "", newPasswordConfirmation: "" };
function response(validated, inputs) {
    if ( validated.error ) {
        return { ...validated, statusMessage: validated.error };
    }
    return { ...cleanPasswords,  statusMessage: successfulChange };
}

module.exports = {
    passwordErrors,
    validPassword,
    response,
};
