module.exports = function (less) {

    function NestedVisitor() {
        this._nested = [];
    }

    var nestedDirectives = {
        '@media': 1,
        '@supports': 1
    };

    var uniqueDirectives = {
        '@keyframes': 1
    };

    function getNonVendorSpecificName(name) {
        var nonVendorSpecificName = name;
        if (name.charAt(1) == '-' && name.indexOf('-', 2) > 0) {
            nonVendorSpecificName = "@" + name.slice(name.indexOf('-', 2) + 1);
        }

        return nonVendorSpecificName;
    }

    NestedVisitor.prototype = {
        isReplacing: true,
        run: function (root) {
            return this._visitor.visit(root);
        },
        getPath: function (name) {
            return this._nested.concat([name]).join('/');
        },
        visitMedia: function (mediaNode) {
            var value = mediaNode.features.toCSS({ compress: false });
            this._nested.push('@media ' + value);
            return mediaNode;
        },
        visitMediaOut: function () {
            this._nested.pop();
        },
        visitDirective: function (directiveNode) {
            var name = directiveNode.name;
            var nonVendorSpecificName = getNonVendorSpecificName(name);
            var processed = directiveNode;

            if (nestedDirectives[nonVendorSpecificName]) {
                this._nested.push(name + ' ' + directiveNode.value.value);
            } else if (uniqueDirectives[nonVendorSpecificName]) {
                processed = this.uniqueCallback(directiveNode);
            }

            return processed;
        },
        visitDirectiveOut: function (directiveNode) {
            if (!directiveNode) {
                return;
            }

            var nonVendorSpecificName = getNonVendorSpecificName(directiveNode.name);
            if (nestedDirectives[nonVendorSpecificName]) {
                this._nested.pop();
            }
        },
        uniqueCallback: function (directiveNode) {
            return directiveNode;
        }
    };

    return NestedVisitor;
};
