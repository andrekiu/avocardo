import { withAdminSession } from "../../chrome_extension/auth/Session.js";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import fs from "fs";
import {
  genPronounExercise,
  genFailures,
  genQuizzes,
} from "../../server/queries/PronounController.bs.js";
import { genInsertAnswer } from "../../server/queries/AnswerController.bs.js";
import { genInsertFeedback } from "../../server/queries/FeedbackController.bs.js";
import { genAnswersOverTime } from "../../server/queries/AdminController.bs.js";

const schema = buildSchema(
  fs.readFileSync(process.cwd() + "/schema.graphql", "utf8")
);

async function genFails(fingerprint) {
  const rows = await genFailures(fingerprint);
  return {
    pageInfo: {
      hasNextPage: false,
    },
    totalCount: () => {
      return rows.length;
    },
    edges: async () => {
      const quizzes = await genQuizzes(rows.map((e) => `${e.question_id}`));
      return quizzes.map((q) => ({
        node: {
          id: q.id,
          question: q.question,
          alternatives: q.alternatives,
          answer: q.answer,
        },
        cursor: q.question,
      }));
    },
  };
}

async function genNextQuiz({ fingerprint, justFails }) {
  if (justFails) {
    const rows = await genFailures(fingerprint);
    const quizzes = await genQuizzes([`${rows[0].question_id}`]);
    if (quizzes.length === 0) {
      return null;
    }
    const q = quizzes[0];
    return {
      id: q.id,
      question: q.question,
      alternatives: q.alternatives,
      answer: q.answer,
    };
  }
  return genPronounExercise();
}

function getProfile({ fingerprint }) {
  return {
    id: fingerprint,
    nextQuiz: ({ justFails }) => genNextQuiz({ fingerprint, justFails }),
    fails: () => genFails(fingerprint),
  };
}

async function getAdminProfile(_, ctx) {
  if (!ctx.session.get("admin_auth_token")) {
    throw new Error("NOT AUTHENTICATED");
  }
  const data = await genAnswersOverTime();
  return {
    answersOverTime() {
      return data.map((e) => ({
        ds: e.ds.toLocaleDateString("en-CA"),
        value: e.value,
      }));
    },
  };
}

const root = {
  addFeedback: async ({ fingerprint, quiz_id, feedback: feedbackList }) => {
    await Promise.all(
      feedbackList.map((feedback) =>
        genInsertFeedback({ fingerprint, quiz_id, feedback })
      )
    );
    return getProfile({ fingerprint });
  },
  addAnswer: async ({ fingerprint, quiz_id, didSucceed }) => {
    await genInsertAnswer({ fingerprint, quiz_id, didSucceed });
    return getProfile({ fingerprint });
  },
  getProfile,
  getAdminProfile,
};

const middleware = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: !process.env.PROD,
});

export default withAdminSession((req, res) => {
  return middleware(req, res);
});
