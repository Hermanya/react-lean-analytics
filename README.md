# react-lean-analytics

> React package for lean analytics

[![NPM](https://img.shields.io/npm/v/react-lean-analytics.svg)](https://www.npmjs.com/package/react-lean-analytics) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-lean-analytics
```

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

## License

MIT © [Hermanya](https://github.com/Hermanya)
