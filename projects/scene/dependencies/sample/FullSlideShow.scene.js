scene.root.plugin("FullSlideShow", ["$SimpleSlider", "$Cycler", "$StartOptions"], function (Inject) {
    return function (param, completed) {
        param.dependency = Inject.$SimpleSlider;
        var cyclerHandle = Inject.$Cycler.WithArguments(param, function (slider) {
            //slider.start();
        }).execute(Inject.$StartOptions);

        cyclerHandle.begin(function (p) {
            if (p > 1) {
               // cyclerHandle.end();
            }
        });
    };
});
