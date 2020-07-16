# TypeScript Scroll Manager

A recycling scroll manager written in [TypeScript](https://www.typescriptlang.org/). 

Originally written to manage thousands of items appearing within a `<canvas>` element (set to `position: sticky`) within a scrolling `<div>`.

## Install

`npm i typescript-scroll-manager`

## Overview

There are 4 parts to this library:

* ScrollManager
    * This class manages scrolling. You can use this class as-is.

* ScrollItem
    * This class represents an item to be scrolled. You can use this class as-is.

* RenderProvider
    * This class manages renderable views. You should subclass this class.

* Positionable
    * An interface that renderable items should adher to so they can update their position.