var btnSubmit_onclick=function(t){var n=$(this),o=n.parents("form");o.attr("method",n.data("method")),o.attr("action",n.data("action")),o.submit()},document_onready=function(t){$("input[type='submit']").on("click",btnSubmit_onclick)};$(document).ready(document_onready);