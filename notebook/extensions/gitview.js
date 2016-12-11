define(['base/js/namespace','jquery'], function(Jupyter, $) {
    function load_git_data(data) {
	disp = 'Gitview &nbsp;&nbsp;&nbsp; <span id="gitview_collapse" style="cursor:pointer">collapse</span><br /><br />'
	disp += 'Status: <span id="gitview_status"></span>'
	disp += '&nbsp; &nbsp; &nbsp;'
	disp += 'Branch: <span id="gitview_branch"></span>'
	disp += '<br /><br />'
	disp += 'Commits &nbsp;&nbsp;&nbsp; <span id="gitview_refresh" style="cursor:pointer">refresh</span><br /> <br />'
	for (var i = 0; i < data.length; i++) {
	    row = data[i]
	    disp += row.sha.substring(0, 6) + " " + row.message + "<br />"
	}
	$("#gitview").html(disp)
	$("#gitview_refresh").click(refresh_gitview)
	$("#gitview_collapse").click(collapse_gitview)
	$.getJSON("/gitapi/info", function(data) {
	    if (data.clean)
		$('#gitview_status').html('<span style="color: green">clean</span>')
	    else
		$('#gitview_status').html('<span style="color: red">dirty</span>')
	    $('#gitview_branch').html(data.branch)
	})
    }

    function refresh_gitview() {
	$.getJSON("/gitapi/log", load_git_data)
    }

    function expand_gitview() {
	$("#gitview").css('display', "block")
	$("#gitview_expandview").css('display', "none")
    }

    function collapse_gitview() {
	$("#gitview_expandview").css('display', "block")
	$("#gitview").css('display', "none")
    }

    function create_gitview() {
	gitview = '<div style="position:fixed; right:0px; top:35%; height: 50%; width: 200px; background-color: #ffffff; overflow-y: auto; border: 3px solid #eeeeee; padding:5px" id="gitview">'
	gitview += '</div>'
	expandview = '<div style="position:fixed; cursor: pointer; right:0px; top:35%; height: 100px; width: 20px; background-color: #ffffff; overflow-y: hidden; display:none; border: 3px solid #eeeeee; padding:5px" id="gitview_expandview"></div>'
	$("body").append(gitview + expandview)
	$("#gitview_expandview").click(expand_gitview)
    }

    function load_css() {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = './gitview.css';
        $("head").append(link);
	refresh_gitview();
    }

    function load_ipython_extension() {
        console.log('Loading notebook-to-dos extension');
	// TODO figure out why CSS isn't loading
        load_css();
	create_gitview()
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});

