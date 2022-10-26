module.exports = {	
	devServer: {
		proxy: {
			'/': {
				target: 'http://hbrw.jinshijinri.com/',
				// target: 'http://ddd.turenkeji.com/',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}