<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">IEmitter&lt;TEventArgs&gt;</h1>

> `Emitter<TEventArgs>`: An interface describing an object used to emit event-like messages.

The `IEmitter` interface exposes the following members:

- [`clear`](#clear)
- [`emit`](#emit)
- [`subscribe`](#subscribe)
- [`unsubscribe`](#unsubscribe)

See also [`Emitter`][emitter] and [`EventHandler`][event-handler].

<br>

<a href="#top">(go to top)</a>

----

## `clear` ##

> ```typescript
> IEmitter.clear(): void;
> ```

Clears the list of subscribers.

<br>

<a href="#top">(go to top)</a>

----

## `emit` ##

> ```typescript
> IEmitter.emit(args: TEventArgs): void;
> ```

Calls all subscribers, passing the given arguments.

<br>

<a href="#top">(go to top)</a>

----

## `subscribe` ##

> ```typescript
> IEmitter.subscribe(handler: EventHandler<TEventArgs>): void;
> ```

Adds the given event handler to the list of subscribers.

<br>

<a href="#top">(go to top)</a>

----

## `unsubscribe` ##

> ```typescript
> IEmitter.unsubscribe(handler: EventHandler<TEventArgs>): void;
> ```

Removes the given event handler from the list of subscribers.

<br>

<a href="#top">(go to top)</a>

----

[emitter]:emitter.md#top
[event-handler]: EventHandler.md#top
