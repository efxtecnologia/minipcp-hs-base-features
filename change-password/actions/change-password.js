const { validPassword, passwordErrors, response } = require("../logic/password.js"),
      { fetchMethods } = require("../../../common/resources.js"),
      { POST } = fetchMethods;

function ChangePasswordAction(components, view) {
    const { auth } = components;

    async function validCurrentPassword(userName, preValidated) {
        if ( preValidated.error ) {
            return preValidated;
        }
        if ( ! await auth.validUser(userName, preValidated.currentPassword) ) {
            return { ...preValidated, error: passwordErrors.invalidCurrentPassword };
        }
        return preValidated;
    }

    async function setPassword(userName, validated) {
        if ( ! validated.error ) {
            await auth.setPassword(userName, validated.newPassword);
        }
    }

    async function handler(context,  req,  callback) {
        const inputs = req.body.changePasswordData || [],
              userName = req.auth.username,
              validated = await validCurrentPassword(req.auth.username, validPassword(view, inputs));
        await setPassword(userName, validated);
        callback(response(validated, inputs));
    }

    return {
        id: "change-password",
        method: POST,
        handler,
    };
}

module.exports = ChangePasswordAction;
