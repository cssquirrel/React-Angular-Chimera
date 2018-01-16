class Boilerplate {
    constructor(contentResource) {

        this.contentResource = contentResource;

        this.init = this.init.bind(this);

        this.init();
    }

    init () {
        console.info("Hello, world! Boilerplate time. I'm going to try to use contentResource");
        this.contentResource.getById(1103).then(function(data) {
            console.info(data);
        });
    }
};

Boilerplate.$inject = ['contentResource'];

module.exports = Boilerplate;