# <h1 id="top" align="center">Emitter&lt;TEventArgs&gt;</h1> #

> `Emitter<TEventArgs>`: An object used to emit event-like messages.

The `Emitter` interface extends the [`IEmitter`](iEmitter) interface, and so exposes the following members:

- [`clear`](iEmitter#clear)
- [`emit`](iEmitter#emit)
- [`subscribe`](iEmitter#subscribe)
- [`unsubscribe`](iEmitter#unsubscribe)

In addition, `Emitter` exposes the following additional members:

- [`subscribers`](iEmitter#subscribers)

See also [`IEmitter`](iEmitter) and [`EventHandler`](event-handler).

<br>

<a href="#top">(go to top)</a>

----

## `subscribers` ##

> ```javascript
> Emitter.subscribers: EventHandler<TEventArgs>[];
> ```

Returns the list of [`EventHandler`](event-handler)s that are currently registered on this `Emitter`.

<br>

<a href="#top">(go to top)</a>

----

[iEmitter]:iEmitter.md
[event-handler]: EventHandler.md
