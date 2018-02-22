import React from 'react';
import { PrismCode } from 'react-prism';
import { Base  } from 'react-mobileui';
import Helmet from 'react-helmet';

import BaseExample from '../examples/Base';
const BaseExampleSource = require('!!raw!../examples/Base');

export default class AlertsPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Base" />

        <h3>Base</h3>
        <div className="docs-example">
          <BaseExample />
        </div>
        <pre>
          <PrismCode className="language-jsx">
            {BaseExampleSource}
          </PrismCode>
        </pre>
      </div>
    );
  }
}