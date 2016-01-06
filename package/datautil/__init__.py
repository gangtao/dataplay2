import pandas as pd


def load(name):
    df = pd.read_csv('data/' + name + '.csv')
    return df


def getColsValues(df, cols):
    return df[list(cols)].values


def getColValues(df, col):
    return df[col].values
