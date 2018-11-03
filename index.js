var fs = require('fs');
var path = require('path');

class TransformJsonPlugin 
{
    constructor(options) 
    {
        this.pluginName = 'TransformJsonFile';
        this.options = options || {};
        this.options.object = options.object || {};
        this.options.source = options.source || '';
        this.options.filename = options.filename || 'package.json';

        this._source = {};
        if (this.options.source)
        {
            this._source = JSON.parse(fs.readFileSync(this.options.source).toString());
        }
    }

    apply(compiler) 
    {
        const emit = (compilation, callback) => {
            var merged = Object.assign({}, this._source, this.options.object);
            var json = JSON.stringify(merged, null, 2);
            
            compilation.assets[this.options.filename] = {
            source: function() { return json; },
            size: function() { return json.length; }
            }

            callback();
        };
        if (compiler.hooks) 
        {
            compiler.hooks.emit.tapAsync(this.pluginName, emit);
        } 
        else 
        {
            compiler.plugin('emit', emit);
        }
    }
}

module.exports = TransformJsonPlugin;
