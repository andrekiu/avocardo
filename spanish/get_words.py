import sys
import re
import json
import numpy as np
from googletrans import Translator
from scipy.spatial.distance import cdist 


def read_file(file_name):
    words_string = ""
    with open(file_name) as f:
        for line in f:
            words_string += line

    return words_string.lower().replace("\n", "")

def count_bigrams(words_string, pronous):
    word_count_dict = {}
    words = re.split('\W+', words_string)
    i = 0
    while i < len(words):
        if words[i] in pronous:
            word = "{} {}".format(words[i], words[i+1])
            if word not in word_count_dict:
                word_count_dict[word] = 0
            word_count_dict[word] = word_count_dict[word] + 1
            # if the word is selected, jump 2 indices
            i += 1

        # otherwise jump 1 index
        i += 1

    return word_count_dict

def count_words_by_prefix(words_string, prefixes):
    word_count_dict = {}
    words = re.split('\W+', words_string)
    i = 0
    while i < len(words):
        if words[i] in prefixes:
            word = words[i+1]
            if word not in word_count_dict:
                word_count_dict[word] = 0
            word_count_dict[word] = word_count_dict[word] + 1
            i += 1

        # otherwise jump 1 index
        i += 1

    return word_count_dict


def spanish_to_english(translator, spanish_words):
    return [translator.translate(word, src='es').text for word in spanish_words]

def get_words_similarity_matrix(words):
    alpha = [i for i in set(''.join(words)) if not i.isdigit()]
    words_vec = [[i for i in range(len(alpha)) if alpha[i] in word] for word in words]   
    binary_vec = [[1 if i in word_vec else 0 for i in range(len(alpha))] for word_vec in words_vec]  
    return cdist(binary_vec, binary_vec, 'hamming') 

def get_similar_words_indices(similarity_matrix):
    return np.apply_along_axis(lambda x: x.argsort()[1:4], 1, similarity_matrix)


def get_word_choices(spanish_words):
    similarity_matrix = get_words_similarity_matrix(spanish_words)
    similar_words_idxs = get_similar_words_indices(similarity_matrix)
    similar_words = [[spanish_words[i] for i in l] for l in similar_words_idxs]
    spanish_words_choices = [[w] + s for w,s in zip(spanish_words, similar_words)]

    print('Getting translations...')
    
    translator = Translator()
    english_translation = spanish_to_english(translator, spanish_words)

    output = {k:v for k,v in zip(english_translation, spanish_words_choices)}
    return output

def recheck_translation(translated_dict):

    new_dict = {}
    translator = Translator()
    for k,v in translated_dict.items():
        if k in v:
            print("{} was not translated!".format(k))
            new_k = translator.translate(k, src='es').text
            print("New translation:", new_k)
            new_dict[new_k] = v
        else:
            new_dict[k] = v

    return new_dict


if __name__ == "__main__":

    argv_len = len(sys.argv)
    if argv_len < 2:
        print("Usage: python get_words.py <input_file_names> <output_file_name>")
        exit(1)

    pronous = ['el', 'la', 'los', 'las']

    prefixes = ['mi', 'mis', 'tu', 'tus', 'su', 'sus']

    words_string = ""
    for i in range(1, argv_len-1):
        file_name = sys.argv[i]
        words_string += read_file(file_name)

    bigram_count = count_bigrams(words_string, pronous)
    word_count = {k:v for k,v in bigram_count.items() if v > 20}

    spanish_words = list(word_count.keys())
    with open("words.txt", "r") as f:
        for line in f:
            word = line.strip()
            if word not in spanish_words:
                spanish_words.append(word)

    print('Found {} words.'.format(len(spanish_words)))
    bigram_output = get_word_choices(spanish_words)
    final_output = recheck_translation(bigram_output)

    output_file = sys.argv[-1]
    with open(output_file, 'w') as f:
        json.dump(final_output, f)

    print('Done!')
    