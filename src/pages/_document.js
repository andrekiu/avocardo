import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Avocardo</title>
          <link rel="shortcut icon" href="/img/favicon.ico" />
        </Head>
        <body
          style={{
            margin: "0",
            padding: "0",
            fontFamily: "Arial, Helvetica, sans-serif",
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
