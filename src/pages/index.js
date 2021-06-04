import IndexRes from "../chrome_extension/IndexRes.bs.js";
import { getServerSideProps as genProps } from "../chrome_extension/IndexResServer.bs.js";

export default function Index(props) {
  return <IndexRes {...props} />;
}

export async function getServerSideProps(ctx) {
  const props = await genProps(ctx);
  return props;
}
