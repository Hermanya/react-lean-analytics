import * as React from "react";
import { ReactNodeArray, ReactElement } from "react";
import WeightedPicker from "weighted-picker/browser";

const URL = `https://nw7ipb8huf.execute-api.us-east-1.amazonaws.com/Prod/runs`;
const defaultWeight = 1;

type experimentProps = {
  id: string;
  forceVariant?: number;
  onSelectedIndex?: (index: number) => void;
  shouldCollectAnalytics?: boolean;
};
type experimentState = { variantIndex: number };

export class Experiment extends React.Component<
  experimentProps,
  experimentState
> {
  constructor(props: experimentProps) {
    super(props);

    const { children, forceVariant } = this.props;

    const variants = children as ReactNodeArray;

    if (!variants || !Array.isArray(variants)) {
      throw Error("Experiment requires children components");
    }

    const picker = new WeightedPicker(variants.length, index => {
      let variant = variants[index] as ReactElement<variantProps>;
      return variant.props.weight || defaultWeight;
    });

    const variantIndex =
      forceVariant === undefined || isNaN(parseFloat(String(forceVariant)))
        ? picker.pickOne()
        : forceVariant;

    this.state = {
      variantIndex
    };
  }
  componentDidMount() {
    this.report();
    if (this.props.onSelectedIndex) {
      this.props.onSelectedIndex(this.state.variantIndex);
    }
  }
  shouldCollectAnalytics() {
    return typeof this.props.shouldCollectAnalytics === "boolean"
      ? this.props.shouldCollectAnalytics
      : process.env.NODE_ENV === "production";
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
    let variant = this.props.children[this.state.variantIndex];
    return variant.props.children(this.onSuccess.bind(this));
  }
  onSuccess() {
    this.report(true);
  }
}
type variantProps = {
  description?: string;
  weight?: number;
};
export const Variant: React.FunctionComponent<variantProps> = ({ children }) =>
  children as React.ReactElement<any>;

Variant.defaultProps = {
  weight: defaultWeight
};
