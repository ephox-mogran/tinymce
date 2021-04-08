import { Optional } from '@ephox/katamari';
import { Css, SugarElement } from '@ephox/sugar';
import { isDecisionBottomAligned, isDecisionTopAligned, isElementBottomAligned, isElementTopAligned } from './PositionLocation';
import { RepositionDecision } from './Reposition';

export interface PositionCss {
  readonly position: string;
  readonly left: Optional<number>;
  readonly top: Optional<number>;
  readonly right: Optional<number>;
  readonly bottom: Optional<number>;
}

const NuPositionCss = (
  position: string,
  left: Optional<number>,
  top: Optional<number>,
  right: Optional<number>,
  bottom: Optional<number>
): PositionCss => ({
  position,
  left,
  top,
  right,
  bottom
});

const applyPositionCss = (element: SugarElement, position: PositionCss, decision: Optional<RepositionDecision>): void => {
  const addPx = (num: number) => num + 'px';

  /*
   * Approach
   *
   * - if our current styles have a 'top', and we are moving to a bottom, then firstly convert
   * our top value to a bottom value. Then, reflow. This should allow the transition to animate from
   * a CSS top to a CSS bottom
   *
   * NOTE: You'll need code for finding the equivalent bottom from a top and vice versa. It isn't as
   * simple as just adding and subtracting element heights. You might need to know the offset parent.
   *
   * TODO: Implement ....
   */

  const cssOptions = {
    position: Optional.some(position.position),
    left: position.left.map(addPx),
    top: position.top.map(addPx),
    right: position.right.map(addPx),
    bottom: position.bottom.map(addPx)
  };

  const changedFromTopToBottom = isElementTopAligned(element) && isDecisionBottomAligned(decision);
  const changedFromBottomToTop = isElementBottomAligned(element) && isDecisionTopAligned(decision);

  if (changedFromTopToBottom || changedFromBottomToTop) {
  console.log('-----------------------------------------------');
  console.log('Changed from top to bottom: ' + changedFromTopToBottom);
  console.log('Top ' + Css.get(element, 'top'));
  console.log('Top Raw ' + Css.getRaw(element, 'top').getOrNull());
  console.log('Bottom ' + Css.get(element, 'bottom'));
  console.log('Bottom Raw ' + Css.getRaw(element, 'bottom').getOrNull());
    const getValue = (key: 'top' | 'left' | 'bottom' | 'right') => {
      if (cssOptions[key].isSome()) {
        return Optional.some(Css.get(element, key));
      } else {
        return Optional.none<string>();
      }
    };

    const intermediateCssOptions = {
      position: cssOptions.position,
      top: getValue('top'),
      right: getValue('right'),
      bottom: getValue('bottom'),
      left: getValue('left'),
    };
    console.log('--------');
    console.log(cssOptions.top.getOrNull());
    console.log();
    console.log(intermediateCssOptions.top.getOrNull());
    console.log();
    console.log();
    // debugger;
    Css.setOptions(element, intermediateCssOptions);
    Css.reflow(element);

    console.log('Top ' + Css.get(element, 'top'));
    console.log('Top Raw ' + Css.getRaw(element, 'top').getOrNull());
    console.log('Bottom ' + Css.get(element, 'bottom'));
    console.log(intermediateCssOptions.bottom.getOrNull() + ' > ' + cssOptions.bottom.getOrNull() + 'Bottom Raw ' + Css.getRaw(element, 'bottom').getOrNull());
    console.log(intermediateCssOptions.top.getOrNull() + ' > ' + cssOptions.top.getOrNull() + 'Top Raw ' + Css.getRaw(element, 'top').getOrNull());
    // debugger;
  }

  Css.setOptions(element, cssOptions);

  if (changedFromTopToBottom || changedFromBottomToTop) {
    // debugger;
  }
};

export {
  NuPositionCss,
  applyPositionCss
};
