var ss = scene.root.using("FullSlideShow").WithArguments({
    htmlList: ['<img src="img/1.jpg">', '<img src="img/2.jpg">', '<img src="img/3.jpg">', '<img src="img/4.jpg">'],
    html: ""
}, function () {
    console.log("done animation");
});

ss.execute({
    typeas:"images",
    selector: "#wp-window",
    width: "500px",
    height: "500px",
    mode: "fullScreen"
});