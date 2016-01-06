from ml.regression import linear, logistic

__CATEGORY__ = ["Linear", "Logistic"]


def getRegressionByName(name):

    if name == "Linear":
        return linear.LinearRegression()
    elif name == "Logistic":
        return logistic.LogisticRegression()

    return None


def getRegressionModels():
    return __CATEGORY__
