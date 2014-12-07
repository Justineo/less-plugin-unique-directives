var getNestedVisitor = require('./nested-visitor');

module.exports = function (less, uniqueMap) {
    var NestedVisitor = getNestedVisitor(less);

    function RemoveDuplicateVisitor() {
        this._visitor = new less.visitors.Visitor(this);
    }

    RemoveDuplicateVisitor.prototype = new NestedVisitor();
    RemoveDuplicateVisitor.constructor = RemoveDuplicateVisitor;

    RemoveDuplicateVisitor.prototype.uniqueCallback = function (directiveNode) {
        if (uniqueMap[this.getPath(directiveNode.name + ' ' + directiveNode.value.value)] !== directiveNode) {
            return;
        }
        return directiveNode;
    };

    return RemoveDuplicateVisitor;
};
