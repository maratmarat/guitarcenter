$(function(){

	// define top navigation hover events
	$(".top-navigation li")
		.mouseover(function(){
			var $menu = $(this).find(".submenu:first")
			var o = $(this).offset()
			$menu.css("left", o.left)
			$menu.css("top", o.top + $(this).height()+2)
			$menu.show(0)
		})
		.mouseout(function(){
			$(this).find(".submenu:first").hide(0)
		})

	// define sidebar
	$(".sidebar .accordeon-menu > li").click(function(){

		// hightlight active item
		$(this).parent().children().removeClass("active")
		$(this).addClass("active")

		// show item submenu
		$(this).find(".submenu:first").animate({"height":"toggle"}, 100)

		// hide all previous submenus
		$(this).prevAll().find(".submenu:first").animate({"height":"hide"}, 100)

		// hide all next submenus
		$(this).nextAll().find(".submenu:first").animate({"height":"hide"}, 100)

		return false;
	})

	// define tabs
	$(".tab-menu > li a").click(function(){

		var index = $(this).parent().index()

		// highlight active menu item
		$(".tab-menu > li.active").removeClass("active")
		$(this).parent().addClass("active")

		// for "new arrivals" load data from json file
		if (index == 1){
			$.getJSON( "json/new-arrivals.json", function( data ) {
				if (data && data['newArrivals'])
				{
					var list = data['newArrivals']
					var html = ''

					for (var i=0; i<list.length; i++){
						var info = list[i]
						html += 
							'<div class="arrivals-inner">' +
									'<a href="#" class="arrivals-image"><img src="' + info.image + '" /></a>' +
									'<div class="arrivals-desc">' +
										'<div class="arrivals-title">' + info.title + '</div>' +
										'<div class="arrivals-text">' + info.description + '</div>' +
										'<a href="' + info.url + '" class="arrivals-link">Link to somewhere...</a>' +
									'</div>' +
								'</div>'
						;
					}
					$(".arrivals-content").html(html)
				}
			})
		}

		// show appropriate tab
		$(".tab-holder .tab").hide(0)
		$(".tab-holder .tab:eq(" + index + ")").show(0)

		return false;
	})

	// correct element height to fit window size
	var resizer = null
	$(window).on("resize", function(){
		if (resizer)
			clearTimeout(resizer)
		resizer = setTimeout(function(){
			var h = $(".bottom").offset().top
			$(".sidebar").height(h - 75)
			$(".canvas").height(h + 30)
		}, 100)
	}).resize()
})
