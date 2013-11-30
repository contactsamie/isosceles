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
    var result2 = undefined;
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
    var namespaceName2 = createSomeUniqueString();
    var anotherNamespaceName = createSomeUniqueString();
    var moduleName = createSomeUniqueString();
    var moduleName2 = createSomeUniqueString();
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




    //==========================

    var samTestLib2 = isosceles(namespaceName2, function () { return [defaultDependencySetUp]; });

    var samTestModule2 = samTestLib2.module(moduleName);

    samTestModule2.plugin("A1", ["ADependency"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.ADependency;
        };
    }, true);



    samTestModule2.plugin("B1", ["A1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.A1 + arg + onCompleted();
        };
    });


    samTestModule2.plugin("C1", ["B1"], function (Inject) {
        return function (arg, onCompleted) {
            result2 = Inject.B1.WithArguments(arg.test + c1Modification, onCompleted).execute();
            return onCompleted() + c1Modification;
        };
    });



    var anotherTestModule = samTestLib.module(moduleName2, [moduleName]);


     samTestModule2.using("C1").WithArguments(callArg, onFinish).execute(execArg);
     anotherTestModule.using("C1").WithArguments(callArg, onFinish).execute(execArg);
    var expected1 = defaultDependencySetUp.dependency + callArg.test + c1Modification + onFinish();


    ok(result2 === expected1, "1: multiple namespaces can coexist together! ");
    ok(result0 === expected1, "2: multiple namespaces can coexist together! ");
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

test("isosceles Lib - use of short forms - global namespaces and modules Test", function () {

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

    var defaultDependencySetUp = { name: "ADependency", dependency: "A" };



    //==========================================================================================================================================


    iso.plugin("A1", function (Inject) {
        return function (arg, onCompleted) {
            return arg;
        };
    });



    iso.plugin("B1",["A1"], function (Inject) {
        return function (arg, onCompleted) {
            var a = Inject.A1("A1");
            return defaultDependencySetUp.dependency + arg + onCompleted() +a;
        };
    });


    iso.plugin("D1",["B1"], function (Inject) {
        return function (arg, onCompleted) {
            return Inject.B1(arg, onCompleted);
        };
    });




    isosceles.plugin("C1", ["D1"], function (Inject) {
        return function (arg, onCompleted) {
            result0 = Inject.D1.WithArguments(arg.test + c1Modification, onCompleted).execute();
            return onCompleted() + c1Modification;
        };
    });



    var executor = iso.using("C1").WithArguments(callArg, onFinish);
    executor.execute(execArg);
    var expected1 = defaultDependencySetUp.dependency + callArg.test + c1Modification + onFinish()+"A1";



    ok(result0 === expected1, "Testing short form - using internal globals ");

    var A1Result1 = iso.using("A1").WithArguments("HELLO").execute();
     var A1Result2 = (iso.using("A1"))("HELLO");
    ok(A1Result1 === "HELLO", "Testing short form - plugin execution long form with 'WithArguments'");


    ok(A1Result2 === "HELLO", "Testing short form - direct plugin execution ");


});

test("isosceles Lib - Testing Mocks", function () {

    var result0 = undefined;
    var result2 = undefined;
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
    var namespaceName2 = createSomeUniqueString();
    var anotherNamespaceName = createSomeUniqueString();
    var moduleName = createSomeUniqueString();
    var moduleName2 = createSomeUniqueString();
    var moduleName3 = createSomeUniqueString();
    var moduleName4 = createSomeUniqueString();
    var anotherModuleName = createSomeUniqueString();
    var someOtherModuleName = createSomeUniqueString();
    var defaultDependencySetUp = { name: "ADependency", dependency: "A" };



    //==========================================================================================================================================

    var expected1 = "1234567890";
    var expected2 = defaultDependencySetUp.dependency +callArg.test+ c1Modification + onFinish();


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
            return Inject.B1(arg.test + c1Modification, onCompleted);
          
        };
    });

    var anotherTestModule = samTestLib.module(moduleName2, [moduleName]);

    anotherTestModule.mock("C1", expected1);



    anotherTestModule.plugin("D1", ["C1"], function (Inject) {
        return function (arg, onCompleted) {
            
            var res = Inject.C1(callArg, onFinish);
            return res;
        };
    });
   
    result0= anotherTestModule.using("D1").WithArguments(callArg, onFinish).execute(execArg);

    var yetAnotherTestModule = samTestLib.module(moduleName3, [moduleName]);

    yetAnotherTestModule.plugin("D1", ["C1"], function (Inject) {
        return function (arg, onCompleted) {

            return Inject.C1(callArg, onFinish);
        };
    });

    var result10 = yetAnotherTestModule.using("D1").WithArguments(callArg, onFinish).execute(execArg);


    anotherTestModule.expect("D1", "0987654321","so wrong expectation");

    anotherTestModule.test("D1", function (testResult, note, actual, expected) {
        ok(!testResult, "1. a failed test must be false");
        ok(note === "so wrong expectation", "1. when 'note' is supplied in a test, it must be injected back into the test callback");
        ok(expected === "0987654321", "1. when 'expectation' is supplied in a test, it must be injected back into the test callback");
        ok(actual === expected1, "1. when a test is run , the expected must be correctly compared to the actual even when mock object is involved");
    });


   ok(result0 === expected1, "Mocks ");
   ok(result10 === expected2, "Mocks ");


   var aNewTestModule = samTestLib.module(moduleName4, [moduleName]);

   aNewTestModule.mock("D1","coffee");

  
   aNewTestModule.expect("D1", "milk", "D1 must be a milk");

   aNewTestModule.test("D1", function (testResult, note, actual, expected) {

      
       ok(!testResult, "2. a failed test must be false");
       ok(note === "D1 must be a milk", "2. when 'note' is supplied in a test, it must be injected back into the test callback");
       ok(expected === "milk", "2. when 'expectation' is supplied in a test, it must be injected back into the test callback");
       ok(actual === "coffee", "2. when a test is run , the expected must be correctly compared to the actual even when mock object is involved");
    
   });



 
});


test("isosceles Lib - Testing Specifications", function () {

    var framework = iso("sam_framework");
    var module = framework.module("sam_module");
    var mockShifts={
        shift1: "s1",
        shift2: "s2"
    };
    module.mock("getAllShifts", mockShifts);




    module.plugin("shiftViewer", ["getAllShifts"],function (Inject) {
        return function () {
            var shifts = Inject("getAllShifts")();
          
            var result = "";
            for (var shift in shifts) {
                if (shifts.hasOwnProperty(shift)) {
                    result += shifts[shift];
                }
            }
            return result;
       };
    });

    //Not implemented dependency
    //module.plugin("getAllShifts", function () {
    //    return function () {

    //    };
    //});

    var shiftViewer = module.using("shiftViewer");

    var shiftView1 = shiftViewer();

    ok(shiftView1 === "s1s2", " when mocking is enabled , the mock object must be used");

    module.enableMocking = false;

    var shiftView2 = shiftViewer();

    ok(shiftView2 !== "s1s2", " when mocking is NOT enabled , the mock object must NOT be used");

    module.enableMocking = true;

    var shiftView3 = shiftViewer();

    ok(shiftView3 === "s1s2", " when mocking is enabled AGAIN, the mock object must be used");


    module.enableMocking = false;

    var shiftView4 = shiftViewer();

    ok(shiftView4 !== "s1s2", " when mocking is NOT enabled AGAIN , the mock object must NOT be used");

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    module2 = framework.module("moduleSecond", ["sam_module"]);

    module2.mock("shiftViewer", "abcd");

    module.enableMocking = true;//enable mocking for sam_framework module so that the modules depending on it will get some result

    var shiftViewer2 = module2.using("shiftViewer");

    var shiftView11 = shiftViewer2();

    ok(shiftView11 === "abcd", " when mocking is enabled by default , the mock object must be used");

    module2.enableMocking = false;

    var shiftView12 = shiftViewer2();

    ok(shiftView12 !== "abcd", " when mocking is NOT enabled , the mock object must NOT be used");

    module2.enableMocking = true;

    var shiftView13 = shiftViewer2();

    ok(shiftView13 === "abcd", " when mocking is enabled AGAIN, the mock object must be used");


    module2.enableMocking = false;

    var shiftView14 = shiftViewer2();

    ok(shiftView14 !== "abcd", " when mocking is NOT enabled AGAIN , the mock object must NOT be used");







});

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
    ok(typeof isosceles.using === "function", "isosceles.using object is available for creation of modules!");


    ok(typeof iso.module === "function", "iso.module object is available for creation of modules!");
    ok(typeof iso.plugin === "function", "iso.plugin object is available for creation of modules!");
    ok(typeof iso.using === "function", "iso.using object is available for creation of modules!");



    ok(typeof iso.provider === "function", "iso.provider object is available for creation of modules!");
    ok(typeof iso.myDependencies === "function", "iso.myDependencies object is available for creation of modules!");
    ok(typeof iso.myDependency === "function", "iso.myDependency object is available for creation of modules!");
    ok(typeof iso.getModuleDependencies === "function", "iso.getModuleDependencies object is available for creation of modules!");
    ok(typeof iso.dependencyInjectorFactory === "function", "iso.dependencyInjectorFactory object is available for creation of modules!");
    ok(typeof iso.dependencyFactoryInterceptor === "function", "iso.dependencyFactoryInterceptor object is available for creation of modules!");

    ok(iso === isosceles, "iso and isosceles refer to the same object!");

    for (var isoObjProp in iso) {
        if (iso.hasOwnProperty(isoObjProp)) {
            ok(isosceles.hasOwnProperty(isoObjProp), "iso." + isoObjProp + " and isosceles." + isoObjProp + " must be the same object!");
        }
    }

    ok(isosceles.module(createSomeUniqueString()), "invoking isosceles.module object returns a truthy object");
    ok(typeof isosceles.module(createSomeUniqueString()).plugin === "function", "the plugin method exist off of module");

    ok(typeof isosceles.module(createSomeUniqueString()).using === "function", "the using method exist off of module");

    ok(!isosceles.module(createSomeUniqueString()).using(), "a plugin must be supplied");


    ok(!isosceles.module(createSomeUniqueString()).using(createSomeUniqueString()), "a non existing plugin cannot be used");

});
