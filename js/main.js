$(document).ready(function(){
	$("#list").val((localStorage.getItem("list")||"").split(",").join('\n'));
	$("#suffixes").val((localStorage.getItem("suffixes")||"").split(",").join('\n'));

	$("#clear").click(function(){
		localStorage.removeItem("list");
		localStorage.removeItem("suffixes");
	});
	
	$("#combine").click(function(){
		$("#results").html("");

		var rs = new Array();
		var a = ($("#list").val().length > 0)?$("#list").val().trim().split('\n'):[];
		var s = ($("#suffixes").val().length > 0)?$("#suffixes").val().trim().split('\n'):[];
		
		localStorage.setItem("list", a);
		localStorage.setItem("suffixes", s);

		if(a.length == 0)
			return;

		for (var i = 0; i < a.length; i++) {
			if(s.length > 0) {
				for (var k = 0; k < s.length; k++) {
					rs.push(a[i] + s[k]);
				}
			}
			for (var j = 0; j < a.length; j++) {
				if(!$("#double").prop('checked') && i == j)
					continue;

				rs.push(a[i] + a[j]);


				if(s.length > 0) {
					for (var k = 0; k < s.length; k++) {
						if(!$("#double").prop('checked') && i == j)
							continue;
						rs.push(a[i] + a[j] + s[k]);		
					}
				}
			}
		};

		if($("#shuffle").prop('checked'))
			rs = _.shuffle(rs);
		$("#results").html(rs.join("<br>"));
	})
})

