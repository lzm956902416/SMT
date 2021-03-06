// 页面渐显
setTimeout(function () {
	$("body").css("opacity", 1);
}, 1);

/********************
 *       导航
 ********************/

// 导航内容
var navContent = [
	{
		section: "第一章 SMT相关",
		tutors: [{
			name: "SMT组规",
			uri: "rules.html"
		},
		{
			name: "SMT历史",
			uri: "history.html"
		},
		{
			name: "SMT组员",
			uri: "members.html"
		}
		]
	},
	{
		section: "第二章 资源下载",
		tutors: [{
			name: "导航版本更新&离线",
			uri: "nav_update.html",
			id: "offline_ver_down"
		},
		{
			name: "资源下载整合",
			uri: "resources.html"
		},
		{
			name: "SMT logo",
			uri: "logo.html"
		}
		]
	},
	{
		section: "第三章 主要教程",
		tutors: [{
			name: "总前言",
			uri: "preface.html"
		},
		{
			name: "Content解析",
			uri: "content_folder_tutorial.html"
		},
		{
			name: "Windows基础教程",
			uri: "windows_tutorial.html"
		},
		{
			name: "Android基础教程",
			uri: "android_tutorial.html"
		},
		{
			name: "IOS基础教程",
			uri: "ios_tutorial.html"
		},
		{
			name: "XML基础教程",
			uri: "xml_tutorial.html"
		},
		{
			name: "CraftingRecipes解析",
			uri: "crafting_recipes_tutorial.html"
		},
		{
			name: "Clothes解析",
			uri: "clothes_tutorial.html"
		},
		{
			name: "Blocksdata解析",
			uri: "blocksdata_tutorial.html"
		},
		{
			name: "Database解析",
			uri: "database_tutorial.html"
		},
		{
			name: "“源代码”教程",
			uri: "source_code_tutorial.html"
		}
		]
	},
	{
		section: "第四章 其他教程",
		tutors: [{
			name: "正则表达式教程",
			uri: "regex_tutorial.html"
		},
		{
			name: "实例合集",
			uri: "examples_collection.html"
		},
		{
			name: "发布范例",
			uri: "publication_example.html"
		}
		]
	}
];

// 写入导航栏
function generateNav(navData) {
	var nav = $("#nav");
	nav.hide();

	nav.append($("<img id=\"nav_logo\" src=\"image/nav_logo.jpg\" />"));

	for (var i = 0; i < navData.length; ++i) {
		var section = navData[i].section,
			tutors = navData[i].tutors;

		var parent = $("<div class=\"parent md_btn\"></div>")
		parent.text(section);
		nav.append(parent);

		var children = $("<div class=\"children\"></div>");
		children.attr("id", "nav_children_" + (i + 1).toString());

		for (var j = 0; j < tutors.length; ++j) {
			var name = tutors[j].name,
				uri = tutors[j].uri,
				id = tutors[j].id;

			var child = $("<a class=\"child md_btn\">");
			child.attr("data-uri", uri);
			child.text(name);
			if (typeof id != "undefined") {
				child.attr("id", id);
			}
			children.append(child);
		}
		nav.append(children);

		nav.show();
	}
}

generateNav(navContent);

$("#nav_logo").on("click", function () {
	if (!isWideScreen) {
		navHide();
	} else {
		window.location.href = "index.html";
	}
})

// 延迟250ms后跳转，以完整播放按钮的过渡动画
$("*[data-uri]").on("click", function() {
	var uri = $(this).attr("data-uri");
	$("body").css("opacity", 0);
	$("body").one("transitionend", function() {
		window.location.href = uri;
	});
})


/**
 * 点击折叠章节
 */
function toggleNavItem(obj) {
	obj = $(obj);
	var childrenDiv = obj.next(".children");

	$("#nav .parent").css("background", ""); // 取消全部高亮
	obj.css("background", "#ddd"); // 高亮选择的项

	// 展开/折叠
	if (childrenDiv.height() == 0) { // 如果选中的项未展开
		$("#nav .children").height(0); // 收起全部项
		childrenDiv.height(childrenDiv.children().length * childrenDiv.children().eq(0).height()); // 展开选中的项
	} else { // 如果选中的项已展开
		$("#nav .parent").css("background", ""); // 取消高亮
		childrenDiv.height(0); // 收起选中的项
	}
}

$("#nav .parent").on("click", function() {
	toggleNavItem(this)
});

/**
 * 突出当前所在页
 */

// 展开当前所在的项
function openCurNavItem(navItemId) {
	var childrenDiv = $("#nav_children_" + navItemId);
	childrenDiv.height(childrenDiv.children().length * childrenDiv.children().eq(0).height()); // 展开该项
	childrenDiv.prev().css("background", "#ddd"); // 高亮所在的章节
}
openCurNavItem($("#nav").attr("data-open"));

// 高亮当前页
function highlightCurNavItem() {
	var page = document.location.toString(),
		tmp = page.split("/");
	page = tmp[tmp.length - 1]; // 获取当前页面名称
	$("[data-uri='" + page + "']").css({
		"background": $("#top_box").css("background-color"),
		"color": "#fff"
	}); //data-uri = 当前页名称的元素高亮
}
highlightCurNavItem();

/**
 * 导航开关
 */
var isNavOpen = false;

function navDisp() {
	var nav = $("#nav");
	//$("body").css("overflow", "hidden");
	nav.removeClass("nav_hide");
	nav.addClass("nav_show");
	$("#nav_overlay").css({
		"animation": "nav_overlay_show 0.4s linear forwards",
		"-webkit-animation": "nav_overlay_show 0.4s linear forwards"
	});
	isNavOpen = true;
}

function navHide() {
	var nav = $("#nav");
	//$("body").css("overflow", "auto");
	nav.removeClass("nav_show");
	nav.addClass("nav_hide");
	$("body").removeClass("lock_position");
	$("#nav_overlay").css({
		"animation": "nav_overlay_hide 0.4s linear forwards",
		"-webkit-animation": "nav_overlay_hide 0.4s linear forwards"
	});
	isNavOpen = false;
}

// 点击导航栏外，关闭导航栏

$("#nav_overlay").on("click", navHide);

// 导航按钮 点击事件
$("#nav_btn").on("click", navDisp);

/**
 * 计算两点距离
 * @param Number x1 第一个点横坐标
 * @param Number y1 第一个点纵坐标
 * @param Number x2 第二个点横坐标
 * @param Number y2 第二个点纵坐标
 */
function pointDist(x1, y1, x2, y2) {
	var xDis = Math.abs(x1 - x2),
		yDis = Math.abs(y1 - y2);
	return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2));
}

/**
 * MD按钮水波纹
 */
function MDRipple(obj) {
	obj = $(obj);
	function getcss(name){return parseInt(obj.css(name))}

	var mousePos = getMousePos();

	// 计算鼠标位置与距容器四角最远的一个角之间的距离，用作ripple的半径
	var xR = getcss("width") + getcss("padding-left") + getcss("padding-right"),
		yB = getcss("height") + getcss("padding-top") + getcss("padding-bottom");
	var radius = Math.max(
		Math.round(pointDist(mousePos.x, mousePos.y, 0, 0)),
		Math.round(pointDist(mousePos.x, mousePos.y, xR, 0)),
		Math.round(pointDist(mousePos.x, mousePos.y, xR, yB)),
		Math.round(pointDist(mousePos.x, mousePos.y, 0, yB)
			));

	// 构建并插入ripple div
	var div = document.createElement("div");
	div.className = "md_ripple";
	div.style.top = mousePos.y + "px";
	div.style.left = mousePos.x + "px";
	div.style.height = radius * 2 + "px";
	div.style.width = radius * 2 + "px";
	div.style.marginLeft = -radius + "px";
	div.style.marginTop = -radius + "px";
	obj.append(div);

	// 使transition生效
	setTimeout(function () {
		div.style.transform = "scale(1)";
	}, 0);

	// 鼠标抬起，渐隐、移除ripple
	$(document).one(isMobile ? "touchend" : "mouseup", function () {
		$(div).css("opacity", 0);
		$(div).on("transitionend", function (event) {
			if (event.originalEvent.propertyName == "opacity") {
				$(div).remove();
			}
		})
	})
}

/**
 * 为.md_btn绑定点击事件
 */
function initMDBtn() {
	$(".md_btn").on(isMobile ? "touchstart" : "mousedown", function() {
		MDRipple(this);
	})
}

initMDBtn();

/**
 * 获取鼠标位置相对容器的坐标
 */
function getMousePos() {
	var e = window.event || arguments.callee.caller.arguments[0],
		obj = $(e.currentTarget);

	// 目标元素左上角距文档左上角的距离
	var left = obj.offset().left,
		top = obj.offset().top,

	// 鼠标位置相对文档的坐标
		mouseX = e.pageX || e.changedTouches[0].pageX,
		mouseY = e.pageY || e.changedTouches[0].pageY;

	// 鼠标位置相对容器的坐标
	return {
		"x": mouseX - left,
		"y": mouseY - top
	};
}

/**
 * 禁止页面滚动
 */

// 导航栏外
$("#nav_overlay").bind("mousewheel DOMMouseScroll touchmove", function (e) {
	e = window.event || arguments.callee.caller.arguments[0];
	e.preventDefault();
	e.returnValue = false;
})

// PC 导航栏内
$("#nav").bind("mousewheel DOMMouseScroll", function (e) {
	e = e || window.event
	nav = $("#nav");

	// 没有滚动条
	if (nav.prop("scrollHeight") == $(window).height()) {
		e.returnValue = false;
		e.preventDefault();
	}

	// 有滚动条,位于顶端
	else if (nav.scrollTop() == 0) {
		if (e.wheelDelta) {
			if (e.wheelDelta > 0) {
				e.returnValue = false;
				e.preventDefault();
			}
		} else {
			if (e.detail < 0) {
				e.returnValue = false;
				e.preventDefault();
			}
		}
	}

	// 有滚动条,位于底端
	else if (nav.prop("scrollHeight") - $(window).height() - nav.scrollTop() == 0) {
		if (e.wheelDelta) {
			if (e.wheelDelta < 0) {
				e.returnValue = false;
				e.preventDefault();
			}
		} else {
			if (e.detail > 0) {
				e.returnValue = false;
				e.preventDefault();
			}
		}
	}
})

// 移动端 导航栏内
$("#nav").bind("touchstart", function (e) {
	window.startY = e.originalEvent.touches[0].pageY;
})

$("#nav").bind("touchmove", function (e) {
	var spanY = e.originalEvent.touches[0].pageY - startY,
		nav = $("#nav");

	// 无滚动条时禁止滚动
	if (nav.prop("scrollHeight") == $(window).height()) {
		e.preventDefault();
		e.returnValue = false;
	}
	// 向上滑动
	else if (spanY > 0) {
		if (nav.scrollTop() == 0) {
			e.preventDefault();
			e.returnValue = false;
		}
	}
	// 向下滑动
	else if (spanY < 0) {
		if (nav.prop("scrollHeight") - $(window).height() - nav.scrollTop() == 0) {
			e.preventDefault();
			e.returnValue = false;
		}
	}

	// 滑动时锁定body（在navHide方法中解锁）
	$("body").addClass("lock_position");
})

/********************
 *        菜单
 ********************/

/**
 * 菜单开关
 */

var isMenuShow = false;

function menuToggle() {
	var menu = $("#menu");
	if (isMenuShow) {
		menu.css({
			"animation": "menu_hide 0.3s forwards"
		});
		menu.one("animationend", function () {
			isMenuShow = false;
		})
	} else {
		menu.css({
			"animation": "menu_show 0.3s forwards"
		});
		setTimeout(function () {
			isMenuShow = true;
		}, 1);
	}
}

// 菜单按钮 点击事件
$("#menu_btn").on("click", menuToggle);

$(document).on("click", function() {
	e = window.event || arguments.callee.caller.arguments[0];
	if (e.target.id != "menu" && isMenuShow && $(e.target).parents("#menu").length == 0) {
		menuToggle();
	}
})

/**
 * 菜单跳转功能
 */
function menuTo(id) {
	var target = document.getElementById(id).offsetTop - (isMobile ? 45 : -200);
	$("body").animate({
		scrollTop: target
	}, 250);
	menuToggle(); // 关闭菜单
}

// 菜单项点击事件
$("#menu [data-menuto]").on("click", function() {
	menuTo($(this).attr("data-menuto"));
})

/**
 * 文章倒序功能
 */
function reverseChapter(scroll, addScrollDis) {
	var chapt = $(".chapter"),
		menu = $("#menu .parent"),
		scrollTop = $(document).scrollTop(),
		tmp = [], i, j;

	// 倒序读入正文
	for (i = chapt.length - 1, j = 0; i >= 0; i-- , j++) {
		tmp[i] = chapt.eq(j).prop("outerHTML");
	}
	// 顺序写出正文
	for (i = 0; i < chapt.length; i++) {
		chapt.eq(i).prop("outerHTML", tmp[i]);
	}

	// 倒序读入菜单
	for (i = menu.length - 1, j = 0; i >= 0; i-- , j++) {
		tmp[i] = menu.eq(j).prop("outerHTML");
	}
	// 顺序写出菜单
	for (i = 0; i < menu.length; i++) {
		menu.eq(i).prop("outerHTML", tmp[i]);
	}

	// 更新数组
	chapt = $(".chapter"),
	menu = $("#menu .parent");

	// 如果第一个chapter没有锚标记，则更新锚标记（history.html）
	if (typeof chapt.eq(0).attr("id") == "undefined") {
		var subscript = [];

		// 记录所有锚标记的角标
		for (i = 0, j = 0; i < chapt.length; i++) {
			if (typeof chapt.eq(i).attr("id") != "undefined") {
				subscript[j] = i;
				j++;
			}
		}
		// 把第一个锚标记提前到第一个chapter
		chapt.eq(0).attr("id", chapt.eq(subscript[0]).attr("id"));
		chapt.eq(subscript[0]).removeAttr("id");

		// 提前剩余锚标记
		for (i = 1; i < subscript.length; i++) {
			chapt.eq(subscript[i - 1] + 1).attr("id", chapt.eq(subscript[i]).attr("id"));
			chapt.eq(subscript[i]).removeAttr("id");
		}
	}

	if (scroll) {
		// 移到倒序前的阅读位置（目标滚动距离 = content_box高度 + margin(20px) + 2 * top_box_top高度 - 滚动距离 - 可视高度 - top_box高度）
		var targetScroll = $("#content_box").prop("scrollHeight") + 20 + 2 * $("#top_box_top").height() -
			$(document).scrollTop() - $(window).height() - $("#top_box").height() + addScrollDis;
		$("body").animate({
			scrollTop: targetScroll
		}, 250);
	}

	// 重新绑定菜单项点击事件
	$("#menu [data-menuto]").on("click", function () {
		menuTo($(this).attr("data-menuto"));
	})

	// 关闭菜单
	menuToggle();
}


$("#reverse_chapter").on("click", function () {
	reverseChapter(true, 0);
})

/********************
 *       正文
 *******************/

/**
 * 表格折叠
 */
function tableFold(obj) {
	var table = $(obj).parents("table"),
		content = table.find("tr:not(:first)"),
		img = table.find("tr:first").find("td:last").children("img");

	if (table.hasClass("folded")) {
		table.removeClass("folded");
		content.css("display", "table-row");
		img.attr("src", "image/fold.svg");
	} else {
		table.addClass("folded");
		content.css("display", "none");
		img.attr("src", "image/unfold.svg");
	}
}

function findFoldableTables() {
	var tables = $("table"),
		threshold = isMobile ? 400 : 600;

	for (var i = 0; i < tables.length; i++) {
		if (tables.eq(i).height() > threshold) {
			var td = tables.eq(i).find("tr:first").find("td:last");

			td.css({
				"position": "relative",
				"padding-right": "80px"
			});
			td.append("<img class='fold_btn' style='position:absolute;right:3px;cursor:pointer;' />");
			tableFold(tables.eq(i).children().eq(0));
		}
	}

	$(".fold_btn").on("click", function () {
		tableFold(this);
	});
}
findFoldableTables();

/********************
 *       图片
 ********************/

/**
 * saimg自适应在线/离线src
 */

var saImg = $(".saimg");

for (var i = 0; i < saImg.length; i++) {
	saImg.eq(i).attr({
		"src": saImg.eq(i).attr(isOnline ? "data-online" : "data-offline"),
		"alt": "图片显示失败"
	});
}

/**
 * 缩放图片
 */

var magImgDiv = $(".magnifiable");
magImgDiv.attr("title", "点击放大查看");

magImgDiv.on("click", function () {
	magnifyImg(this.src);
})

function magnifyImg(src) {
	// 插入放大图片div
	/*	$("body").append("<div id='mag_img_wrapper'><img id='mag_img' src='" + $(this).attr("src") + "' /></div>");
		var magImg = $("#mag_img");
		magImg.on("load", function(){
			magWidth = magImg.width();
			magHeight = magImg.height();
			magTop = parseInt(magImg.css("top").split("px")[0]);
			magLeft = parseInt(magImg.css("left").split("px")[0]);
			magMarginTop = parseInt(magImg.css("margin-top").split("px")[0]);
			magMarginLeft = parseInt(magImg.css("margin-left").split("px")[0]);
			// 设置图片水平垂直居中
			magMarginTop -= parseInt(magImg.height() / 2);
			magMarginLeft -= parseInt(magImg.width() / 2);
			magImg.css({"margin-top":magMarginTop + "px", "margin-left":magMarginLeft + "px"});
			// 明确img宽度，以在首次滚轮缩放时产生transition动画
			magImg.width(magImg.width());
		})
		// 点击关闭图片
		onClick($("#mag_img_wrapper"), closeImg)
	*/

	// 暂定
	window.open(src);
	//console.debug(this.src)
}

/**
 * 关闭图片
 */

function closeImg() {
	var imgDiv = $("#mag_img_wrapper");
	imgDiv.css({
		"animation": "fade_out 0.3s ease-out",
		"-webkit-animation": "fade_out 0.3s ease-out"
	});
	imgDiv.bind("animationend webkitAnimationEnd", function () {
		imgDiv.remove();
	});
	setTimeout(function () {
		imgDiv.remove()
	}, 350); // 若animationend久未生效，则强制移除
}

/********************
 *      大标题
 ********************/

var bigTitle = $("#big_title_div"),
	lastUp = $("#last_update"),
	lastBtPos = 0,
	lastBtPos1 = 0,
	topBoxScroll = isMobile ? 75 : 120, // 滚动阈值
	topBoxtopScroll = isMobile ? 114 : 200;

function changeBT() {
	var fadeout = {
			"animation": "fade_out 0.03s forwards",
			"-webkit-animation": "fade_out 0.03s forwards"
		},
		fadein = {
			"animation": "fade_in 0.2s linear",
			"-webkit-animation": "fade_in 0.2s linear"
		};
	// 滚动大于阈值
	if ($(document).scrollTop() > topBoxScroll && lastBtPos <= topBoxScroll) {
		lastBtPos = $(document).scrollTop();

		// 渐隐标题&更新日期
		bigTitle.css(fadeout);
		lastUp.css(fadeout);

		// 渐隐结束后缩小并渐显标题
		bigTitle.one("animationend webkitAnimationEnd", function () {
			bigTitle.removeClass("big");
			bigTitle.addClass("small");

			bigTitle.css(fadein);

			if (isWideScreen) bigTitle.css("left", "280px");
			else bigTitle.css("left", "");
		});
	}

	// 滚动小于阈值
	if ($(document).scrollTop() <= topBoxScroll && lastBtPos > topBoxScroll) {
		lastBtPos = $(document).scrollTop();

		// 渐隐标题
		bigTitle.css(fadeout);

		// 渐隐结束后放大并渐显标题&更新日期
		bigTitle.one("animationend webkitAnimationEnd", function () {
			bigTitle.removeClass("small");
			bigTitle.addClass("big");

			bigTitle.css(fadein);
			lastUp.css(fadein);

			if (isWideScreen) bigTitle.css("left", $("#cont_wrapper").width() * 0.175 + 260);
			else bigTitle.css("left", "");
		});
	}

	//top_box出现时调整top_box和top_box_top的z-index
	if ($(document).scrollTop() > topBoxtopScroll && lastBtPos1 <= topBoxtopScroll) {
		lastBtPos1 = $(document).scrollTop();
		$("#top_box_top").css("z-index", "4");
	}
	if ($(document).scrollTop() <= topBoxtopScroll && lastBtPos1 > topBoxtopScroll) {
		lastBtPos1 = $(document).scrollTop();
		$("#top_box_top").css("z-index", "5");
	}
}
changeBT();

/**
 * 点击返回顶部
 */
$('#big_title_div').on("click", goTop);

/********************
 *       其他
 ********************/

/**
 * ban各种sb浏览器
 * PC IE、手Q x5
 */

if (!(ua.match(/(?!^.*mobile.*$)^.*msie.+windows nt.*$|mqqbrowser/i) === null)) {
	$("#cont_wrapper").css("display", "none");
	$("#divs_fixed").css("display", "none");
	$("#error").css("display", "block");
}

/********************
 *      公用事件
 ********************/

/*
 * 页面滚动
 */
document.onscroll = function () {
	changeBT(); // 大标题缩放
};

var isWideScreen = isMobile ? false : document.body.clientWidth >= 1000;
if (isWideScreen) change2widescreen();
//屏幕大小变化时
var last_isWideScreen = false;
$(window).resize(function () {
	if (!isMobile) {
		last_isWideScreen = isWideScreen;
		isWideScreen = document.body.clientWidth >= 1000;
		if (isWideScreen != last_isWideScreen) {
			if (isWideScreen) change2widescreen();
			else change2narrowscreen();
		} else if (isWideScreen) {
			var cont_wrapper = $("#cont_wrapper");
			cont_wrapper.css("width", document.body.clientWidth - 260);
			if ($("#big_title_div.big")[0] === undefined) $("#big_title_div.small").css("left", "280px");
			else $("#big_title_div.big").css("left", cont_wrapper.width() * 0.175 + 260);
			$("#last_update").css("left", cont_wrapper.width() * 0.175 + 300);
		}
	}
});

function change2widescreen() {
	$("#nav").removeClass("nav_hide");
	$("#nav").addClass("nav_show");
	isNavOpen = true;
	var cont_wrapper = $("#cont_wrapper");
	cont_wrapper.removeClass("cont_wrapper_narrowscreen");
	cont_wrapper.addClass("cont_wrapper_widescreen");
	cont_wrapper.css("width", document.body.clientWidth - 260);
	$("#nav_btn").hide();
	$("#nav_overlay").css({
		"animation": "nav_overlay_hide 0.4s linear forwards",
		"-webkit-animation": "nav_overlay_hide 0.4s linear forwards"
	});
	$("#big_title_div.big").css("left", cont_wrapper.width() * 0.175 + 260);
	$("#last_update").css("left", cont_wrapper.width() * 0.175 + 300);
}

function change2narrowscreen() {
	$("#nav").removeClass("nav_show");
	$("#nav").addClass("nav_hide");
	isNavOpen = false;
	var cont_wrapper = $("#cont_wrapper");
	cont_wrapper.removeClass("cont_wrapper_widescreen");
	cont_wrapper.addClass("cont_wrapper_narrowscreen");
	cont_wrapper.css("width", "100%");
	$("#nav_btn").show();
	$("#big_title_div").css("left", "");
	$("#last_update").css("left", "");
}

/*
	// 放大图片相关操作
	if (e.target.id == "mag_img_wrapper" || e.target.id == "mag_img") {
		var img = $("#mag_img");
		// 鼠标移动图片
		if (e.type == "mousedown" && e.target.id == "mag_img"){
			e.preventDefault(); // 阻止拖拽img时浏览器弹出禁止标志
			var startLeft = e.clientX - parseInt(img.css("left")),
				startTop = e.clientY - parseInt(img.css("top")),
				isDragging = true;
			$(this).bind("mouseup mouseleave", function(){
				img.unbind();
				isDragging = false; // 松开鼠标 & 鼠标离开时 停止拖拽
			});
			$(this).bind("mousemove", function(e){
				if (isDragging){
					img.css("left", e.clientX - startLeft + "px");
					img.css("top", e.clientY - startTop + "px");
				}
			});
		}
		// 滚轮缩放
		if ((e.type == "mousewheel" || e.type == "DOMMouseScroll") && (e.target.id == "mag_img" || e.target.id == "mag_img_wrapper")){
			if (e.target.id == "mag_img") {
				// 禁止滚动页面
				e.preventDefault();
				e.returnValue = false;
				// 放大
				function magnify() {
					magWidth += 100;
					magMarginTop -= 50;
					magMarginLeft -= 50;
					img.width(magWidth);
					img.css("margin-top", magMarginTop);
					img.css("margin-left", magMarginLeft);
				}
				// 缩小
				function minify() {
					magWidth -= 100;
					magMarginTop += 50;
					magMarginLeft += 50;
					img.width(magWidth)
					img.css("margin-top", magMarginTop);
					img.css("margin-left", magMarginLeft);
				}
				if (e.wheelDelta) {
					if (e.wheelDelta > 0) { // 放大
						magnify();
					}
					else { // 缩小
						minify();
					}
				}
				else { // FF
					if (e.detail < 0) { // 放大
						magnify();
					}
					else { // 缩小
						minify();
					}
				}
			}
			// 在图片外滚轮禁止滚动页面
			else {
				e.preventDefault();
				e.returnValue = false;
			}
		}
		// 移动端移动图片
		if (e.type == "touchstart" && e.target.id == "mag_img"){
			// 禁止滑动页面
			e.preventDefault();
			// 单指触发
			if (e.touches.length == 1){
				var touch = e.touches[0];
				startX = touch.pageX;
				startY = touch.pageY;
			}
		}
		if (e.type == "touchmove" && e.target.id == "mag_img"){
			if (e.touches.length == 1){
				var touch = e.touches[0];
				var spanX = touch.pageX - startX,
					spanY = touch.pageY - startY;
				img.css({"top":magTop + spanY + "px", "left":magLeft + spanX + "px"});
			}
		}
		if (e.type == "touchend" && e.target.id == "mag_img"){
			// 结束滑动后记录图片的top和left，防止下次滑动时 图片又回到正中央
			magTop = parseInt(img.css("top").split("px")[0]);
			magLeft = parseInt(img.css("left").split("px")[0]);
		}
	}
	// 禁止在图片外滚动页面
	if (e.type == "touchmove" && e.target.id == "mag_img_wrapper"){
		e.preventDefault();
		e.returnValue = false;
	}
*/
