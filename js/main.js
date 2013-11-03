jQuery(document).ready(function($) {
    var e = "tu&#105;&#64;h&#117;y&#46;&#105;&#109;";
    $('body').terminal({
        echo: function(arg1) {
            this.echo(arg1);
        },
        help: function() {
            this.echo("Available commands:");
            this.echo("\tabout       information about this page");
            this.echo("\tcontact     display contact infomation");
            this.echo("\twhoami      display my short brief");
            this.echo("\thelp        this help screen.");                        
            this.echo("");
            this.echo("some other basic Lix commands are available: cat id ls startx")
        },
        whoami: function() {
            this.echo("Hello, my name is Huy Doan (aka Bruce Doan), I'm from  HCMc, Vietnam.");
            this.echo("I'm a programmer, Linux system administrator. I really love Open Source and passionate to create, contrinute to Open Source projects");
            this.echo("");
        },
        contact: function() {
            this.echo("Get in touch via:")
            this.echo("Email:   " + e); 
            this.echo("Twitter: @rgv151"); 
            this.echo("Google+: +rgv151"); 
        },
        about: function() {
            this.echo("This page built with <a href='http://terminal.jcubic.pl/' target='_blank'>jQuery Terminal Emulator</a> plugin, and hosted by <a href='http://pages.github.com' target='_blank'>GitHub Pages<a/>. Source code is also available on <a href='https://github.com/rgv151/huy.im/tree/gh-pages' target='_blank'>GitHub</a>.", {raw:true});
        },
        id: function(){
            this.echo("uid=1000(tui) gid=1000(tui)");
        },
        ls: function() {
        },
        cat: function(){
        },
        startx: function() {
            this.error('xinit: unable to connect to X server: Resource temporarily unavailable\nxinit: server error');
        }
    }, {
        greetings: "[[b;#44D544;].___            ___ ___\n" +
            "|   | _____    /   |   \\ __ __ ___.__.\n" +
            "|   |/     \\  /    ~    \\  |  <   |  |\n" + 
            "|   |  Y Y  \\ \\    Y    /  |  /\\___  |\n" +
            "|___|__|_|  /  \\___|_  /|____/ / ____|\n" +
            "          \\/         \\/        \\/     ]\n" +
            "Hi, let's explore my little box on the Internet, type [[b;#44D544;]help] if you dont know what to do next.\n",
        prompt: e + ":~# ",
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        tabcompletion: true
    });
});
