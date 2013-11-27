scene.root.plugin("$Cycler", ["$Control", "$ObjectReady", "$StartOptions"], function (Inject) {

    var control = Inject.$Control;
    var WhenObjectIsReady = Inject.$ObjectReady;
    var startOptions = Inject.$StartOptions;

    return function (param, completed) {
        var dependency = param.dependency;
        var slides = param.htmlList;

        var slider = [];

        var len = slides.length;
        var mparam = [];

        var mustStop = false;

        var eachEnded = function () { };
        for (var i = 0; i < len; i++) {
            var each = {};
            each.number = i;
            var s = Object.create(param);
            s.html = slides[i];
            each.param = s;
            each.param = s;
            each.dependency = (function (i) {
                return dependency.WithArguments(s, function () {

                    eachEnded(i);
                    if (slider.length - 1 === i) {
                        i = 0;
                    }

                    mustStop || slider[i].callNext(i + 1);
                });
            })(i);
            var s = Object.create(param);
            s.html = slides[i];

            each.callNext = (function () {
                return function (n) {
                    slider[n].dependency.execute(startOptions);
                };
            })();
            slider.push(each);
        }


        var completeObject = {
            begin: function (f) {
                eachEnded = typeof f === "function" ? f : eachEnded;
                mustStop = false;
                slider[0].callNext(0);
                return this.stop;
            },
            end: function () {
                mustStop = true;
                return this.start;
            }
        };

        completed(completeObject);

        return completeObject;
    };
});