class AboutSubnavController{
    constructor(aboutModel, $state) {
        this.class = "true";
    }
}

let aboutsubnavComponent = {
    template: `
        <nav class="nav-app">
            <a class="prev">
                <i class="fa fa-caret-left"></i>
            </a>
            <a href="#" class="active">
                <span class="icon">
                    <i class="fa fa-check"></i>
                    <i class="fa fa-pencil"></i>
                </span>
                <span class="text">Technologies</span>            
            </a>
            
        </nav>
    `
};

export default aboutsubnavComponent;