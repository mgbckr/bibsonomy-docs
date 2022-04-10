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
