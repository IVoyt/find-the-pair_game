window.Stats = function() {
    this.found          = 0;
    this.score          = 0;
    this.tries          = 0;
    this.lastTrie       = 0;

    this.clear = function() {
        this.found          = 0;
        this.score          = 0;
        this.tries          = 0;
        this.lastTrie       = 0;
    };
};