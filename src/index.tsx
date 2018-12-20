import * as React from 'react'

const URL = `https://vgxfdxwocf.execute-api.us-east-1.amazonaws.com/Prod/runs`;

type experimentProps = {
  id: string
}
type experimentState = {variantIndex: number}

export class Experiment extends React.Component<experimentProps, experimentState> {
  constructor(props: experimentProps) {
    super(props);

    let childrenLength = 0
    if (this.props.children) {
      childrenLength = (this.props.children as React.ReactNodeArray).length
    }
    this.state = {
      variantIndex: Math.floor(Math.random() * childrenLength)
    }
  }
  componentDidMount() {
    this.report();
  }
  report(validated = false) {
    fetch(URL, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        testId: this.props.id,
        variantIndex: this.state.variantIndex,
        validated
      })
    });
  }
  render() {
    let variant = this.props.children ?
      this.props.children[this.state.variantIndex] : undefined;
    return variant.props.children(this.onSuccess.bind(this));
  }
  onSuccess() {
    this.report(true);
  }
}

export const Variant: React.FunctionComponent<{}> = ({ children }) =>
  (children as React.ReactElement<any>)
