import IndexRes from "../chrome_extension/next_pages/IndexRes.bs.js";
import { getServerSideProps as genProps } from "../chrome_extension/next_pages/IndexResServer.bs.js";

export default function Index(props) {
  return <IndexRes {...props} />;
}

export async function getServerSideProps(ctx) {
  const props = await genProps(ctx);
  return props;
}
