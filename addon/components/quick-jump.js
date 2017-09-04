import Component from '@ember/component';
import { get } from '@ember/object';
import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';
import { guidFor } from '@ember/object/internals';
import { getViewBounds } from 'ember-quick-jump/utils/view-utils';
import isBetweenNodes from 'ember-quick-jump/utils/is-between-nodes';
import layout from '../templates/components/quick-jump';

export default class QuickJumpComponent extends Component.extend({
  layout,

  tagName: ''
}) {
  @service quickJump;

  static positionalParams = ['shortcut', 'onSelect'];

  shortcut;

  selector = 'input, button, select, textarea, a, [tabindex]';

  indicatorComponent = 'qj-indicator';

  @computed
  marker() {
    return `ember-quick-jump--${guidFor(this)}`;
  }

  onSelect() {}

  willDestroyElement() {
    super.willDestroy();

    get(this, 'quickJump').unregister(this);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs();

    get(this, 'quickJump').register(this, get(this, 'shortcut'));
  }

  findFocusableElementInBounds(find) {
    const { firstNode, lastNode, parentElement } = getViewBounds(this);
    const elements = find(parentElement);

    for (const element of elements) {
      if (element.hasAttribute('disabled')) {
        continue;
      }
      if (!isBetweenNodes(firstNode, lastNode, element)) {
        continue;
      }
      return element;
    }

    return null;
  }

  findTargetElementByMarker() {
    const marker = get(this, 'marker');
    return this.findFocusableElementInBounds(parentElement =>
      parentElement.getElementsByClassName(marker)
    );
  }

  findTargetElementBySelector() {
    const selector = get(this, 'selector');
    return this.findFocusableElementInBounds(parentElement =>
      parentElement.querySelectorAll(selector)
    );
  }

  findTargetElement() {
    return (
      this.findTargetElementByMarker() || this.findTargetElementBySelector()
    );
  }
}
