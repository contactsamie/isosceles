
(function (win) {
win.$Scene$Promise = function (that) {
    this.promise = {
        //  fufilled:false,
        done: function () {
            if (this.state !== "done") {
                this.state = "done";

                if (typeof this.fufil === "function") {
                    this.fufil.apply(that);
                    this.fufilled = true;
                }

            }
        },
        nextState: function () {
            this.state = this.state === "started" ? "pending" : (this.state === "pending" || this.done());
            return this.state;
        },
        state: "started",
        fufil: false,
        then: function (f) {
            this.fufil = f || function () { };
            if (this.state === "done") {
                if (typeof this.fufil === "function") {
                    this.fufil.apply(that);
                    this.fufilled = true;
                }
            }
            return that;
        }
    }
};

})(window,undefined);
