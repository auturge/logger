# Changelog #

## [1.0.1] - 10-May-2021 ##

- Fixed
    - The default logger now correctly parses tokens in minified dist

- Added
    - extracted ILogBuilder and ILogManager interfaces

- Changed
    - changed dependencies in concrete classes from instances to abstractions
    - added default types to the generics, in order to dial back the levels of type constraints

- Removed
    - removed IChannel, Channel dependency on IStatusEntry
    - removed ILog dependency on IStatusEntry
    - removed ILogEntry dependency on IStatusData
    - removed LogBuilder dependency on IStatusEntry
    - removed sourcemaps from dist (to reduce package size)

## [1.0.0] - 09-May-2021 ##

✨ Initial release
