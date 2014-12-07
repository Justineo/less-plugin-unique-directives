var getMarkUniqueVisitor = require('./mark-unique');
var getRemoveDuplicateVisitor = require('./remove-duplicate');

module.exports = {
    install: function(less, pluginManager) {
        var uniqueMap = {};
        var MarkUniqueVisitor = getMarkUniqueVisitor(less, uniqueMap);
        pluginManager.addVisitor(new MarkUniqueVisitor());
        var RemoveDuplicateVisitor = getRemoveDuplicateVisitor(less, uniqueMap);
        pluginManager.addVisitor(new RemoveDuplicateVisitor());
    }
};
