import json
import pandas as pd

if __name__ == "__main__":
    sample_size = 1000
    df = pd.read_csv("data/sudoku.csv")
    samples = df.sample(n=sample_size)["quizzes"].values

    to_write = []

    for i, sample in enumerate(samples):
        out = []
        arr = list(sample)
        for j, s in enumerate(arr):
            if j % 9 == 0:
                out.append([])

            if s == "0":
                out[-1].append(None)
            else:
                out[-1].append(int(s))

        to_write.append(out)

    with open("data/sudoku_samples.json", "w") as f:
        f.write(json.dumps(to_write))
