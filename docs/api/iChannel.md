<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

# <h1 align="center">IChannel</h1> #

> `IChannel`: An interface describing a single log-writing implementation.

The `IChannel` interface exposes the following members:

- [`enabled`](#enabled)
- [`level`](#level-channel)
- [`name`](#name-channel)
- [`reconfigured`](#reconfigured)
- [`isEnabledFor`](#isEnabledFor)
- [`log`](#log-channel)

<br>

<a href="#top">(go to top)</a>

----

## `enabled` ##

> ```javascript
> IChannel.enabled: boolean;
> ```

Formats and writes a success log message.

This is for informing the user of some significant operational success.

Some examples of `success` messages:

- 'All done!'
- 'Successfully logged in!'

> NOTE: `success` entries are logged at the `info` level.
>
> Setting the level of the logger higher than `info` will filter out any `success` messages.

<br>

<a href="#top">(go to top)</a>

----
