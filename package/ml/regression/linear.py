from sklearn import linear_model
from ml.regression.base import Regression


class LinearRegression(Regression):

    def __init__(self):
        Regression.__init__(self)
        self._name = "Linear"
        self._model = linear_model.LinearRegression()
