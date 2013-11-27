/* TESTS

! isosceles.js v1.0.0 | (c) 2013, Samuel Bamgboye*/
/**
 * isosceles v1.0.0 - Cleaner Javascript Dependency Injection Implementation
 *
 * Copyright 2013 Samuel Bamgboye
 * Released under the MIT license.
 */
function createSomeUniqueString() {
    createSomeUniqueString.counter = createSomeUniqueString.counter || 0;
    createSomeUniqueString.counter++;
    return "someId_" + createSomeUniqueString.counter;
}

test("API Avialability Test", function () {
    ok(isosceles, "isosceles object is available in global space!");
    ok(iso, "iso object is available in global space!");
    ok(isosceles(function () { }).module, "isosceles.module object is available for creation of modules!");
    ok(typeof isosceles(function () { }).module === "function", "isosceles.module object is available for creation of modules!");
    ok(isosceles(function () { }).module(createSomeUniqueString()), "invoking isosceles.module object returns a truthy object");
    ok(typeof isosceles(function () { }).module(createSomeUniqueString()).plugin === "function", "the plugin method exist off of module");

    ok(isosceles.module, "isosceles.module object is available for creation of modules!");
    ok(typeof isosceles.module === "function", "isosceles.module object is available for creation of modules!");

    ok(typeof isosceles.plugin === "function", "isosceles.plugin object is available for creation of modules!");
    ok(typeof isosceles.module.plugin === "function", "isosceles.module.plugin object is available for creation of modules!");

    ok(typeof isosceles.using === "function", "isosceles.using object is available for creation of modules!");
    ok(typeof isosceles.module.using === "function", "isosceles.module.using object is available for creation of modules!");



    ok(isosceles.module(createSomeUniqueString()), "invoking isosceles.module object returns a truthy object");
    ok(typeof isosceles.module(createSomeUniqueString()).plugin === "function", "the plugin method exist off of module");

    ok(typeof isosceles.module(createSomeUniqueString()).using === "function", "the using method exist off of module");

    ok(! isosceles.module(createSomeUniqueString()).using(), "a plugin must be supplied");


    ok(!isosceles.module(createSomeUniqueString()).using(createSomeUniqueString()), "a non existing plugin cannot be used");

});

test("isosceles Lib Example Usage Test", function () {
   
    var result0 = undefined;
    var callArg = {
        test: "testing"
    };

    var execArg = {
        exec: "executing"
    };

    var onFinish = function () {
        return "samTestModule Completed"
    };
    var c1Modification = "_MODIFIED_BY_C1";
    var namespaceName = createSomeUniqueString();
    var anotherNamespaceName = createSomeUniqueString();
    var moduleName = createSomeUniqueString();
    var anotherModuleName = createSomeUniqueString();
    var someOtherModuleName = createSomeUniqueString();
    var defaultDependencySetUp = { name: "ADependency", dependency: "A" };



    //==========================================================================================================================================




    //==========================================================================================================================================
    var samTestLib = isosceles(namespaceName, function () {return [defaultDependencySetUp];});

    var samTestModule = samTestLib.module(moduleName);

    samTestModule.plugin("A1", ["ADependency"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.ADependency;
        };
    },true);

   
  
    samTestModule.plugin("B1", ["A1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.A1 + arg + onCompleted();
        };
    });

    
    samTestModule.plugin("C1", ["B1"], function (Inject) {
        return function (arg, onCompleted) {
            result0 = Inject.B1.WithArguments(arg.test + c1Modification, onCompleted).execute();
            return onCompleted() + c1Modification;
        };
    });


   
  var result1= samTestModule.using("C1").WithArguments(callArg, onFinish).execute(execArg);
 var expected1 = defaultDependencySetUp.dependency + callArg.test + c1Modification + onFinish();
    var expected2 = onFinish() + c1Modification;
  

    var result2 = isosceles.namespaces[namespaceName].module(moduleName).using("C1").WithArguments(callArg, onFinish).execute(execArg);

   

    //var anotherTestModule = samTestLib.module(anotherModuleName, [moduleName]);
    var anotherTestModule = samTestLib.module(anotherModuleName);

    anotherTestModule.plugin("AA1", ["C1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject[ "C1"]&&Inject[ "C1"].WithArguments(arg, onCompleted).execute();
        };
    });

    var result3 = anotherTestModule.using("AA1").WithArguments(callArg, onFinish).execute(execArg);





    var lastTestModule = samTestLib.module(anotherModuleName, [moduleName]);
   



    lastTestModule.plugin("AA1", ["C1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject["C1"] && Inject["C1"].WithArguments(arg, onCompleted).execute();
        };
    });

    var result4 = lastTestModule.using("AA1").WithArguments(callArg, onFinish).execute(execArg);


    var otherLib = isosceles(anotherNamespaceName, function () { return [defaultDependencySetUp]; });

    var otherTestModule = otherLib.module(anotherModuleName, [moduleName]);

    otherTestModule.plugin("AA1", ["C1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject["C1"] && Inject["C1"].WithArguments(arg, onCompleted).execute();
        };
    });

    var result5 = otherTestModule.using("AA1").WithArguments(callArg, onFinish).execute(execArg);

    var thisIsAnotherTestModule = otherLib.module(someOtherModuleName);

    thisIsAnotherTestModule.plugin("AA1", ["C1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject["C1"] && Inject["C1"].WithArguments(arg, onCompleted).execute();
        };
    });

    var result6 = thisIsAnotherTestModule.using("AA1").WithArguments(callArg, onFinish).execute(execArg);


    ok(result0 === expected1,"1 Dependency injection accross multiple plugins must function as expected ");
    ok(result1 === expected2, "2 Dependency injection accross multiple plugins must function as expected ");
    ok(result2 === expected2, "3 Dependency injection accross multiple plugins must function as expected ");
    ok(result3 !== expected2,"modules should -NOT- have access to other plugins in modules that has not been injected into them");
    ok(result4 === expected2, "modules -SHOULD/MUST- have access to other plugins in modules that has not been injected into them");
    ok(result5 !== expected2, "1 modules should -NOT- have access to other plugins in modules that has been injected into them BUT not belonging to the same namespace");
    ok(result6 !== expected2, "2 modules should -NOT- have access to other plugins in modules that has not been injected into them BUT not belonging to the same namespace");
});




test("isosceles Lib - Existence of multiple namespaces Test", function () {

    var result0 = undefined;
    var callArg = {
        test: "testing"
    };

    var execArg = {
        exec: "executing"
    };

    var onFinish = function () {
        return "samTestModule Completed"
    };
    var c1Modification = "_MODIFIED_BY_C1";
    var namespaceName = createSomeUniqueString();
    var anotherNamespaceName = createSomeUniqueString();
    var moduleName = createSomeUniqueString();
    var anotherModuleName = createSomeUniqueString();
    var someOtherModuleName = createSomeUniqueString();
    var defaultDependencySetUp = { name: "ADependency", dependency: "A" };



    //==========================================================================================================================================





    var samTestLib = isosceles(namespaceName, function () { return [defaultDependencySetUp]; });

    var samTestModule = samTestLib.module(moduleName);

    samTestModule.plugin("A1", ["ADependency"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.ADependency;
        };
    }, true);



    samTestModule.plugin("B1", ["A1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.A1 + arg + onCompleted();
        };
    });


    samTestModule.plugin("C1", ["B1"], function (Inject) {
        return function (arg, onCompleted) {
            result0 = Inject.B1.WithArguments(arg.test + c1Modification, onCompleted).execute();
            return onCompleted() + c1Modification;
        };
    });



    var result1 = samTestModule.using("C1").WithArguments(callArg, onFinish).execute(execArg);
    var expected1 = defaultDependencySetUp.dependency + callArg.test + c1Modification + onFinish();



    ok(result0 === expected1, "multiple namespaces can coexist together! ");
});




test("isosceles Lib - Performance Test", function () {

    var _result0 = undefined;
    var _callArg = {
        test: "testing"
    };

    var _execArg = {
        exec: "executing"
    };

    var _onFinishResult = "samTestModule Completed";
    var _onFinish = function () {
        return _onFinishResult;
    };
    var _c1Modification = "_MODIFIED_BY_C1";
    var _namespaceName = createSomeUniqueString()+"mnmn";
    var _anotherNamespaceName = createSomeUniqueString() + "mnmn";
    var _moduleName = createSomeUniqueString() + "mnmn";
    var _anotherModuleName = createSomeUniqueString() + "mnmn";
    var _someOtherModuleName = createSomeUniqueString() + "mnmn";
    var _defaultDependencySetUp = { name: "ADependency", dependency: "A" };



    //==========================================================================================================================================





    var _samTestLib = isosceles(_namespaceName, function () { return [_defaultDependencySetUp]; });

    var _samTestModule = _samTestLib.module(_moduleName);

    _samTestModule.plugin("A1", ["ADependency"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.ADependency;
        };
    }, true);



    _samTestModule.plugin("B1", ["A1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.A1 + arg + onCompleted();
        };
    });


    _samTestModule.plugin("C1", ["B1"], function (Inject) {
        return function (arg, onCompleted) {
            _result0 = Inject.B1.WithArguments(arg.test + _c1Modification, onCompleted).execute();
            return onCompleted() + _c1Modification;
        };
    });



    var exe = _samTestModule.using("C1").WithArguments(_callArg, _onFinish);
var _expected1 = _defaultDependencySetUp.dependency + _callArg.test + _c1Modification + _onFinishResult;



var runPerf = function (i, f) {
    
    if (i) {

        (function (exe, _execArg) {
            var start = new Date().getTime();
            for (var j = 0; j < i; j++) {
                exe.execute(_execArg);
                if (_result0 !== _expected1) {
                    ok(_result0 === _expected1, "failure during performance test ");
                    return;
                }
                if (i - 1 === j) {
                    var end = new Date().getTime();
                    var time = end - start;
                    f(i, time);
                }
            }
        })(exe, _execArg);

    } else {

        f(i, 0);
    }
};
ok(true);
console &&console.time&& console.time('performance test');
runPerf(50, function (i,duration) {
    ok(_result0 === _expected1, "Performance test  in " + i + " iterations took " + duration + "(ms)");
    var benchMark = i * 10;
    ok(duration <= benchMark, "Performance benchmark test :  in " + i + " iterations must take less than " + benchMark + "(ms)");
});
var tttt = console && console.timeEnd&&console.timeEnd('performance test');


    
});

//test("isosceles Lib - use of short forms - global namespaces and modules Test", function () {

//    var result0 = undefined;
//    var callArg = {
//        test: "testing"
//    };

//    var execArg = {
//        exec: "executing"
//    };

//    var onFinish = function () {
//        return "samTestModule Completed"
//    };
//    var c1Modification = "_MODIFIED_BY_C1";

//    var defaultDependencySetUp = { name: "ADependency", dependency: "A" };



//    //==========================================================================================================================================







//    iso.module.plugin("B1", function (Inject) {
//        return function (arg, onCompleted) {
//            return defaultDependencySetUp.dependency + arg + onCompleted();
//        };
//    });


//    iso.module.plugin("C1", ["B1"], function (Inject) {
//        return function (arg, onCompleted) {
//            result0 = Inject.B1.WithArguments(arg.test + c1Modification, onCompleted).execute();
//            return onCompleted() + c1Modification;
//        };
//    });



//    var result1 = iso.module.using("C1").WithArguments(callArg, onFinish).execute(execArg);
//    var expected1 = defaultDependencySetUp.dependency + callArg.test + c1Modification + onFinish();



//    ok(result0 === expected1, "Testing short form - using internal globals ");


//});