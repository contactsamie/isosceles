/*! isosceles.js v1.0.0 | (c) 2013, Samuel Bamgboye*/
/**
 * isosceles v1.0.0 - Cleaner JavaScript Dependency Injection Factory
 *
 * Copyright 2013 Samuel Bamgboye
 * Released under the MIT license.
 */
(function (wind) {

    function genSomeID() {
        genSomeID.counter = genSomeID.counter || 0;
        genSomeID.counter++;
        return "siddis" + genSomeID.counter;
    }
   
    var _allPlugins_ = {};
    wind.isosceles = function (namespace, coreDependencyFactory) {

        
        _allPlugins_[namespace] = [];
        var $allPlugins_ = _allPlugins_[namespace];

        if (namespace) {
            wind.isosceles.namespaces = {};
            
            if (typeof coreDependencyFactory !== "function") {
                coreDependencyFactory = function () { return []; };
            };

            var module = function () { };

        
            module.prototype.module = function (moduleNameReference,otherModules) {


              var  moduleNameRef = moduleNameReference;
              var  namespaceReference = namespace.toString();


                otherModules = otherModules || [];


                return {
                    using: function (o) {
                        if (o) {
                            var _pluginsLength = $allPlugins_.length;
                            //find and return plugin
                             console.log("searching for plugin   " + o + " in pile ......");
                            for (var i = 0; i < _pluginsLength; i++) {
                                if ($allPlugins_[i].name === o) {
                                    var that = this;


                                     console.log("found plugin   " + o + "! now returning ... ");
                                    return {
                                        WithArguments: function (param, completed) {

                                            return {
                                                // using start() to delay execution and DI of method
                                                //delay di to allow for free DI within modules
                                                execute: function (startOptions) {

                                                    //find and inject plugin
                                                    //look in every member of the array requested dependencies

                                                    var Inject = {};

                                                    that.dependencyInjectorFactory(i, Inject, startOptions, param);


                                                    var ended = typeof completed === "function" ? completed : function () { };

                                                    return ($allPlugins_[i].plugin(Inject))(param, ended);
                                                }
                                            };
                                        }
                                    };
                                }
                            }

                            //if it doesnt find the plugin then throw exception
                             console.error("ERROR: MISSING PLUGIN (" + o + ") DEFINITION NOT FOUND");

                            //return {
                            //    WithArguments: function (param, completed) {
                            //         console.error("ERROR: MISSING PLUGIN (" + o + ") - cannot provide plugin, no definition found Please insert before using");
                            //        return {
                            //            start: function () {
                            //                 console.error("ERROR: MISSING PLUGIN  (" + o + ") - cannot INVOKE start because plugin is missing!");
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



                         console.log(" invoking plugin....   " + $allPlugins_[i].name);
                        // dependency resolution start
                        var dep = $allPlugins_[i].dependency;
                        var depLength = dep.length;


                         console.log("injecting dependencies....   ");


                         console.log(($allPlugins_[i].dependency.toString() || " ***Oh! No available dependency"));
                        //dependency resolution ends
                         console.log("finally executing  " + $allPlugins_[i].name + " .....");


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
                                    if ((eachPointedPlugin.name === eachDepend && eachPointedPlugin.module === moduleNameRef) ||(otherModuleDepencies&& otherModuleDepencies.length && otherModuleDepencies.indexOf(eachPointedPlugin.name))) {
                                        var plug = eachPointedPlugin.that.using(eachPointedPlugin.name);
                                        Inject[eachPointedPlugin.name] = eachPointedPlugin.autoExecute ? plug.WithArguments(param).execute() : plug
                                    }
                                }
                            } else {
                                Inject[eachDepend] = Interceptor;
                            }
                        }

                        return Inject;

                    },
                    getModuleDependencies: function (stringSpecifiedModules) {
                        if (stringSpecifiedModules) {
                            for (var om = 0; om < stringSpecifiedModules.length; om++) {
                                var moduleName = stringSpecifiedModules[om];
                                var eahcOther = wind.isosceles.namespaces[namespaceReference];
                                if (eahcOther) {

                                 return   eahcOther.module(moduleName).myDependencies();

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

                         console.log("--->Registering a " + dnature + "  " + name + "  ....");


                        var f = typeof f_or_dependency === "function" ? f_or_dependency : (fun || function () { });
                        var dependencies = Object.prototype.toString.call(f_or_dependency) === '[object Array]' ? f_or_dependency : [];

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

            };

            wind.isosceles.namespaces[namespace] = new module();

            return wind.isosceles.namespaces[namespace];
        };
    };
   
    var globalNamespace = genSomeID();
    var globalModule = genSomeID();
    wind.isosceles.module = isosceles(globalNamespace).module;
    var moduleFactory=wind.isosceles.module(globalModule);
    wind.isosceles.module.plugin = moduleFactory.plugin;
    wind.isosceles.module.using = moduleFactory.using;


    wind.isosceles.dependencyInjectorFactory
    wind.isosceles.using = wind.isosceles.module.using;
    wind.isosceles.plugin = wind.isosceles.module.plugin;



    wind.iso = wind.isosceles;

})(window, undefined);