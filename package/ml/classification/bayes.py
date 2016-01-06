from sklearn.naive_bayes import GaussianNB
from ml.classification.base import Classifier


class NBayesClassifier(Classifier):

    def __init__(self):
        Classifier.__init__(self)
        self._name = "Bayes"
        self._model = GaussianNB()
