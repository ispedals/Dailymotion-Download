let tabs = require("sdk/tabs");

require("sdk/widget").Widget({
	id: "download-video",
	label: "Download video",
	content: "\u25BCDownload video",
	width: 100,
	onClick: function() {
		let url=tabs.activeTab.url;
		let id = url.match(/dailymotion[.]com[/]video[/](\S+?)_/);
		if(!id){return;}
		id = id[1];
		require("sdk/request").Request({
			url: 'http://www.dailymotion.com/embed/video/' + id,
			onComplete: function (response) {
				let url=response.text.match(/"stream_h264_url":"[^]*?",/);
				url=JSON.parse('{'+url+'"b":1}')['stream_h264_url']
				tabs.open(url);
			}
		}).get();
	}
});