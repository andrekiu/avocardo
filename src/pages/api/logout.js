import { withAdminSession } from "../../chrome_extension/auth/Session.js";

export default withAdminSession(async (req, res) => {
  req.session.unset("admin_auth_token");
  await req.session.save();
  res.json({});
});
