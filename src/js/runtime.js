

  
    //   // start cursor polling


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

