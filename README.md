# MobX Adapter

This package is the official MobX adapter for [BlueChip](https://github.com/mfpiccolo/blue-chip)

## Usage

```javascript
import { Actions } from "@blue-chip/core";
import mobxAdapter from "@blue-chip/mobx-adapter";
import store from "./store";

export const actions = Actions.config({
  adapter: mobxAdapter,
  mutator: store
});
```