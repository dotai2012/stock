import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    maxHeight: 250,
  },
});

const TradingView = ({ symbol }) => (
  <WebView
    style={styles.container}
    originWhitelist={['*']}
    source={{
      html: `<div class="tradingview-widget-container">
      <div id="tradingview_541d1"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
      new TradingView.widget(
      {
      autosize: "true",
      "symbol": "${symbol}",
      "interval": "30",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_541d1"
      }
      );
      </script>
      </div>`,
    }}
  />
);

export default TradingView;
