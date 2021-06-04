import IndexRes from "../chrome_extension/IndexRes.bs.js";
export { getServerSideProps } from "../chrome_extension/IndexResServer.bs.js";

function Index(props) {
  return <IndexRes {...props} />;
}

export default Index;
