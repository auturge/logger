<div id="top" align="right"><a href="https://github.com/auturge/logger#readme">(home)</a></div>

# <h1 align="center">IEmitter&lt;TEventArgs&gt;</h1> #

> `Emitter<TEventArgs>`: An interface describing an object used to emit event-like messages.

The `IEmitter` interface exposes the following members:

- [`clear`](#clear)
- [`emit`](#emit)
- [`subscribe`](#subscribe)
- [`unsubscribe`](#unsubscribe)

See also [`Emitter`](emitter) and [`EventHandler`](event-handler).

<br>

<a href="#top">(go to top)</a>

----

## `clear` ##

> ```javascript
> IEmitter.clear(): void;
> ```

Clears the list of subscribers.

<br>

<a href="#top">(go to top)</a>

----

## `emit` ##

> ```javascript
> IEmitter.emit(args: TEventArgs): void;
> ```

Calls all subscribers, passing the given arguments.

<br>

<a href="#top">(go to top)</a>

----

## `subscribe` ##

> ```javascript
> IEmitter.subscribe(handler: EventHandler<TEventArgs>): void;
> ```

Adds the given event handler to the list of subscribers.

<br>

<a href="#top">(go to top)</a>

----

## `unsubscribe` ##

> ```javascript
> IEmitter.unsubscribe(handler: EventHandler<TEventArgs>): void;
> ```

Removes the given event handler from the list of subscribers.

<br>

<a href="#top">(go to top)</a>

----

[emitter]:emitter.md
[event-handler]: EventHandler.md