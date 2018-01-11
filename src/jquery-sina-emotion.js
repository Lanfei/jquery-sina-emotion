/**
 * jQuery Sina Emotion
 * @author [Jealous](http://www.clanfei.com/)
 * @license MIT
 */
(function (global, factory) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(global.jQuery);
	}
}(this, function ($) {
	'use strict';

	var STATE_UNINITIALIZED = 0;
	var STATE_LOADING = 1;
	var STATE_LOADED = 2;

	var $target;
	var options;
	var callbacks = [];
	var emotions = {};
	var categories = [];
	var emotionsMap = {};
	var defCategory = '默认';
	var state = STATE_UNINITIALIZED;

	function initEvents() {
		var $sinaEmotion = $('#sina-emotion');

		$('body').bind({
			click: function () {
				$sinaEmotion.hide();
			}
		});
		$sinaEmotion.bind({
			click: function (event) {
				event.stopPropagation();
			}
		}).delegate('.prev', {
			click: function (event) {
				var page = $sinaEmotion.find('.categories').data('page');
				showCatPage(page - 1);
				event.preventDefault();
			}
		}).delegate('.next', {
			click: function (event) {
				var page = $sinaEmotion.find('.categories').data('page');
				showCatPage(page + 1);
				event.preventDefault();
			}
		}).delegate('.category', {
			click: function (event) {
				$sinaEmotion.find('.categories .current').removeClass('current');
				showCategory($.trim($(this).addClass('current').text()));
				event.preventDefault();
			}
		}).delegate('.page', {
			click: function (event) {
				$sinaEmotion.find('.pages .current').removeClass('current');
				var page = parseInt($(this).addClass('current').text(), 10) - 1;
				showFacePage(page);
				event.preventDefault();
			}
		}).delegate('.face', {
			click: function (event) {
				$sinaEmotion.hide();
				$target.insertText($(this).children('img').prop('alt')).focus();
				event.preventDefault();
			}
		});
	}

	function loadEmotions(callback) {
		if (state === STATE_LOADED) {
			callback && callback();
			return;
		} else if (state === STATE_LOADING) {
			callback && callbacks.push(callback);
			return;
		} else {
			callback && callbacks.push(callback);
		}

		state = STATE_LOADING;
		options = options || $.fn.sinaEmotion.options;

		var $sinaEmotion = $('<div id="sina-emotion">正在加载，请稍后...</div>');
		$('body').append($sinaEmotion);

		initEvents();

		$.getJSON('https://api.weibo.com/2/emotions.json?callback=?', {
			source: options.appKey,
			language: options.language
		}, function (res) {
			var item;
			var category;
			var data = res.data;

			$('#sina-emotion').html('<div class="switch">' +
				'<a href="#" class="prev">&laquo;</a>' +
				'<a href="#" class="next">&raquo;</a>' +
				'</div>' +
				'<ul class="categories"></ul>' +
				'<ul class="faces"></ul>' +
				'<ul class="pages"></ul>'
			);

			for (var i = 0, l = data.length; i < l; ++i) {
				item = data[i];
				category = item['category'] || defCategory;

				if (!emotions[category]) {
					emotions[category] = [];
					categories.push(category);
				}

				emotions[category].push({
					icon: item['icon'],
					phrase: item['phrase']
				});

				emotionsMap[item['phrase']] = item.icon;
			}

			for (var j = 0, m = callbacks.length; j < m; ++j) {
				callbacks[j]();
			}

			if (categories.length <= 5) {
				$sinaEmotion.children('.switch').remove();
			}

			state = STATE_LOADED;
		});
	}

	function showCatPage(page) {

		var html = '';
		var length = categories.length;
		var maxPage = Math.ceil(length / 5);
		var $categories = $('#sina-emotion').find('.categories');
		var category = $categories.data('category') || defCategory;

		page = (page + maxPage) % maxPage;

		for (var i = page * 5; i < length && i < (page + 1) * 5; ++i) {
			html += '<li class="item">' +
				'<a href="#" class="category' + (category === categories[i] ? ' current' : '') + '">' + categories[i] + '</a>' +
				'</li>';
		}

		$categories.data('page', page).html(html);
	}

	function showCategory(category) {
		$('#sina-emotion').find('.categories').data('category', category);
		showFacePage(0);
		showPages();
	}

	function showFacePage(page) {
		var face;
		var html = '';
		var rows = options.rows;
		var $sinaEmotion = $('#sina-emotion');
		var category = $sinaEmotion.find('.categories').data('category');
		var faces = emotions[category];
		page = page || 0;

		for (var i = page * rows, l = faces.length; i < l && i < (page + 1) * rows; ++i) {
			face = faces[i];
			html += '<li class="item">' +
				'<a href="#" class="face">' +
				'<img class="sina-emotion" src="' + face['icon'] + '" alt="' + face['phrase'] + '" />' +
				'</a>' +
				'</li>';
		}

		$sinaEmotion.find('.faces').html(html);
	}

	function showPages() {

		var html = '';
		var rows = options.rows;
		var $sinaEmotion = $('#sina-emotion');
		var category = $sinaEmotion.find('.categories').data('category');
		var faces = emotions[category];
		var length = faces.length;

		if (length > rows) {
			for (var i = 0, l = Math.ceil(length / rows); i < l; ++i) {
				html += '<li class="item">' +
					'<a href="#" class="page' + (i === 0 ? ' current' : '') + '">' + (i + 1) + '</a>' +
					'</li>';
			}
			$sinaEmotion.find('.pages').html(html).show();
		} else {
			$sinaEmotion.find('.pages').hide();
		}
	}

	/**
	 * 为某个元素设置点击事件，点击弹出表情选择窗口
	 * @param  {String|function} target 用于插入表情文本框选择器，或返回文本框 jQuery 对象的方法
	 */
	$.fn.sinaEmotion = function (target) {

		var $this = $(this).last();
		var offset = $this.offset();

		target = target || function () {
			return $this.parents('form').find('textarea, input[type=text]').eq(0);
		};

		if ($this.is(':visible')) {
			if (typeof target === 'function') {
				$target = target.call($this);
			} else {
				$target = $(target);
			}

			loadEmotions(function () {
				showCategory(defCategory);
				showCatPage(0);
			});

			$('#sina-emotion').css({
				top: offset.top + $this.outerHeight() + 5,
				left: offset.left
			}).show();
		}

		return this;
	};

	$.fn.parseEmotion = function () {
		var $this = $(this);
		loadEmotions(function () {
			$this.each(function () {
				var $this = $(this);
				var html = $this.html();

				html = html.replace(/<.*?>/g, function ($1) {
					$1 = $1.replace('[', '&#91;');
					$1 = $1.replace(']', '&#93;');
					return $1;
				}).replace(/\[[^\[\]]*?]/g, function ($1) {
					var url = emotionsMap[$1];
					if (url) {
						return '<img class="sina-emotion" src="' + url + '" alt="' + $1 + '" />';
					}
					return $1;
				});

				$this.html(html);
			});
		});
		return this;
	};

	$.fn.insertText = function (text) {

		this.each(function () {

			if (this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {
				return;
			}
			if (document.selection) {
				this.focus();
				var cr = document.selection.createRange();
				cr.text = text;
				cr.collapse();
				cr.select();
			} else if (this.selectionStart !== undefined) {
				var start = this.selectionStart;
				var end = this.selectionEnd;
				this.value = this.value.substring(0, start) + text + this.value.substring(end, this.value.length);
				this.selectionStart = this.selectionEnd = start + text.length;
			} else {
				this.value += text;
			}
		});

		return this;
	};

	$.fn.sinaEmotion.options = {
		rows: 72,				// 每页显示的表情数
		language: 'cnname',		// 简体（cnname）、繁体（twname）
		appKey: '1362404091'	// 新浪微博开放平台的应用ID
	};
}));
