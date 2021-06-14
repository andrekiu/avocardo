module FilterFragment = %relay(`
  fragment Index_filter on FailsConnection {
    totalCount
  }
`)

type filter = Any | JustFails

module Filter = {
  @module external style: {"filter": string} = "./Index.module.css"
  @react.component
  let make = (~fails, ~filter, ~onChangeFilter) => {
    let fails = FilterFragment.use(fails)
    let failsCount = fails.totalCount
    if failsCount == 0 {
      React.null
    } else {
      <div
        className={style["filter"]}
        onClick={_ => filter == Any ? onChangeFilter(JustFails) : onChangeFilter(Any)}>
        {filter == Any
          ? React.string(Js.String.fromCodePoint(0x1F525))
          : React.string(Js.String.fromCodePoint(0x1F648))}
        {React.string(" ")}
        {React.int(failsCount)}
      </div>
    }
  }
}

module Query = %relay(`
  query IndexQuery($fingerprint: String!, $justFails: Boolean!) {
    getProfile(fingerprint: $fingerprint) {
      nextQuiz (justFails: $justFails){
        id
        question
        alternatives
        answer
      }
      fails {
        ...Index_filter
      }
    }
  }
`)

module IndexAddAnswerMutation = %relay(`
  mutation IndexAddAnswerMutation($fingerprint: ID!, $quiz_id: ID!, $didSucceed: Boolean!) {
    addAnswer(fingerprint: $fingerprint, quiz_id: $quiz_id, didSucceed :$didSucceed) {
      id
      fails {
        totalCount
      }
    }
  }
`)

let fromQuiz = (
  {id, question, answer, alternatives}: Query.Types.response_getProfile_nextQuiz,
): PronounExercises.pronoun_exercise => {
  let split = sentence => {
    let firstBlankspace = String.index(sentence, ' ')
    (
      String.sub(sentence, 0, firstBlankspace),
      String.sub(sentence, firstBlankspace + 1, String.length(sentence) - firstBlankspace - 1),
    )
  }

  let dedupe = words => {
    Array.sort(Pervasives.compare, words)
    let rec iterator = (prev, idx, sum) =>
      if idx == Array.length(words) {
        sum
      } else if prev == words[idx] {
        iterator(prev, idx + 1, sum)
      } else {
        iterator(words[idx], idx + 1, list{words[idx], ...sum})
      }
    iterator("", 0, list{})->Array.of_list
  }

  let label = (answer, words) =>
    Array.map(w => w == answer ? PronounExercises.Right(w) : PronounExercises.Wrong(w), words)

  let transform = (words, right) => dedupe(Array.append(words, [right])) |> label(right)

  let (pronounAnswer, nounAnswer) = split(answer)
  let components = Array.map(split, alternatives)
  {
    id: int_of_string(id),
    quiz: question,
    pronouns: transform(Array.map(fst, components), pronounAnswer),
    nouns: transform(Array.map(snd, components), nounAnswer),
  }
}

module AppImpl = {
  @react.component
  let make = (~fingerprint: string) => {
    let (filter, setFilter) = React.useState(() => Any)
    let (fetchKey, setFetchKey) = React.useState(() => 0)
    let (addAnswer, _) = IndexAddAnswerMutation.use()
    let {getProfile} = Query.use(
      ~variables={fingerprint: fingerprint, justFails: filter == JustFails},
      ~fetchKey={string_of_int(fetchKey)},
      ~fetchPolicy=RescriptRelay.NetworkOnly,
      (),
    )
    let {nextQuiz} = getProfile
    <Card
      exercise={fromQuiz(nextQuiz)}
      next={() => {
        setFetchKey(key => key + 1)
      }}
      storeStatus={(e, didSucceed) => {
        addAnswer(
          ~variables={
            fingerprint: fingerprint,
            quiz_id: string_of_int(e.id),
            didSucceed: didSucceed,
          },
          (),
        )->ignore
      }}
      filter={<React.Suspense fallback={<span> {React.string("Loading...")} </span>}>
        <Filter
          fails={getProfile.fails.fragmentRefs}
          filter
          onChangeFilter={f => {
            setFilter(_ => f)
          }}
        />
      </React.Suspense>}
    />
  }
}

module App = {
  @react.component
  let make = (~fingerprint: string) => {
    <React.Suspense fallback={<Shimmer />}> <AppImpl fingerprint /> </React.Suspense>
  }
}
