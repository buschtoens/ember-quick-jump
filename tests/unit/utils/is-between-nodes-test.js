import isBetweenNodes from 'ember-quick-jump/utils/is-between-nodes';
import { module, test } from 'qunit';

module('Unit | Utility | is between nodes');

const parser = new DOMParser();
const doc = parser.parseFromString(
  `
  <div id="before"></div>
  <div id="start"></div>
  <div id="test">
    <div id="testNested"></div>
  </div>
  <div id="end"></div>
  <div id="after"></div>
`,
  'text/html'
);

const elements = {};
for (const id of ['before', 'start', 'test', 'testNested', 'end', 'after']) {
  elements[id] = doc.getElementById(id);
}

test('it detects direct siblings', function(assert) {
  assert.ok(isBetweenNodes(elements.start, elements.end, elements.test));
});

test('it detects descendants of siblings', function(assert) {
  assert.ok(isBetweenNodes(elements.start, elements.end, elements.testNested));
});

test('it does not detect preceding nodes', function(assert) {
  assert.notOk(isBetweenNodes(elements.start, elements.end, elements.before));
});

test('it does not detect following nodes', function(assert) {
  assert.notOk(isBetweenNodes(elements.start, elements.end, elements.after));
});

test('it throws for reversed start and end nodes', function(assert) {
  assert.throws(() =>
    isBetweenNodes(elements.end, elements.start, elements.test)
  );
});

// implicitly
test('it throws, if start and end node are identical', function(assert) {
  assert.throws(() =>
    isBetweenNodes(elements.start, elements.start, elements.test)
  );
});

test('it throws, if either parameter isn not an instance of Node', function(
  assert
) {
  assert.throws(() => isBetweenNodes({}, elements.end, elements.test));
  assert.throws(() => isBetweenNodes(elements.start, {}, elements.test));
  assert.throws(() => isBetweenNodes(elements.start, elements.end, {}));
});
