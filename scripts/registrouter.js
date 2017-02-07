var fs = require('fs');

module.exports.registRouter = function (app) {
    console.log('Start Regist Router.....');
    var dir = fs.readdirSync(process.cwd() + '/routes');
    for (var i in dir) {
        if (!/^\w+\.js$/.test(dir[i])) continue;
        var type = dir[i].split('.')[0];
        try {
            var routemodule = require(process.cwd() + '/routes/' + type);
            var routelist = routemodule.route;
            for (var m in routelist) {
                var routes = routelist[m];
                for (var p in routes) {
                    var func = routes[p];
                    var args = [p];
                    if (func instanceof Array) {
                        args = args.concat(func);
                    }
                    else {
                        args.push(func);
                    }
                    app[m].apply(app, args);
                    console.log('Regist Router Module:[' + type + '] Method:[' + m + '] Path:[' + p + ']');
                }
            }
        } catch (e) {
            console.log('Regist Router Method[' + type + '] Error:[' + e + ']');
            return;
        }
    }
    console.log('End Regist Router.....');
}
