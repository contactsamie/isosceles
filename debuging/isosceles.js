/*! isosceles.js v1.0.0 | (c) 2013, Samuel Bamgboye*/
/**
 * isosceles v1.0.1 - Cleaner JavaScript Dependency Injection Factory
 *
 * Copyright 2013 Samuel Bamgboye
 * Released under the MIT license.
 */
(function (wind) {

    
    var isoscelesCon$ole = function (o) { };

    isoscelesCon$ole.defineConsole = function (f) {
        console = typeof f==="function"?f:console;
    };
    console || isoscelesCon$ole.defineConsole(function () { });

    isoscelesCon$ole.log = function (o) {
        console.log(o);
    };
    isoscelesCon$ole.warn = function (o) {
        console.warn(o);
    };
    isoscelesCon$ole.error = function (o) {
        console.error(o);
    };
    isoscelesCon$ole.doc = function (name, doc) {

        if (name) {

            if (doc) {
                isoscelesCon$ole.doc.list = isoscelesCon$ole.doc.list || {};
                isoscelesCon$ole.doc.list[name] = doc;
                console.log(name + ":" + doc);

            } else {

                return isoscelesCon$ole.doc.list[name]||"No documentation exist for '"+name+"' at the moment";

            }         

        } else {
            return isoscelesCon$ole.doc.list;
        }
    };

   
    var _allPlugins_ = {};
    var _modulesList = {};
    wind.isosceles = function (namespace, coreDependencyFactory) {
        isoscelesCon$ole.doc("isosceles", " isosceles is a JAVASCRIPT DEPENDENCY INJECTION FACTORY, you can define namespaces which contain modules, which contain plugins and modules from one namespace are forever separated from modules of another namespace");

       

        if (namespace) {

            _modulesList[namespace] = _modulesList[namespace] || {};
           
              _allPlugins_[namespace] = [];
              var $allPlugins_ = _allPlugins_[namespace];

            wind.isosceles.namespaces =  wind.isosceles.namespaces|| {};
            
            if (typeof coreDependencyFactory !== "function") {
                coreDependencyFactory = function () { return []; };
            };

            var module = function () { };

           
            module.prototype.module = function (moduleNameReference,otherModules) {
                isoscelesCon$ole.doc("isosceles.module", " isosceles.module is used to define a module off of a namespace. so after you have defined a namespace, you can use its module method to create modules for it");
                
              var  moduleNameRef = moduleNameReference;
              var  namespaceReference = namespace.toString();
              //if (moduleNameRef && _modulesList[namespaceReference] && _modulesList[namespaceReference][moduleNameRef]) {
              //    return _modulesList[namespaceReference][moduleNameRef];
              //  }

                otherModules = otherModules || [];
                var _fakeObjects =_fakeObjects|| {};
             
                _fakeObjects.namespaces = _fakeObjects.namespaces || {};
                _fakeObjects.namespaces[namespaceReference] = _fakeObjects.namespaces[namespaceReference] || {};
                _fakeObjects.namespaces[namespaceReference][moduleNameRef] = _fakeObjects.namespaces[namespaceReference][moduleNameRef] || {};


                var _expectations =_expectations|| {};
                _expectations.namespaces = _expectations.namespaces || {};
                _expectations.namespaces[namespaceReference] = _expectations.namespaces[namespaceReference] || {};
                _expectations.namespaces[namespaceReference][moduleNameRef] = _expectations.namespaces[namespaceReference][moduleNameRef] || {};


                var _implementations = _implementations || {};
                _implementations.namespaces = _implementations.namespaces || {};
                _implementations.namespaces[namespaceReference] = _implementations.namespaces[namespaceReference] || {};
                _implementations.namespaces[namespaceReference][moduleNameRef] = _implementations.namespaces[namespaceReference][moduleNameRef] || {};


                var mockFactory = function (str,obj) {
                    var mod = wind.isosceles("_$mockObj$_").module("_$mockObj$_");
                    mod.plugin(str, function () {
                        return function () {
                            return obj;
                        };
                    });
                return    mod.using(str);
                };


                var setMockObject = function (mockObject) {
                    isoscelesCon$ole.doc("isosceles.setMockObject",
                        " isosceles.setMockObject is used to mosk dependencies with  supplied object containing 'dependency_name - mock' pairs . it can be used for specifying mock ina single location");

                    if (mockObject) {
                        for (var _mock in mockObject) {
                            if (mockObject.hasOwnProperty(_mock)) {
                                this.mock(_mock, mockObject[_mock]);
                            }
                        }
                    }

                    return this;
                };

                var testSetUp = function (testStr, expMet, mObject) {
                    this.setMockObject(mObject)

                    if (testStr && (expMet !== undefined)) {
                        this.expect(testStr, expMet);
                    }
                    return this;
                };

                var getExpectation=function (str) {
                    return _expectations.namespaces[namespaceReference][moduleNameRef][str];
                };

                var test=function (testStr,Arg, callBack) {
                    callBack = callBack || Arg;
                    if (testStr&&typeof callBack === "function") {

                        // this.testSetUp(testStr || undefined, expMet || undefined, mObject || undefined);
                        var testResult = false;
                        var note = "";
                        isoscelesCon$ole.warn("Testing " + testStr+"***********");
                        var actual = (this.using(testStr))(Arg || undefined);
                        var testHandle = _expectations.namespaces[namespaceReference][moduleNameRef][testStr];

                        if (typeof testHandle === "function" ) {

                            var expected = testHandle && testHandle();
                            testResult = actual === expected;
                            note = (testHandle && testHandle["note"]) || "";
                            callBack(testResult, note, actual, expected);
                        } else {
                            isoscelesCon$ole.error("Testing " + testStr+" was unsuccessfull!");
                            callBack();
                        }
                    }
                    return this;
                };
                var expect = function (expStr, expMet, note) {
                    if (expStr) {

                        _expectations.namespaces[namespaceReference][moduleNameRef][expStr] = function () { return expMet; };
                        _expectations.namespaces[namespaceReference][moduleNameRef][expStr]["note"] = note || "";

                    }
                    return this;

                };
                var specify = function () {

                };
                var getMockObject = function (str) {
                    var mockry = _fakeObjects.namespaces[namespaceReference][moduleNameRef][str];

                    var mkObj = typeof mockry === "function" ? mockry : undefined;

                    return mkObj;
                };

                var isMocked = function (str) {

                    return this.getMockObject(str) ? true : false;

                };
                var mock = function (fakeStr, fakeMet) {
                    if (fakeStr && fakeMet !== undefined) {
                        _fakeObjects.namespaces[namespaceReference][moduleNameRef][fakeStr] = function () { return mockFactory(fakeStr, fakeMet); };
                    }
                    return this;
                };
                var using = function (o, selectedImplimentationArray) {
                    selectedImplimentationArray || [];
                    if (o) {






                        //check if there are any implementations
                      //  o =( _implementations.namespaces[namespaceReference][o] && _implementations.namespaces[namespaceReference][o]["imp"] )|| o;



                        var _pluginsLength = $allPlugins_.length;
                        //find and return plugin
                        isoscelesCon$ole.log("searching for plugin   " + o + " in pile ......");
                        for (var i = 0; i < _pluginsLength; i++) {

                            var pluginToExecute = $allPlugins_[i];


                            if (pluginToExecute.name === o) {
                                var that = this;


                                isoscelesCon$ole.log("found plugin   " + o + "! now returning ... ");




                                var WithArgumentsMethod = function (param, completed, startOptions) {
                                    return WithArgumentsMethod.WithArguments(param, completed).execute(startOptions || undefined);
                                };
                                WithArgumentsMethod.WithArguments = function (param, completed) {

 var Inject = function (f) {
                                            var injection = Inject[f];
                                            if (f && injection) {
                                                return injection;
                                            } else {

                                                throw ("unable to inject dependency '" + (f || "") + "' into '" + $allPlugins_[i].name + "' Plugin  in module '" + $allPlugins_[i].module + "'");
                                            }
                                        };

                                    var execute = function (startOptions) {

                                        //find and inject plugin
                                        //look in every member of the array requested dependencies

                                    
                                       


                                        var MockFun = that.enableMocking && that.getMockObject(pluginToExecute.name);





                                        MockFun || that.dependencyInjectorFactory(pluginToExecute, Inject, startOptions, param, selectedImplimentationArray);


                                        var ended = typeof completed === "function" ? completed : function () { };

                                        var returnFunction = MockFun ? MockFun() : (pluginToExecute.plugin(Inject));

                                        if (typeof returnFunction === "function") {

                                            try {
                                                var pluginExecutionResult = returnFunction(param, ended);

                                                return pluginExecutionResult;
                                            } catch (ex) {
                                                isoscelesCon$ole.error(pluginToExecute.name + " Plugin  in module " + pluginToExecute.module + " threw an exception ..." + ex + "  " + pluginToExecute.plugin);

                                            }


                                        } else {
                                            isoscelesCon$ole.error(pluginToExecute.name + " Plugin  in module " + pluginToExecute.module + " did not return a function");
                                            isoscelesCon$ole.error(pluginToExecute.plugin);

                                        }


                                    };

                                    return {
                                        // using start() to delay execution and DI of method
                                        //delay di to allow for free DI within modules
                                        execute: execute
                                    };
                                };

                                return WithArgumentsMethod;
                            }
                        }

                        //if it doesnt find the plugin then throw exception
                        isoscelesCon$ole.error("ERROR: MISSING PLUGIN (" + o + ") DEFINITION NOT FOUND");

                        

                    }
                };
                var dependencyFactoryInterceptor= function (eachDepend, coreDependencyMapping) {

                        var m = undefined;
                        if (coreDependencyMapping) {

                            for (var k = 0; k < coreDependencyMapping.length; k++) {
                                if (coreDependencyMapping[k].name === eachDepend) {
                                    m = coreDependencyMapping[k].dependency;
                                }
                            }
                        }

                        return m;

                    };

              

                var dependencyInjectorFactory = function (pluginToExecute, Inject, startOptions, param, selectedImplimentationArray) {



                    isoscelesCon$ole.log(" invoking plugin....   " + pluginToExecute.name);
                    // dependency resolution start
                    var depTmp = pluginToExecute.dependency;

                    var depLengthTmp = depTmp.length;

                    var selectedImpLength = (selectedImplimentationArray && selectedImplimentationArray.length) || 0;



                    var dep = [];

                   

                    if (selectedImpLength) {
                        if (depTmp && depLengthTmp) {

                            
                            for (var eachDependencyInjected = 0; eachDependencyInjected < depLengthTmp; eachDependencyInjected++) {
                                    for (var eachSelImp = 0; eachSelImp < selectedImpLength; eachSelImp++) {

                                        var interfaceSpecified = depTmp[eachDependencyInjected];
                                        var concreteSelected=selectedImplimentationArray[eachSelImp];
                                        var interfaceByConcreteImp = _implementations.namespaces[namespaceReference][moduleNameRef][concreteSelected];
                                        if (interfaceByConcreteImp === interfaceSpecified) {

                                            dep.push({
                                                conc: concreteSelected,
                                                face: interfaceByConcreteImp
                                            });

                                        }

                                    }

                            }
                        }
                    } else {
                        for (var eachDependencyInjected = 0; eachDependencyInjected < depLengthTmp; eachDependencyInjected++) {

                            
                            dep.push({
                                conc: depTmp[eachDependencyInjected],
                                face: depTmp[eachDependencyInjected]
                            });

                        }
                    }

                    

                    var depLength = dep.length;


                    isoscelesCon$ole.log("injecting dependencies....   ");


                    isoscelesCon$ole.log((pluginToExecute.dependency.toString() || " ***Oh! No available dependency"));
                    //dependency resolution ends
                    isoscelesCon$ole.log("finally executing  " + pluginToExecute.name + " .....");


                    var coreDependencyMapping = coreDependencyFactory(startOptions, param);



                    Inject = Inject || {};

                    var _pluginsLength = $allPlugins_.length;
                    //find and inject plugin
                    //look in every member of the array requested dependencies
                    for (var t = 0; t < depLength; t++) {
                        var eachDepend = dep[t].conc;
                        var eachDependNametoUse = dep[t].face;
                        var Interceptor = this.dependencyFactoryInterceptor(eachDepend, coreDependencyMapping);

                        if (Interceptor === undefined) {
                            //look in every registered / available dependency
                            for (var j = 0; j < _pluginsLength; j++) {

                                var eachPointedPlugin = $allPlugins_[j];



                         var    intNameforInjection=   _implementations.namespaces[namespaceReference][moduleNameRef][eachPointedPlugin.name];


                                var otherModuleDepencies = this.getModuleDependencies(otherModules);

                                var MockFun =this.getMockObject(eachDepend);

                                var plug = {};
                                if (this.enableMocking && typeof MockFun === "function") {
                                    plug = MockFun();
                                    Inject[eachDepend] = plug
                                } else {
                                    plug = eachPointedPlugin.that.using(eachPointedPlugin.name);

                                    var injectionCondition = (eachPointedPlugin.name === eachDepend && eachPointedPlugin.module === moduleNameRef) ||
                                        (otherModuleDepencies && otherModuleDepencies.length && otherModuleDepencies.indexOf(eachPointedPlugin.name));

                                    if (injectionCondition ) {
                                        Inject[intNameforInjection||eachPointedPlugin.name] = eachPointedPlugin.autoExecute ? plug.WithArguments(param).execute() : plug
                                    }
                                }
                            }
                        } else {
                            Inject[eachDependNametoUse] = Interceptor;
                        }
                    }

                    return Inject;

                };
                var getModuleDependencies=function (stringSpecifiedModules) {
                    if (stringSpecifiedModules &&( stringSpecifiedModules.length!==0)) {
                        for (var om = 0; om < stringSpecifiedModules.length; om++) {
                            var moduleName = stringSpecifiedModules[om];
                            var eahcOther = wind.isosceles.namespaces[namespaceReference];
                            if (eahcOther) {

                                var depStrAr = eahcOther.module(moduleName).myDependencies();
                                if (depStrAr && depStrAr.length==0) {
                                    isoscelesCon$ole.error("Dependency '" + stringSpecifiedModules + "'  has NOT been added to the namespace '" + namespaceReference + "' and cannot be injected into '" + moduleNameRef+"'");
                                }

                                return depStrAr;
                            }
                        }

                          
                    }

                };

                var myDependency=function (dependencyQuery) {

                    for (var i=0;i<$allPlugins_.length;i++) {
                        if ($allPlugins_[i].name === dependencyQuery && $allPlugins_[i].module === moduleNameRef && $allPlugins_[i].namespace === namespaceReference) {
                            return $allPlugins_[i].plugin;
                        }

                    }

                };
                var myDependencies= function () {
                    //var depends = [];
                    var dependsStrings = [];
                    for (var i = 0; i < $allPlugins_.length; i++) {
                        if ( $allPlugins_[i].module === moduleNameRef && $allPlugins_[i].namespace === namespaceReference) {
                            // depends.push($allPlugins_[i].plugin);
                            dependsStrings.push($allPlugins_[i].name);
                        }

                    }
                    return dependsStrings;
                };
                var plugin = function (name, f_or_dependency, fun, autoExecute, nature) {

                    if (name.indexOf(":") !== -1) {
                        nameObj = name.split(":");
                        name = nameObj[0];
                        interfaceName = nameObj[1];

                        if (name && interfaceName) {
                            this.implement(interfaceName).withPlugin(name);
                        } 
                    }

                  

                    var dnature = nature || "NONE provider";

                    isoscelesCon$ole.log("--->Registering a " + dnature + "  " + name + "  ....");


                    var f = typeof f_or_dependency === "function" ? f_or_dependency : (fun || function () { });
                    var dependencies = Object.prototype.toString.call(f_or_dependency) === '[object Array]' ? f_or_dependency : [];

                    // dependencies.push(name);

                    if (typeof f === "function" && name) {
                        $allPlugins_.push({
                            namespace: namespaceReference,
                            module:moduleNameRef,
                            name: name,
                            plugin: f,
                            dependency: dependencies,
                            that: this,
                            nature: dnature,
                            autoExecute: autoExecute
                        });
                    }
                };

                var implement = function (pluginInterface, concreteImplementation) {
                    if (pluginInterface) {
                        if (concreteImplementation) {
                            _implementations.namespaces[namespaceReference][moduleNameRef][concreteImplementation] = pluginInterface;
                        } else {
                            return {
                                withPlugin: function (concreteImplementation) {
                                    _implementations.namespaces[namespaceReference][moduleNameRef][concreteImplementation] = pluginInterface;
                                    return this;
                                }
                            }
                        }
                    }
                    return this;
                };

                var provider=function (name, f_or_dependency, fun) {
                    this.plugin(name, f_or_dependency, fun, "PROVIDER");
                };
                _modulesList[namespace][moduleNameRef] = {
                    setMockObject: setMockObject,
                    testSetUp: testSetUp,
                    getExpectation: getExpectation,
                    test: test,
                    expect:expect,
                    specify: specify,
                    getMockObject:getMockObject ,
                    isMocked: isMocked,
                    enableMocking: true,
                    mock:mock,
                    using: using,
                    dependencyFactoryInterceptor: dependencyFactoryInterceptor,
                    dependencyInjectorFactory: dependencyInjectorFactory,
                    getModuleDependencies: getModuleDependencies,
                    myDependency: myDependency,
                    myDependencies: myDependencies,
                    plugin: plugin,
                    provider: provider,
                  
                    implement:implement
                };

               

                return _modulesList[namespace][moduleNameRef];


            };

            wind.isosceles.namespaces[namespace] = new module();

            return wind.isosceles.namespaces[namespace];



        }




    };
   
    wind.isosceles.api = isoscelesCon$ole || function () { };
  
    var $n = isosceles("_$n_");
    wind.isosceles.module = $n.module;

    var $m = $n.module("_$m_");

    for (var m_prop in $m) {
        if ($m.hasOwnProperty(m_prop)) {
            wind.isosceles[m_prop] = $m[m_prop];
        }
    }



    wind.iso = wind.isosceles;

})(window, undefined);
