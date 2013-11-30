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
                var _expectations =_expectations|| {};
                _fakeObjects.namespaces = _fakeObjects.namespaces || {};
                _fakeObjects.namespaces[namespaceReference] = _fakeObjects.namespaces[namespaceReference] || {};
                _fakeObjects.namespaces[namespaceReference][moduleNameRef] = _fakeObjects.namespaces[namespaceReference][moduleNameRef] || {};



                _expectations.namespaces = _expectations.namespaces || {};
                _expectations.namespaces[namespaceReference] = _expectations.namespaces[namespaceReference] || {};
                _expectations.namespaces[namespaceReference][moduleNameRef] = _expectations.namespaces[namespaceReference][moduleNameRef] || {};


                var mockFactory = function (str,obj) {
                    var mod = wind.isosceles("_$mockObj$_").module("_$mockObj$_");
                    mod.plugin(str, function () {
                        return function () {
                            return obj;
                        };
                    });
                return    mod.using(str);
                };


                



                var newModule= {
                    setMockObject: function (mockObject) {
                        isoscelesCon$ole.doc("isosceles.setMockObject", " isosceles.setMockObject is used to mosk dependencies with  supplied object containing 'dependency_name - mock' pairs . it can be used for specifying mock ina single location");

                   if (mockObject) {
                            for (var _mock in mockObject) {
                                if (mockObject.hasOwnProperty(_mock)) {
                                    this.mock(_mock, mockObject[_mock]);
                                }
                            }
                   }

                   return this;
                    },
                    testSetUp: function (testStr, expMet, mObject) {
                        this.setMockObject(mObject)
                       
                        if (testStr&&(expMet !== undefined)) {
                            this.expect(testStr, expMet);
                        }
                        return this;
                    },
                    getExpectation: function (str) {
                        return _expectations.namespaces[namespaceReference][moduleNameRef][str];
                    },
                    test: function (testStr,Arg, callBack) {
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
                    },
                    expect: function (expStr, expMet,note) {
                        if (expStr) {
                           
                            _expectations.namespaces[namespaceReference][moduleNameRef][expStr] = function () { return expMet; };
                            _expectations.namespaces[namespaceReference][moduleNameRef][expStr]["note"] = note || "";

                        }
                        return this;

                    },
                    specify: function () {

                    },
                    getMockObject: function (str) {
                        var mockry = _fakeObjects.namespaces[namespaceReference][moduleNameRef][str];

                        var mkObj = typeof mockry === "function" ? mockry : undefined;

                        return mkObj;
                    },
                    isMocked: function (str) {

                        return this.getMockObject(str) ? true : false;

                    },
                    enableMocking: true,
                    mock: function (fakeStr, fakeMet) {
                        if (fakeStr && fakeMet !== undefined) {
                            _fakeObjects.namespaces[namespaceReference][moduleNameRef][fakeStr] = function () { return mockFactory(fakeStr, fakeMet); };
                        }
                        return this;
                    },
                    using: function (o) {
                        if (o) {
                            var _pluginsLength = $allPlugins_.length;
                            //find and return plugin
                             isoscelesCon$ole.log("searching for plugin   " + o + " in pile ......");
                            for (var i = 0; i < _pluginsLength; i++) {
                                if ($allPlugins_[i].name === o) {
                                    var that = this;


                                    isoscelesCon$ole.log("found plugin   " + o + "! now returning ... ");


                                 

                                    var WithArgumentsMethod = function (param, completed, startOptions) {
                                        return WithArgumentsMethod.WithArguments(param, completed).execute(startOptions||undefined);
                                    };
                                    WithArgumentsMethod.WithArguments= function (param, completed) {

                                        return {
                                            // using start() to delay execution and DI of method
                                            //delay di to allow for free DI within modules
                                            execute: function (startOptions) {

                                                //find and inject plugin
                                                //look in every member of the array requested dependencies

                                                var Inject = function (f) {
                                                    var injection = Inject[f];
                                                    if (f && injection) {
                                                        return injection;
                                                    } else {

                                       throw ("unable to inject dependency '" + (f || "") + "' into '" + $allPlugins_[i].name + "' Plugin  in module '" + $allPlugins_[i].module+"'");
                                                    }
                                                };


                                                var MockFun = that.enableMocking && that.getMockObject($allPlugins_[i].name);

                                                MockFun||  that.dependencyInjectorFactory(i, Inject, startOptions, param);


                                                var ended = typeof completed === "function" ? completed : function () { };

                                                var returnFunction = MockFun?MockFun():($allPlugins_[i].plugin(Inject));

                                                if (typeof returnFunction === "function") {

                                                    try{
                                                        var pluginExecutionResult = returnFunction(param, ended);

                                                        return pluginExecutionResult;
                                                    }catch(ex){
                                      isoscelesCon$ole.error($allPlugins_[i].name + " Plugin  in module " + $allPlugins_[i].module + " threw an exception ..." + ex + "  " + $allPlugins_[i].plugin);
                                                   
                                                    }


                                                } else {
                                                    isoscelesCon$ole.error($allPlugins_[i].name + " Plugin  in module " + $allPlugins_[i].module + " did not return a function");
                                                    isoscelesCon$ole.error($allPlugins_[i].plugin);
                                                   
                                                }

                                              
                                            }
                                        };
                                    };

                                    return WithArgumentsMethod;
                                }
                            }

                            //if it doesnt find the plugin then throw exception
                             isoscelesCon$ole.error("ERROR: MISSING PLUGIN (" + o + ") DEFINITION NOT FOUND");

                            //return {
                            //    WithArguments: function (param, completed) {
                            //         isoscelesCon$ole.error("ERROR: MISSING PLUGIN (" + o + ") - cannot provide plugin, no definition found Please insert before using");
                            //        return {
                            //            start: function () {
                            //                 isoscelesCon$ole.error("ERROR: MISSING PLUGIN  (" + o + ") - cannot INVOKE start because plugin is missing!");
                            //            }
                            //        };
                            //    }
                            //};

                        }
                    },
                    dependencyFactoryInterceptor: (function () {




                        return function (eachDepend, coreDependencyMapping) {

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

                    })(),
                    dependencyInjectorFactory: function (i, Inject, startOptions, param) {



                         isoscelesCon$ole.log(" invoking plugin....   " + $allPlugins_[i].name);
                        // dependency resolution start
                        var dep = $allPlugins_[i].dependency;
                        var depLength = dep.length;


                         isoscelesCon$ole.log("injecting dependencies....   ");


                         isoscelesCon$ole.log(($allPlugins_[i].dependency.toString() || " ***Oh! No available dependency"));
                        //dependency resolution ends
                         isoscelesCon$ole.log("finally executing  " + $allPlugins_[i].name + " .....");


                        var coreDependencyMapping = coreDependencyFactory(startOptions, param);



                        Inject = Inject || {};

                        var _pluginsLength = $allPlugins_.length;
                        //find and inject plugin
                        //look in every member of the array requested dependencies
                        for (var t = 0; t < depLength; t++) {
                            var eachDepend = dep[t];
                            var Interceptor = this.dependencyFactoryInterceptor(eachDepend, coreDependencyMapping);

                            if (Interceptor === undefined) {
                                //look in every registered / available dependency
                                for (var j = 0; j < _pluginsLength; j++) {

                                   


                                    var eachPointedPlugin = $allPlugins_[j];
                                    var otherModuleDepencies = this.getModuleDependencies(otherModules);


                               

                                    var MockFun =this.getMockObject(eachDepend);

                                            var plug = {};
                                            if (this.enableMocking && typeof MockFun === "function") {
                                                plug = MockFun();
                                                Inject[eachDepend] = plug
                                            } else {
                                                plug = eachPointedPlugin.that.using(eachPointedPlugin.name);

                                   



                                    if ((eachPointedPlugin.name === eachDepend && eachPointedPlugin.module === moduleNameRef) ) {


                                       //var MockFun=this.getMockObject(eachDepend);

                                       //var plug = {};
                                       //if (typeof MockFun === "function") {
                                       //    plug=MockFun();
                                       //} else {
                                       //   plug = eachPointedPlugin.that.using(eachPointedPlugin.name);

                                       //}

                                        Inject[eachPointedPlugin.name] = eachPointedPlugin.autoExecute ? plug.WithArguments(param).execute() : plug


                                    } else {
                                        if ( (otherModuleDepencies && otherModuleDepencies.length && otherModuleDepencies.indexOf(eachPointedPlugin.name))) {

                                          
                                        //    var plug = eachPointedPlugin.that.using(eachPointedPlugin.name);


                                            Inject[eachPointedPlugin.name] = eachPointedPlugin.autoExecute ? plug.WithArguments(param).execute() : plug

                                        }
                                    }
                                            }
                                }
                            } else {
                                Inject[eachDepend] = Interceptor;
                            }
                        }

                        return Inject;

                    },
                    getModuleDependencies: function (stringSpecifiedModules) {
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

                    },
                    myDependency: function (dependencyQuery) {

                        for (var i=0;i<$allPlugins_.length;i++) {
                            if ($allPlugins_[i].name === dependencyQuery && $allPlugins_[i].module === moduleNameRef && $allPlugins_[i].namespace === namespaceReference) {
                                return $allPlugins_[i].plugin;
                            }

                        }

                    },
                    myDependencies: function () {
                        //var depends = [];
                        var dependsStrings = [];
                        for (var i = 0; i < $allPlugins_.length; i++) {
                            if ( $allPlugins_[i].module === moduleNameRef && $allPlugins_[i].namespace === namespaceReference) {
                               // depends.push($allPlugins_[i].plugin);
                                dependsStrings.push($allPlugins_[i].name);
                            }

                        }
                        return dependsStrings;
                    },
                    plugin: function (name, f_or_dependency, fun, autoExecute, nature) {
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
                    },
                    provider: function (name, f_or_dependency, fun) {
                        this.plugin(name, f_or_dependency, fun, "PROVIDER");
                    }
                };

               

                _modulesList[namespace][moduleNameRef]=newModule;


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
