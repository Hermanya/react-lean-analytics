import * as React from 'react'

const URL = `https://nw7ipb8huf.execute-api.us-east-1.amazonaws.com/Prod/runs`;

type experimentProps = {
  id: string,
  shouldCollectAnalytics?: boolean,
  weight: number
}
type experimentState = {variantIndex: number, selectedVariant: any}

export class Experiment extends React.Component<experimentProps, experimentState> {
  constructor(props: experimentProps) {
    super(props);

    let weighedVariants,
      randomnumber = 0,
      childrenLength = 0;
    if (this.props.children) {
      childrenLength = (this.props.children as React.ReactNodeArray).length
      let variantsweight = React.Children.map(
        this.props.children, x => (x as any).props.weight || 1/childrenLength
      );
      let totalweight = variantsweight ?
        variantsweight.reduce((sum, val) => sum + (Number((val).toFixed(1))*10), 0)
        : 0;
      if (totalweight > 10) {
        console.error("The sum of variants weights can't be greater than 1.");
      }
      weighedVariants = React.Children.map(this.props.children, (ch, index) =>
        [ ...Array(Math.floor(variantsweight[index] * 10)).fill(ch as any) ]
      );

      randomnumber = Math.floor(Math.random() * totalweight);
    }
    this.state = {
      variantIndex: weighedVariants ? Number((weighedVariants[randomnumber] as any).key[1]) : 0,
      selectedVariant: weighedVariants ? weighedVariants[randomnumber] : undefined
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
    let variant = this.state.selectedVariant ?
      this.state.selectedVariant.props.children(this.onSuccess.bind(this)) :
      null;
    return variant;
  }
  onSuccess() {
    this.report(true);
  }
}

export const Variant: React.FunctionComponent<{}> = ({ children }) =>
  (children as React.ReactElement<any>)
