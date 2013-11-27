scene.root.plugin("$AdSlider", ["$Control", "$ObjectReady", "$StartOptions"], function (Inject) {

    var control = Inject.$Control;
    var WhenObjectIsReady = Inject.$ObjectReady;
    var startOptions = Inject.$StartOptions;

    return function (param, completed) {
        WhenObjectIsReady.then(function () {
            this.show().simplyJust("fadeIn").then(function () {
                this.wait().then(function () {
                    this.cycleAnimate({ percent: 80 }, "", { percent: 120 }).then(function () {
                        this.simplyJust("fadeOut").then(function () {
                            completed();
                        });
                    });
                });
            });
        });
    };
});

