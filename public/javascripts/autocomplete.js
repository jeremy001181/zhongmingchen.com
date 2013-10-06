$( "#tbx-search" ).autocomplete({
	source: "/autocomplete",
	search: function( event, ui ) {
		console.log(event);
	}	
}).data("ui-autocomplete")._renderItem = function (ul, item) {
	var label = item.label.replace(new RegExp("^(" + this.term + ")", "i"), "<b>$1</b>");
	label = label.replace(new RegExp("\\b("+ this.term + ")", "i"), "<b>$1</b>");
	
    return $("<li></li>")
    .append(label)
    .data("ui-autocomplete-item", item)
    .appendTo(ul);
};