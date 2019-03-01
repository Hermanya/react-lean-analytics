# react-lean-analytics

> React package for lean analytics

[![NPM](https://img.shields.io/npm/v/react-lean-analytics.svg)](https://www.npmjs.com/package/react-lean-analytics) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-lean-analytics
```

Ensure you have setted you REACT_APP_ENV variable in the project process.env file,
And that variable must be the same that productionEnv prop in experiment ("prod" by default).

**The invokes/success counters only count in production mode.**

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

## Props
### Experiment

| Name           | Type   | Default | Description                                                                   |
|----------------|--------|---------|-------------------------------------------------------------------------------|
| id             | string | -       | Experiment id.                                                                |
| trackedAction  | string | -       | The tracked action of you experiment.                                         |
| productionEnv  | string | "prod"  | The name of your production environment, defined in process.env.REACT_APP_ENV. **The invokes/success counters only count in production mode.** |

### Variant

| Name           | Type        | Default | Description   |
|----------------|-------------|---------|---------------|
| id             | description | -       | Variant name. |

## License

MIT © [Hermanya](https://github.com/Hermanya)
