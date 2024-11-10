def sentence_checker (correct_sentence, input_sentence):

    correct_list = correct_sentence.replace(".", "").lower().split()
    input_list = input_sentence.replace(".", "").lower().split()
    print (correct_list)
    print(input_list)
    result = []

    for i in range(len(input_list) - 1):
        if i < len(correct_list):
            result.append((input_list[i], input_list[i] == correct_list[i]))
        else:
            result.append((input_list[i], False))
    return result

# Tests
# Correct
# correct_sentence = "The quick brown fox jumps over the log."
# input_sentence = "The quiCk brown fox jUmps over the log"
# print(sentence_checker(correct_sentence, input_sentence))

# Incorrect
# correct_sentence = "The quick brown fox jumps over the log."
# input_sentence = "The slow brown fox dives under the log"
# print(sentence_checker(correct_sentence, input_sentence))  