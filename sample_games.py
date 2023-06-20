"""
Utility script to sample games from the dataset and write them to a json file.
Original dataset: https://www.kaggle.com/datasets/bryanpark/sudoku
"""

import json
import pandas as pd


def format_sudoku(sudoku):
    out = []
    arr = list(sudoku)
    for j, s in enumerate(arr):
        if j % 9 == 0:
            out.append([])

        if s == "0":
            out[-1].append(None)
        else:
            out[-1].append(int(s))

    return out


if __name__ == "__main__":
    sample_size = 5
    df = pd.read_csv("data/sudoku.csv")
    samples_full = df.sample(n=sample_size)
    sample_quizzes = samples_full["quizzes"].values
    sample_values = samples_full["solutions"].values

    to_write = []

    for i, sample in enumerate(sample_quizzes):
        out = format_sudoku(sample)
        solution = format_sudoku(sample_values[i])
        print("--------------------")
        print(json.dumps(out))
        print()
        print(solution)
        to_write.append(out)

    with open("data/sudoku_samples.json", "w") as f:
        f.write(json.dumps(to_write))
