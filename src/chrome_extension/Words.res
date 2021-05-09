let normalize = %raw(`function(str) {
        return str.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
      }`)

let rec max_prefix_iterator = (a, b, idx) =>
  switch idx {
  | idx if String.length(a) <= idx || String.length(b) <= idx => idx
  | idx if String.get(a, idx) == String.get(b, idx) => max_prefix_iterator(a, b, idx + 1)
  | idx => idx
  }

let max_prefix = (a, b) => max_prefix_iterator(normalize(a), b, 0)

let is_match = (a, b) => max_prefix(a, b) == String.length(a)
