var CONFIG = null

function callbackGetConfig(config) {

    CONFIG = config

    $('input[id="bibsonomy-user"]')
        .val(config.bibsonomy.user);

    $('input[id="bibsonomy-apikey"]')
        .val(config.bibsonomy.apikey);

    checkCredentials(
        config.bibsonomy.user, 
        config.bibsonomy.apikey)

}

function saveCredentials(showPopup = true) {

    console.log("update credentials")

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
        .updateBibsonomyCredentials(bibsonomyUser, bibsonomyApikey, showPopup);

    return false
}

function getCredentials() {
    var bibsonomyUser = $('input[id=bibsonomy-user]').val();
    var bibsonomyApikey = $('input[id=bibsonomy-apikey]').val();
}

function checkCredentials(user, apikey) {

}

function openBibsonomyRegisterDialog() {
    window.open("https://bibsonomy.org/register", "_blank");
    return false
}


    //   function formatReferences() {

    //     $("button[id=bibliography-format]").removeClass("blue")
    //     $("button[id=bibliography-format]").unbind('click')
    //     google.script.run
    //       .withSuccessHandler(e => {
    //         $("button[id=bibliography-format]").addClass("blue")
    //         $("button[id=bibliography-format]").click(formatReferences)
    //       })
    //       .withFailureHandler(e => {
    //         $("button[id=bibliography-format]").addClass("blue")
    //         $("button[id=bibliography-format]").click(formatReferences)
    //       })
    //       .formatReferences();
    //   }

    //   function resetReferenceFormatting() {

    //     $("button[id=bibliography-reset]").removeClass("blue")
    //     $("button[id=bibliography-reset]").unbind('click')
    //     google.script.run
    //       .withSuccessHandler(e => {
    //         $("button[id=bibliography-reset]").addClass("blue")
    //         $("button[id=bibliography-reset]").click(resetReferenceFormatting)
    //       })
    //       .withFailureHandler(e => {
    //         $("button[id=bibliography-format]").addClass("blue")
    //         $("button[id=bibliography-format]").click(resetReferenceFormatting)
    //       })
    //       .resetFormattedReferences();
    //   }

    //   /**
    //    * Inserts a div that contains an error message after a given element.
    //    *
    //    * @param {string} msg The error message to display.
    //    * @param {DOMElement} element The element after which to display the error.
    //    */
    //   function showError(msg, element) {
    //     var div = $('<div id="error" class="error">' + msg + '</div>');
    //     $(element).after(div);
    //     console.log(msg, element)
    //   }

    //   // start cursor polling
    //   function pollReferences() {
    //     google.script.run
    //       .withSuccessHandler(processReferenceGroup)
    //       .withFailureHandler(showError)
    //       .runGetMarkedReferenceGroup();
    //     setTimeout(pollReferences, 200);
    //   }
    //   setTimeout(pollReferences, 200);

    //   var currentReferenceGroup = null
    //   function processReferenceGroup(newReferenceGroup) {
    //     if (
    //         newReferenceGroup !== null 
    //         && (!currentReferenceGroup || currentReferenceGroup.groupId != newReferenceGroup.groupId)) {

    //       console.log("references: update")
    //       loadingReferences()
    //       formatReferenceGroup(newReferenceGroup)
    //       currentReferenceGroup = newReferenceGroup

    //     } else if (currentReferenceGroup !== null && newReferenceGroup === null) {
          
    //       console.log("references: reset")
    //       resetReferences()
    //       currentReferenceGroup = null
        
    //     } else {
    //       console.log("references: no change")
    //     }
    //   }

    //   // // process new bibtex keys
    //   // var currentReferenceInfos = null
    //   // function processReferenceInfos(newReferenceInfos) {
        
    //   //   if (
    //   //       newReferenceInfos !== null 
    //   //       && (currentReferenceInfos === null || 
    //   //           currentReferenceInfos.map(function(i) {return i.key}).join(",") != newReferenceInfos.map(function(i) {return i.key}).join(","))) {
          
    //   //     console.log("references: update")
    //   //     loadingReferences() 
    //   //     console.log(newReferenceInfos)
          
    //   //     google.script.run
    //   //       .withSuccessHandler(processReferences)
    //   //       .withFailureHandler(showError)
    //   //       .getReferences(newReferenceInfos);
          
    //   //     currentReferenceInfos = newReferenceInfos
        
    //   //   } else if (currentReferenceInfos !== null && newReferenceInfos === null) {
          
    //   //     console.log("references: reset")
    //   //     resetReferences()
    //   //     currentReferenceInfos = null
        
    //   //   } else {
    //   //     console.log("references: no change")
    //   //   }
    //   // }

    //   // function processReferences(references) {
    //   //   console.log("references: retrieved BibTex info")
    //   //   console.log(references)

    //   //   var container = $("#selected-references")
    //   //   container.html("")
    //   //   for (let ref of references) {
    //   //     console.log(ref)
    //   //     var key = ref.key
    //   //     if (ref.post !== undefined) {
    //   //       var hash = ref.post.bibtex.interhash
    //   //       var link = 'https://bibsonomy.org/bibtex/' + hash +'/' + $('#bibsonomy-user').val();
    //   //       var msg = formatReference(ref.post, link)
            
    //   //       if (ref.duplicate) {
    //   //         var refElement = $('<div class="reference duplicate">Duplicate:</div>').append(msg);
    //   //       } else if (ref.post.recommendation) {
    //   //         // var refElement = $('<div class="reference recommendation"><div class="link-reference">link</div>Best match:<br /><b><a href="' + link + '">' + key + '</a></b><br />' + msg + '</div>');
    //   //         var refElement = $('<div class="reference recommendation">Best match:</div>').append(msg);
    //   //       } else {
    //   //         var refElement = $('<div class="reference"></div>').append(msg);
    //   //       }
            
    //   //     } else if (key.trim() == "") {
    //   //       var refElement = $('<div class="reference emptykey">Empty reference.</div>');
    //   //     } else {
    //   //       var refElement = $('<div class="reference noreference">No matching reference found:<br /><b>' + key + '</b></div>');
    //   //     }
    //   //     container.append(refElement)
    //   //   }
    //   // }

    //   function formatReferenceGroup(referenceGroup) {
    //     console.log("references: retrieved BibTex info")
    //     console.log(referenceGroup)

    //     var container = $("#selected-references")
    //     container.html("")
    //     for (let ref of referenceGroup.references) {
    //       console.log(ref)
    //       var hash = ref.bibtex.interhash
    //       var link = 'https://bibsonomy.org/bibtex/' + hash +'/' + $('#bibsonomy-user').val();
    //       var msg = formatReference(ref, link)
          
    //       if (ref.recommendation) {
    //         // var refElement = $('<div class="reference recommendation"><div class="link-reference">link</div>Best match:<br /><b><a href="' + link + '">' + key + '</a></b><br />' + msg + '</div>');
    //         var refElement = $('<div class="reference recommendation">Best match:</div>').append(msg);
    //       } else {
    //         var refElement = $('<div class="reference"></div>').append(msg);
    //       }
    //       container.append(refElement)
    //     }
    //   }

    //   function formatReference(post, link) {
    //     // return post.bibtex.title
    //     console.log(post)
    //     var element = $('<div><b><a href="' + link + '">' + post.bibtex.bibtexKey + '</a></b><br />' + post.bibtex.title + ', <i>' + post.bibtex.author.split(",")[0] + '</i> (' + post.bibtex.year + ')</div>')
    //     element.find("a").click(function() {window.open(link, "_blank")})
    //     return element
    //   }

    //   function resetReferences() {
    //     $('#selected-references').html("None");
    //   }

    //   function loadingReferences() {
    //     $('#selected-references').html("Loading ...");
    //   }

    //   function saveCredentials(showPopup = true) {
    //     console.log("update credentials")

    //     var bibsonomyUser = $('input[id=bibsonomy-user]').val();
    //     var bibsonomyApikey = $('input[id=bibsonomy-apikey]').val();

    //     google.script.run
    //         .withSuccessHandler(e => {
    //           $("div[class=credentials-error]").hide()
    //           $("input[id=bibsonomy-user]").removeClass("credentials-error")
    //           $("input[id=bibsonomy-apikey]").removeClass("credentials-error")
    //           console.log("update credentials: success")
    //         })
    //         .withFailureHandler(e => {
    //           $("div[class=credentials-error]").show()
    //           $("input[id=bibsonomy-user]").addClass("credentials-error")
    //           $("input[id=bibsonomy-apikey]").addClass("credentials-error")
    //           console.log("update credentials: failed")
    //         })
    //         .withUserObject(this)
    //         .updateBibsonomyCredentials(bibsonomyUser, bibsonomyApikey, showPopup);

    //     return false
    //   }

    //   function createCredentials() {
    //     window.open("https://bibsonomy.org/register", "_blank");
    //     return false
    //   }

    //   function searchResources() {
    //     var query = $("input[name=search]").val()
    //     console.log("Search:", query)
    //     if (!query || /^\s*$/.test(query)) {
    //       $("#found-references").html("")
    //     } else {
    //       google.script.run
    //         .withSuccessHandler(processSearchResults)
    //         .withFailureHandler(showError)
    //         .searchResources(query);
    //     }
    //   }

    //   function processSearchResults(results) {
    //     console.log(results)
    //     var container = $("#found-references")
    //     container.html("")
    //     if (results.type == "ok" && "post" in results.data.posts) {
    //       for (let post of results.data.posts.post) {
    //         var hash = post.bibtex.interhash
    //         var link = 'https://bibsonomy.org/bibtex/' + hash +'/' + $('#bibsonomy-user').val();
    //         var msg = formatReference(post, link)
    //         var ref = $('<div class="reference"><div class="add-reference">add</div></div>').append(msg);
    //         ref.data("post", post)
    //         ref.click(addReference)
    //         container.append(ref)
    //       } 
    //     } else {
    //         container.html("No resources found.")
    //     }
    //   }

    //   function addReference(e) {
    //     var post = $(this).data("post")
    //     console.log(post)
    //     google.script.run
    //       .withSuccessHandler(bibtexKeyAdded)
    //       .withFailureHandler(showError)
    //       .runAddPostToReferenceGroup(post);
    //   }

    //   function bibtexKeyAdded() {
    //     // nothing to do so far
    //   }

    //   function addComments() {
    //     console.log("Add comments")
    //     google.script.run
    //       .withSuccessHandler(msg => {console.log("MSG:" + msg)})
    //       .withFailureHandler(showError)
    //       .addComments();
    //   }

    //   function removeComments() {
    //     google.script.run
    //       // .withSuccessHandler(bibtexKeyAdded)
    //       .withFailureHandler(showError)
    //       .removeComments();
    //   }