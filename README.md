jQuery Sina Emotion
===================

这是什么？
-----

一个用来方便快速地创建新浪微博表情选择对话框的jQuery插件。

有何特点
----

 - 使用简单，一行代码即可创创建出表情选择对话框
 - 自带智能表情解析方法（但还是建议表情解析在服务端进行）
 - 兼容IE6+、Chrome、Firefox、Opera等各种浏览器

使用方法
---

###使用方法###

	// 未指定插入文本框时，自动寻找同表单中第一个textarea或input[type=text]元素
	$(selector).click(function(event){
		$(this).sinaEmotion();
		event.stopPropagation();
	});

	// 手动指定插入文本框
	$(selector).click(function(event){
		$(this).sinaEmotion(target);
		event.stopPropagation();
	});

###参数配置###

	$.fn.sinaEmotion.options = {
		rows: 72,				// 每页显示的表情数
		language: 'cnname',		// 简体（cnname）、繁体（twname）
		appKey: '1362404091'	// 新浪微博开放平台的应用ID
	};

###表情解析###

	$(selector).parseEmotion();

> 具体的使用方法请看Demo

更新日志
----

 - 1.0.0（2012.08.22）
	 - [jQuery Sina Emotion v1.0][1] 诞生
 - 1.1.0
	 - 完善代码并于Google Code开源
 - 1.2.0
	 - 修正同一页面中对不同文本框使用该插件时插入位置错误的BUG（感谢[@Belin_love][2] 提出）
 - 1.3.0
	 - 修正IE下负margin失效导致表情换行的小BUG（由[@蜗牛都知道][3] 发现）
 - 2.0.0
	 - 全新重构插件代码
	 - 新增表情解析方法
	 - 开源于[GitHub][4]及[OsChina][5]
 - 2.1.0
	 - 修复多次调用插件而对象文本框不同时，表情文本插入对象错乱问题
	 - 修复表情接口未返回时，多次调用解析表情方法未成功解析的问题
	 - 修改表情选择框显示机制，提高使用自由度（与低版本不兼容，升级插件时请注意修改调用方式，详见Demo）
	 - 一些优化


  [1]: http://www.clanfei.com/2012/08/1644.html
  [2]: http://weibo.com/122311620
  [3]: http://binary.duapp.com/
  [4]: https://github.com/Lanfei/jQuery-Sina-Emotion
  [5]: http://git.oschina.net/lanfei/jQuery-Sina-Emotion