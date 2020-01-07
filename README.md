# react-lean-analytics

> React package for lean analytics

[![NPM](https://img.shields.io/npm/v/react-lean-analytics.svg)](https://www.npmjs.com/package/react-lean-analytics) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-lean-analytics
```

To see analytics in the dashboard, ensure you have set your `NODE_ENV` environment variable to `production`.

> **The invocations and validations only count in production mode.**

## Usage

```tsx
import * as React from 'react'

import {Experiment, Variant} from 'react-lean-analytics'

class Example extends React.Component {
  render () {
    return (
       <Experiment
          trackedAction="Purchase"
          id="...."
        >
          <Variant description={`"Buy now" CTA`}>
            {callback => (
              <RetailComponent
                callback={callback}
                cta="Buy now"
              />
            )}
          </Variant>
          <Variant description={`"Buy online" CTA`}>
            {callback => (
              <RetailComponent
                callback={callback}
                cta="Buy online"
              />
            )}
          </Variant>
        </Experiment>

    )
  }
}
```

### Using weights

Weights are proportional. The default weight for each variant is 1. If you want to make a variant to be chosen more often, give it a "heavier" weight.

```tsx
import * as React from 'react'

import {Experiment, Variant} from 'react-lean-analytics'

class Example extends React.Component {
  render () {
    return (
       <Experiment
          trackedAction="Purchase"
          id="...."
        >
          <Variant description={`"Buy now" CTA`} weight={0.5}>
            {callback => (
              <RetailComponent
                callback={callback}
                cta="Buy now"
              />
            )}
          </Variant>
          <Variant description={`"Buy online" CTA`} weight={2}>
            {callback => (
              <RetailComponent
                callback={callback}
                cta="Buy online"
              />
            )}
          </Variant>
          <Variant description={`"Buy here" CTA`}>
            {callback => (
              <RetailComponent
                callback={callback}
                cta="Buy here"
              />
            )}
          </Variant>
        </Experiment>

    )
  }
}
```

## Props

### Experiment

| Name                   | Type     | Default                                 | Description                                                        |
| ---------------------- | -------- | --------------------------------------- | ------------------------------------------------------------------ |
| id                     | string   | -                                       | Experiment id.                                                     |
| forceVariant           | number   | -                                       | Variant index to render. helper for consistent experience          |
| onSelectedIndex        | function | -                                       | Callback to get variant index at render. (index: number) => void   |
| trackedAction          | string   | -                                       | The tracked action of you experiment.                              |
| shouldCollectAnalytics | boolean  | `process.env.NODE_ENV === 'production'` | **The invocations and validations only count in production mode.** |

### Variant

| Name        | Type   | Default | Description                                                         |
| ----------- | ------ | ------- | ------------------------------------------------------------------- |
| description | string | -       | What makes this variant different from others.                      |
| weight      | number | 1       | ex. 0.5, 2, 99. variants invocations can be 'controlled' by weights |

## License

MIT © [Hermanya](https://github.com/Hermanya)
