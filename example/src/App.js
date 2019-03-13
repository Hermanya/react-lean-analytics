import React, { Component } from 'react'

import { Experiment, Variant } from 'react-lean-analytics'

export default class App extends Component {
  render () {
    return (
      <div style={{ padding: 16 }}>
        <Experiment
          trackedAction="Purchase"
          id="4f2d4ddb-7414-4245-9379-a028569601c5"
          //  ^ UPDATE ME
          shouldCollectAnalytics={true}
        >
          <Variant description={`Variant #1`}>
            {callback => (
              <div>
                <h2>Variant #1</h2>
                <button onClick={callback}>
                  this will trigger the callback
                </button>
              </div>
            )}
          </Variant>
          <Variant description={`Variant #2`} weight={3}>
            {callback => (
              <div>
                <h2>Variant #2</h2>
                <button onClick={callback}>
                  this will trigger the callback
                </button>
              </div>
            )}
          </Variant>
        </Experiment>
      </div>
    )
  }
}
