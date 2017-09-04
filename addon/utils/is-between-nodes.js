import { assert } from '@ember/debug';

const { DOCUMENT_POSITION_PRECEDING, DOCUMENT_POSITION_FOLLOWING } = Node;

export default function isBetweenNodes(startNode, endNode, testNode) {
  assert(
    `'startNode' must be a DOM Node, but is ${startNode}`,
    startNode instanceof Node
  );
  assert(
    `'endNode' must be a DOM Node, but is ${endNode}`,
    endNode instanceof Node
  );
  assert(
    `'testNode' must be a DOM Node, but is ${testNode}`,
    testNode instanceof Node
  );
  assert(
    'startNode must precede endNode',
    startNode.compareDocumentPosition(endNode) & DOCUMENT_POSITION_FOLLOWING
  );

  return (
    testNode.compareDocumentPosition(startNode) & DOCUMENT_POSITION_PRECEDING &&
    testNode.compareDocumentPosition(endNode) & DOCUMENT_POSITION_FOLLOWING
  );
}
