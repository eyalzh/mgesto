import { map, filter, mergeWith } from 'rxjs/operators';
import { range, Observable, fromEvent, EMPTY } from 'rxjs';

interface MgestoOptions {
}

/**
 * TODO
 * 
 * 1. Build a mechanism for detecting mouse gestures.
 * 
 * Suggestion: Record mouse events every period of time ('tick') and over a period fo time, and convert them into a sequence of symbols.
 * Then, declare a scenario using an expression similar to regexp.
 * 
 * For example, assuming the following symbols:
 * M - Mouse movement
 * I - Mouse moving into an element
 * O - Mouse moving out of an element
 * S - Mouse staying idle 
 * 
 * A scenario describing the "move_into" gesture: 
 * 
 * M*I[^O]{5}
 * 
 * This expression describes movement of the mouse (M*), then entering an element (I) and then any other event within the element other than moving out of it for at least 5 ticks ([^O]{5})
 */

enum MouseGestureAction {

    // Movement of the mouse from outside an element into the element, stopping at the element for at least a thershold
    // could also start from an origin element
    MOVE_INTO = "move-into",

    CLICK = "click",
    DBLCLICK = "dblclick",

    // More than 2 consequetive clicks on the same (possibly non-interactable) element, without movement, within a short period of time
    RAGECLICK = "rageclick",

    // Clicking within close distnace to an interactable element, but not within
    NEARCLICK = "nearclick",

    DRAG = "drag",
    DROP = "drop",
    
    // Selecting text or other content with the mouse
    SELECT = "select",

    SCROLL = "scroll",
    RAGE_SCROLL = "ragescroll",

    // Using the mouse to track text (indicates eye movement)
    TRACK = "track",

    // Moving the mouse on the screen to a non-interactable point and stopping
    WANDER = "wander",

    PARK = "park"
}

interface MouseGesture {
    action?: MouseGestureAction;
    subject?: EventTarget | null;
    origin?: EventTarget | null;
    speed?: "quick" | "slow";
    distance?: "short" | "long";
}

export default function fromEventTarget(eventTarget: EventTarget, options: MgestoOptions): Observable<MouseGesture> {

    const clicks$ = fromEvent(eventTarget, 'click').pipe(
        map(ev => ({
            action:MouseGestureAction.CLICK, 
            subject: ev.target
        }))
    );

    const dblclicks$ = fromEvent(eventTarget, 'dblclick').pipe(
        map(ev => ({
            action:MouseGestureAction.DBLCLICK, 
            subject: ev.target
        }))
    );

    return EMPTY.pipe(mergeWith(clicks$, dblclicks$));

}
