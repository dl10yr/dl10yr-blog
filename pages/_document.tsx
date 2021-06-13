/* eslint-disable @typescript-eslint/ban-ts-comment */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
// @ts-ignore
import outputcss from '!raw-loader!../styles/output.css'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            dangerouslySetInnerHTML={{
              __html: outputcss,
            }}
          />
        </>
      ),
    }
  }

  render() {
    // const isAmp = this.props.inAmpMode

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />

          {/* {!isAmp && (
            <>
              <script src="/some_third_party1.js"></script>
              <script src="/some_third_party2.js"></script>
            </>
          )} */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
