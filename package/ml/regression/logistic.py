from sklearn import linear_model
from ml.regression.base import Regression


class LogisticRegression(Regression):

    def __init__(self):
        Regression.__init__(self)
        self._name = "Logistic"
        self._model = linear_model.LogisticRegression(C=1e5)

    def predict_proba(self, data):
        return self._model.predict_proba(data)
