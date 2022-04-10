var CONFIG = null

function runGetConfigSuccess(config) {

    CONFIG = config
    setBibsonomyCredentialsInForm(config.bibsonomy.user, config.bibsonomy.apikey)

}

function setBibsonomyCredentialsInForm(user, apikey) {
    $('input[id="bibsonomy-user"]').val(user);
    $('input[id="bibsonomy-apikey"]').val(apikey);
}

function getBibsonomyCredentialsFromForm() {
    var bibsonomyUser = $('input[id=bibsonomy-user]').val();
    var bibsonomyApikey = $('input[id=bibsonomy-apikey]').val();
    return [bibsonomyUser, bibsonomyApikey]
}

function openBibsonomyRegisterDialog() {
    window.open("https://bibsonomy.org/register", "_blank");
    return false
}

function updateBibsonomyCredentials(showPopup = true) {

    console.log("update credentials")

    var [bibsonomyUser, bibsonomyApikey] = getBibsonomyCredentialsFromForm()

    google.script.run
        .withSuccessHandler(e => {
            $("div[class=credentials-error]").hide()
            $("input[id=bibsonomy-user]").removeClass("credentials-error")
            $("input[id=bibsonomy-apikey]").removeClass("credentials-error")
            console.log("update credentials: success")
        })
        .withFailureHandler(e => {
            $("div[class=credentials-error]").show()
            $("input[id=bibsonomy-user]").addClass("credentials-error")
            $("input[id=bibsonomy-apikey]").addClass("credentials-error")
            console.log("update credentials: failed")
        })
        .withUserObject(this)
        .runUpdateBibsonomyCredentials(bibsonomyUser, bibsonomyApikey, showPopup);

    return false
}
