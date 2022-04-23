const REFERENCE_POLLING_INTERVAL_MILLISECONDS = 200

keepPollingReferences = false
pollingTimeout = null

var referenceGroupCache = {}

function startPollingReferences() {
    keepPollingReferences = true
    pollingTimeout = setTimeout(pollReferences, REFERENCE_POLLING_INTERVAL_MILLISECONDS);
}

function stopPollingReferences() {
    keepPollingReferences = false
}

function pollReferences() {

    google.script.run
        .withSuccessHandler(runGetMarkedReferenceGroupIdSuccess)
        .withFailureHandler(() => {
            stopPollingReferences()
            alert("Something went wrong polling references. Polling disabled.")
        })
        .runGetMarkedReferenceGroupId();

    if (keepPollingReferences) {
        setTimeout(pollReferences, REFERENCE_POLLING_INTERVAL_MILLISECONDS);
    }
}

var currentReferenceGroupId = null
function runGetMarkedReferenceGroupIdSuccess(newReferenceGroupId) {

    if (
            newReferenceGroupId !== null
            && (!currentReferenceGroupId || currentReferenceGroupId !== newReferenceGroupId)) {

        console.log("reference group: update")
        setReferenceGroupLoading()
        getReferenceGroup(newReferenceGroupId, processNewReferenceGroup)
        
        currentReferenceGroupId = newReferenceGroupId
    
    } else if (currentReferenceGroupId && !newReferenceGroupId) {
    
        console.log("reference group: reset")
        setReferenceGroupNone()
        currentReferenceGroupId = null
    
    } else {
    
        console.log("reference group: no change")
    
    }
    // console.log(referenceGroupId)

}

function processNewReferenceGroup(referenceGroup) {
    console.log(referenceGroup)
    if (referenceGroup) {
        formatReferenceGroup(referenceGroup)
    } else {
        setReferenceGroupNone()
    }
}

function getReferenceGroup(referenceGroupId, callback, useCache = true) {

    // try to access cache first ...
    if (useCache && referenceGroupId in referenceGroupCache) {
    
        console.log("getting reference group: " + referenceGroupId + " (cached)")
        var referenceGroup = referenceGroupCache[referenceGroupId]
        callback(referenceGroup)
    
    // ... before getting reference group from BibSonomy
    } else {
        console.log("getting reference group: " + referenceGroupId)
        google.script.run
            .withSuccessHandler((referenceGroup) => {
                if (referenceGroup !== null) {
                    referenceGroupCache[referenceGroupId] = referenceGroup
                }
                callback(referenceGroup)
            })
            .withFailureHandler(() => {
                stopPollingReferences()
                alert("Something went getting the reference group: " + referenceGroupId + ".")
            })
            .runGetReferenceGroup(referenceGroupId);
    }
}

function formatReferenceGroup(referenceGroup) {
    console.log("references: retrieved BibTex info")
    console.log(referenceGroup)

    var container = $("#selected-references")
    var wrapper = $('<div>')
    for (let ref of referenceGroup.references) {
        // console.log(ref)
        var hash = ref.bibtex.interhash
        var link = 'https://bibsonomy.org/bibtex/' + hash +'/' + $('#bibsonomy-user').val();
        var msg = formatReference(ref, link)

        if (ref.recommendation) {
            // var refElement = $('<div class="reference recommendation"><div class="link-reference">link</div>Best match:<br /><b><a href="' + link + '">' + key + '</a></b><br />' + msg + '</div>');
            var refElement = $('<div class="reference recommendation"><div class="remove-reference">remove</div>Best match:</div>').append(msg);
        } else {
            var refElement = $('<div class="reference"><div class="remove-reference">remove</div></div>').append(msg);
        }
        refElement.data("post", ref)
        refElement.click(removeReference)  // see references.js

        wrapper.append(refElement)
    }
    container.html("")
    container.append(wrapper)

}

function setReferenceGroupNone() {
    $('#selected-references').html("None");
}

function setReferenceGroupLoading() {
    $('#selected-references').html("Loading ...");
}

function addReference(e) {
    var post = $(this).data("post")
    console.log(post)
    setReferenceGroupLoading()
    google.script.run
        .withSuccessHandler(runUpdateToReferenceGroupSuccess)
        .withFailureHandler(() => {alert("Something went wrong adding reference."); console.log(post)})
        .runAddPostToReferenceGroup(post, currentReferenceGroupId);
}

function removeReference(e) {
    var post = $(this).data("post")
    console.log("removing reference from group: " + currentReferenceGroupId)
    console.log(post)
    setReferenceGroupLoading()
    google.script.run
        .withSuccessHandler(runUpdateToReferenceGroupSuccess)
        .withFailureHandler(() => {alert("Something went wrong removing reference."); console.log(post)})
        .runRemovePostFromReferenceGroup(post, currentReferenceGroupId);
}

function runUpdateToReferenceGroupSuccess(response) {
    console.log(response)
    if (response === null) {
        setReferenceGroupNone()
        currentReferenceGroupId = null
    } else {
        referenceGroupCache[response.group.id] = response.group
        formatReferenceGroup(response.group)
    }
}

