var DISAMPLE1 = isosceles("DISAMPLE1", function () { });
var DISample1=DISAMPLE1.module("someone");

DISample1.plugin("A", ["B"], function (Inject) {
    return function () {
        return Inject.B.WithArguments().execute({});
    };
},true);

DISample1.plugin("B", function () {
    return function () {
        return "OUTPUTING ..=========================Simple dependency injection=======================";
    };
});

DISample1.plugin("C",["A"], function (Inject) {
    return function () {
        console.log(Inject.A);
    };
});

var Z = DISample1.using("C").WithArguments();

Z.execute();
//===============================================================================================

var DISAMPLE2 = isosceles("DISAMPLE2", function () {
    return [{
        name: "dependencyA",
        dependency: {some:"A dependency"}
    },
    {
        name: "dependencyB",
        dependency: { some: "B dependency" }
    }
    ];
});
var DISample = DISAMPLE2.module("someone");
DISample.plugin("sample1", ["dependencyB", "sample2"], function (Inject) {

    return function (param,onCompleted) {
        console.log("entering sample 1 ****************************************************");
        console.log("param:........");
        console.log(param);

        console.log("onCompleted:.......");
        console.log(onCompleted);



        var newOnCompleted = function () { };
        newParam = "coming from sample1";
        var retval = {
            obj1: Inject.dependencyB,
            obj2: Inject.sample2.WithArguments(newParam, newOnCompleted).execute({})
        };
        console.log("returning from sample 1 ****************************************************");
        console.log(retval);

        onCompleted();

        return retval;

    };
});

DISample.plugin("sample2", ["dependencyA"], function (Inject) {
    return function (param, onCompleted) {
        console.log("entering sample 2 ****************************************************");
        console.log("param:........");
        console.log(param);

        console.log("onCompleted:.......");
        console.log(onCompleted);
        var retval = Inject.dependencyA;

        console.log("returning from sample 2 ****************************************************");
        console.log(retval);

        return retval;
    };
});

var d1 = DISample.using("sample1").WithArguments({
comingFromUsing:"coming from using ****"
}, function () {
    console.log("********all operation completed ******");
});

d1.execute({});
