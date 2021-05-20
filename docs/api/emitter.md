<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

# <h1 align="center">Emitter&lt;TEventArgs&gt;</h1> #

> `Emitter<TEventArgs>`: An object used to emit event-like messages.

The `Emitter` interface extends the [`IEmitter`][iEmitter] interface, and so exposes the following members:

- [`clear`][clear]
- [`emit`][emit]
- [`subscribe`][subscribe]
- [`unsubscribe`][unsubscribe]

In addition, `Emitter` exposes the following additional members:

- [`subscribers`][subscribers]

See also [`IEmitter`][iEmitter] and [`EventHandler`][event-handler].

<br>

<a href="#top">(go to top)</a>

----

## `subscribers` ##

> ```typescript
> Emitter.subscribers: EventHandler<TEventArgs>[];
> ```

Returns the list of [`EventHandler`][event-handler]s that are currently registered on this `Emitter`.

<br>

<a href="#top">(go to top)</a>

----

[iEmitter]:iEmitter.md#top
[event-handler]: EventHandler.md#top
[clear]: iEmitter.md#clear
[emit]: iEmitter.md#emit
[subscribe]: iEmitter.md#subscribe
[unsubscribe]: iEmitter.md#unsubscribe
[subscribers]: iEmitter.md#subscribers
