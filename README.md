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

<!--more-->

使用方法
---

###基础用法###

	$(selector).sinaEmotion();

###高级用法###

	$(selector).sinaEmotion({
		rows: 72,				// 每页显示的表情数
		target: null,			// 表情所要插入的文本框（默认为同一form表单内的第一个文本框）
		language: 'cnname',		// 简体（cnname）、繁体（twname）
		appKey: '1362404091'	// 你在新浪微博开放平台的应用ID
	});

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


  [1]: http://www.clanfei.com/2012/08/1644.html
  [2]: http://weibo.com/122311620
  [3]: http://binary.duapp.com/
  [4]: https://github.com/Lanfei/jQuery-Sina-Emotion
  [5]: http://git.oschina.net/lanfei/jQuery-Sina-Emotion