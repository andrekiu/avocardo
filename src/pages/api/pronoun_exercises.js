export default function handle(req, res) {
  res.json({
    data: {
      id: 1,
      quiz: "test",
      pronouns: [
        { word: "t", is_solution: true },
        { word: "e", is_solution: false },
      ],
      nouns: [
        { word: "s", is_solution: true },
        { word: "t", is_solution: false },
      ],
    },
  });
}
