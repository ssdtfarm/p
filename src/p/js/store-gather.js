seajs.config({
    "preload": ["jquery", "util"]
});
var pattern=new RegExp("hot");pattern.test(location.href)&&seajs.use(["lib/page/1.0.1/store-gather-data"]),seajs.use(["lib/page/1.0.1/store-gather"]);