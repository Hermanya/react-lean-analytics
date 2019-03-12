import * as React from 'react'
import {ReactNodeArray, ReactElement} from 'react'
import WeightedPicker from "weighted-picker/browser";

const URL = `https://nw7ipb8huf.execute-api.us-east-1.amazonaws.com/Prod/runs`;
const defaultWeight = 1

type experimentProps = {
  id: string,
  shouldCollectAnalytics?: boolean
}
type experimentState = {variantIndex: number}

export class Experiment extends React.Component<experimentProps, experimentState> {
  constructor(props: experimentProps) {
    super(props);

    let children  = this.props.children as ReactNodeArray;

    const picker = new WeightedPicker(children.length, index => {
      let variant = children[index] as ReactElement<variantProps>
      return variant.props.weight || defaultWeight
    });

    this.state = {
      variantIndex: picker.pickOne()
    }
  }
  componentDidMount() {
    this.report();
  }
  shouldCollectAnalytics () {
    return typeof this.props.shouldCollectAnalytics === 'boolean' ?
      this.props.shouldCollectAnalytics :
      process.env.NODE_ENV === 'production'
  }
  report(validated = false) {
    if (!this.shouldCollectAnalytics()) {
      return;
    }
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
    if (this.state.variantIndex === undefined || !this.props.children) {
      return undefined;
    }
    let variant = this.props.children[this.state.variantIndex]
    return variant.props.children(this.onSuccess.bind(this));
  }
  onSuccess() {
    this.report(true);
  }
}
type variantProps = {
  description?: string
  weight?: number
}
export const Variant: React.FunctionComponent<variantProps> = ({ children }) =>
  (children as React.ReactElement<any>)

Variant.defaultProps = {
  weight: defaultWeight
}