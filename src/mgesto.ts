import { range, filter, map, Observable, fromEvent } from 'rxjs';

interface MgestoOptions {

}

interface MouseGesture {
    action?: "move-into" | "click" | "dblclick" | "rageclick" | "nearclick" | "drag" | "select";
    subject?: EventTarget;
    origin?: EventTarget | null;
    manner?: "quick" | "slow";
    loc?: {x1: number, y1: number, x2: number, y2: number};
}

function fromEventTarget(eventTarget: EventTarget, options: MgestoOptions): Observable<MouseGesture> {

    // todo - a very simple mouse action to observable
    return fromEvent(eventTarget, 'click').pipe(
        map(ev => ({action: "move-into"}))
    );

}
