seajs.config({
	alias : {
		"jquery" : "lib/jquery/jquery/1.9.1/jquery"
	},
	preload : ['jquery']
});
seajs.use(['lib/active/ac2016assort']);