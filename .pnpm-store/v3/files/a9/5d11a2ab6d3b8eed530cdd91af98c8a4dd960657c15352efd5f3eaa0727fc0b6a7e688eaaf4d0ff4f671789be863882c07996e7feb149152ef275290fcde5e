"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@babel/core");

const topicReferenceVisitor = {
  exit(path, state) {
    if (path.isTopicReference()) {
      state.topicReferences.push(path);
    } else {
      if (state.topicReferences.length === 0 && !state.sideEffectsBeforeFirstTopicReference && !path.isPure()) {
        state.sideEffectsBeforeFirstTopicReference = true;
      }
    }
  },

  "ClassBody|Function"(_, state) {
    if (state.topicReferences.length === 0) {
      state.sideEffectsBeforeFirstTopicReference = true;
    }
  }

};
var _default = {
  BinaryExpression: {
    exit(path) {
      const {
        scope,
        node
      } = path;

      if (node.operator !== "|>") {
        return;
      }

      const pipeBodyPath = path.get("right");

      if (pipeBodyPath.node.type === "TopicReference") {
        path.replaceWith(node.left);
        return;
      }

      const visitorState = {
        topicReferences: [],
        sideEffectsBeforeFirstTopicReference: pipeBodyPath.isFunction()
      };
      pipeBodyPath.traverse(topicReferenceVisitor, visitorState);

      if (visitorState.topicReferences.length === 1 && (!visitorState.sideEffectsBeforeFirstTopicReference || path.scope.isPure(node.left, true))) {
        visitorState.topicReferences[0].replaceWith(node.left);
        path.replaceWith(node.right);
        return;
      }

      const topicVariable = scope.generateUidIdentifierBasedOnNode(node);
      scope.push({
        id: topicVariable
      });
      visitorState.topicReferences.forEach(path => path.replaceWith(_core.types.cloneNode(topicVariable)));
      path.replaceWith(_core.types.sequenceExpression([_core.types.assignmentExpression("=", _core.types.cloneNode(topicVariable), node.left), node.right]));
    }

  }
};
exports.default = _default;