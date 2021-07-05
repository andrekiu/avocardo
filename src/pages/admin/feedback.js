import { withAdminSession } from "../../chrome_extension/auth/Session.js";
import FeedbackRes from "../../chrome_extension/next_pages/FeedbackRes.bs.js";

export default function Index({ auth_status }) {
  if (auth_status !== "PASSED") {
    return <div> Not available </div>;
  }
  return <FeedbackRes />;
}

export const getServerSideProps = withAdminSession(async function ({
  req,
  res,
}) {
  if (req.session.get("admin_auth_token")) {
    return {
      props: { auth_status: "PASSED" },
    };
  }
  res.setHeader("location", "/admin/login");
  res.statusCode = 302;
  res.end();
  return { props: {} };
});