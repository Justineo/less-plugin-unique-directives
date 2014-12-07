var getNestedVisitor = require('./nested-visitor');

module.exports = function (less, uniqueMap) {
    var NestedVisitor = getNestedVisitor(less);

    function MarkUniqueVisitor() {
        this._visitor = new less.visitors.Visitor(this);
    }

    MarkUniqueVisitor.prototype = new NestedVisitor();
    MarkUniqueVisitor.constructor = MarkUniqueVisitor;

    MarkUniqueVisitor.prototype.uniqueCallback = function (directiveNode) {
        uniqueMap[this.getPath(directiveNode.name + ' ' + directiveNode.value.value)] = directiveNode;
        return directiveNode;
    };

    return MarkUniqueVisitor;
};
