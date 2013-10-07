//todo: refactoing this to be a plugin
$("#tbx-search").autocomplete(
		{
			source : function(req, res) {
				var root = this;
				var term = req.term.trim();

				// todo : refactoring this to be a function
				if (root.options.preRequestedData
						&& new RegExp("^" + root.options.preRequestedTerm, "i")
								.test(term)
						&& root.options.preRequestedData.length < 6) {
					res($.grep(root.options.preRequestedData, function(item) {
						return new RegExp("\\b" + term, "ig").test(item);
					}));

					return;
				}

				$.ajax({
					url : "/autocomplete?term=" + term,
				}).done(function(data) {
					root.options.preRequestedData = data;
					root.options.preRequestedTerm = term;
					res(data);
				});
			},
			search : function(event, ui) {

			}
		}).data("ui-autocomplete")._renderItem = function(ul, item) {

	var term = this.term.trim();

	var label = item.label.replace(new RegExp("\\b(" + term + ")", "ig"),
			"<b>$1</b>");

	// <a id="ui-id-5" class="ui-corner-all" tabindex="-1">Charlie
	// Ballentine</a>

	return $("<li class='ui-menu-item' role='presentation'></li>").append(
			$('<a class="ui-corner-all"></a>').append(label)).data(
			"ui-autocomplete-item", item).appendTo(ul);
};