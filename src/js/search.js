function searchReferences() {

    // reset results
    var container = $("#found-references")
    container.html("Searching references ...")

    var query = $("input[name=search]").val()
    console.log("search:", query)
    if (!query || /^\s*$/.test(query)) {
        $("#found-references").html("")
    } else {
        google.script.run
            .withSuccessHandler(runSearchReferencesSuccess)
            .withFailureHandler(() => alert("Error search references. Please try again!"))
            .runSearchResources(query);
    }

    return false
}

function runSearchReferencesSuccess(results) {
    console.log(results)
    var container = $("#found-references")
    container.html("")
    if (results.type == "ok" && "post" in results.data.posts) {
        for (let post of results.data.posts.post) {
            var hash = post.bibtex.interhash
            var link = 'https://bibsonomy.org/bibtex/' + hash + '/' + $('#bibsonomy-user').val();
            var msg = formatReference(post, link)
            var ref = $('<div class="reference"><div class="add-reference">add</div></div>').append(msg);
            ref.data("post", post)
            ref.click(addReference)  // see references.js
            container.append(ref)
        }
    } else {
        container.html("No references found.")
    }
}

function formatReference(post, link) {
    // return post.bibtex.title
    console.log(post)
    var element = $('<div><b><a href="' + link + '">' + post.bibtex.bibtexKey + '</a></b><br />' + post.bibtex.title + ', <i>' + post.bibtex.author.split(",")[0] + ' et al.</i> (' + post.bibtex.year + ')</div>')
    element.find("a").click(function () { window.open(link, "_blank") })
    return element
}
