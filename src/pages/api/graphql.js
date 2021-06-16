import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import fs from "fs";
import {
  genPronounExercise,
  genFailures,
  genQuizzes,
} from "../../server/exercises/PronounController.bs.js";
import { genInsertAnswer } from "../../server/answers/AnswerController.bs.js";

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

const root = {
  addAnswer: async ({ fingerprint, quiz_id, didSucceed }) => {
    await genInsertAnswer({ fingerprint, quiz_id, didSucceed });
    return {
      id: fingerprint,
      fails: () => genFails(fingerprint),
    };
  },
  getProfile: ({ fingerprint }) => {
    return {
      id: fingerprint,
      nextQuiz: ({ justFails }) => genNextQuiz({ fingerprint, justFails }),
      fails: () => genFails(fingerprint),
    };
  },
};

const middleware = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: !process.env.PROD,
});

export default function handler(req, res) {
  return middleware(req, res);
}
