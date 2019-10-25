// Since overlays are VectorGrid layers with canvas rendering,
// they don't support clicking through them (the topmost canvas
// swallows the event, lower layers will not see it).
// We workaround this by this hack (inspired by
// http://www.vinylfox.com/forwarding-mouse-events-through-layers/):
//
// All overlays are in their own Leaflet pane. When a click hits a
// layer in the pane, we first handle the event like normal, and then
// hit the event handler below this comment.
//
// The event handler will hide the original target layer's DOM element,
// and then find out which DOM element is under it, and re-dispatch the same
// event on that element, and continuing this process until all layers
// have been dispatched, or abort if a layer's event handler stops the
// event.
//
// We currently only do this for clicks, since hiding and redisplaying
// elements is a performance hog if you do it in for example mousemove.
overlayPane = map.createPane('my-overlays');
L.DomEvent.on(overlayPane, 'click', function(e) {
    if (e._stopped) { return; }

    var target = e.target;
    var stopped;
    var removed;
    var ev = new MouseEvent(e.type, e)

    removed = {node: target, display: target.style.display};
    target.style.display = 'none';
    target = document.elementFromPoint(e.clientX, e.clientY);

    if (target && target !== overlayPane) {
        stopped = !target.dispatchEvent(ev);
        if (stopped || ev._stopped) {
            L.DomEvent.stop(e);
        }
    }

    removed.node.style.display = removed.display;
});
