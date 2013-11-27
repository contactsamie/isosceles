/*! scene v1.0.0 | (c) 2013, Samuel Bamgboye*/

//main lib /*! scene v1.0.0 | (c) 2013, Samuel Bamgboye*/
(function (wind, $) {


    var promise =wind.$Scene$Promise;

    // internal style settings
    var styles = {
        container: {
            margin: "0 auto 0 auto",
            position: "relative",
            overflow: "hidden"
        },
        fullScreen: {
            width: $(document).width(),
            height: $(document).height(),
         
            position: "relative",
            overflow: "hidden"
        },

        eachObject: function (x, y, z) {
            return {
                position: "absolute",
                top: x || "0px",
                left: y || "0px",
                "z-index": z || 999999
            };
        }

    };
     // here is a mini promise object for use throughout
  


    var theContainers = [];
    var      allObjects= [];// all elements loaded into the conatianer is stored in here
    //begining main library
    var $iscene = function (startOptions,selector, width, height, o, promise) {

       

        this.me = o || "__containers__ID" + theContainers.length;
        this.container = {
       
            addObjectU: function (objRef) { // prevents repitition of object in container
                var len = allObjects.length;
                for (var i = 0; i < len; i++) {
                    if (allObjects[i].passedRef === objRef) {
                        return allObjects[i].jId;
                    }
                }

                return this.addObject(objRef);
            },
            addObject: function (objRef) {// does not prevent repitition of object in container
                if (objRef) {
                    var isHtml = false;
                    if (objRef.indexOf("<") !== -1) {
                        isHtml = true;
                    }

                    var objID = allObjects.length + 1;
                    objID = "wp__Object__ID" + objID;

                    var objHtml = isHtml ? objRef : $(objRef).html();
                    var wrapedObj = '<div style="display:none; overflow:hidden; opacity:0" id="' + objID + '" >' + objHtml + '</div>';

                    // storing ech object and their behaviours
                    allObjects.push({
                        id: "#" + objID,
                        jId: objID,
                        passedRef: objRef,
                        html: wrapedObj,
                        container: this.dom,
                        refresh: function () {
                            this.removeFromContainer();
                         return   this.addToContainer();
                        },
                        addToContainer: function (x, y, z) {
                            var that = this;
                            var pr = (new promise(this)).promise;
                            if (!this.addToContainer.added) {
                                this.addToContainer.added = true;
                               
                                pr.nextState();
                                setTimeout(function () {
                                      that.container.append(that.html);

                                    $(that.id).css(styles.eachObject(x || 0, y || 0, z || 0));
                                    //  promise.fufil.apply(that);
                                    pr.done();
                                }, 200);
                            } else {
                                pr.done();
                            }
                            return pr;
                        },
                        // set up the behaviour of each object's liofetime in the container
                        show: function (opacity) {
                            var that = this;
                            $(that.id).css("opacity", opacity===0?0:(opacity||1));
                            opacity===0 && $(that.id).css("display", "block");
                            return {
                                simplyJust: function (anim) {

                                    var current = this;
                                    var pr = (new promise(this)).promise;
                                    pr.nextState();
                                    $(that.id)[anim]("slow",function () {
                                        pr.done();
                                    });
                                    return pr;
                                },
                                exitWith: function (anim) {
                                    var current = this;
                                    var pr = (new promise(this)).promise;
                                    pr.nextState();
                                    $(that.id)[anim]("slow",function () {
                                        $(that.id).css("display", "none");
                                       // promise.fufil.apply(current);
                                        pr.done();
                                    });
                                    return pr;
                                },
                                become: function (css) {
                                    $(that.id).css(css || {});
                                    return this;
                                },
                                wait: function (mill) {

                                    var pr = (new promise(this)).promise;
                                    var current = this;
                                    pr.nextState();
                                    setTimeout(function () {
                                       // promise.fufil.apply(current);
                                        pr.done();
                                    }, mill || 1000);

                                    return pr;
                                },
                                animate: function (params, options, speed) {

                                    var pr = (new promise(this)).promise;
                                    var current = this;
                                    pr.nextState();
                                    var obj = $(that.id);
                                    if (obj.size() > 0) {
                                       


                                        obj.stop().effect((params&&params.effect) || "explode", options || { percent: 120 }, speed || 1000, function () {
                                          //  that.refresh().then(function () {

  pr.done();
                                           // });
                                          
                                        });


                                        //obj.stop().animate(params || { height: "0px", opacity: "1" }, speed || 4000, easing || "linear", function () {

                                        //    pr.done();
                                        //});

                                    }
                                    return pr;
                                },
                                cycleAnimate: function (originalOptions, params, options, speed) {

                                    var pr = (new promise(this)).promise;
                                    var current = this;
                                    pr.nextState();
                                   
                                    var p = this.animate(params, options, speed);
                                    p.then(function () {

                                        var q = this.animate(params, originalOptions, speed);
                                        q.then(function () {
                                            pr.done();
                                        });

                                    });


                                    return pr;
                                }
                            };

                        },
                        removeFromContainer: function () {
                            $(this.id).remove();
                        }
                    });

                    //*****--- NNEED TO FIX FOR WHEN CLASS OR ID IS PROVIDED//isHtml || obj.remove();
                    return objID;
                }
            },
            getObject: function (objID) {
                var length = allObjects.length;
                for (var i = 0; i < length; i++) {
                    if (allObjects[i].jId === objID) {
                        return allObjects[i];
                    }

                }

                return false;
            },
            start: function (startOptions) {
                startOptions = startOptions || {};
                if (this.state.started === false) {
                    this.state.started = true;
                    var that = this;
                    $(function () {
                        that.access = startOptions.selector || that.access;
                        that.dom = $(that.access);
                        that.width = startOptions.width || that.width;
                        that.height = startOptions.height || that.height;

                        var styleToApply = startOptions.mode === "fullScreen" ? styles.fullScreen : {
                            width: that.width,
                            height: that.height
                        };

                        
                        that.dom.css(styleToApply);

                        startOptions.typeas === "images" && that.dom.find("img").css(styleToApply)

                    });

                }
                return this;
            },
            state: {
                started: false,
                objectAdded: {}
            },
            dom: $("#wp-window"),
            access: "#wp-window",
            width: "500px",
            height: "500px"
        };
        this.container.width = width || this.container.width;
        this.container.height = height || this.container.height;
        this.container.access = selector || this.container.access;
        theContainers.push(this);

    };

   


   var coreDependencyFactory = (function () {

   var createNewScene = function (startOptions, selector, width, height, o) {
            return new $iscene(startOptions, selector, width, height, o, promise);
        };


       return function (startOptions, param) {

          
           param = param || {};

          // if (param) {

               var container = createNewScene(startOptions, param.selector, param.width, param.height).container;
               container.start(startOptions || {});
               var o1 = container.addObjectU(param.html||"");
               var obj = container.getObject(o1);
               var domObj = obj.addToContainer && obj.addToContainer();


               var coreDependencyMaping = [];
               coreDependencyMaping.push({
                   name: "$Control",
                   dependency: obj
               });

               coreDependencyMaping.push({
                   name: "$ObjectReady",
                   dependency: domObj
               });

               coreDependencyMaping.push({
                   name: "$StartOptions",
                   dependency: startOptions || {}
               });

               coreDependencyMaping.push({
                   name: "$Core",
                   dependency: createNewScene
               });

               return coreDependencyMaping;
        //   }
       };


   })();


wind.scene =wind.isosceles("scene",coreDependencyFactory);
wind.scene.root = wind.scene.module("rootScene");

})(window, jQuery, undefined);






