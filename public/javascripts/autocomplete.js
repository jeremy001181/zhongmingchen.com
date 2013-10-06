$( "#tbx-search" ).autocomplete({
	source: "/autocomplete",
	search: function( event, ui ) {
		console.log(event);
	}	
}).data("ui-autocomplete")._renderItem = function (ul, item) {
	var label = item.label.replace(new RegExp("^(" + this.term + ")", "i"), "<b>$1</b>");
	label = label.replace(new RegExp("\\b("+ this.term + ")", "i"), "<b>$1</b>");
	
//	<a id="ui-id-5" class="ui-corner-all" tabindex="-1">Charlie Ballentine</a>
	
    return $("<li class='ui-menu-item' role='presentation'></li>")
    .append($('<a class="ui-corner-all"></a>').append(label))
    .data("ui-autocomplete-item", item)
    .appendTo(ul);
};