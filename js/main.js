jQuery(document).ready(function($) {
    var e = "tu&#105;&#64;h&#117;y&#46;&#105;&#109;";
    $('body').terminal({
        echo: function(arg1) {
            this.echo(arg1);
        },
        help: function() {
            this.echo("Available commands:");
            this.echo("\twhoami      display my short brief");
            this.echo("\tcontact     display contact infomation");
            this.echo("\thelp        display this help screen.");            
        },
        id: function(){
            this.echo("uid=1000(tui) gid=1000(tui)");
        },
        whoami: function() {
            this.echo("Hello, my name is Huy (aka Bruce Doan), i'm from  HCMc, Vietnam.");
             this.echo("I'm a programmer, linux system administrator. I really love Open Source and passionate to create, contrinute to Open Source projects");
        },
        contact: function() {
            this.echo("Get in touch via:")
            this.echo("E: " + e); 
            this.echo("T: @rgv151"); 
            this.echo("G: +rgv151"); 
        },
        about: function() {
        }
    }, {
        greetings: ".___            ___ ___\n" +
            "|   | _____    /   |   \\ __ __ ___.__.\n" +
            "|   |/     \\  /    ~    \\  |  <   |  |\n" + 
            "|   |  Y Y  \\ \\    Y    /  |  /\\___  |\n" +
            "|___|__|_|  /  \\___|_  /|____/ / ____|\n" +
            "          \\/         \\/        \\/     \n" +
            "Hi, let's explore my little box on the Internet, or type help for more information",
        prompt: e + ":~# ",
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        tabcompletion: true
    });
});
