var API_PREFIX = 'https://api.github.com/repos/rgv151/huy.im/git';
var GitHub = new (function() {
    this.fs = new Object;
    this.loaded = false;
    this.stack = new Array;
    
    this.getCurrentWorkingDirectory = function() {
        if(this.stack.length == 0) 
            return this.fs;
        
        var fs = this.fs
        for(var i in this.stack) {
            fs = fs[this.stack[i]];
        }
        return fs;
    };
        
    var self = this;    
    $.getJSON(API_PREFIX + '/refs/heads/master', function(data, textStatus, jqXHR){
    //$.getJSON('data/master.json', function(data, textStatus, jqXHR){
        var sha = data.object.sha;
        $.getJSON(API_PREFIX + '/trees/'+sha+'?recursive=1', function(data, textStatus, jqXHR){
        //$.getJSON('data/tree.json', function(data, textStatus, jqXHR){
            for(i in data.tree) {
                var item = data.tree[i];                
                var paths = item.path.split('/');   
                
                var fs = self.fs;                
                for(var i=0; i< paths.length; i++) {
                    var path = paths[i];                    
                    
                    if(!fs.hasOwnProperty(path)) {
                       fs[path] = new Object;
                    } else {
                       fs = fs[path]
                    }
                       
                    if (i == paths.length-1) {
                        item.path = path;
                        fs[path] = item;
                    }
                }
            }
            self.loaded = true;
        });
    });
})();

var App = {
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
        this.echo("some other basic Linux commands are available: cat cd id ls startx")
    },
    whoami: function() {
        this.echo("Hello, my name is Huy Doan (aka Bruce Doan), I'm dad of Mia (a super cute girl) and I'm from  HCMc, Vietnam.");
        this.echo("I'm a programmer, Linux system administrator. I really love Open Source and passionate to create, contrinute to Open Source projects");
        this.echo("My technical summary:");
        this.echo("\t- Have strong knowledge about Linux operating system and open source software.");
        this.echo("\t- Responsible for day-to-day defense of our network, servers.");
        this.echo("\t- Experienced with web application development, specialist with PHP/MySQL. Can develop desktop/web application with Java/Python.");
        this.echo("\t- Able to make mobile apps using many different technologies (Native/Titanium/PhoneGap)");
        this.echo("\nI'm available to work as freelancer, so feel free to get in touch via [[b;#44D544;]contact] command");

    },
    contact: function() {
        this.echo("Get in touch via:")
        this.echo("Email:   " + e); 
        this.echo("Twitter: @rgv151"); 
        this.echo("Google+: +rgv151"); 
    },
    about: function() {
        this.echo("This page built with <a href='http://terminal.jcubic.pl/' target='_blank'>jQuery Terminal Emulator</a> plugin, and hosted by <a href='http://pages.github.com' target='_blank'>GitHub Pages<a/>. Source code is also available on <a href='https://github.com/rgv151/huy.im/tree/gh-pages' target='_blank'>GitHub</a>.\n\nThis page is under development.. keep visting for many cool things on the future.", {raw:true});
    },
    id: function(){
        this.echo("uid=1000(tui) gid=1000(tui)");
    },
    ls: function() {        
        var wd = GitHub.getCurrentWorkingDirectory();
        for(i in wd) {
            if(typeof wd[i] == 'object') {
                var item = wd[i];
                this.echo(item.mode+'\t' + (item.type=='tree'?'[[b;#44D544;]'+item.path+']':item.path));
            }
        }
    },
    cd: function(path) {        
        if(path == '..') {
            GitHub.stack.pop();
            return;
        }        
        var wd = GitHub.getCurrentWorkingDirectory();
        var item = wd[path]
        if(!item) {
            this.error("cd: " + path + ": No such file or directory");
        } else if(item.type != 'tree') {
            this.error("cd: " + path  + ": Not a directory");
        } else {
            GitHub.stack.push(path);
        }
    },
    cat: function(path){
        var wd = GitHub.getCurrentWorkingDirectory();
        var item = wd[path];
        if(!item) {
            this.error("cat: " + path + ": No such file or directory");
        } else if(item.type == 'tree') {
            this.error("cat: " + path  + ": Is a directory");
        } else {
            var term = this;
            term.pause();
            $.getJSON(item.url, function(data, textStatus, jqXHR){
                var content = data.content.trim()
                if(data.encoding == 'base64')
                    content = decode64(content);
                term.echo(content); 
                term.resume();
            });
        }
    },
    startx: function() {
        this.error('xinit: unable to connect to X server: Resource temporarily unavailable\nxinit: server error');
    }
}

jQuery(document).ready(function($) {
    var e = "tu&#105;&#64;h&#117;y&#46;&#105;&#109;";
    $('body').terminal(App, {
        greetings: "[[b;#44D544;].___            ___ ___\n" +
            "|   | _____    /   |   \\ __ __ ___.__.\n" +
            "|   |/     \\  /    ~    \\  |  <   |  |\n" + 
            "|   |  Y Y  \\ \\    Y    /  |  /\\___  |\n" +
            "|___|__|_|  /  \\___|_  /|____/ / ____|\n" +
            "          \\/         \\/        \\/     \n" +
            "Hi, let's explore my little box on the Internet!]\n\nType [[b;#44D544;]whoami] to read something about me, [[b;#44D544;]ls] to explore resources on this page and [[b;#44D544;]help] if you dont know what to do next.\n",
        prompt: function(p){
            var path = '~'
            if(GitHub.stack.length > 0) {
                for(i in GitHub.stack) {
                    path+= '/';
                    path+= GitHub.stack[i]
                }
            }
            p(e + ":" + path + "# ");
        },
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        tabcompletion: true
    });
});
